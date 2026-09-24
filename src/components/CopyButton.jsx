import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export function CopyButton({ textToCopy, onCopySuccess }) {
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopy = async () => {
    if (!textToCopy) return;

    let success = false;

    // Standard Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } catch (err) {
        console.warn('Clipboard API failed, attempting fallback...', err);
      }
    }

    // Fallback for older browsers or non-secure contexts
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
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setCopied(false), 4500);
    } else {
      setErrorMsg('Copy failed — please select and copy the text manually.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={`w-full min-h-[54px] py-3.5 px-5 rounded-2xl text-base font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-lg touch-manipulation border ${
          copied
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-emerald-600/30 ring-4 ring-emerald-500/30'
            : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 border-orange-400 shadow-orange-500/25 ring-2 ring-orange-400/40'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 stroke-[3] animate-bounce" />
            <span className="tracking-wide">✓ STEP 1 DONE: REVIEW COPIED!</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 stroke-[2.5]" />
            <span className="tracking-wide">📋 STEP 1: COPY REVIEW</span>
          </>
        )}
      </button>

      {copied && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 py-2 px-3.5 rounded-xl border border-emerald-200/80 shadow-xs animate-fade-in text-center">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Review Copied! Now tap <strong>"⭐ Review on Google"</strong> below</span>
          <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0 animate-pulse" />
        </div>
      )}

      {errorMsg && (
        <p className="text-xs text-rose-600 font-medium text-center bg-rose-50 p-2 rounded-lg border border-rose-200">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
