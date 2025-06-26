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
        {/* Titre aligné à gauche avec les cards */}
        <div className="mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-6">
            Ils ont transformé leur expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Découvre comment nos utilisateurs automatisent et monétisent leurs compétences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative">
              {/* Fond en relief alternant */}
              <div className={`absolute inset-0 ${
                index % 3 === 0 
                  ? 'bg-gradient-to-r from-violet-50 to-violet-100' 
                  : index % 3 === 1 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
              } rounded-3xl transform ${
                index % 2 === 0 ? 'rotate-1 group-hover:rotate-2' : '-rotate-1 group-hover:-rotate-2'
              } transition-transform duration-300`}></div>
              
              <div className={`relative bg-white border-2 ${
                index % 3 === 0 
                  ? 'border-violet-600 hover:border-violet-800' 
                  : index % 3 === 1 
                    ? 'border-blue-600 hover:border-blue-800'
                    : 'border-gray-300 hover:border-gray-500'
              } rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                
                {/* Header avec avatar et info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;