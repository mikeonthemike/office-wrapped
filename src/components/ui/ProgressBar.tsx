// ProgressBar component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';

interface ProgressBarProps {
  totalSlides: number;
  activeSlide: number;
}

/**
 * Progress bar showing current slide position
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ totalSlides, activeSlide }) => {
  return (
    <div className="h-1.5 sm:h-2 bg-slate-800 flex">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <div
          key={idx}
          className={`h-full flex-1 transition-all duration-300 ${
            idx === activeSlide
              ? 'bg-gradient-to-r from-blue-500 to-purple-600'
              : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};
