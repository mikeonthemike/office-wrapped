// StatusSlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import type { StatusStats } from '@/types';

interface StatusSlideProps {
  statusStats: StatusStats;
}

/**
 * Slide 5: Status message statistics - The Art of Being "Away"
 */
export const StatusSlide: React.FC<StatusSlideProps> = ({ statusStats }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Your Status Message Journey</h3>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
        <div className="bg-yellow-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-yellow-500/30 text-center">
          <div className="text-2xl sm:text-4xl font-black text-yellow-400 mb-1 sm:mb-2">
            {statusStats.awayTime}h
          </div>
          <div className="text-sm sm:text-lg text-slate-300">🌙 Away</div>
        </div>
        <div className="bg-red-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-red-500/30 text-center">
          <div className="text-2xl sm:text-4xl font-black text-red-400 mb-1 sm:mb-2">
            {statusStats.busyTime}h
          </div>
          <div className="text-sm sm:text-lg text-slate-300">🔴 Busy</div>
        </div>
        <div className="bg-green-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-green-500/30 text-center">
          <div className="text-2xl sm:text-4xl font-black text-green-400 mb-1 sm:mb-2">
            {statusStats.availableTime}h
          </div>
          <div className="text-sm sm:text-lg text-slate-300">✅ Available</div>
        </div>
      </div>

      <div className="bg-slate-700/50 p-4 sm:p-8 rounded-xl backdrop-blur-sm">
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-sm sm:text-lg text-slate-400 mb-1 sm:mb-2">
            Longest consecutive &quot;Away&quot; status
          </div>
          <div className="text-4xl sm:text-6xl font-black text-purple-400">
            {statusStats.longestAway}
          </div>
        </div>
        <div className="space-y-1 sm:space-y-2 text-slate-300 text-sm sm:text-base hidden sm:block">
          <p className="text-center">📱 &quot;Totally not on my phone&quot;</p>
          <p className="text-center">☕ &quot;In a meeting&quot; (making coffee)</p>
          <p className="text-center">🤫 &quot;Do not disturb&quot; (avoiding work)</p>
        </div>
      </div>
    </div>
  );
};
