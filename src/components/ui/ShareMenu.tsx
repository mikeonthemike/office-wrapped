// ShareMenu component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';
import { TwitterIcon, LinkedInIcon } from '@/components/icons';

interface ShareMenuProps {
  onShareTwitter: () => void;
  onShareLinkedIn: () => void;
}

/**
 * Dropdown menu for sharing to social media
 */
export const ShareMenu: React.FC<ShareMenuProps> = ({
  onShareTwitter,
  onShareLinkedIn,
}) => {
  return (
    <div className="absolute top-full mt-2 right-0 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-50 min-w-[140px] sm:min-w-[160px]">
      <button
        onClick={onShareTwitter}
        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-700 transition-colors text-left text-sm"
      >
        <TwitterIcon size={16} />
        <span>Twitter / X</span>
      </button>
      <button
        onClick={onShareLinkedIn}
        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-slate-700 transition-colors text-left text-sm"
      >
        <LinkedInIcon size={16} />
        <span>LinkedIn</span>
      </button>
    </div>
  );
};
