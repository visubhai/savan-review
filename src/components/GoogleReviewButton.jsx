import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

export function GoogleReviewButton({ isCopied }) {
  const handleClick = () => {
    // Open Google Review in new tab / mobile browser handler
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        className={`w-full min-h-[52px] py-3 px-5 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-md touch-manipulation border ${
          isCopied
            ? 'bg-slate-900 text-white border-slate-900 shadow-slate-900/25 ring-2 ring-slate-800 animate-bounce-subtle'
            : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 shadow-slate-200/60'
        }`}
      >
        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
        <span>⭐ Review on Google</span>
        <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
      </button>

      <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-1">
        <p className="font-semibold text-slate-800 flex items-center gap-1">
          💡 Quick Google Posting Guide:
        </p>
        <ol className="list-decimal list-inside space-y-0.5 text-slate-600 pl-0.5">
          <li>Tap <strong>Copy Review</strong> above</li>
          <li>Tap <strong>Review on Google</strong> button</li>
          <li><strong>Paste</strong> copied text in Google's review box</li>
          <li>Select your <strong>Star Rating</strong> & Submit</li>
        </ol>
      </div>
    </div>
  );
}
