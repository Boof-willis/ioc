import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
            openIndex === index 
              ? 'border-blue-600 bg-blue-50 shadow-md' 
              : 'border-gray-200 bg-white shadow-sm hover:border-blue-400'
          }`}
        >
          <button
            onClick={() => toggleItem(index)}
            className={`w-full text-left py-5 px-8 flex justify-between items-center cursor-pointer focus:outline-none transition-colors duration-300 ${
              openIndex === index ? 'bg-blue-50' : 'bg-white hover:bg-blue-50'
            }`}
          >
            <span className="font-semibold text-lg pr-4 text-gray-900">{item.question}</span>
            <svg
              className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-500 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`transition-all duration-500 ease-in-out ${
              openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-8 bg-white text-gray-700 border-t border-blue-100">
              <p className="text-lg leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

