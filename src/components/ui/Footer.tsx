// Footer component for Office Wrapped
// v1.0.0 - Extracted from main component

import React from 'react';

/**
 * Footer component displaying copyright and disclaimer
 */
export const Footer: React.FC = () => {
  return (
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
  );
};
