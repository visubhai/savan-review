import React, { useState, useCallback, useMemo } from 'react';
import { CHIPS_DATA } from './data/reviews';
import { generateReview } from './utils/reviewGenerator';
import { ReviewCard } from './components/ReviewCard';
import { ReviewOption } from './components/ReviewOption';
import { CopyButton } from './components/CopyButton';
import { GoogleReviewButton } from './components/GoogleReviewButton';
import { RefreshCw, ShieldCheck, HeartHandshake } from 'lucide-react';

// Auto-select the first 3 items of the Left Column by default (Staff, Timing, Parcel)
const DEFAULT_INITIAL_TAGS = ['staff', 'timing', 'parcel'];

export default function App() {
  const [selectedChips, setSelectedChips] = useState(DEFAULT_INITIAL_TAGS);

  // Pre-generate review immediately on mount using initial default tags
  const [reviewText, setReviewText] = useState(() => generateReview(DEFAULT_INITIAL_TAGS));
  
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

  // Separate chips into Left and Right columns for side-by-side alignment
  const leftColumnChips = useMemo(() => CHIPS_DATA.filter(c => c.col === 'left'), []);
  const rightColumnChips = useMemo(() => CHIPS_DATA.filter(c => c.col === 'right'), []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Header Bar */}
      <header className="bg-slate-900 text-white sticky top-0 z-20 border-b border-slate-800 shadow-md">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/savan-logo.png"
              alt="Savan Travels Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500 shadow-sm"
            />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-none text-white">
                SAVAN TRAVELS
              </h1>
              <p className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase mt-0.5">
                Surat • Ahmedabad • Mumbai • Pune • Rajkot
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShuffle}
            title="Generate alternate phrasing"
            className="flex items-center gap-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors shrink-0"
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
            How was your experience?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Tap tags below to customize your review for Savan Travels
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
            <h3 id="experience-heading" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              What did you like?
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold bg-slate-200/70 px-2 py-0.5 rounded-md">
              {selectedChips.length} selected
            </span>
          </div>

          {/* 2-COLUMN CHIPS LAYOUT */}
          <div className="grid grid-cols-2 gap-2 items-start">
            {/* LEFT COLUMN: Staff, Timing, Parcel (First 3 Auto-Selected), New Bus, Rest Stop, etc. */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Services & Amenities
              </span>
              {leftColumnChips.map((chip) => (
                <ReviewOption
                  key={chip.id}
                  option={chip}
                  isSelected={selectedChips.includes(chip.id)}
                  onToggle={handleToggleChip}
                />
              ))}
            </div>

            {/* RIGHT COLUMN: First 4 are Routes (Surat-Ahmedabad, Surat-Mumbai, Surat-Pune, Surat-Rajkot) */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                Popular Routes
              </span>
              {rightColumnChips.map((chip) => (
                <ReviewOption
                  key={chip.id}
                  option={chip}
                  isSelected={selectedChips.includes(chip.id)}
                  onToggle={handleToggleChip}
                />
              ))}
            </div>
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
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-300">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-4 h-4 rounded-full inline"
          />
          <span>Thank you for choosing</span>
          <span className="text-amber-400 font-bold">Savan Travels</span>
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400 inline" />
        </p>
      </footer>
    </div>
  );
}
