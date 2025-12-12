// useOfficeWrappedData - Data management hook for Office Wrapped
// v1.2.0 - Added topBuzzword, latestPingDay, statusExcuses, expanded buzzword pool

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
  getRandomItems,
  getRandomItem,
} from '@/lib/utils';

// Expanded buzzword pool - randomly select 8 from this pool
const BUZZWORD_POOL: string[] = [
  'Circle back',
  'Synergy',
  'Bandwidth',
  'Touch base',
  'Offline',
  'Deep dive',
  'Ping me',
  'Low-hanging fruit',
  'Move the needle',
  'Action items',
  'EOD',
  'Loop in',
  'Pivot',
  'Value add',
  'Take this offline',
  'Double-click on that',
  'Paradigm shift',
  'Best practices',
  'Leverage',
  'Streamline',
];

// Status excuse pool - randomly select 3 from this pool
const STATUS_EXCUSES_POOL: string[] = [
  '📱 "Totally not on my phone"',
  '☕ "In a meeting" (making coffee)',
  '🤫 "Do not disturb" (avoiding work)',
  '🏃 "Stepping away briefly" (gone for 2 hours)',
  '💻 "Deep focus time" (online shopping)',
  '🎧 "Heads down" (listening to podcasts)',
  '🍕 "Quick lunch" (2-hour food coma)',
  '🚶 "Walking meeting" (solo walk)',
  '🔧 "Technical difficulties" (Netflix buffering)',
  '📞 "On a call" (talking to mom)',
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

// Helper to create styled buzzwords from word list
const createStyledBuzzwords = (words: string[]): BuzzwordItem[] => {
  return words.map((word) => ({
    word,
    size: BUZZWORD_SIZES[Math.floor(Math.random() * BUZZWORD_SIZES.length)],
    weight: BUZZWORD_WEIGHTS[Math.floor(Math.random() * BUZZWORD_WEIGHTS.length)],
  }));
};

// Default buzzwords (first 8 from pool with default styling)
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

// Default status excuses
const DEFAULT_STATUS_EXCUSES: string[] = [
  '📱 "Totally not on my phone"',
  '☕ "In a meeting" (making coffee)',
  '🤫 "Do not disturb" (avoiding work)',
];

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
  latestPingDay: 'Sunday',
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
  coffeesConsumed: 782,
  actualWorkPercentage: 23,
};

const DEFAULT_STATUS_STATS: StatusStats = {
  awayTime: 847,
  busyTime: 1234,
  availableTime: 456,
  longestAway: '4h 23m',
  excuses: DEFAULT_STATUS_EXCUSES,
};

const DEFAULT_TOP_BUZZWORD = 'Circle back';
const DEFAULT_BUZZWORD_COUNT = 412;

/**
 * All stats data combined for easy passing to components
 */
export interface OfficeWrappedData {
  meetingStats: MeetingStats;
  notificationStats: NotificationStats;
  buzzwords: BuzzwordItem[];
  topBuzzword: string;
  topBuzzwordCount: number;
  emailStats: EmailStats;
  productivityStats: ProductivityStats;
  statusStats: StatusStats;
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
  const [topBuzzword, setTopBuzzword] = useState<string>(DEFAULT_TOP_BUZZWORD);
  const [topBuzzwordCount, setTopBuzzwordCount] = useState(DEFAULT_BUZZWORD_COUNT);
  const [emailStats, setEmailStats] = useState<EmailStats>(DEFAULT_EMAIL_STATS);
  const [productivityStats, setProductivityStats] = useState<ProductivityStats>(DEFAULT_PRODUCTIVITY_STATS);
  const [statusStats, setStatusStats] = useState<StatusStats>(DEFAULT_STATUS_STATS);

  /**
   * Randomizes all statistics data
   */
  const randomizeData = useCallback(() => {
    // Randomize core stats
    setMeetingStats(randomizeMeetingStats());
    setNotificationStats(randomizeNotificationStats());
    setEmailStats(randomizeEmailStats());
    setProductivityStats(randomizeProductivityStats());
    
    // Randomize status stats with random excuses
    const randomExcuses = getRandomItems(STATUS_EXCUSES_POOL, 3);
    setStatusStats({
      ...randomizeStatusStats(),
      excuses: randomExcuses,
    });

    // Select 8 random buzzwords from pool and style them
    const selectedWords = getRandomItems(BUZZWORD_POOL, 8);
    const styledBuzzwords = createStyledBuzzwords(selectedWords);
    setBuzzwords(styledBuzzwords);

    // Pick one of the selected buzzwords as the "top" one
    const randomTopBuzzword = getRandomItem(selectedWords);
    setTopBuzzword(randomTopBuzzword);
    setTopBuzzwordCount(randomizeBuzzwordCount());
  }, []);

  return {
    data: {
      meetingStats,
      notificationStats,
      buzzwords,
      topBuzzword,
      topBuzzwordCount,
      emailStats,
      productivityStats,
      statusStats,
    },
    randomizeData,
  };
}
