import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';
interface CTASectionProps {
  onAuthRedirect: () => void;
}
const CTASection: React.FC<CTASectionProps> = ({
  onAuthRedirect
}) => {
  return <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Turn your expertise into automated income?</h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Join thousands of experts who have already built their AI bot. 
          Set up in 2 minutes, results from day one.
        </p>
        
        <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold group" onClick={onAuthRedirect}>
          <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
          Create my bot now
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <div className="mt-6 text-gray-400 text-sm">
          30-day money-back guarantee
        </div>
      </div>
    </section>;
};
export default CTASection;