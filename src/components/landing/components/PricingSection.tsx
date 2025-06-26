import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Rocket, Sparkles } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  onAuthRedirect: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  onAuthRedirect
}) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre aligné à gauche */}
        <div className="text-left mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-6">
            Prix
          </h2>
        </div>

        {/* Cards redesignées dans le style des autres sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const isPopular = plan.popular;
            const isPremium = index === 2; // Supposant que le 3ème plan est premium
            
            return (
              <div key={index} className="group relative">
                {/* Fond en relief avec rotation subtile comme les autres cards */}
                <div className={`absolute inset-0 ${
                  isPopular 
                    ? 'bg-gradient-to-r from-violet-50 to-violet-100' 
                    : isPremium 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100'
                      : 'bg-gradient-to-r from-gray-50 to-gray-100'
                } rounded-3xl transform ${
                  index % 2 === 0 ? 'rotate-1 group-hover:rotate-2' : '-rotate-1 group-hover:-rotate-2'
                } transition-transform duration-300`}></div>
                
                {/* Card principale */}
                <Card className={`relative border-2 ${
                  isPopular 
                    ? 'border-violet-600 hover:border-violet-800' 
                    : isPremium 
                      ? 'border-blue-600 hover:border-blue-800'
                      : 'border-gray-300 hover:border-gray-500'
                } rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                  
                  {/* Badge populaire repositionné */}
                  {isPopular && (
                    <div className="absolute -top-4 left-8">
                      <div className="flex items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        <Crown className="h-4 w-4" />
                        Plus populaire
                      </div>
                    </div>
                  )}

                  <CardContent className="p-8">
                    {/* Icône et titre */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 ${
                        isPopular 
                          ? 'bg-violet-50' 
                          : isPremium 
                            ? 'bg-blue-50' 
                            : 'bg-gray-50'
                      } rounded-xl flex items-center justify-center mb-4 group-hover:${
                        isPopular 
                          ? 'bg-violet-100' 
                          : isPremium 
                            ? 'bg-blue-100' 
                            : 'bg-gray-100'
                      } transition-colors duration-300`}>
                        {isPopular ? (
                          <Sparkles className={`w-7 h-7 ${
                            isPopular ? 'text-violet-600' : 'text-gray-600'
                          }`} />
                        ) : isPremium ? (
                          <Rocket className="w-7 h-7 text-blue-600" />
                        ) : (
                          <CheckCircle className="w-7 h-7 text-gray-600" />
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-black">{plan.price}</span>
                        <span className="text-gray-600 text-lg ml-1">{plan.period}</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className={`h-5 w-5 ${
                            isPopular 
                              ? 'text-violet-500' 
                              : isPremium 
                                ? 'text-blue-500' 
                                : 'text-green-500'
                          } flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <Button 
                      className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                        isPopular 
                          ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-violet-500/25' 
                          : isPremium 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                            : 'border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-50 text-gray-900'
                      }`} 
                      variant={isPopular || isPremium ? "default" : "outline"} 
                      onClick={onAuthRedirect}
                    >
                      {plan.cta}
                    </Button>

                    {/* Badge premium */}
                    {isPremium && (
                      <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-sm font-semibold">
                        ✨ Accès Premium
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};