
import { useState, useEffect } from 'react';
import { AnimatedStats } from '../types';

const targetStats = {
  bots: 1847,
  revenue: 127000,
  hours: 15600,
  experts: 892
};

export const useAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState<AnimatedStats>({
    bots: 0,
    revenue: 0,
    hours: 0,
    experts: 0
  });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  };

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const animateStats = () => {
          Object.keys(targetStats).forEach((key) => {
            const target = targetStats[key as keyof typeof targetStats];
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const statTimer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(statTimer);
              }
              setAnimatedStats(prev => ({
                ...prev,
                [key]: Math.floor(current)
              }));
            }, duration / steps);
          });
        };
        animateStats();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return {
    isVisible,
    mousePosition,
    animatedStats
  };
};
