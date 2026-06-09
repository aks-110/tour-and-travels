import { useState } from 'react';

/**
 * Reusable FAQ accordion section with FAQPage schema.
 * @param {{ faqs: Array<{ question: string, answer: string }>, title?: string }} props
 */
export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 md:py-20" aria-labelledby="faq-heading">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#ff9933] font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 block">
            Have Questions?
          </span>
          <h2 id="faq-heading" className="font-serif text-3xl md:text-4xl font-light text-gray-900">
            {title}
          </h2>
        </div>

        <div className="space-y-3" role="list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                role="listitem"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9933] focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-medium text-gray-900 text-sm md:text-base pr-4">{faq.question}</span>
                  <span
                    className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
