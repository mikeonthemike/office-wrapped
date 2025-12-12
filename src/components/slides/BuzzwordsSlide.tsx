// BuzzwordsSlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import type { BuzzwordItem } from '@/types';

interface BuzzwordsSlideProps {
  buzzwords: BuzzwordItem[];
  topBuzzwordCount: number;
}

/**
 * Slide 6: Corporate buzzwords cloud
 */
export const BuzzwordsSlide: React.FC<BuzzwordsSlideProps> = ({ buzzwords, topBuzzwordCount }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-wrap content-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 px-2 sm:px-8">
        {buzzwords.map((item, index) => (
          <span
            key={index}
            className={`${item.size} ${item.weight} text-white leading-none text-center transform hover:scale-110 transition-transform cursor-default select-none hover:text-blue-400`}
          >
            {item.word}
          </span>
        ))}
      </div>
      <div className="mt-4 sm:mt-8 text-center border-t border-slate-700 pt-4 sm:pt-6">
        <p className="text-lg sm:text-2xl text-slate-300 mb-1 sm:mb-2">
          You said{' '}
          <span className="font-black text-blue-400 text-2xl sm:text-4xl">&quot;circle back&quot;</span>{' '}
          <span className="font-black text-2xl sm:text-4xl text-purple-400">{topBuzzwordCount}</span>{' '}
          times
        </p>
        <p className="text-sm sm:text-lg text-slate-500 italic">
          That&apos;s more than once per working day
        </p>
      </div>
    </div>
  );
};
