// Utility functions for Office Wrapped
// v1.2.0 - Added coffeesConsumed randomization

import html2canvas from 'html2canvas';
import JSZip from 'jszip';

/**
 * Captures a slide element as a blob
 */
export const captureSlideAsBlob = async (element: HTMLElement): Promise<Blob> => {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
    logging: false,
    useCORS: true,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        resolve(blob);
      },
      'image/png',
      1.0
    );
  });
};

/**
 * Downloads a single slide as an image
 */
export const downloadSlideAsImage = async (
  element: HTMLElement,
  year: number,
  slideIndex: number
): Promise<void> => {
  try {
    const blob = await captureSlideAsBlob(element);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `office-wrapped-${year}-slide-${slideIndex + 1}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
};

/**
 * Downloads all slides as a zip file
 */
export const downloadAllSlidesAsZip = async (
  captureSlide: (index: number) => Promise<Blob | null>,
  totalSlides: number,
  year: number,
  slideNames: string[],
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  const zip = new JSZip();
  const folder = zip.folder(`office-wrapped-${year}`);

  if (!folder) {
    throw new Error('Failed to create zip folder');
  }

  for (let i = 0; i < totalSlides; i++) {
    onProgress?.(i + 1, totalSlides);

    const blob = await captureSlide(i);
    if (blob) {
      const slideName = slideNames[i] || `slide-${i + 1}`;
      const fileName = `${String(i + 1).padStart(2, '0')}-${slideName}.png`;
      folder.file(fileName, blob);
    }
  }

  // Generate and download zip
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.download = `office-wrapped-${year}.zip`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Generates share text for social media
 */
export const generateShareText = (
  meetingCount: number,
  emailsReceived: number,
  coffeeBreaks: number,
  year: number
): string => {
  return `🏢 My Office Wrapped ${year}:
📅 ${meetingCount.toLocaleString()} meetings survived
📧 ${emailsReceived.toLocaleString()} emails received
☕ ${coffeeBreaks} coffee breaks taken

Generate yours at`;
};

/**
 * Share to Twitter/X
 */
export const shareToTwitter = (
  meetingCount: number,
  emailsReceived: number,
  coffeeBreaks: number,
  year: number,
  siteUrl: string
): void => {
  const text = generateShareText(meetingCount, emailsReceived, coffeeBreaks, year);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`;
  window.open(url, '_blank', 'width=550,height=420');
};

/**
 * Share to LinkedIn
 */
export const shareToLinkedIn = (siteUrl: string): void => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
  window.open(url, '_blank', 'width=550,height=420');
};

/**
 * Randomize meeting stats
 */
export const randomizeMeetingStats = () => {
  const count = Math.floor(Math.random() * (2000 - 800) + 800);
  const hours = Math.floor(count * 0.4);
  return {
    count,
    hours,
    days: parseFloat((hours / 24).toFixed(1)),
    percentageCameraOff: Math.floor(Math.random() * (100 - 50) + 50),
    talkedOnMute: Math.floor(Math.random() * (150 - 30) + 30),
    failedToShare: Math.floor(Math.random() * (80 - 20) + 20),
  };
};

/**
 * Randomize notification stats
 */
export const randomizeNotificationStats = () => ({
  total: Math.floor(Math.random() * (5000 - 1000) + 1000),
  responseRate: Math.floor(Math.random() * (99 - 60) + 60),
  latestPing: `${Math.floor(Math.random() * (11 - 8) + 8)}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')} PM`,
});

/**
 * Randomize email stats
 */
export const randomizeEmailStats = () => ({
  sent: Math.floor(Math.random() * (10000 - 5000) + 5000),
  received: Math.floor(Math.random() * (15000 - 8000) + 8000),
  unread: Math.floor(Math.random() * (5000 - 1000) + 1000),
  avgResponseTime: `${(Math.random() * 5 + 1).toFixed(1)} hours`,
});

/**
 * Randomize productivity stats
 */
export const randomizeProductivityStats = () => {
  const coffeeBreaks = Math.floor(Math.random() * (600 - 300) + 300);
  // Coffees consumed is typically 1.5-2.5x the number of breaks (multiple cups per break)
  const coffeesConsumed = Math.floor(coffeeBreaks * (Math.random() * 1 + 1.5));
  return {
    peakHour: `${Math.floor(Math.random() * (11 - 9) + 9)} AM`,
    slumpHour: `${Math.floor(Math.random() * (4 - 2) + 2)} PM`,
    coffeeBreaks,
    coffeesConsumed,
    actualWorkPercentage: Math.floor(Math.random() * (35 - 15) + 15),
  };
};

/**
 * Randomize status stats
 */
export const randomizeStatusStats = () => ({
  awayTime: Math.floor(Math.random() * (1200 - 600) + 600),
  busyTime: Math.floor(Math.random() * (1500 - 800) + 800),
  availableTime: Math.floor(Math.random() * (800 - 300) + 300),
  longestAway: `${Math.floor(Math.random() * 5 + 2)}h ${Math.floor(Math.random() * 59)}m`,
});

/**
 * Randomize buzzword count
 */
export const randomizeBuzzwordCount = () => Math.floor(Math.random() * (600 - 200) + 200);
