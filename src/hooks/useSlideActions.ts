// useSlideActions - Download and share actions hook for Office Wrapped
// v1.0.0 - Extracted from main component

import { useState, useEffect, useCallback, RefObject } from 'react';
import type { SlideInfo } from '@/types';
import type { OfficeWrappedData } from './useOfficeWrappedData';
import {
  downloadSlideAsImage,
  captureSlideAsBlob,
  downloadAllSlidesAsZip,
  shareToTwitter,
  shareToLinkedIn,
} from '@/lib/utils';

/**
 * Download progress state
 */
export interface DownloadProgress {
  current: number;
  total: number;
}

/**
 * Return type for the useSlideActions hook
 */
export interface UseSlideActionsReturn {
  isDownloading: boolean;
  downloadProgress: DownloadProgress;
  showShareMenu: boolean;
  setShowShareMenu: (show: boolean) => void;
  handleDownloadSlide: () => Promise<void>;
  handleDownloadAll: () => Promise<void>;
  handleShareTwitter: () => void;
  handleShareLinkedIn: () => void;
}

interface UseSlideActionsParams {
  cardRef: RefObject<HTMLDivElement>;
  slides: SlideInfo[];
  activeSlide: number;
  setActiveSlide: (index: number) => void;
  year: number;
  data: OfficeWrappedData;
}

/**
 * Custom hook for managing download and share actions
 * Handles downloading slides as images/zip and sharing to social media
 */
export function useSlideActions({
  cardRef,
  slides,
  activeSlide,
  setActiveSlide,
  year,
  data,
}: UseSlideActionsParams): UseSlideActionsReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({ current: 0, total: 0 });
  const [showShareMenu, setShowShareMenu] = useState(false);

  /**
   * Download the current slide as an image
   */
  const handleDownloadSlide = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      await downloadSlideAsImage(cardRef.current, year, activeSlide);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate image');
    }
  }, [cardRef, year, activeSlide]);

  /**
   * Download all slides as a zip file
   */
  const handleDownloadAll = useCallback(async () => {
    if (!cardRef.current || isDownloading) return;

    setIsDownloading(true);
    const originalSlide = activeSlide;

    try {
      const slideNames = slides.map((s) => s.id);

      await downloadAllSlidesAsZip(
        async (index: number) => {
          setActiveSlide(index);
          // Wait for slide transition and render
          await new Promise((resolve) => setTimeout(resolve, 600));
          if (cardRef.current) {
            return await captureSlideAsBlob(cardRef.current);
          }
          return null;
        },
        slides.length,
        year,
        slideNames,
        (current, total) => setDownloadProgress({ current, total })
      );
    } catch {
      alert('Failed to download slides. Please try again.');
    } finally {
      setIsDownloading(false);
      setDownloadProgress({ current: 0, total: 0 });
      setActiveSlide(originalSlide);
    }
  }, [cardRef, isDownloading, activeSlide, slides, year, setActiveSlide]);

  /**
   * Share to Twitter/X
   */
  const handleShareTwitter = useCallback(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : '';
    shareToTwitter(
      data.meetingStats.count,
      data.emailStats.received,
      data.productivityStats.coffeeBreaks,
      year,
      siteUrl
    );
    setShowShareMenu(false);
  }, [data.meetingStats.count, data.emailStats.received, data.productivityStats.coffeeBreaks, year]);

  /**
   * Share to LinkedIn
   */
  const handleShareLinkedIn = useCallback(() => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : '';
    shareToLinkedIn(siteUrl);
    setShowShareMenu(false);
  }, []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowShareMenu(false);
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showShareMenu]);

  return {
    isDownloading,
    downloadProgress,
    showShareMenu,
    setShowShareMenu,
    handleDownloadSlide,
    handleDownloadAll,
    handleShareTwitter,
    handleShareLinkedIn,
  };
}
