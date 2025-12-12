// SlideContent - Slide router component for Office Wrapped
// v1.1.0 - Pass topBuzzword to BuzzwordsSlide

import React from 'react';
import type { OfficeWrappedData } from '@/hooks';
import {
  IntroSlide,
  MeetingsSlide,
  NotificationsSlide,
  EmailsSlide,
  ProductivitySlide,
  StatusSlide,
  BuzzwordsSlide,
  SummarySlide,
} from './slides';

interface SlideContentProps {
  activeSlide: number;
  year: number;
  data: OfficeWrappedData;
}

/**
 * Routes to the correct slide component based on activeSlide index
 */
export const SlideContent: React.FC<SlideContentProps> = ({ activeSlide, year, data }) => {
  switch (activeSlide) {
    case 0:
      return (
        <IntroSlide
          year={year}
          meetingStats={data.meetingStats}
          emailStats={data.emailStats}
          productivityStats={data.productivityStats}
        />
      );
    case 1:
      return <MeetingsSlide meetingStats={data.meetingStats} />;
    case 2:
      return <NotificationsSlide notificationStats={data.notificationStats} />;
    case 3:
      return <EmailsSlide emailStats={data.emailStats} />;
    case 4:
      return <ProductivitySlide productivityStats={data.productivityStats} />;
    case 5:
      return <StatusSlide statusStats={data.statusStats} />;
    case 6:
      return (
        <BuzzwordsSlide
          buzzwords={data.buzzwords}
          topBuzzword={data.topBuzzword}
          topBuzzwordCount={data.topBuzzwordCount}
        />
      );
    case 7:
      return (
        <SummarySlide
          year={year}
          meetingStats={data.meetingStats}
          emailStats={data.emailStats}
          productivityStats={data.productivityStats}
          topBuzzwordCount={data.topBuzzwordCount}
        />
      );
    default:
      return null;
  }
};
