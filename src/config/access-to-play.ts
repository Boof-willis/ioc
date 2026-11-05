/**
 * Access to Play Fund settings.
 * The page works before any of these are filled in. Each one switches on a piece
 * of the page once it is set, so the fund can launch in stages.
 */

/** Where nominations go. Shown on the page as the contact address for the fund. */
export const FUND_EMAIL = 'accesstoplay@instantorthocare.com';

/**
 * Web3Forms access key for the nomination form.
 * Get one free at https://web3forms.com by entering FUND_EMAIL. The key arrives in
 * that inbox. It is meant to be public, so it is safe to commit. Web3Forms forwards
 * each nomination to FUND_EMAIL and does not keep a copy.
 *
 * While this is empty, submitting the form opens the visitor's email app with the
 * nomination already written out and addressed to FUND_EMAIL.
 */
export const NOMINATION_FORM_KEY = '';

/**
 * Payment links for each donation button, from the payment platform (Stripe Payment
 * Links, PayPal, Givebutter, Zeffy, and so on).
 * Any amount left empty falls back to the custom-amount link.
 * While every link is empty, the donation section shows the amounts with an
 * "online giving opens soon" note and the fund's email address.
 */
export const DONATION_LINKS: Record<'25' | '50' | '100' | '250' | 'custom', string> = {
  '25': '',
  '50': '',
  '100': '',
  '250': '',
  custom: '',
};

/** Fine print shown under the donation buttons, such as tax or refund disclosures. Hidden while empty. */
export const DONATION_DISCLOSURE =
  'The Access to Play Fund is a community initiative operated by Instant Orthopedic Care. Contributions are not tax-deductible charitable donations.';

/** Standard assistance amount per athlete, in dollars. */
export const MAX_AWARD = 250;
