import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ScrollingButtonsData } from '../types';
interface ScrollingButtonsSectionProps {
  scrollingButtons: ScrollingButtonsData;
  onAuthRedirect: () => void;
}
const ScrollingButtonsSection: React.FC<ScrollingButtonsSectionProps> = ({
  scrollingButtons,
  onAuthRedirect
}) => {
  return <section className="bg-gray-50 relative overflow-hidden my-0 py-0">
      <div className="relative z-10">
        <div className="text-center mb-12">
          {/* Optional section title could go here */}
        </div>

        {/* First row - scroll left to right */}
        <div className="relative overflow-hidden mb-3">
          <div className="flex animate-scroll-right space-x-4">
            {scrollingButtons.row1.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
            {scrollingButtons.row1.slice(0, 6).map((item, index) => <div key={`dup-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
          </div>
        </div>

        {/* Second row - scroll right to left */}
        <div className="relative overflow-hidden mb-3">
          <div className="flex animate-scroll-left space-x-4">
            {scrollingButtons.row2.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
            {scrollingButtons.row2.slice(0, 6).map((item, index) => <div key={`dup2-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
          </div>
        </div>

        {/* Third row - slow scroll left to right */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right-slow space-x-4">
            {scrollingButtons.row3.map((item, index) => <div key={index} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
            {scrollingButtons.row3.slice(0, 6).map((item, index) => <div key={`dup3-${index}`} className={`flex-shrink-0 bg-gradient-to-r ${item.color} border-2 rounded-full px-6 py-3 font-medium whitespace-nowrap transition-all cursor-pointer shadow-lg`}>
                {item.text}
              </div>)}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-2xl transition-all group" onClick={onAuthRedirect}>
            <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-gray-600 text-sm mt-3">
            Free • 2-minute setup
          </p>
        </div>
      </div>
    </section>;
};
export default ScrollingButtonsSection;