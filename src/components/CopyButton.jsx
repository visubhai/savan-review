import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

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
      setTimeout(() => setCopied(false), 3500);
    } else {
      setErrorMsg('Copy failed — please select and copy the text manually.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={`w-full min-h-[52px] py-3 px-5 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-lg touch-manipulation ${
          copied
            ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
            : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400/50'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>✓ Review Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 stroke-[2.5]" />
            <span>📋 Copy Review</span>
          </>
        )}
      </button>

      {copied && (
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200/70 animate-fade-in text-center">
          <span>Now tap <strong>"⭐ Review on Google"</strong> below</span>
          <ArrowRight className="w-3.5 h-3.5" />
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
