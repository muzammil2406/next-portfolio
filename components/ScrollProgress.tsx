'use client';

import { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScroll = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (currentScroll / totalScroll) * 100;

      setScrollProgress(scrollPercentage);
      setIsVisible(currentScroll > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-3 bg-gray-200 dark:bg-gray-700 shadow-md">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll Percentage */}
      <div
        className={`fixed right-8 top-8 z-50 bg-black/80 dark:bg-white/20 backdrop-blur-md text-white rounded-full p-3 shadow-lg flex items-center justify-center 
        transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-sm font-medium">{scrollProgress.toFixed(0)}%</span>
      </div>

      {/* Scroll To Top Button */}
      <div className="fixed right-8 bottom-8 z-40 flex flex-col gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 
          duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default ScrollProgress;
