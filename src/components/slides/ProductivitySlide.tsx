// ProductivitySlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import { Clock, Coffee } from 'lucide-react';
import type { ProductivityStats } from '@/types';

interface ProductivitySlideProps {
  productivityStats: ProductivityStats;
}

/**
 * Slide 4: Productivity statistics - "Productive" Hours
 */
export const ProductivitySlide: React.FC<ProductivitySlideProps> = ({ productivityStats }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-4 sm:mb-8">
        <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Your Daily Productivity Pattern
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="bg-green-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-green-500/30">
            <Clock className="mb-2 sm:mb-3 w-6 h-6 sm:w-8 sm:h-8" />
            <div className="text-2xl sm:text-4xl font-black text-green-400 mb-1 sm:mb-2">
              {productivityStats.peakHour}
            </div>
            <div className="text-sm sm:text-lg text-slate-300">Peak Hour</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 hidden sm:block">Before meetings started</div>
          </div>
          <div className="bg-red-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-red-500/30">
            <Clock className="mb-2 sm:mb-3 w-6 h-6 sm:w-8 sm:h-8" />
            <div className="text-2xl sm:text-4xl font-black text-red-400 mb-1 sm:mb-2">
              {productivityStats.slumpHour}
            </div>
            <div className="text-sm sm:text-lg text-slate-300">Slump Hour</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 hidden sm:block">Post-lunch coma zone</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/50 p-4 sm:p-8 rounded-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div>
            <div className="text-xs sm:text-sm text-slate-400 mb-1">Actual Productive Work</div>
            <div className="text-3xl sm:text-5xl font-black text-yellow-400">
              {productivityStats.actualWorkPercentage}%
            </div>
          </div>
          <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600" />
        </div>
        <div className="text-slate-300 text-sm sm:text-lg">
          Coffee breaks: <span className="font-bold text-white">{productivityStats.coffeeBreaks}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3 italic hidden sm:block">
          The rest was &quot;collaboration&quot; and &quot;strategic thinking&quot;
        </p>
      </div>
    </div>
  );
};
