import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How can my bot truly reflect my expertise?",
      answer: "Your bot trains on your exclusive content: your courses, articles, videos, and methods. It learns your vocabulary, your approach, and your specific solutions. The more you feed its knowledge base, the more accurate and authentic it becomes."
    },
    {
      question: "How long does it take to set up my bot?",
      answer: "Basic setup takes 10-15 minutes. You can start with a few documents and gradually enrich it. The bot improves automatically with each interaction and content update."
    },
    {
      question: "Can I control what my bot says?",
      answer: "Absolutely! You define the limits, tone, and authorized topics. You can also review and approve responses before publication. You maintain total control over your brand image."
    },
    {
      question: "How can I monetize my AI bot?",
      answer: "Several options: automated consultations, course sales, premium customer support, qualified lead generation. The bot can also recommend your paid services at the right moment."
    },
    {
      question: "Can my bot integrate with my existing tools?",
      answer: "Yes, we offer integrations with major platforms: websites, social media, CRM, messaging tools. The API also allows for custom integrations."
    },
    {
      question: "What happens if my bot doesn't know how to respond?",
      answer: "It intelligently redirects to you or suggests alternatives. You can also configure default responses and continuously enrich its knowledge base."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned title */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-6">
            FAQ
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="group relative">
              {/* Relief background */}
              <div className={`absolute inset-0 ${
                index % 3 === 0 
                  ? 'bg-gradient-to-r from-violet-50 to-violet-100' 
                  : index % 3 === 1 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
              } rounded-2xl transform ${
                index % 2 === 0 ? 'rotate-0.5 group-hover:rotate-1' : '-rotate-0.5 group-hover:-rotate-1'
              } transition-transform duration-300`}></div>
              
              <div className={`relative bg-white border-2 ${
                index % 3 === 0 
                  ? 'border-violet-200 hover:border-violet-400' 
                  : index % 3 === 1 
                    ? 'border-blue-200 hover:border-blue-400'
                    : 'border-gray-200 hover:border-gray-400'
              } rounded-2xl transition-all duration-300 hover:shadow-lg`}>
                
                <button
                  className="w-full p-6 text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 ${
                      index % 3 === 0 
                        ? 'text-violet-600' 
                        : index % 3 === 1 
                          ? 'text-blue-600'
                          : 'text-gray-600'
                    }`}>
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className={`border-t ${
                      index % 3 === 0 
                        ? 'border-violet-100' 
                        : index % 3 === 1 
                          ? 'border-blue-100'
                          : 'border-gray-100'
                    } pt-4`}>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;