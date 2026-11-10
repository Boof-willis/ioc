import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FUND_EMAIL, MAX_AWARD, NOMINATION_ENDPOINT } from '@/config/access-to-play';

const ASSISTANCE_OPTIONS = ['Registration fees', 'Equipment', 'Uniform', 'Other participation costs'];

const STEPS = [
  { key: 'athlete', title: 'Who are you nominating?', hint: 'Start with the athlete.' },
  { key: 'needs', title: 'What do they need to play?', hint: 'Choose all that apply, then estimate the cost.' },
  { key: 'story', title: 'Tell us about them', hint: 'A few sentences is plenty.' },
  { key: 'you', title: 'How can we reach you?', hint: "We'll only contact you about this nomination." },
] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'ioc-field w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-[border-color,box-shadow] focus:outline-none';
const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-800';

function push(event: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(event);
}

export default function NominationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [step, setStep] = useState(0);
  const [needsError, setNeedsError] = useState(false);
  const [athlete, setAthlete] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const last = STEPS.length - 1;

  // Move focus to the new step's heading so keyboard and screen reader users land in the right place.
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  /** Checks the fields on the current step and shows the browser's message on the first problem. */
  function stepIsValid(): boolean {
    const form = formRef.current;
    if (!form) return false;
    const fieldset = form.querySelectorAll('fieldset[data-step]')[step] as HTMLFieldSetElement | undefined;
    if (!fieldset) return true;

    if (STEPS[step].key === 'needs') {
      const any = fieldset.querySelector<HTMLInputElement>('input[name="assistance"]:checked');
      if (!any) {
        setNeedsError(true);
        fieldset.querySelector<HTMLInputElement>('input[name="assistance"]')?.focus();
        return false;
      }
    }

    const fields = fieldset.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  function goTo(next: number) {
    moved.current = true;
    setStep(next);
    push({ event: 'access_to_play_nomination_step', nomination_step: next + 1, nomination_step_name: STEPS[next].key });
  }

  function handleBack() {
    if (step > 0) goTo(step - 1);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepIsValid()) return;

    // Enter key or Continue on an earlier step moves forward instead of submitting.
    if (step < last) {
      goTo(step + 1);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '').trim();

    // Hidden field that only bots fill in.
    if (data.get('botcheck')) {
      setStatus('sent');
      return;
    }

    // Field names match what the Worker in workers/nominations expects.
    const fields = {
      athlete_name: value('athlete_name'),
      athlete_age: value('athlete_age'),
      sport: value('sport'),
      assistance: data.getAll('assistance').map(String).join(', '),
      amount_requested: value('amount_requested'),
      reason: value('reason'),
      nominator_name: value('nominator_name'),
      nominator_email: value('nominator_email'),
      nominator_phone: value('nominator_phone'),
    };
    setAthlete(fields.athlete_name);

    setStatus('sending');
    try {
      const res = await fetch(NOMINATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error('Submission failed');
      push({ event: 'access_to_play_nomination', nomination_method: 'form' });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  function startOver() {
    moved.current = false;
    setStep(0);
    setNeedsError(false);
    setStatus('idle');
  }

  if (status === 'sent') {
    return (
      <div role="status" className="py-6 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ioc-green/20">
          <svg className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-slate-900">Nomination received</h3>
        <p className="mx-auto max-w-sm text-slate-600">
          Thank you for nominating {athlete || 'this athlete'}. Our team reviews every nomination, and we'll reach out
          by email with any questions.
        </p>
        <button type="button" onClick={startOver} className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700">
          Nominate another athlete
        </button>
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
          <span className="text-blue-600">
            Step {step + 1} of {STEPS.length}
          </span>
          {step > 0 && (
            <button type="button" onClick={handleBack} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          )}
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Nomination progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
        >
          <div className="h-full rounded-full bg-blue-600 transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-6">
        <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold tracking-tight text-slate-900 focus:outline-none md:text-[1.75rem]">
          {STEPS[step].title}
        </h3>
        <p className="mt-1 text-slate-500">{STEPS[step].hint}</p>
      </div>

      <div className="min-h-[15rem]">
        {/* Step 1: athlete */}
        <fieldset data-step hidden={step !== 0} className="space-y-4">
          <legend className="sr-only">About the athlete</legend>
          <div className="grid gap-4 sm:grid-cols-[1fr_7.5rem]">
            <div>
              <label htmlFor="athlete_name" className={labelClass}>Athlete's name</label>
              <input id="athlete_name" name="athlete_name" type="text" required autoComplete="off" className={inputClass} />
            </div>
            <div>
              <label htmlFor="athlete_age" className={labelClass}>Age</label>
              <input id="athlete_age" name="athlete_age" type="number" inputMode="numeric" min={3} max={21} required className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="sport" className={labelClass}>Sport or organization</label>
            <input id="sport" name="sport" type="text" required placeholder="Soccer, a local club, a school team…" className={inputClass} />
          </div>
        </fieldset>

        {/* Step 2: assistance */}
        <fieldset data-step hidden={step !== 1} aria-describedby={needsError ? 'needs-error' : undefined}>
          <legend className="sr-only">Assistance needed</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ASSISTANCE_OPTIONS.map((option) => (
              <label
                key={option}
                className="ioc-choice flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-4 text-base font-medium text-slate-700 transition-[border-color,background-color,box-shadow] hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-slate-900"
              >
                <input
                  type="checkbox"
                  name="assistance"
                  value={option}
                  onChange={() => setNeedsError(false)}
                  className="h-5 w-5 flex-shrink-0 accent-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
          {needsError && (
            <p id="needs-error" role="alert" className="mt-3 text-sm font-semibold text-red-600">
              Choose at least one type of assistance.
            </p>
          )}

          <div className="mt-6">
            <label htmlFor="amount_requested" className={labelClass}>Estimated amount requested</label>
            <div className="relative sm:max-w-[14rem]">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base font-semibold text-slate-500" aria-hidden="true">$</span>
              <input
                id="amount_requested"
                name="amount_requested"
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                required
                aria-describedby="amount-hint"
                className={`${inputClass} pl-8`}
              />
            </div>
            <p id="amount-hint" className="mt-2 text-sm text-slate-500">
              The standard award is up to ${MAX_AWARD} per athlete, based on need and available funding.
            </p>
          </div>
        </fieldset>

        {/* Step 3: story */}
        <fieldset data-step hidden={step !== 2}>
          <legend className="sr-only">Why you are nominating this athlete</legend>
          <label htmlFor="reason" className={labelClass}>Why are you nominating this athlete?</label>
          <textarea
            id="reason"
            name="reason"
            required
            rows={6}
            maxLength={1500}
            placeholder="How you know them, what playing means to them, and what's standing in the way."
            className={`${inputClass} resize-y`}
          />
          <p className="mt-2 text-sm text-slate-500">Please leave out medical details.</p>
        </fieldset>

        {/* Step 4: nominator */}
        <fieldset data-step hidden={step !== 3} className="space-y-4">
          <legend className="sr-only">About you</legend>
          <div>
            <label htmlFor="nominator_name" className={labelClass}>Your name</label>
            <input id="nominator_name" name="nominator_name" type="text" required autoComplete="name" className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nominator_email" className={labelClass}>Email</label>
              <input id="nominator_email" name="nominator_email" type="email" required autoComplete="email" className={inputClass} />
            </div>
            <div>
              <label htmlFor="nominator_phone" className={labelClass}>
                Phone <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <input id="nominator_phone" name="nominator_phone" type="tel" autoComplete="tel" className={inputClass} />
            </div>
          </div>
        </fieldset>
      </div>

      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          We couldn't send your nomination. Please try again, or email it to{' '}
          <a href={`mailto:${FUND_EMAIL}`} className="font-bold underline">{FUND_EMAIL}</a>.
        </p>
      )}

      <div className="mt-8 space-y-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
        >
          {step < last ? (
            <>
              Continue
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </>
          ) : status === 'sending' ? (
            'Sending…'
          ) : (
            'Submit nomination'
          )}
        </button>
        {step === last && (
          <p className="text-center text-xs leading-relaxed text-slate-500">
            We use this information only to review the nomination. See our{' '}
            <a href="/privacy-policy" className="font-semibold text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        )}
      </div>
    </form>
  );
}
