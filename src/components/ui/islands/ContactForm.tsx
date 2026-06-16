import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [transactionalConsent, setTransactionalConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div
        className={cn(
          'p-8 bg-ioc-green/10 border-2 border-ioc-green rounded-lg text-center',
          className
        )}
      >
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-ioc-gray-dark mb-2">Thank you!</h3>
        <p className="text-ioc-gray">
          We've received your message and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-5', className)}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-ioc-gray-dark mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none transition-colors"
          style={{ outline: 'none', boxShadow: 'none' }}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-ioc-gray-dark mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none transition-colors"
          style={{ outline: 'none', boxShadow: 'none' }}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-ioc-gray-dark mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none transition-colors"
          style={{ outline: 'none', boxShadow: 'none' }}
          placeholder="(385) 386-7026"
        />
      </div>

      <div className="space-y-4 pt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 h-5 w-5 flex-shrink-0 rounded border-2 border-gray-300 text-ioc-blue focus:ring-0 focus:outline-none accent-ioc-blue"
          />
          <span className="text-sm text-ioc-gray leading-relaxed">
            I agree to receive recurring automated promotional and personalized
            marketing text messages from Instant Orthopedic Care at
            385-386-7026. Consent is not a condition of purchase. Message and
            data rates may apply. Message frequency varies. Reply STOP to opt
            out, HELP for help.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="transactionalConsent"
            checked={transactionalConsent}
            onChange={(e) => setTransactionalConsent(e.target.checked)}
            className="mt-1 h-5 w-5 flex-shrink-0 rounded border-2 border-gray-300 text-ioc-blue focus:ring-0 focus:outline-none accent-ioc-blue"
          />
          <span className="text-sm text-ioc-gray leading-relaxed">
            I agree to receive non-marketing text messages from Instant
            Orthopedic Care about my inquiry or appointment. Message and data
            rates may apply. Reply STOP to opt out, HELP for help.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-ioc-blue text-white rounded-lg font-semibold hover:bg-ioc-blue-dark shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      <p className="text-xs text-ioc-gray text-center">
        By submitting this form, you agree to be contacted by Instant Orthopedic
        Care. See our{' '}
        <a href="/privacy-policy" className="text-ioc-blue hover:underline">
          Privacy Policy
        </a>{' '}
        for details.
      </p>
    </form>
  );
}
