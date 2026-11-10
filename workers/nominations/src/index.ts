/**
 * Access to Play Fund nominations.
 * Receives the nomination form from /access-to-play and emails it to the fund
 * through Cloudflare Email Sending. Runs on the route instantorthocare.com/api/nominate and sends from
 * notify.instantorthocare.com (onboarded to Email Sending separately from the root domain).
 */

interface Env {
  EMAIL: SendEmail;
  /** Who receives each nomination. Must also be listed in the binding's allowed_destination_addresses. */
  NOMINATION_TO: string;
  /** Sender address on the onboarded domain. */
  NOMINATION_FROM: string;
}

const ALLOWED_ORIGINS = [
  'https://instantorthocare.com',
  'https://www.instantorthocare.com',
  'http://localhost:4321',
];

/** Cloudflare Pages preview links for the ioc project, such as https://access-to-play.ioc-7ie.pages.dev. */
const PREVIEW_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?ioc-7ie\.pages\.dev$/;

function isAllowed(origin: string | null): origin is string {
  return !!origin && (ALLOWED_ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin));
}

/** Form fields in the order they appear in the email, with a label and a length cap. */
const FIELDS = [
  ['athlete_name', 'Athlete name', 120],
  ['athlete_age', 'Athlete age', 3],
  ['sport', 'Sport or organization', 200],
  ['assistance', 'Assistance needed', 300],
  ['amount_requested', 'Estimated amount requested', 10],
  ['reason', 'Why they are being nominated', 1500],
  ['nominator_name', 'Nominator name', 120],
  ['nominator_email', 'Nominator email', 200],
  ['nominator_phone', 'Nominator phone', 40],
] as const;

type FieldKey = (typeof FIELDS)[number][0];
const REQUIRED: FieldKey[] = ['athlete_name', 'athlete_age', 'sport', 'assistance', 'amount_requested', 'reason', 'nominator_name', 'nominator_email'];

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function cors(origin: string | null): Record<string, string> {
  if (!isAllowed(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Strips line breaks so a value can't add headers or break the subject line. */
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').trim();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (request.method !== 'POST') {
      return json({ success: false, error: 'Method not allowed' }, 405, origin);
    }
    // Browsers always send Origin on a cross-site or fetch POST; reject anything not from the site.
    if (!isAllowed(origin)) {
      return json({ success: false, error: 'Forbidden' }, 403, origin);
    }

    let input: Record<string, unknown>;
    try {
      input = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ success: false, error: 'Invalid request' }, 400, origin);
    }

    // Hidden field that only bots fill in. Pretend it worked.
    if (input.botcheck) return json({ success: true }, 200, origin);

    const values = {} as Record<FieldKey, string>;
    for (const [key, , max] of FIELDS) {
      const raw = input[key];
      const v = (Array.isArray(raw) ? raw.join(', ') : String(raw ?? '')).trim();
      if (v.length > max) return json({ success: false, error: `${key} is too long` }, 400, origin);
      values[key] = v;
    }
    for (const key of REQUIRED) {
      if (!values[key]) return json({ success: false, error: `${key} is required` }, 400, origin);
    }
    if (!EMAIL_RE.test(values.nominator_email)) {
      return json({ success: false, error: 'nominator_email is invalid' }, 400, origin);
    }
    values.amount_requested = `$${values.amount_requested.replace(/^\$/, '')}`;
    if (!values.nominator_phone) values.nominator_phone = 'Not provided';

    const rows = FIELDS.map(([key, label]) => [label, values[key]] as const);
    const text = rows.map(([label, v]) => `${label}:\n${v}`).join('\n\n');
    const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0f172a;max-width:600px">
<h2 style="margin:0 0 16px">New Access to Play nomination</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%">
${rows
  .map(
    ([label, v]) =>
      `<tr><td style="border-bottom:1px solid #e2e8f0;font-weight:bold;vertical-align:top;width:40%">${escapeHtml(label)}</td><td style="border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
  )
  .join('\n')}
</table>
<p style="color:#64748b;font-size:13px;margin-top:16px">Sent from the nomination form at instantorthocare.com/access-to-play. Reply to this email to contact the nominator.</p>
</div>`;

    try {
      await env.EMAIL.send({
        to: env.NOMINATION_TO,
        from: { email: env.NOMINATION_FROM, name: 'IOC Access to Play Fund' },
        replyTo: { email: oneLine(values.nominator_email), name: oneLine(values.nominator_name) },
        subject: `Access to Play nomination: ${oneLine(values.athlete_name)}`,
        text,
        html,
      });
    } catch (e) {
      const err = e as { code?: string; message?: string };
      console.error('Nomination email failed', err.code, err.message);
      return json({ success: false, error: 'Could not send the nomination' }, 502, origin);
    }

    return json({ success: true }, 200, origin);
  },
} satisfies ExportedHandler<Env>;
