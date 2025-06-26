
export const scrollAnimationStyles = `
  @keyframes scroll-right {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  
  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  .animate-scroll-right {
    animation: scroll-right 30s linear infinite;
  }
  
  .animate-scroll-left {
    animation: scroll-left 25s linear infinite;
  }
  
  .animate-scroll-right-slow {
    animation: scroll-right 35s linear infinite;
  }
`;

// Injection des styles dans le document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = scrollAnimationStyles;
  document.head.appendChild(styleSheet);
}
