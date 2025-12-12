// SlideCard component for Office Wrapped
// v1.0.2 - Further reduced header and content padding for better stats visibility

import React, { forwardRef, ReactNode } from 'react';
import type { SlideInfo } from '@/types';
import { ProgressBar } from './ProgressBar';

interface SlideCardProps {
  slide: SlideInfo;
  activeSlide: number;
  totalSlides: number;
  isTransitioning: boolean;
  children: ReactNode;
}

/**
 * Main card container with header, content area, and progress bar
 */
export const SlideCard = forwardRef<HTMLDivElement, SlideCardProps>(
  ({ slide, activeSlide, totalSlides, isTransitioning, children }, ref) => {
    const SlideIcon = slide.icon;

    return (
      <div
        ref={ref}
        className="relative w-full max-w-4xl aspect-[3/4] sm:aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border-2 border-slate-700"
      >
        {/* Card header - compact padding for more content space */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-widest text-[10px] sm:text-xs font-semibold opacity-90">
              Year in Review
            </div>
            <h2 className="text-lg sm:text-3xl font-black truncate">{slide.title}</h2>
          </div>
          <div className="h-8 w-8 sm:h-12 sm:w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0 ml-2">
            <SlideIcon size={16} className="sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Slide content - compact padding for better stats visibility */}
        <div
          className={`flex-1 p-3 sm:p-6 bg-gradient-to-b from-slate-800 to-slate-900 relative transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {children}
        </div>

        {/* Progress bar */}
        <ProgressBar totalSlides={totalSlides} activeSlide={activeSlide} />
      </div>
    );
  }
);

SlideCard.displayName = 'SlideCard';
