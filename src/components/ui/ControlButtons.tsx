// ControlButtons component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import { RefreshCw, Download, Archive, Share2, Loader2 } from 'lucide-react';
import { ShareMenu } from './ShareMenu';
import type { DownloadProgress } from '@/hooks';

interface ControlButtonsProps {
  isDownloading: boolean;
  downloadProgress: DownloadProgress;
  showShareMenu: boolean;
  onRandomize: () => void;
  onDownloadSlide: () => void;
  onDownloadAll: () => void;
  onToggleShareMenu: () => void;
  onShareTwitter: () => void;
  onShareLinkedIn: () => void;
}

/**
 * Control buttons for randomizing, downloading, and sharing
 */
export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isDownloading,
  downloadProgress,
  showShareMenu,
  onRandomize,
  onDownloadSlide,
  onDownloadAll,
  onToggleShareMenu,
  onShareTwitter,
  onShareLinkedIn,
}) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
      {/* Randomize button */}
      <button
        onClick={onRandomize}
        disabled={isDownloading}
        className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
      >
        <RefreshCw size={14} className="sm:w-4 sm:h-4" /> Randomize
      </button>

      {/* Download slide button */}
      <button
        onClick={onDownloadSlide}
        disabled={isDownloading}
        className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
      >
        <Download size={14} className="sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Download</span> Slide
      </button>

      {/* Download all button */}
      <button
        onClick={onDownloadAll}
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
            onToggleShareMenu();
          }}
          disabled={isDownloading}
          className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xs sm:text-sm font-medium"
        >
          <Share2 size={14} className="sm:w-4 sm:h-4" /> Share
        </button>

        {showShareMenu && (
          <ShareMenu
            onShareTwitter={onShareTwitter}
            onShareLinkedIn={onShareLinkedIn}
          />
        )}
      </div>
    </div>
  );
};
