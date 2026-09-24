import React, { useEffect, useRef } from 'react';
import { Star, ExternalLink, ArrowDown, Sparkles } from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

export function GoogleReviewButton({ isCopied }) {
  const containerRef = useRef(null);

  // Smooth scroll into view when copied so user immediately sees the final step
  useEffect(() => {
    if (isCopied && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isCopied]);

  const handleClick = () => {
    // Open Google Review in new tab / mobile browser handler
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2 relative">
      {/* HIGH-VISIBILITY DIRECTIONAL ANNOUNCEMENT BANNER AFTER COPY */}
      {isCopied && (
        <div className="w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 text-slate-950 p-3 rounded-2xl shadow-xl border border-orange-300 font-black text-xs text-center flex items-center justify-center gap-2 pulse-badge">
          <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
          <span className="tracking-wide">STEP 2 FINAL: TAP BELOW TO POST ON GOOGLE</span>
          <ArrowDown className="w-4 h-4 text-slate-950 bounce-arrow shrink-0 stroke-[3]" />
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className={`w-full min-h-[58px] py-3.5 px-5 rounded-2xl text-base font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-md touch-manipulation border ${
          isCopied
            ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-slate-950 border-orange-400 google-glow-active ring-4 ring-orange-400/50 text-lg tracking-wide shadow-orange-500/40'
            : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300/90 shadow-slate-200/80 hover:border-slate-400'
        }`}
      >
        <Star className={`w-6 h-6 text-amber-500 fill-amber-500 shrink-0 ${isCopied ? 'scale-125 animate-bounce' : ''}`} />
        <span className="tracking-wide">⭐ STEP 2: REVIEW ON GOOGLE</span>
        <ExternalLink className="w-4 h-4 ml-1 opacity-80 stroke-[2.5] shrink-0" />
      </button>

      <div className="bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5 shadow-2xs">
        <p className="font-bold text-slate-800 flex items-center gap-1.5">
          <span>💡</span>
          <span>4-Step Quick Google Guide:</span>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-0.5 font-medium">
          <li className={isCopied ? 'text-emerald-700 font-bold' : ''}>
            {isCopied ? '✓ Review Copied to Clipboard!' : 'Tap "Copy Review" above'}
          </li>
          <li className={isCopied ? 'text-orange-700 font-extrabold underline' : ''}>
            Tap <strong>"⭐ STEP 2: REVIEW ON GOOGLE"</strong> button
          </li>
          <li><strong>Paste</strong> copied text into Google's review box</li>
          <li>Choose your <strong>5-Star Rating</strong> & Submit</li>
        </ol>
      </div>
    </div>
  );
}
