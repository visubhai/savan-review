import React, { useState } from 'react';
import { Star, ExternalLink, Check, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { VisualStepGuide } from './VisualStepGuide';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

export function CopyAndReviewButton({ textToCopy, t, lang = 'gu' }) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

    setCopied(true);
    setShowModal(true);

    // 2. Open Google Review in new tab
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 400);

    setTimeout(() => {
      setCopied(false);
    }, 6000);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* SINGLE UNIFIED PRIMARY CTA BUTTON */}
      <button
        type="button"
        onClick={handleCopyAndOpenGoogle}
        className={`w-full min-h-[64px] py-4 px-5 rounded-2xl text-base sm:text-lg font-black flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xl touch-manipulation border ${
          copied
            ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-500/40 shadow-emerald-500/30'
            : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 border-orange-400 google-glow-active ring-4 ring-orange-400/40 shadow-orange-500/30'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-6 h-6 stroke-[3] animate-bounce shrink-0 text-white" />
            <span className="tracking-wide">{t.copiedStatus}</span>
          </>
        ) : (
          <>
            <Star className="w-6 h-6 text-slate-950 fill-slate-950 shrink-0 animate-pulse" />
            <span className="tracking-wide">{t.copyAndOpenBtn}</span>
            <ExternalLink className="w-5 h-5 ml-0.5 opacity-90 stroke-[2.5] shrink-0" />
          </>
        )}
      </button>

      {/* VISUAL 3-STEP PICTURE GUIDE */}
      <VisualStepGuide t={t} />

      {/* POPUP REMINDER OVERLAY AFTER CLICK */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-5 text-white shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center ring-4 ring-emerald-500/30">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h4 className="text-lg font-black text-white">
                {t.modal.copiedTitle}
              </h4>
              <p className="text-xs text-amber-300 font-semibold mt-1">
                {t.modal.copiedSubtitle}
              </p>
            </div>

            <div className="bg-slate-800/90 rounded-2xl p-3 text-left space-y-2 text-xs border border-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">1</span>
                <span>⭐⭐⭐⭐⭐ 5-Star પસંદ કરો</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">2</span>
                <span>કીબોર્ડથી લખાણ <strong>Paste</strong> કરો</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                <span>ઉપર <strong>'Post'</strong> દબાવો</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
                setShowModal(false);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{t.modal.actionBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              {t.modal.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
