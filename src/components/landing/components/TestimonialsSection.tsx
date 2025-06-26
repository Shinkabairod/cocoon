import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre aligné à gauche */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Testimonials
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              
              {/* Header avec avatar et info */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 ${
                  index % 3 === 0 
                    ? 'bg-gradient-to-br from-violet-100 to-violet-200' 
                    : index % 3 === 1 
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200'
                      : 'bg-gradient-to-br from-indigo-100 to-indigo-200'
                } rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.activity}</div>
                </div>
              </div>
              
              {/* Étoiles */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Citation */}
              <p className="text-gray-700 text-base leading-relaxed mb-4 italic">
                "{testimonial.content}"
              </p>
              
              {/* Badge revenus */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                {testimonial.revenue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;