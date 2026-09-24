import React, { useState, useCallback, useMemo } from 'react';
import { CHIPS_DATA } from './data/reviews';
import { UI_TRANSLATIONS } from './data/translations';
import { generateReview } from './utils/reviewGenerator';
import { ReviewCard } from './components/ReviewCard';
import { ReviewOption } from './components/ReviewOption';
import { CopyAndReviewButton } from './components/CopyAndReviewButton';
import { RefreshCw, ShieldCheck, HeartHandshake, PhoneCall, Globe2, ChevronDown, ChevronUp, Star } from 'lucide-react';

// Default initial tags: Staff, Timing, Parcel
const DEFAULT_INITIAL_TAGS = ['staff', 'timing', 'parcel'];

export default function App() {
  // Language State: 'gu' (Gujarati - default for Surat passengers), 'en' (English), 'hi' (Hindi)
  const [lang, setLang] = useState('gu');
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.gu;

  // Selected Chips
  const [selectedChips, setSelectedChips] = useState(DEFAULT_INITIAL_TAGS);

  // Pre-generated review text in current language
  const [reviewText, setReviewText] = useState(() => generateReview(DEFAULT_INITIAL_TAGS, 'gu'));

  // Collapsible toggle for options (defaults open or clean)
  const [showChips, setShowChips] = useState(true);

  // Switch Language
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    const newReview = generateReview(selectedChips, newLang);
    setReviewText(newReview);
  };

  // Instant chip toggle handler (synchronous, <1ms response)
  const handleToggleChip = useCallback((chipId) => {
    setSelectedChips((prev) => {
      const next = prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId];
      
      const newReview = generateReview(next, lang);
      setReviewText(newReview);
      return next;
    });
  }, [lang]);

  // Quick re-generate / shuffle
  const handleShuffle = useCallback(() => {
    const newReview = generateReview(selectedChips, lang);
    setReviewText(newReview);
  }, [selectedChips, lang]);

  // Left & Right columns
  const leftColumnChips = useMemo(() => CHIPS_DATA.filter(c => c.col === 'left'), []);
  const rightColumnChips = useMemo(() => CHIPS_DATA.filter(c => c.col === 'right'), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      
      {/* HEADER BAR */}
      <header className="bg-slate-900 sticky top-0 z-20 border-b border-slate-800 shadow-xl">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/savan-logo.png"
              alt="Savan Travels Logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500 shadow-sm shrink-0"
            />
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-white">
                {t.title}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-amber-400 font-bold uppercase mt-0.5 tracking-wider">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Shuffle Button */}
          <button
            type="button"
            onClick={handleShuffle}
            title={t.shuffleBtn}
            className="flex items-center gap-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-amber-400 px-2.5 py-1.5 rounded-xl border border-slate-700/80 transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>{t.shuffleBtn}</span>
          </button>
        </div>

        {/* LANGUAGE SWITCHER BAR */}
        <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 py-1.5 flex items-center justify-between max-w-md mx-auto text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
            <Globe2 className="w-3.5 h-3.5 text-orange-400" />
            <span>ભાષા / Language:</span>
          </div>

          <div className="flex gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => handleLanguageChange('gu')}
              className={`px-2 py-0.5 rounded text-[11px] font-black transition-all ${
                lang === 'gu'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ગુજરાતી
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-black transition-all ${
                lang === 'en'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-0.5 rounded text-[11px] font-black transition-all ${
                lang === 'hi'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* OFFICE PHONE NUMBER SUB-BAR */}
        <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-xs border-t border-slate-800/80">
          <div className="max-w-md mx-auto flex items-center justify-between text-[11px] font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              {t.officeContact}
            </span>
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <a
                href="tel:7567529600"
                className="hover:text-amber-300 transition-colors underline decoration-slate-600 underline-offset-2"
              >
                7567529600
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="tel:7567529700"
                className="hover:text-amber-300 transition-colors underline decoration-slate-600 underline-offset-2"
              >
                7567529700
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-md mx-auto px-4 py-4 space-y-4 flex-1">
        
        {/* Title Prompt with 5-Star Visual */}
        <div className="text-center pt-1 pb-1">
          <div className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-black mb-1.5 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-[11px]">5-Star Rating</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
            {t.heading}
          </h2>
          <p className="text-xs text-amber-300/90 mt-0.5 font-semibold">
            {t.subheading}
          </p>
        </div>

        {/* STEP 1: PREPARED REVIEW CARD (EDITABLE) */}
        <ReviewCard
          reviewText={reviewText}
          onChangeText={setReviewText}
          t={t}
        />

        {/* STEP 2: GIANT 1-TAP REVIEW ACTION BUTTON + VISUAL 3-STEP PICTURE GUIDE */}
        <section className="pt-1">
          <CopyAndReviewButton
            textToCopy={reviewText}
            t={t}
            lang={lang}
          />
        </section>

        {/* STEP 3: CUSTOMIZATION CHIPS (EXPANDABLE) */}
        <section aria-labelledby="experience-heading" className="bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 shadow-md space-y-3">
          <div
            onClick={() => setShowChips(!showChips)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🎯</span>
              <h3 id="experience-heading" className="text-xs font-black uppercase tracking-wider text-slate-200">
                {t.whatDidYouLike}
              </h3>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
                {selectedChips.length} {t.selectedCount}
              </span>
              {showChips ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>

          {/* 2-COLUMN CHIPS GRID */}
          {showChips && (
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
              {/* LEFT COLUMN: Staff, Timing, Parcel (Auto-selected), New Bus, Rest Stop */}
              <div className="space-y-2">
                <span className="block text-[10px] font-black text-amber-400/90 uppercase tracking-wider px-1">
                  {t.amenitiesTitle}
                </span>
                {leftColumnChips.map((chip) => (
                  <ReviewOption
                    key={chip.id}
                    option={chip}
                    isSelected={selectedChips.includes(chip.id)}
                    onToggle={handleToggleChip}
                    lang={lang}
                  />
                ))}
              </div>

              {/* RIGHT COLUMN: Surat-Ahmedabad, Surat-Mumbai, Surat-Pune, Surat-Rajkot */}
              <div className="space-y-2">
                <span className="block text-[10px] font-black text-amber-400/90 uppercase tracking-wider px-1">
                  {t.routesTitle}
                </span>
                {rightColumnChips.map((chip) => (
                  <ReviewOption
                    key={chip.id}
                    option={chip}
                    isSelected={selectedChips.includes(chip.id)}
                    onToggle={handleToggleChip}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* DISCLAIMER */}
        <div className="text-center px-4 py-2 border-t border-slate-800/70">
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline shrink-0" />
            {t.disclaimer}
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-center py-3 px-4 text-[11px] border-t border-slate-800 space-y-1.5">
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300">
          <span>{t.officeContact}</span>
          <a href="tel:7567529600" className="text-amber-400 font-bold hover:underline">7567529600</a>
          <span>•</span>
          <a href="tel:7567529700" className="text-amber-400 font-bold hover:underline">7567529700</a>
        </div>
        <p className="flex items-center justify-center gap-1.5 font-medium text-slate-400">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-4 h-4 rounded-full inline"
          />
          <span>{t.footerThanks}</span>
          <HeartHandshake className="w-3.5 h-3.5 text-rose-400 inline" />
        </p>
      </footer>
    </div>
  );
}
