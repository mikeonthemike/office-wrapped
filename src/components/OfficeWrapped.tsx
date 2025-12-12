'use client';

// Office Wrapped - Main Component
// v2.0.1 - Reduced spacing above/below slide for better stats visibility

import React, { useRef } from 'react';
import { useOfficeWrappedData, useSlideNavigation, useSlideActions } from '@/hooks';
import { SlideCard, ControlButtons, SlideNavigation, Footer } from './ui';
import { SlideContent } from './SlideContent';

// Application year constant
const YEAR = 2025;

/**
 * Main Office Wrapped component - orchestrates all sub-components and hooks
 */
const OfficeWrapped: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Data layer - manages all statistics state
  const { data, randomizeData } = useOfficeWrappedData();

  // Navigation layer - manages slide navigation and transitions
  const {
    activeSlide,
    isTransitioning,
    slides,
    nextSlide,
    prevSlide,
    goToSlide,
    setActiveSlide,
  } = useSlideNavigation();

  // Actions layer - manages downloads and sharing
  const {
    isDownloading,
    downloadProgress,
    showShareMenu,
    setShowShareMenu,
    handleDownloadSlide,
    handleDownloadAll,
    handleShareTwitter,
    handleShareLinkedIn,
  } = useSlideActions({
    cardRef: cardRef as React.RefObject<HTMLDivElement>,
    slides,
    activeSlide,
    setActiveSlide,
    year: YEAR,
    data,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-white">
      {/* Header with title and controls - reduced margins for more slide space */}
      <div className="mb-3 sm:mb-4 flex flex-col items-center gap-2 sm:gap-3">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight text-center">
          Office Wrapped {YEAR}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm -mt-1 sm:-mt-2">
          Your year in corporate survival
        </p>

        {/* Control buttons */}
        <ControlButtons
          isDownloading={isDownloading}
          downloadProgress={downloadProgress}
          showShareMenu={showShareMenu}
          onRandomize={randomizeData}
          onDownloadSlide={handleDownloadSlide}
          onDownloadAll={handleDownloadAll}
          onToggleShareMenu={() => setShowShareMenu(!showShareMenu)}
          onShareTwitter={handleShareTwitter}
          onShareLinkedIn={handleShareLinkedIn}
        />
      </div>

      {/* Main slide card */}
      <SlideCard
        ref={cardRef}
        slide={slides[activeSlide]}
        activeSlide={activeSlide}
        totalSlides={slides.length}
        isTransitioning={isTransitioning}
      >
        <SlideContent activeSlide={activeSlide} year={YEAR} data={data} />
      </SlideCard>

      {/* Navigation controls */}
      <SlideNavigation
        totalSlides={slides.length}
        activeSlide={activeSlide}
        isDownloading={isDownloading}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
      />

      {/* Help text - reduced margins */}
      <p className="mt-2 sm:mt-3 text-slate-500 text-xs sm:text-sm text-center px-4">
        Generated for {YEAR} •{' '}
        <span className="hidden sm:inline">Use arrow keys to navigate • </span>
        Don&apos;t forget your timesheet
      </p>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OfficeWrapped;
