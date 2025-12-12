// MeetingsSlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import type { MeetingStats } from '@/types';

interface MeetingsSlideProps {
  meetingStats: MeetingStats;
}

/**
 * Slide 1: Meeting statistics - "Could Have Been an Email"
 */
export const MeetingsSlide: React.FC<MeetingsSlideProps> = ({ meetingStats }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
        <span className="text-5xl sm:text-9xl font-black text-white tracking-tighter">
          {meetingStats.count.toLocaleString()}
        </span>
        <span className="text-xl sm:text-3xl font-bold text-slate-300 leading-tight">
          Meetings That Could Have Been Emails
        </span>
      </div>

      <p className="text-base sm:text-2xl text-slate-300 mb-4 sm:mb-6">
        You spent{' '}
        <span className="font-bold text-red-400">{meetingStats.hours} hours</span> staring
        at a webcam. That&apos;s{' '}
        <span className="font-bold text-yellow-400">{meetingStats.days} full days</span> of
        nodding silently.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-purple-500/20 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-purple-500/30">
          <div className="text-2xl sm:text-4xl font-black text-purple-400 mb-1">
            {meetingStats.percentageCameraOff}%
          </div>
          <div className="text-xs sm:text-sm text-slate-300">Camera Off</div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-1 hidden sm:block">📷 &quot;Technical issues&quot;</div>
        </div>
        <div className="bg-red-500/20 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-red-500/30">
          <div className="text-2xl sm:text-4xl font-black text-red-400 mb-1">
            {meetingStats.talkedOnMute}
          </div>
          <div className="text-xs sm:text-sm text-slate-300">On Mute</div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-1 hidden sm:block">🔇 &quot;Can you hear me?&quot;</div>
        </div>
        <div className="bg-orange-500/20 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-orange-500/30">
          <div className="text-2xl sm:text-4xl font-black text-orange-400 mb-1">
            {meetingStats.failedToShare}
          </div>
          <div className="text-xs sm:text-sm text-slate-300">Share Fails</div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-1 hidden sm:block">🖥️ &quot;Can you see it?&quot;</div>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 hidden sm:block">
        <div className="flex items-center gap-4">
          <span className="w-28 sm:w-40 text-right font-semibold text-slate-400 text-sm sm:text-base">Actual Work</span>
          <div className="h-6 sm:h-8 w-16 sm:w-20 bg-slate-600 rounded-r-lg"></div>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-28 sm:w-40 text-right font-semibold text-slate-400 text-sm sm:text-base">
            &quot;Syncing Up&quot;
          </span>
          <div className="h-6 sm:h-8 flex-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-lg"></div>
        </div>
      </div>
    </div>
  );
};
