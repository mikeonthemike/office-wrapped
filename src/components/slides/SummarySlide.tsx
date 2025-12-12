// SummarySlide component for Office Wrapped
// v1.1.0 - Use coffeesConsumed instead of coffeeBreaks

import React from 'react';
import type { MeetingStats, EmailStats, ProductivityStats } from '@/types';

interface SummarySlideProps {
  year: number;
  meetingStats: MeetingStats;
  emailStats: EmailStats;
  productivityStats: ProductivityStats;
  topBuzzwordCount: number;
}

/**
 * Slide 7: Final summary - Congratulations, You Survived!
 */
export const SummarySlide: React.FC<SummarySlideProps> = ({
  year,
  meetingStats,
  emailStats,
  productivityStats,
  topBuzzwordCount,
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <div className="text-5xl sm:text-8xl mb-4 sm:mb-6">🏆</div>
      <h3 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        Congratulations!
      </h3>
      <p className="text-lg sm:text-2xl text-slate-300 mb-4 sm:mb-8 max-w-2xl px-2">
        You survived another year of corporate life. Your reward? The same thing next year.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-xl px-2">
        <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xl sm:text-3xl font-bold text-blue-400">{meetingStats.count}</div>
          <div className="text-xs sm:text-sm text-slate-400">Meetings survived</div>
        </div>
        <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xl sm:text-3xl font-bold text-purple-400">
            {emailStats.unread.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm text-slate-400">Emails ignored</div>
        </div>
        <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xl sm:text-3xl font-bold text-green-400">
            {productivityStats.coffeesConsumed}
          </div>
          <div className="text-xs sm:text-sm text-slate-400">Coffees consumed</div>
        </div>
        <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
          <div className="text-xl sm:text-3xl font-bold text-yellow-400">{topBuzzwordCount}</div>
          <div className="text-xs sm:text-sm text-slate-400">Buzzwords deployed</div>
        </div>
      </div>

      <p className="text-slate-500 mt-4 sm:mt-8 italic text-sm sm:text-base">
        See you next year for Office Wrapped {year + 1}
      </p>
    </div>
  );
};
