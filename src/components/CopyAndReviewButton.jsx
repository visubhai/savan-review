import React, { useState } from 'react';
import { Star, ExternalLink, Check, Copy, Sparkles } from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

export function CopyAndReviewButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyAndOpenGoogle = async () => {
    if (!textToCopy) return;

    let success = false;

    // 1. Copy text to Clipboard
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch (err) {
        console.warn('Clipboard API failed, attempting fallback...', err);
      }
    }

    // Fallback copy for legacy browsers
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        textArea.remove();
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
    }

    if (success) {
      setCopied(true);
      setErrorMsg('');
      
      // 2. Open Google Review URL in new tab / browser handler
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');

      setTimeout(() => setCopied(false), 5000);
    } else {
      // Even if clipboard copy fails, still open Google link so customer is not blocked
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
      setErrorMsg('Could not auto-copy — please select and copy text manually on Google.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* SINGLE UNIFIED PRIMARY CTA BUTTON */}
      <button
        type="button"
        onClick={handleCopyAndOpenGoogle}
        className={`w-full min-h-[62px] py-4 px-6 rounded-2xl text-lg font-black flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xl touch-manipulation border ${
          copied
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-500/40 shadow-emerald-500/30'
            : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 border-orange-400 google-glow-active ring-4 ring-orange-400/40 shadow-orange-500/30'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-6 h-6 stroke-[3] animate-bounce shrink-0 text-white" />
            <span className="tracking-wide">✓ COPIED! OPENING GOOGLE...</span>
          </>
        ) : (
          <>
            <Star className="w-6 h-6 text-slate-950 fill-slate-950 shrink-0 animate-pulse" />
            <span className="tracking-wide">COPY & REVIEW ON GOOGLE</span>
            <ExternalLink className="w-5 h-5 ml-0.5 opacity-90 stroke-[2.5] shrink-0" />
          </>
        )}
      </button>

      {/* QUICK INSTRUCTION GUIDE */}
      <div className="bg-slate-100/90 p-3.5 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5 shadow-2xs">
        <p className="font-extrabold text-slate-800 flex items-center gap-1.5 text-xs">
          <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
          <span>Instant 1-Tap Google Review:</span>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-0.5 font-medium">
          <li>Tap <strong>"COPY & REVIEW ON GOOGLE"</strong> above</li>
          <li><strong>Paste</strong> the copied review into Google's review box</li>
          <li>Select your <strong>5-Star Rating</strong> & Submit</li>
        </ol>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-600 font-medium text-center bg-rose-50 p-2 rounded-lg border border-rose-200">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
