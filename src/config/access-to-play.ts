/**
 * Access to Play Fund settings.
 * The page works before any of these are filled in. Each one switches on a piece
 * of the page once it is set, so the fund can launch in stages.
 */

/** Where nominations go. Shown on the page as the contact address for the fund. */
export const FUND_EMAIL = 'accesstoplay@instantorthocare.com';

/**
 * Where the nomination form posts. The Cloudflare Worker in workers/nominations
 * answers this path on instantorthocare.com and emails each nomination to the fund.
 * Who receives it is set in workers/nominations/wrangler.jsonc, not here.
 * It is a full URL so the form also works on Pages preview links and local dev;
 * a submission from any of them sends a real email.
 */
export const NOMINATION_ENDPOINT = 'https://instantorthocare.com/api/nominate';

/**
 * Stripe Payment Links for donations.
 *
 * custom: the link where the donor picks the amount (it opens at $25).
 * 25 / 50 / 100 / 250: fixed-amount links, one per tile. Paste each in as the
 * client sends it.
 *
 * What the page shows:
 * - No fixed-amount links yet: the amounts appear as suggestions above a single
 *   Donate button that opens the custom link.
 * - Any fixed-amount link set: each amount with a link becomes its own button,
 *   followed by a Custom button for the custom link. Amounts without a link are
 *   hidden, so no button ever opens a Stripe page for a different amount.
 * - Every link empty: buttons are disabled and an "opens soon" note shows FUND_EMAIL.
 */
export const DONATION_LINKS: Record<'25' | '50' | '100' | '250' | 'custom', string> = {
  '25': '',
  '50': '',
  '100': '',
  '250': '',
  custom: 'https://donate.stripe.com/28EdR1ePSdnu0xeaQJ8k800',
};

/** Fine print shown under the donation buttons, such as tax or refund disclosures. Hidden while empty. */
export const DONATION_DISCLOSURE =
  'The Access to Play Fund is a community initiative operated by Instant Orthopedic Care. Contributions are not tax-deductible charitable donations.';

/** Standard assistance amount per athlete, in dollars. */
export const MAX_AWARD = 250;
