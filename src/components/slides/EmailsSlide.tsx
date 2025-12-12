// EmailsSlide component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import type { EmailStats } from '@/types';

interface EmailsSlideProps {
  emailStats: EmailStats;
}

/**
 * Slide 3: Email statistics - The Inbox Apocalypse
 */
export const EmailsSlide: React.FC<EmailsSlideProps> = ({ emailStats }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-8">
        <div className="bg-slate-700/50 p-3 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm border border-slate-600">
          <div className="text-3xl sm:text-5xl font-black text-blue-400 mb-1 sm:mb-2">
            {emailStats.sent.toLocaleString()}
          </div>
          <div className="text-sm sm:text-lg text-slate-300">Emails Sent</div>
          <div className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
            That&apos;s {Math.floor(emailStats.sent / 365)} per day
          </div>
        </div>
        <div className="bg-slate-700/50 p-3 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm border border-slate-600">
          <div className="text-3xl sm:text-5xl font-black text-purple-400 mb-1 sm:mb-2">
            {emailStats.received.toLocaleString()}
          </div>
          <div className="text-sm sm:text-lg text-slate-300">Emails Received</div>
          <div className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">
            That&apos;s {Math.floor(emailStats.received / 365)} per day
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 p-4 sm:p-8 rounded-xl border border-red-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl sm:text-6xl font-black text-red-400 mb-1 sm:mb-2">
              {emailStats.unread.toLocaleString()}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-200">Unread Emails</div>
            <div className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
              Avg response: <span className="text-white font-semibold">{emailStats.avgResponseTime}</span>
            </div>
          </div>
          <div className="text-4xl sm:text-7xl">📧</div>
        </div>
      </div>

      <p className="text-center text-slate-400 mt-4 sm:mt-6 italic text-sm sm:text-base">
        &quot;Inbox Zero&quot; is just a myth, like work-life balance
      </p>
    </div>
  );
};
