import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function BookingForm({ className, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    insurance: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className={cn('p-8 bg-ioc-green/10 border-2 border-ioc-green rounded-lg text-center', className)}>
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-ioc-gray-dark mb-2">Thank you!</h3>
        <p className="text-ioc-gray">We'll contact you shortly to confirm your appointment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ioc-gray-dark mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-ioc-blue focus:ring-2 focus:ring-ioc-blue/20 outline-none transition-colors"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-ioc-gray-dark mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-ioc-blue focus:ring-2 focus:ring-ioc-blue/20 outline-none transition-colors"
          placeholder="(385) 275-2110"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ioc-gray-dark mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-ioc-blue focus:ring-2 focus:ring-ioc-blue/20 outline-none transition-colors"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="insurance" className="block text-sm font-semibold text-ioc-gray-dark mb-2">
          Insurance Provider
        </label>
        <select
          id="insurance"
          name="insurance"
          value={formData.insurance}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-ioc-blue focus:ring-2 focus:ring-ioc-blue/20 outline-none transition-colors"
        >
          <option value="">Select insurance...</option>
          <option value="self-pay">Self Pay</option>
          <option value="blue-cross">Blue Cross Blue Shield</option>
          <option value="aetna">Aetna</option>
          <option value="cigna">Cigna</option>
          <option value="united">UnitedHealthcare</option>
          <option value="medicaid">Medicaid</option>
          <option value="medicare">Medicare</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-semibold text-ioc-gray-dark mb-2">
          Reason for Visit
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-ioc-blue focus:ring-2 focus:ring-ioc-blue/20 outline-none transition-colors resize-none"
          placeholder="Brief description of your injury or concern..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-ioc-blue text-white rounded-lg font-semibold hover:bg-ioc-blue-dark shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Book Appointment'}
      </button>

      <p className="text-xs text-ioc-gray text-center">
        By submitting, you agree to be contacted by Instant Orthopedic Care.
      </p>
    </form>
  );
}

