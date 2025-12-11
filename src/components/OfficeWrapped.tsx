'use client';

// Office Wrapped - Main Component
// v1.1.0 - Updated to 2025, mobile responsive, zip download

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  Bell,
  MessageSquare,
  RefreshCw,
  Mail,
  Clock,
  Coffee,
  TrendingUp,
  Zap,
  Download,
  Share2,
  Loader2,
  Archive,
} from 'lucide-react';
import type {
  MeetingStats,
  NotificationStats,
  BuzzwordItem,
  EmailStats,
  ProductivityStats,
  StatusStats,
  SlideInfo,
} from '@/types';
import {
  downloadSlideAsImage,
  captureSlideAsBlob,
  downloadAllSlidesAsZip,
  shareToTwitter,
  shareToLinkedIn,
  randomizeMeetingStats,
  randomizeNotificationStats,
  randomizeEmailStats,
  randomizeProductivityStats,
  randomizeStatusStats,
  randomizeBuzzwordCount,
} from '@/lib/utils';

// Twitter/X icon component
const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LinkedIn icon component
const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const OfficeWrapped: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const year = 2025;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  const [showShareMenu, setShowShareMenu] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // State for all slides
  const [meetingStats, setMeetingStats] = useState<MeetingStats>({
    count: 1452,
    hours: 320,
    days: 13.3,
    percentageCameraOff: 88,
    talkedOnMute: 67,
    failedToShare: 43,
  });

  const [notificationStats, setNotificationStats] = useState<NotificationStats>({
    total: 2103,
    responseRate: 85,
    latestPing: '11:42 PM',
  });

  const [buzzwords, setBuzzwords] = useState<BuzzwordItem[]>([
    { word: 'Circle back', size: 'text-3xl md:text-5xl', weight: 'font-black' },
    { word: 'Synergy', size: 'text-2xl md:text-4xl', weight: 'font-bold' },
    { word: 'Bandwidth', size: 'text-xl md:text-3xl', weight: 'font-semibold' },
    { word: 'Touch base', size: 'text-4xl md:text-6xl', weight: 'font-black' },
    { word: 'Offline', size: 'text-xl md:text-3xl', weight: 'font-bold' },
    { word: 'Deep dive', size: 'text-2xl md:text-4xl', weight: 'font-bold' },
    { word: 'Ping me', size: 'text-lg md:text-2xl', weight: 'font-normal' },
    { word: 'Low-hanging fruit', size: 'text-xl md:text-3xl', weight: 'font-semibold' },
  ]);

  const [emailStats, setEmailStats] = useState<EmailStats>({
    sent: 8234,
    received: 12456,
    unread: 2847,
    avgResponseTime: '3.2 hours',
  });

  const [productivityStats, setProductivityStats] = useState<ProductivityStats>({
    peakHour: '10 AM',
    slumpHour: '2 PM',
    coffeeBreaks: 412,
    actualWorkPercentage: 23,
  });

  const [statusStats, setStatusStats] = useState<StatusStats>({
    awayTime: 847,
    busyTime: 1234,
    availableTime: 456,
    longestAway: '4h 23m',
  });

  const [topBuzzwordCount, setTopBuzzwordCount] = useState(412);

  // Slide configuration
  const slides: SlideInfo[] = [
    { id: 'intro', title: 'Your Year in Corporate Survival', icon: TrendingUp },
    { id: 'meetings', title: "The 'Could Have Been an Email' Edition", icon: Calendar },
    { id: 'notifications', title: 'Your After-Hours Notification Journey', icon: Bell },
    { id: 'emails', title: 'The Inbox Apocalypse', icon: Mail },
    { id: 'productivity', title: "Your 'Productive' Hours", icon: Zap },
    { id: 'status', title: "The Art of Being 'Away'", icon: Clock },
    { id: 'buzzwords', title: 'Your Top Corporate Buzzwords', icon: MessageSquare },
    { id: 'summary', title: 'Congratulations, You Survived!', icon: Coffee },
  ];

  // Randomize all data
  const randomizeData = useCallback(() => {
    setMeetingStats(randomizeMeetingStats());
    setNotificationStats(randomizeNotificationStats());
    setEmailStats(randomizeEmailStats());
    setProductivityStats(randomizeProductivityStats());
    setStatusStats(randomizeStatusStats());
    setTopBuzzwordCount(randomizeBuzzwordCount());

    const sizes = [
      'text-xl md:text-3xl',
      'text-2xl md:text-4xl',
      'text-3xl md:text-5xl',
      'text-4xl md:text-6xl',
      'text-lg md:text-2xl',
    ];
    const weights = ['font-normal', 'font-semibold', 'font-bold', 'font-black'];

    const shuffled = [...buzzwords]
      .sort(() => 0.5 - Math.random())
      .map((b) => ({
        ...b,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        weight: weights[Math.floor(Math.random() * weights.length)],
      }));
    setBuzzwords(shuffled);
  }, [buzzwords]);

  // Download current slide as image
  const handleDownloadSlide = async () => {
    if (!cardRef.current) return;

    try {
      await downloadSlideAsImage(cardRef.current, year, activeSlide);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate image');
    }
  };

  // Download all slides as zip
  const handleDownloadAll = async () => {
    if (!cardRef.current || isDownloading) return;

    setIsDownloading(true);
    const originalSlide = activeSlide;

    try {
      const slideNames = slides.map((s) => s.id);

      await downloadAllSlidesAsZip(
        async (index: number) => {
          setActiveSlide(index);
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
  };

  // Share handlers
  const handleShareTwitter = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : '';
    shareToTwitter(
      meetingStats.count,
      emailStats.received,
      productivityStats.coffeeBreaks,
      year,
      siteUrl
    );
    setShowShareMenu(false);
  };

  const handleShareLinkedIn = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.href : '';
    shareToLinkedIn(siteUrl);
    setShowShareMenu(false);
  };

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (activeSlide < slides.length - 1 && !isDownloading) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide(activeSlide + 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeSlide, slides.length, isDownloading]);

  const prevSlide = useCallback(() => {
    if (activeSlide > 0 && !isDownloading) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide(activeSlide - 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [activeSlide, isDownloading]);

  const goToSlide = (index: number) => {
    if (isDownloading) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowShareMenu(false);
    if (showShareMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showShareMenu]);

  const SlideIcon = slides[activeSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-white">
      {/* Header with controls */}
      <div className="mb-4 sm:mb-8 flex flex-col items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight text-center">
          Office Wrapped {year}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm -mt-1 sm:-mt-2">Your year in corporate survival</p>

        {/* Control buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
          <button
            onClick={randomizeData}
            disabled={isDownloading}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
          >
            <RefreshCw size={14} className="sm:w-4 sm:h-4" /> Randomize
          </button>

          <button
            onClick={handleDownloadSlide}
            disabled={isDownloading}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
          >
            <Download size={14} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Download</span> Slide
          </button>

          <button
            onClick={handleDownloadAll}
            disabled={isDownloading}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
          >
            {isDownloading ? (
              <>
                <Loader2 size={14} className="sm:w-4 sm:h-4 animate-spin" />
                {downloadProgress.current}/{downloadProgress.total}
              </>
            ) : (
              <>
                <Archive size={14} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Download</span> All
              </>
            )}
          </button>

          {/* Share dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              disabled={isDownloading}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
            >
              <Share2 size={14} className="sm:w-4 sm:h-4" /> Share
            </button>

            {showShareMenu && (
              <div className="absolute top-full mt-2 right-0 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50 min-w-[140px] sm:min-w-[160px]">
                <button
                  onClick={handleShareTwitter}
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-700 transition-colors text-left text-sm"
                >
                  <TwitterIcon size={16} />
                  <span>Twitter / X</span>
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-700 transition-colors text-left text-sm"
                >
                  <LinkedInIcon size={16} />
                  <span>LinkedIn</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border-2 border-slate-700"
      >
        {/* Card header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-6 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-widest text-[10px] sm:text-xs font-semibold opacity-90">
              Year in Review
            </div>
            <h2 className="text-lg sm:text-3xl font-black truncate">{slides[activeSlide].title}</h2>
          </div>
          <div className="h-8 w-8 sm:h-12 sm:w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0 ml-2">
            <SlideIcon size={16} className="sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Slide content */}
        <div
          className={`flex-1 p-4 sm:p-10 bg-gradient-to-b from-slate-800 to-slate-900 relative transition-opacity duration-300 overflow-y-auto ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* SLIDE 0: INTRO */}
          {activeSlide === 0 && (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="mb-4 sm:mb-8">
                <div className="text-4xl sm:text-7xl mb-2 sm:mb-4">🎉</div>
                <h3 className="text-2xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to Your {year} Wrapped
                </h3>
                <p className="text-base sm:text-2xl text-slate-300">
                  A year of meetings, emails, and existential dread
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4 sm:mt-8 w-full max-w-lg">
                <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <Calendar className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
                  <div className="text-lg sm:text-3xl font-bold">{meetingStats.count}</div>
                  <div className="text-[10px] sm:text-sm text-slate-400">Meetings</div>
                </div>
                <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <Mail className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
                  <div className="text-lg sm:text-3xl font-bold">{emailStats.received.toLocaleString()}</div>
                  <div className="text-[10px] sm:text-sm text-slate-400">Emails</div>
                </div>
                <div className="bg-slate-700/50 p-2 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm">
                  <Coffee className="mx-auto mb-1 sm:mb-2 w-5 h-5 sm:w-8 sm:h-8" />
                  <div className="text-lg sm:text-3xl font-bold">{productivityStats.coffeeBreaks}</div>
                  <div className="text-[10px] sm:text-sm text-slate-400">Coffee Breaks</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: MEETINGS */}
          {activeSlide === 1 && (
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
          )}

          {/* SLIDE 2: NOTIFICATIONS */}
          {activeSlide === 2 && (
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
                  on a Sunday
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 3: EMAILS */}
          {activeSlide === 3 && (
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
          )}

          {/* SLIDE 4: PRODUCTIVITY */}
          {activeSlide === 4 && (
            <div className="h-full flex flex-col justify-center">
              <div className="mb-4 sm:mb-8">
                <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
                  Your Daily Productivity Pattern
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="bg-green-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-green-500/30">
                    <Clock className="mb-2 sm:mb-3 w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="text-2xl sm:text-4xl font-black text-green-400 mb-1 sm:mb-2">
                      {productivityStats.peakHour}
                    </div>
                    <div className="text-sm sm:text-lg text-slate-300">Peak Hour</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 hidden sm:block">Before meetings started</div>
                  </div>
                  <div className="bg-red-500/20 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-red-500/30">
                    <Clock className="mb-2 sm:mb-3 w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="text-2xl sm:text-4xl font-black text-red-400 mb-1 sm:mb-2">
                      {productivityStats.slumpHour}
                    </div>
                    <div className="text-sm sm:text-lg text-slate-300">Slump Hour</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2 hidden sm:block">Post-lunch coma zone</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 sm:p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 mb-1">Actual Productive Work</div>
                    <div className="text-3xl sm:text-5xl font-black text-yellow-400">
                      {productivityStats.actualWorkPercentage}%
                    </div>
                  </div>
                  <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600" />
                </div>
                <div className="text-slate-300 text-sm sm:text-lg">
                  Coffee breaks: <span className="font-bold text-white">{productivityStats.coffeeBreaks}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3 italic hidden sm:block">
                  The rest was &quot;collaboration&quot; and &quot;strategic thinking&quot;
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 5: STATUS */}
          {activeSlide === 5 && (
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
          )}

          {/* SLIDE 6: BUZZWORDS */}
          {activeSlide === 6 && (
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-wrap content-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 px-2 sm:px-8">
                {buzzwords.map((item, index) => (
                  <span
                    key={index}
                    className={`${item.size} ${item.weight} text-white leading-none text-center transform hover:scale-110 transition-transform cursor-default select-none hover:text-blue-400`}
                  >
                    {item.word}
                  </span>
                ))}
              </div>
              <div className="mt-4 sm:mt-8 text-center border-t border-slate-700 pt-4 sm:pt-6">
                <p className="text-lg sm:text-2xl text-slate-300 mb-1 sm:mb-2">
                  You said{' '}
                  <span className="font-black text-blue-400 text-2xl sm:text-4xl">&quot;circle back&quot;</span>{' '}
                  <span className="font-black text-2xl sm:text-4xl text-purple-400">{topBuzzwordCount}</span>{' '}
                  times
                </p>
                <p className="text-sm sm:text-lg text-slate-500 italic">
                  That&apos;s more than once per working day
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 7: SUMMARY */}
          {activeSlide === 7 && (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="text-5xl sm:text-8xl mb-4 sm:mb-6">🏆</div>
              <h3 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Congratulations!
              </h3>
              <p className="text-lg sm:text-2xl text-slate-300 mb-4 sm:mb-8 max-w-2xl px-2">
                You survived another year of corporate life. Your reward? The same thing next year.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-xl px-2">
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="text-xl sm:text-3xl font-bold text-blue-400">{meetingStats.count}</div>
                  <div className="text-xs sm:text-sm text-slate-400">Meetings survived</div>
                </div>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="text-xl sm:text-3xl font-bold text-purple-400">
                    {emailStats.unread.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">Emails ignored</div>
                </div>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="text-xl sm:text-3xl font-bold text-green-400">
                    {productivityStats.coffeeBreaks}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">Coffees consumed</div>
                </div>
                <div className="bg-slate-700/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                  <div className="text-xl sm:text-3xl font-bold text-yellow-400">{topBuzzwordCount}</div>
                  <div className="text-xs sm:text-sm text-slate-400">Buzzwords deployed</div>
                </div>
              </div>

              <p className="text-slate-500 mt-4 sm:mt-8 italic text-sm sm:text-base">
                See you next year for Office Wrapped {year + 1}
              </p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 sm:h-2 bg-slate-800 flex">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-300 ${
                idx === activeSlide
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 sm:mt-8 flex gap-2 sm:gap-4 items-center flex-wrap justify-center">
        <button
          onClick={prevSlide}
          disabled={activeSlide === 0 || isDownloading}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
        >
          ← <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              disabled={isDownloading}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                idx === activeSlide
                  ? 'bg-blue-500 scale-125'
                  : 'bg-slate-600 hover:bg-slate-500'
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={activeSlide === slides.length - 1 || isDownloading}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Next</span> →
        </button>
      </div>

      <p className="mt-4 sm:mt-6 text-slate-500 text-xs sm:text-sm text-center px-4">
        Generated for {year} • <span className="hidden sm:inline">Use arrow keys to navigate • </span>Don&apos;t forget your timesheet
      </p>

      {/* Footer with copyright and disclaimer */}
      <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 w-full max-w-4xl text-center px-4">
        <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3">
          © {new Date().getFullYear()} Office Wrapped. All rights reserved.
        </p>
        <p className="text-slate-500 text-[10px] sm:text-xs max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-slate-400">Disclaimer:</span> This is a satirical website 
          created for entertainment purposes only. All statistics are randomly generated and fictional. 
          This site is not affiliated with, endorsed by, or connected to any company or organization. 
          Any resemblance to actual corporate experiences is purely coincidental (and probably relatable).
        </p>
      </footer>
    </div>
  );
};

export default OfficeWrapped;
