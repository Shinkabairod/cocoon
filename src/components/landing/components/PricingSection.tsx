
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  onAuthRedirect: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingPlans, onAuthRedirect }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-6">
            Choisis ton plan
          </h2>
          <p className="text-xl text-gray-600">
            Commencer gratuitement, évoluer selon tes besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`transition-all duration-500 hover:scale-105 ${plan.popular ? 'border-black shadow-2xl shadow-black/25' : 'border-gray-200 hover:shadow-xl'} relative bg-white/90 backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    Plus populaire
                  </span>
                </div>
              )}
              <CardContent className="p-10">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-black">{plan.price}</span>
                    <span className="text-gray-600 text-xl">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 text-left">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${plan.popular ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-black/25' : 'border-2 border-gray-300 hover:border-black hover:bg-gray-50'}`} variant={plan.popular ? "default" : "outline"} onClick={onAuthRedirect}>
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
