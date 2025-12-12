// NotificationsSlide component for Office Wrapped
// v1.1.0 - Use randomized latestPingDay

import React from 'react';
import type { NotificationStats } from '@/types';

interface NotificationsSlideProps {
  notificationStats: NotificationStats;
}

/**
 * Slide 2: Notification statistics - After-Hours Journey
 */
export const NotificationsSlide: React.FC<NotificationsSlideProps> = ({ notificationStats }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="bg-slate-700/50 p-4 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-slate-600 w-full sm:max-w-md">
          <div className="text-4xl sm:text-7xl font-black text-white mb-2 sm:mb-3">
            {notificationStats.total.toLocaleString()}
          </div>
          <div className="text-lg sm:text-2xl font-bold text-slate-300 leading-tight">
            Notifications received after 6 PM or on weekends
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 sm:gap-3">
          <div className="bg-red-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg animate-bounce font-bold">
            URGENT!
          </div>
          <div className="bg-orange-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg font-bold">
            ASAP
          </div>
          <div className="bg-yellow-500 text-slate-900 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg font-bold">
            FYI
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-4 sm:p-6 rounded-xl border border-red-500/30 backdrop-blur-sm mt-4 sm:mt-0">
        <p className="text-lg sm:text-2xl text-center font-bold mb-1 sm:mb-2">
          You responded to{' '}
          <span className="text-red-400 text-2xl sm:text-4xl">{notificationStats.responseRate}%</span>{' '}
          within 5 minutes
        </p>
        <p className="text-sm sm:text-lg text-slate-400 text-center">
          Latest panic reply:{' '}
          <span className="text-white font-semibold">{notificationStats.latestPing}</span>{' '}
          on {notificationStats.latestPingDay}
        </p>
      </div>
    </div>
  );
};
