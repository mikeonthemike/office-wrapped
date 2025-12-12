// useSlideNavigation - Navigation hook for Office Wrapped slides
// v1.0.0 - Extracted from main component

import { useState, useCallback, useEffect } from 'react';
import {
  Calendar,
  Bell,
  MessageSquare,
  Mail,
  Clock,
  Coffee,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { SlideInfo } from '@/types';

// Slide configuration - defines all available slides
const SLIDES: SlideInfo[] = [
  { id: 'intro', title: 'Your Year in Corporate Survival', icon: TrendingUp },
  { id: 'meetings', title: "The 'Could Have Been an Email' Edition", icon: Calendar },
  { id: 'notifications', title: 'Your After-Hours Notification Journey', icon: Bell },
  { id: 'emails', title: 'The Inbox Apocalypse', icon: Mail },
  { id: 'productivity', title: "Your 'Productive' Hours", icon: Zap },
  { id: 'status', title: "The Art of Being 'Away'", icon: Clock },
  { id: 'buzzwords', title: 'Your Top Corporate Buzzwords', icon: MessageSquare },
  { id: 'summary', title: 'Congratulations, You Survived!', icon: Coffee },
];

/**
 * Return type for the useSlideNavigation hook
 */
export interface UseSlideNavigationReturn {
  activeSlide: number;
  isTransitioning: boolean;
  slides: SlideInfo[];
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  setActiveSlide: (index: number) => void;
}

/**
 * Custom hook for managing slide navigation
 * Handles slide state, transitions, and keyboard navigation
 * 
 * @param isDownloading - Whether a download is in progress (disables navigation)
 */
export function useSlideNavigation(isDownloading: boolean = false): UseSlideNavigationReturn {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Navigate to the next slide with transition animation
   */
  const nextSlide = useCallback(() => {
    if (activeSlide < SLIDES.length - 1 && !isDownloading) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide(activeSlide + 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeSlide, isDownloading]);

  /**
   * Navigate to the previous slide with transition animation
   */
  const prevSlide = useCallback(() => {
    if (activeSlide > 0 && !isDownloading) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide(activeSlide - 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeSlide, isDownloading]);

  /**
   * Navigate to a specific slide by index with transition animation
   */
  const goToSlide = useCallback((index: number) => {
    if (isDownloading) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [isDownloading]);

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return {
    activeSlide,
    isTransitioning,
    slides: SLIDES,
    nextSlide,
    prevSlide,
    goToSlide,
    setActiveSlide,
  };
}
