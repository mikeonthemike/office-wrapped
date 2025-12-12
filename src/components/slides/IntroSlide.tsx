// IntroSlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import { Calendar, Mail, Coffee } from 'lucide-react';
import type { MeetingStats, EmailStats, ProductivityStats } from '@/types';

interface IntroSlideProps {
  year: number;
  meetingStats: MeetingStats;
  emailStats: EmailStats;
  productivityStats: ProductivityStats;
}

/**
 * Slide 0: Introduction/Welcome slide
 */
export const IntroSlide: React.FC<IntroSlideProps> = ({
  year,
  meetingStats,
  emailStats,
  productivityStats,
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <div className="mb-4 sm:mb-8">
        <div className="text-4xl sm:text-7xl mb-2 sm:mb-4">🎉</div>
        <h3 className="text-2xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to Your {year} Wrapped
        </h3>
        <p className="text-base sm:text-2xl text-slate-300">
          A year of meetings, emails, and existential dread
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 sm:mt-8 w-full max-w-lg">
        <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
          <Calendar className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
          <div className="text-lg sm:text-3xl font-bold">{meetingStats.count}</div>
          <div className="text-[10px] sm:text-sm text-slate-400">Meetings</div>
        </div>
        <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
          <Mail className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
          <div className="text-lg sm:text-3xl font-bold">{emailStats.received.toLocaleString()}</div>
          <div className="text-[10px] sm:text-sm text-slate-400">Emails</div>
        </div>
        <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
          <Coffee className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
          <div className="text-lg sm:text-3xl font-bold">{productivityStats.coffeeBreaks}</div>
          <div className="text-[10px] sm:text-sm text-slate-400">Coffee Breaks</div>
        </div>
      </div>
    </div>
  );
};
