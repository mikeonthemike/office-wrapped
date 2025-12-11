// Types for Office Wrapped stats
// v1.0.0

export interface MeetingStats {
  count: number;
  hours: number;
  days: number;
  percentageCameraOff: number;
  talkedOnMute: number;
  failedToShare: number;
}

export interface NotificationStats {
  total: number;
  responseRate: number;
  latestPing: string;
}

export interface BuzzwordItem {
  word: string;
  size: string;
  weight: string;
}

export interface EmailStats {
  sent: number;
  received: number;
  unread: number;
  avgResponseTime: string;
}

export interface ProductivityStats {
  peakHour: string;
  slumpHour: string;
  coffeeBreaks: number;
  actualWorkPercentage: number;
}

export interface StatusStats {
  awayTime: number;
  busyTime: number;
  availableTime: number;
  longestAway: string;
}

export interface SlideInfo {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}
