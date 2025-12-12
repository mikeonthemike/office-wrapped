// SlideNavigation component for Office Wrapped
// v1.0.1 - Reduced top margin for more slide space

import React from 'react';

interface SlideNavigationProps {
  totalSlides: number;
  activeSlide: number;
  isDownloading: boolean;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
}

/**
 * Navigation controls with prev/next buttons and dot indicators
 */
export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  totalSlides,
  activeSlide,
  isDownloading,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
}) => {
  return (
    <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-4 items-center flex-wrap justify-center">
      <button
        onClick={onPrevSlide}
        disabled={activeSlide === 0 || isDownloading}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onGoToSlide(idx)}
            disabled={isDownloading}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              idx === activeSlide
                ? 'bg-blue-500 scale-125'
                : 'bg-slate-600 hover:bg-slate-500'
            } disabled:cursor-not-allowed`}
          />
        ))}
      </div>

      <button
        onClick={onNextSlide}
        disabled={activeSlide === totalSlides - 1 || isDownloading}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Next</span> →
      </button>
    </div>
  );
};
