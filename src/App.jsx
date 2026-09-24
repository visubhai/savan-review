import React, { useState, useCallback, useMemo } from 'react';
import { CHIPS_DATA } from './data/reviews';
import { generateReview } from './utils/reviewGenerator';
import { ReviewCard } from './components/ReviewCard';
import { ReviewOption } from './components/ReviewOption';
import { CopyButton } from './components/CopyButton';
import { GoogleReviewButton } from './components/GoogleReviewButton';
import { Bus, RefreshCw, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function App() {
  // Default selected chips for a rich initial review
  const [selectedChips, setSelectedChips] = useState(['bus', 'service', 'journey']);

  // Pre-generate review immediately on mount using default options
  const [reviewText, setReviewText] = useState(() => generateReview(['bus', 'service', 'journey']));
  
  const [isCopied, setIsCopied] = useState(false);

  // Instant chip toggle handler (synchronous, <1ms UI response)
  const handleToggleChip = useCallback((chipId) => {
    setSelectedChips((prev) => {
      const next = prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId];
      
      // Update review text synchronously
      const newReview = generateReview(next);
      setReviewText(newReview);
      return next;
    });
  }, []);

  // Quick re-generate / shuffle with current active tags
  const handleShuffle = useCallback(() => {
    const newReview = generateReview(selectedChips);
    setReviewText(newReview);
  }, [selectedChips]);

  const handleCopySuccess = useCallback(() => {
    setIsCopied(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Header Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-20 border-b border-slate-800 shadow-md">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 text-slate-950 p-2 rounded-xl flex items-center justify-center font-black shadow-sm">
              <Bus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-white">
                SAVAN TRAVELS
              </h1>
              <p className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase mt-0.5">
                Ultra-Fast Review Assistant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShuffle}
            title="Generate alternate phrasing"
            className="flex items-center gap-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Shuffle</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-md mx-auto px-4 py-4 space-y-4 flex-1">
        
        {/* Title Prompt */}
        <div className="text-center py-1">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            How was your trip?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Tap your favorite experience tags below to customize your review
          </p>
        </div>

        {/* STEP 1: REVIEW DISPLAY CARD */}
        <ReviewCard
          reviewText={reviewText}
          onChangeText={setReviewText}
        />

        {/* STEP 2: CHIPS SELECTION SECTION */}
        <section aria-labelledby="experience-heading" className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 id="experience-heading" className="text-xs font-bold uppercase tracking-wider text-slate-600">
              What did you like?
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              {selectedChips.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            {CHIPS_DATA.map((chip) => (
              <ReviewOption
                key={chip.id}
                option={chip}
                isSelected={selectedChips.includes(chip.id)}
                onToggle={handleToggleChip}
              />
            ))}
          </div>
        </section>

        {/* STEP 3: ACTION BUTTONS (COPY & GOOGLE) */}
        <section className="space-y-3 pt-2">
          <CopyButton
            textToCopy={reviewText}
            onCopySuccess={handleCopySuccess}
          />

          <GoogleReviewButton
            isCopied={isCopied}
          />
        </section>

        {/* NOTICE / DISCLAIMER */}
        <div className="text-center px-4 py-2 border-t border-slate-200/60">
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
            Your review is your own experience. Please edit it before posting if needed.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-3 px-4 text-[11px] border-t border-slate-800">
        <p className="flex items-center justify-center gap-1 font-medium text-slate-300">
          <span>Thank you for choosing</span>
          <span className="text-amber-400 font-bold">Savan Travels</span>
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400 inline" />
        </p>
      </footer>
    </div>
  );
}
