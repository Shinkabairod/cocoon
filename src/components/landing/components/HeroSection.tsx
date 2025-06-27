import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Crown, Rocket, Bot, DollarSign, Clock, Users } from 'lucide-react';
import { Activity, AnimatedStats } from '../types';
interface HeroSectionProps {
  currentActivity: number;
  activities: Activity[];
  animatedStats: AnimatedStats;
  isVisible: boolean;
  onAuthRedirect: () => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  currentActivity,
  activities,
  animatedStats,
  isVisible,
  onAuthRedirect
}) => {
  return <section className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* NOUVEAU: Fond géométrique plus actif */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full py-0 my-[11px]">
          <defs>
            {/* Dégradés subtils en gris */}
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{
              stopColor: '#f3f4f6',
              stopOpacity: 0.6
            }} />
              <stop offset="100%" style={{
              stopColor: '#e5e7eb',
              stopOpacity: 0.3
            }} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{
              stopColor: '#d1d5db',
              stopOpacity: 0.5
            }} />
              <stop offset="100%" style={{
              stopColor: '#f9fafb',
              stopOpacity: 0.2
            }} />
            </linearGradient>
          </defs>
          
          {/* Nombreux petits cercles flottants */}
          <circle cx="120" cy="80" r="15" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 25,35; 0,0" dur="4s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="300" cy="150" r="12" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -30,20; 0,0" dur="5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="500" cy="100" r="18" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 15,-40; 0,0" dur="6s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="800" cy="200" r="10" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -20,30; 0,0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="1000" cy="120" r="16" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 35,25; 0,0" dur="4.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Polygones géométriques subtils */}
          <polygon points="200,400 250,420 230,480 180,460" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 215 440; 15 215 440; 0 215 440" dur="8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="700,500 750,510 740,570 690,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 720 535; -20 720 535; 0 720 535" dur="7s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="900,600 950,620 930,680 880,660" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 915 640; 25 915 640; 0 915 640" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="400,700 450,720 430,780 380,760" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 415 740; -30 415 740; 0 415 740" dur="5.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="600,300 650,320 630,380 580,360" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 615 340; 40 615 340; 0 615 340" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="150,650 200,670 180,730 130,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 165 690; -35 165 690; 0 165 690" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1050,450 1100,470 1080,530 1030,510" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1065 490; 20 1065 490; 0 1065 490" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="820,700 870,720 850,780 800,760" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 835 740; -25 835 740; 0 835 740" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="50,300 100,320 80,380 30,360" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 65 340; 45 65 340; 0 65 340" dur="8.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1150,150 1200,170 1180,230 1130,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1165 190; -40 1165 190; 0 1165 190" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="350,200 400,220 380,280 330,260" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 365 240; 35 365 240; 0 365 240" dur="6.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="750,350 800,370 780,430 730,410" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 765 390; -30 765 390; 0 765 390" dur="7.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="250,550 300,570 280,630 230,610" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 265 590; 50 265 590; 0 265 590" dur="5.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="950,250 1000,270 980,330 930,310" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 965 290; -45 965 290; 0 965 290" dur="8.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="550,650 600,670 580,730 530,710" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 565 690; 25 565 690; 0 565 690" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="100,500 150,520 130,580 80,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 115 540; -50 115 540; 0 115 540" dur="4.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1100,350 1150,370 1130,430 1080,410" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1115 390; 40 1115 390; 0 1115 390" dur="7.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="800,50 850,70 830,130 780,110" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 815 90; -55 815 90; 0 815 90" dur="9.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="450,450 500,470 480,530 430,510" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 465 490; 60 465 490; 0 465 490" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="650,150 700,170 680,230 630,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 665 190; -20 665 190; 0 665 190" dur="5.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="200,250 250,270 230,330 180,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 215 290; 30 215 290; 0 215 290" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1000,500 1050,520 1030,580 980,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1015 540; -40 1015 540; 0 1015 540" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="400,100 450,120 430,180 380,160" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 415 140; 65 415 140; 0 415 140" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="750,650 800,670 780,730 730,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 765 690; -35 765 690; 0 765 690" dur="8.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="150,100 200,120 180,180 130,160" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 165 140; 45 165 140; 0 165 140" dur="6.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="900,400 950,420 930,480 880,460" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 915 440; -25 915 440; 0 915 440" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="300,600 350,620 330,680 280,660" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 315 640; 50 315 640; 0 315 640" dur="7.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1050,200 1100,220 1080,280 1030,260" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1065 240; -60 1065 240; 0 1065 240" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="500,350 550,370 530,430 480,410" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 515 390; 35 515 390; 0 515 390" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="50,150 100,170 80,230 30,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 65 190; -45 65 190; 0 65 190" dur="8.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="850,300 900,320 880,380 830,360" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 865 340; 55 865 340; 0 865 340" dur="3.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="350,500 400,520 380,580 330,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 365 540; -30 365 540; 0 365 540" dur="7.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="700,100 750,120 730,180 680,160" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 715 140; 40 715 140; 0 715 140" dur="5.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="100,350 150,370 130,430 80,410" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 115 390; -50 115 390; 0 115 390" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1100,650 1150,670 1130,730 1080,710" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1115 690; 25 1115 690; 0 1115 690" dur="4.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="600,550 650,570 630,630 580,610" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 615 590; -40 615 590; 0 615 590" dur="8.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="250,50 300,70 280,130 230,110" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 265 90; 70 265 90; 0 265 90" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="950,550 1000,570 980,630 930,610" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 965 590; -35 965 590; 0 965 590" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="450,250 500,270 480,330 430,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 465 290; 45 465 290; 0 465 290" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="800,450 850,470 830,530 780,510" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 815 490; -55 815 490; 0 815 490" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="150,400 200,420 180,480 130,460" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 165 440; 60 165 440; 0 165 440" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1050,100 1100,120 1080,180 1030,160" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1065 140; -25 1065 140; 0 1065 140" dur="8.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="550,200 600,220 580,280 530,260" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 565 240; 40 565 240; 0 565 240" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="300,350 350,370 330,430 280,410" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 315 390; -65 315 390; 0 315 390" dur="7.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="750,250 800,270 780,330 730,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 765 290; 30 765 290; 0 765 290" dur="5.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="50,600 100,620 80,680 30,660" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 65 640; -45 65 640; 0 65 640" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="900,150 950,170 930,230 880,210" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 915 190; 50 915 190; 0 915 190" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="400,600 450,620 430,680 380,660" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 415 640; -40 415 640; 0 415 640" dur="8.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="650,450 700,470 680,530 630,510" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 665 490; 35 665 490; 0 665 490" dur="6.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="200,150 250,170 230,230 180,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 215 190; -70 215 190; 0 215 190" dur="3.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1000,300 1050,320 1030,380 980,360" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1015 340; 25 1015 340; 0 1015 340" dur="7.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="500,650 550,670 530,730 480,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 515 690; -50 515 690; 0 515 690" dur="5.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="350,100 400,120 380,180 330,160" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 365 140; 55 365 140; 0 365 140" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="800,600 850,620 830,680 780,660" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 815 640; -30 815 640; 0 815 640" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="100,250 150,270 130,330 80,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 115 290; 65 115 290; 0 115 290" dur="8.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="950,450 1000,470 980,530 930,510" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 965 490; -20 965 490; 0 965 490" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="600,350 650,370 630,430 580,410" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 615 390; 40 615 390; 0 615 390" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="250,450 300,470 280,530 230,510" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 265 490; -60 265 490; 0 265 490" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1100,250 1150,270 1130,330 1080,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1115 290; 35 1115 290; 0 1115 290" dur="4.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="450,550 500,570 480,630 430,610" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 465 590; -45 465 590; 0 465 590" dur="8.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="700,400 750,420 730,480 680,460" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 715 440; 50 715 440; 0 715 440" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="150,550 200,570 180,630 130,610" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 165 590; -25 165 590; 0 165 590" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1050,550 1100,570 1080,630 1030,610" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1065 590; 60 1065 590; 0 1065 590" dur="7.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="550,100 600,120 580,180 530,160" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 565 140; -55 565 140; 0 565 140" dur="5.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="300,250 350,270 330,330 280,310" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 315 290; 30 315 290; 0 315 290" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="850,150 900,170 880,230 830,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 865 190; -40 865 190; 0 865 190" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="50,450 100,470 80,530 30,510" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 65 490; 45 65 490; 0 65 490" dur="8.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="750,550 800,570 780,630 730,610" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 765 590; -35 765 590; 0 765 590" dur="3.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="400,350 450,370 430,430 380,410" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 415 390; 70 415 390; 0 415 390" dur="7.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="950,100 1000,120 980,180 930,160" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 965 140; -20 965 140; 0 965 140" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="200,600 250,620 230,680 180,660" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 215 640; 25 215 640; 0 215 640" dur="6.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="650,250 700,270 680,330 630,310" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 665 290; -65 665 290; 0 665 290" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="100,100 150,120 130,180 80,160" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 115 140; 55 115 140; 0 115 140" dur="8.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1000,650 1050,670 1030,730 980,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1015 690; -30 1015 690; 0 1015 690" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="500,500 550,520 530,580 480,560" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 515 540; 40 515 540; 0 515 540" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="350,650 400,670 380,730 330,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 365 690; -50 365 690; 0 365 690" dur="5.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="800,200 850,220 830,280 780,260" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 815 240; 35 815 240; 0 815 240" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="150,300 200,320 180,380 130,360" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 165 340; -25 165 340; 0 165 340" dur="4.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1050,400 1100,420 1080,480 1030,460" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1065 440; 60 1065 440; 0 1065 440" dur="8.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="600,650 650,670 630,730 580,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 615 690; -40 615 690; 0 615 690" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="250,350 300,370 280,430 230,410" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 265 390; 45 265 390; 0 265 390" dur="7.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="900,250 950,270 930,330 880,310" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 915 290; -55 915 290; 0 915 290" dur="5.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="450,150 500,170 480,230 430,210" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 465 190; 30 465 190; 0 465 190" dur="6.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="750,500 800,520 780,580 730,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 765 540; -65 765 540; 0 765 540" dur="4.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="50,200 100,220 80,280 30,260" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 65 240; 70 65 240; 0 65 240" dur="8.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1100,500 1150,520 1130,580 1080,560" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 1115 540; -20 1115 540; 0 1115 540" dur="3.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="550,400 600,420 580,480 530,460" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 565 440; 25 565 440; 0 565 440" dur="7.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="300,150 350,170 330,230 280,210" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 315 190; -60 315 190; 0 315 190" dur="5.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="850,550 900,570 880,630 830,610" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 865 590; 35 865 590; 0 865 590" dur="6.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="100,650 150,670 130,730 80,710" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 115 690; -45 115 690; 0 115 690" dur="4.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="1000,150 1050,170 1030,230 980,210" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 1015 190; 50 1015 190; 0 1015 190" dur="8.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="650,600 700,620 680,680 630,660" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 665 640; -30 665 640; 0 665 640" dur="3.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="200,500 250,520 230,580 180,560" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 215 540; 40 215 540; 0 215 540" dur="7.2s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="950,350 1000,370 980,430 930,410" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 965 390; -75 965 390; 0 965 390" dur="5.5s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="400,500 450,520 430,580 380,560" fill="url(#grad2)">
            <animateTransform attributeName="transform" type="rotate" values="0 415 540; 55 415 540; 0 415 540" dur="6.8s" repeatCount="indefinite" />
          </polygon>
          
          <polygon points="800,350 850,370 830,430 780,410" fill="url(#grad1)">
            <animateTransform attributeName="transform" type="rotate" values="0 815 390; -25 815 390; 0 815 390" dur="4.5s" repeatCount="indefinite" />
          </polygon>
        </svg>
      </div>

      {/* NOUVEAU: Plus de particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/5 left-1/6 w-2 h-2 bg-gray-300 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0s',
        animationDuration: '3s'
      }} />
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '0.5s',
        animationDuration: '4s'
      }} />
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-gray-350 rounded-full animate-bounce opacity-35" style={{
        animationDelay: '1s',
        animationDuration: '2.5s'
      }} />
        <div className="absolute top-1/4 right-1/3 w-2.5 h-2.5 bg-gray-200 rounded-full animate-bounce opacity-40" style={{
        animationDelay: '1.5s',
        animationDuration: '3.5s'
      }} />
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '2s',
        animationDuration: '4s'
      }} />
        <div className="absolute top-3/4 right-1/6 w-1 h-1 bg-gray-250 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0.8s',
        animationDuration: '3.2s'
      }} />
        <div className="absolute top-1/2 left-1/8 w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-20" style={{
        animationDelay: '1.2s',
        animationDuration: '2.8s'
      }} />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce opacity-35" style={{
        animationDelay: '2.5s',
        animationDuration: '3.8s'
      }} />
        <div className="absolute top-1/6 left-3/4 w-1 h-1 bg-gray-200 rounded-full animate-bounce opacity-25" style={{
        animationDelay: '1.8s',
        animationDuration: '4.2s'
      }} />
        <div className="absolute bottom-1/5 left-1/3 w-2.5 h-2.5 bg-gray-350 rounded-full animate-bounce opacity-30" style={{
        animationDelay: '0.3s',
        animationDuration: '3.5s'
      }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Badge avec animation */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200/50 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-violet-600 animate-spin" style={{
            animationDuration: '3s'
          }} />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Automate your activity
            </span>
            <Crown className="h-5 w-5 text-blue-500 animate-bounce" />
          </div>

          {/* Titre principal avec logo animé centré */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">
              Boost and monetize
            </span>
            <span className="block mt-4">
              <span className={`inline-flex items-center justify-center gap-4 transition-all duration-700 transform ${activities[currentActivity].color}`}>
                <span className="relative flex items-center justify-center">
                  <span className="animate-bounce">
                    {activities[currentActivity].icon}
                  </span>
                  <div className="absolute inset-0 animate-ping opacity-30">
                    {activities[currentActivity].icon}
                  </div>
                </span>
                <span className="animate-pulse">
                  {activities[currentActivity].text}
                </span>
              </span>
            </span>
            <span className="block mt-4 text-gray-900">
              in just a few clicks.
            </span>
          </h1>

          {/* Texte sur deux lignes */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-600 leading-relaxed">
              Create your personalized AI bot that knows all your skills.
            </p>
            <p className="text-xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent font-semibold mt-2">
              A new way to work and sell your expertise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button size="lg" onClick={onAuthRedirect} className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-semibold group shadow-2xl hover:shadow-black/25 transition-all duration-300">
              <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Create my AI Space for free
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={onAuthRedirect} className="px-10 py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300">
              <Play className="h-6 w-6 mr-3" />
              Watch demo
            </Button>
          </div>

          {/* Stats avec animations avancées */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto my-0 py-[30px]">
            {[{
            value: animatedStats.bots,
            suffix: '+',
            label: 'Bots created',
            color: 'text-violet-600',
            icon: <Bot className="h-6 w-6" />
          }, {
            value: animatedStats.revenue,
            suffix: 'K+',
            label: 'Revenue generated',
            color: 'text-blue-600',
            icon: <DollarSign className="h-6 w-6" />
          }, {
            value: animatedStats.hours,
            suffix: 'h',
            label: 'Time saved',
            color: 'text-indigo-600',
            icon: <Clock className="h-6 w-6" />
          }, {
            value: animatedStats.experts,
            suffix: '+',
            label: 'Active experts',
            color: 'text-violet-500',
            icon: <Users className="h-6 w-6" />
          }].map((stat, index) => <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 group cursor-pointer">
              <div className="relative p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl">
                <div className={`${stat.color} mb-2 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity my-0" />
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;