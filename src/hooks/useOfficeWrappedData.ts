// useOfficeWrappedData - Data management hook for Office Wrapped
// v1.0.0 - Extracted from main component

import { useState, useCallback } from 'react';
import type {
  MeetingStats,
  NotificationStats,
  BuzzwordItem,
  EmailStats,
  ProductivityStats,
  StatusStats,
} from '@/types';
import {
  randomizeMeetingStats,
  randomizeNotificationStats,
  randomizeEmailStats,
  randomizeProductivityStats,
  randomizeStatusStats,
  randomizeBuzzwordCount,
} from '@/lib/utils';

// Default buzzwords configuration
const DEFAULT_BUZZWORDS: BuzzwordItem[] = [
  { word: 'Circle back', size: 'text-3xl md:text-5xl', weight: 'font-black' },
  { word: 'Synergy', size: 'text-2xl md:text-4xl', weight: 'font-bold' },
  { word: 'Bandwidth', size: 'text-xl md:text-3xl', weight: 'font-semibold' },
  { word: 'Touch base', size: 'text-4xl md:text-6xl', weight: 'font-black' },
  { word: 'Offline', size: 'text-xl md:text-3xl', weight: 'font-bold' },
  { word: 'Deep dive', size: 'text-2xl md:text-4xl', weight: 'font-bold' },
  { word: 'Ping me', size: 'text-lg md:text-2xl', weight: 'font-normal' },
  { word: 'Low-hanging fruit', size: 'text-xl md:text-3xl', weight: 'font-semibold' },
];

// Styling options for buzzword randomization
const BUZZWORD_SIZES = [
  'text-xl md:text-3xl',
  'text-2xl md:text-4xl',
  'text-3xl md:text-5xl',
  'text-4xl md:text-6xl',
  'text-lg md:text-2xl',
];

const BUZZWORD_WEIGHTS = ['font-normal', 'font-semibold', 'font-bold', 'font-black'];

// Default initial values
const DEFAULT_MEETING_STATS: MeetingStats = {
  count: 1452,
  hours: 320,
  days: 13.3,
  percentageCameraOff: 88,
  talkedOnMute: 67,
  failedToShare: 43,
};

const DEFAULT_NOTIFICATION_STATS: NotificationStats = {
  total: 2103,
  responseRate: 85,
  latestPing: '11:42 PM',
};

const DEFAULT_EMAIL_STATS: EmailStats = {
  sent: 8234,
  received: 12456,
  unread: 2847,
  avgResponseTime: '3.2 hours',
};

const DEFAULT_PRODUCTIVITY_STATS: ProductivityStats = {
  peakHour: '10 AM',
  slumpHour: '2 PM',
  coffeeBreaks: 412,
  actualWorkPercentage: 23,
};

const DEFAULT_STATUS_STATS: StatusStats = {
  awayTime: 847,
  busyTime: 1234,
  availableTime: 456,
  longestAway: '4h 23m',
};

const DEFAULT_BUZZWORD_COUNT = 412;

/**
 * All stats data combined for easy passing to components
 */
export interface OfficeWrappedData {
  meetingStats: MeetingStats;
  notificationStats: NotificationStats;
  buzzwords: BuzzwordItem[];
  emailStats: EmailStats;
  productivityStats: ProductivityStats;
  statusStats: StatusStats;
  topBuzzwordCount: number;
}

/**
 * Return type for the useOfficeWrappedData hook
 */
export interface UseOfficeWrappedDataReturn {
  data: OfficeWrappedData;
  randomizeData: () => void;
}

/**
 * Custom hook for managing Office Wrapped statistics data
 * Handles all stats state and randomization logic
 */
export function useOfficeWrappedData(): UseOfficeWrappedDataReturn {
  const [meetingStats, setMeetingStats] = useState<MeetingStats>(DEFAULT_MEETING_STATS);
  const [notificationStats, setNotificationStats] = useState<NotificationStats>(DEFAULT_NOTIFICATION_STATS);
  const [buzzwords, setBuzzwords] = useState<BuzzwordItem[]>(DEFAULT_BUZZWORDS);
  const [emailStats, setEmailStats] = useState<EmailStats>(DEFAULT_EMAIL_STATS);
  const [productivityStats, setProductivityStats] = useState<ProductivityStats>(DEFAULT_PRODUCTIVITY_STATS);
  const [statusStats, setStatusStats] = useState<StatusStats>(DEFAULT_STATUS_STATS);
  const [topBuzzwordCount, setTopBuzzwordCount] = useState(DEFAULT_BUZZWORD_COUNT);

  /**
   * Randomizes all statistics data
   */
  const randomizeData = useCallback(() => {
    setMeetingStats(randomizeMeetingStats());
    setNotificationStats(randomizeNotificationStats());
    setEmailStats(randomizeEmailStats());
    setProductivityStats(randomizeProductivityStats());
    setStatusStats(randomizeStatusStats());
    setTopBuzzwordCount(randomizeBuzzwordCount());

    // Shuffle buzzwords and randomize their styling
    const shuffled = [...buzzwords]
      .sort(() => 0.5 - Math.random())
      .map((b) => ({
        ...b,
        size: BUZZWORD_SIZES[Math.floor(Math.random() * BUZZWORD_SIZES.length)],
        weight: BUZZWORD_WEIGHTS[Math.floor(Math.random() * BUZZWORD_WEIGHTS.length)],
      }));
    setBuzzwords(shuffled);
  }, [buzzwords]);

  return {
    data: {
      meetingStats,
      notificationStats,
      buzzwords,
      emailStats,
      productivityStats,
      statusStats,
      topBuzzwordCount,
    },
    randomizeData,
  };
}
