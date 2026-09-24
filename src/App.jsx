import React, { useState, useRef } from 'react';
import { MAIN_CHIPS } from './data/reviews.js';
import { generateReviewBatch } from './utils/reviewGenerator.js';
import { 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Pencil, 
  ChevronLeft, 
  ChevronRight, 
  HeartHandshake, 
  PhoneCall 
} from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

const CONTENT = {
  en: {
    langName: 'English',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Select what you liked (Optional):',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Opening Google...',
    regenerateBtn: 'Regenerate Options',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copies review & opens Google → Paste on Google & select 5★',
    callUs: 'Office Inquiry:'
  },
  gu: {
    langName: 'Gujlish',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Tamne shu gamyu (Optional - tap karo):',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Google khule che...',
    regenerateBtn: 'Regenerate Options',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copy thase & Google khulse → Paste kari 5★ aapo',
    callUs: 'Office Inquiry:'
  },
  hi: {
    langName: 'Hinglish',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Aapko kya pasand aaya (Optional - select karein):',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Google khul raha hai...',
    regenerateBtn: 'Regenerate Options',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copy hoga & Google khulega → Paste karke 5★ dein',
    callUs: 'Office Inquiry:'
  }
};

const BATCH_SIZE = 4;

export default function App() {
  const [lang, setLang] = useState('en');
  // NO PRE-SELECTION: Customer selects whatever they want!
  const [selectedChips, setSelectedChips] = useState([]);
  const [reviewsList, setReviewsList] = useState(() => generateReviewBatch([], 'en', BATCH_SIZE));
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [copiedAction, setCopiedAction] = useState(false);
  const [copiedOnly, setCopiedOnly] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const textareaRef = useRef(null);
  const touchStartX = useRef(0);
  const t = CONTENT[lang] || CONTENT.en;

  const currentReview = reviewsList[currentIndex] || '';

  // 1. Language change
  const handleLang = (newLang) => {
    setLang(newLang);
    const newBatch = generateReviewBatch(selectedChips, newLang, BATCH_SIZE);
    setReviewsList(newBatch);
    setCurrentIndex(0);
    setIsEditing(false);
  };

  // 2. Toggle category chip
  const handleToggleChip = (chipId) => {
    setSelectedChips((prev) => {
      const next = prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId];
      
      const newBatch = generateReviewBatch(next, lang, BATCH_SIZE);
      setReviewsList(newBatch);
      setCurrentIndex(0);
      setIsEditing(false);
      return next;
    });
  };

  // 3. Carousel Navigation: Left & Right
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
    setIsEditing(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    setIsEditing(false);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      handleNext(); // swiped left
    } else if (diff < -45) {
      handlePrev(); // swiped right
    }
  };

  // 4. Regenerate a new batch of 4 options
  const handleRegenerate = () => {
    setIsRegenerating(true);
    const newBatch = generateReviewBatch(selectedChips, lang, BATCH_SIZE);
    setReviewsList(newBatch);
    setCurrentIndex(0);
    setIsEditing(false);
    setTimeout(() => setIsRegenerating(false), 300);
  };

  // 5. Direct review text edit
  const handleTextChange = (e) => {
    const updated = [...reviewsList];
    updated[currentIndex] = e.target.value;
    setReviewsList(updated);
  };

  // Copy helper
  const copyToClipboard = async (text) => {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (e) {}
    }
    if (!success) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        success = true;
      } catch (e) {}
    }
    return success;
  };

  // Primary Action: 1-Tap Copy & Post to Google
  const handleCopyAndPost = async () => {
    if (!currentReview) return;

    try {
      if (navigator.vibrate) navigator.vibrate(60);
    } catch (e) {}

    await copyToClipboard(currentReview);
    setCopiedAction(true);

    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 300);

    setTimeout(() => setCopiedAction(false), 4000);
  };

  // Secondary Action: Copy-only next to 5★
  const handleCopyOnly = async () => {
    if (!currentReview) return;

    try {
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {}

    await copyToClipboard(currentReview);
    setCopiedOnly(true);
    setTimeout(() => setCopiedOnly(false), 2000);
  };

  // Toggle Edit / Done
  const handleToggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      if (textareaRef.current) textareaRef.current.blur();
    } else {
      setIsEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
          );
        }
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-3.5 sm:p-5 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. TOP HEADER: BRAND */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-3">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs shrink-0"
          />
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-tight">
              {t.title}
            </h1>
            <p className="text-xs text-indigo-600 font-extrabold uppercase tracking-wide">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-black text-indigo-800 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-full shadow-xs">
          <span>{t.badge}</span>
        </div>
      </header>

      {/* 2. PROMINENT 3-LANGUAGE TOGGLE: ENGLISH | GUJLISH | HINGLISH */}
      <div className="w-full max-w-md mx-auto mt-2.5 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-3 gap-1.5">
          {/* English Tab */}
          <button
            type="button"
            onClick={() => handleLang('en')}
            className={`py-2 px-2 rounded-xl text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'en'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1.5 text-sm sm:text-base">
              English
              {lang === 'en' && <span className="text-xs font-black text-indigo-600">✓</span>}
            </span>
          </button>

          {/* Gujlish Tab */}
          <button
            type="button"
            onClick={() => handleLang('gu')}
            className={`py-2 px-2 rounded-xl text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'gu'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1.5 text-sm sm:text-base">
              Gujlish
              {lang === 'gu' && <span className="text-xs font-black text-indigo-600">✓</span>}
            </span>
            <span className="text-[11px] font-bold text-slate-400">ગુજરાતી</span>
          </button>

          {/* Hinglish Tab */}
          <button
            type="button"
            onClick={() => handleLang('hi')}
            className={`py-2 px-2 rounded-xl text-sm font-black transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'hi'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1.5 text-sm sm:text-base">
              Hinglish
              {lang === 'hi' && <span className="text-xs font-black text-indigo-600">✓</span>}
            </span>
            <span className="text-[11px] font-bold text-slate-400">हिंदी</span>
          </button>
        </div>
      </div>

      {/* 3. CENTER WORKSPACE: CHIPS + CAROUSEL CARD + ACTIONS */}
      <main className="w-full max-w-md mx-auto my-auto space-y-3.5 py-1">
        
        {/* CHOICE CHIPS (8 OPTIONS - NO PRE-SELECTION BY DEFAULT) */}
        <section aria-label="Review topics" className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            <span>{t.chipsTitle}</span>
            {selectedChips.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedChips([]);
                  const newBatch = generateReviewBatch([], lang, BATCH_SIZE);
                  setReviewsList(newBatch);
                  setCurrentIndex(0);
                  setIsEditing(false);
                }}
                className="text-indigo-600 hover:underline cursor-pointer lowercase text-xs font-bold"
              >
                clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {MAIN_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.id);
              const chipLabel = chip.label[lang] || chip.label.en;

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleToggleChip(chip.id)}
                  className={`min-h-[42px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between gap-1.5 transition-all cursor-pointer active:scale-95 touch-manipulation border ${
                    isSelected
                      ? 'bg-indigo-50 hover:bg-indigo-100/70 text-indigo-950 border-indigo-300 shadow-xs ring-1 ring-indigo-400/30'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base sm:text-lg shrink-0">{chip.icon}</span>
                    <span className="truncate">{chipLabel}</span>
                  </div>
                  <span className={`text-xs sm:text-sm font-black shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {isSelected ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* REVIEW CAROUSEL CARD WITH LEFT / RIGHT CHOICE & QUOTES */}
        <section aria-label="Review carousel" className="space-y-2.5">
          
          {/* THE CAROUSEL CARD */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/90 relative min-h-[170px] sm:min-h-[185px] flex flex-col justify-between transition-all"
          >
            {/* LEFT ARROW BUTTON (<) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review option"
              className="absolute left-2.5 top-[44%] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs z-10 touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* RIGHT ARROW BUTTON (>) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review option"
              className="absolute right-2.5 top-[44%] -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs z-10 touch-manipulation"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* REVIEW TEXT (LARGER FONT SIZE FOR MOBILE READABILITY) */}
            <div className="px-8 sm:px-10 py-1 my-auto flex items-center justify-center">
              {isEditing ? (
                <textarea
                  ref={textareaRef}
                  value={currentReview}
                  onChange={handleTextChange}
                  className="w-full text-base sm:text-lg font-medium text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed text-center p-0"
                  rows={4}
                  aria-label="Edit review text"
                />
              ) : (
                <p 
                  onClick={() => {
                    setIsEditing(true);
                    setTimeout(() => textareaRef.current?.focus(), 50);
                  }}
                  className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed text-center select-none cursor-text"
                >
                  "{currentReview}"
                </p>
              )}
            </div>

            {/* BOTTOM CAROUSEL DOTS (• • ▬ •) */}
            <div className="flex items-center justify-center gap-1.5 pt-2.5">
              {reviewsList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsEditing(false);
                  }}
                  className={`transition-all duration-200 rounded-full h-2 cursor-pointer touch-manipulation ${
                    currentIndex === idx
                      ? 'w-7 bg-[#6355ee]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to review option ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* BAR BELOW CARD: 5★ ON LEFT | COPY & EDIT/DONE ON RIGHT */}
          <div className="flex items-center justify-between px-1.5 text-sm select-none">
            
            {/* 5★ BADGE */}
            <div className="flex items-center gap-1.5 text-slate-900 font-black text-base sm:text-lg">
              <span>5★</span>
            </div>

            {/* ACTION LINKS: COPY & EDIT/DONE */}
            <div className="flex items-center gap-4">
              {/* Copy only button */}
              <button
                type="button"
                onClick={handleCopyOnly}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-bold text-sm cursor-pointer active:scale-95 transition-all py-1 px-1.5 rounded-md touch-manipulation"
              >
                {copiedOnly ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="text-emerald-700 font-bold">{t.copiedOnly}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600 stroke-[2]" />
                    <span>{t.copyOnly}</span>
                  </>
                )}
              </button>

              {/* Edit / Done button */}
              <button
                type="button"
                onClick={handleToggleEdit}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-bold text-sm cursor-pointer active:scale-95 transition-all py-1 px-1.5 rounded-md touch-manipulation"
              >
                {isEditing ? (
                  <>
                    <Check className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                    <span className="text-indigo-600 font-bold">{t.doneBtn}</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 text-slate-600 stroke-[2]" />
                    <span>{t.editBtn}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* PRIMARY BUTTON: COPY & POST TO GOOGLE */}
          <button
            type="button"
            onClick={handleCopyAndPost}
            className={`w-full min-h-[56px] py-4 px-6 rounded-2xl font-black text-base sm:text-lg transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-md shadow-indigo-600/20 touch-manipulation flex items-center justify-center gap-2.5 ${
              copiedAction
                ? 'bg-emerald-600 text-white shadow-emerald-600/25'
                : 'bg-[#6355ee] hover:bg-[#5346dd] text-white'
            }`}
          >
            {copiedAction ? (
              <>
                <Check className="w-5 h-5 stroke-[3] text-white animate-bounce" />
                <span>{t.mainBtnCopied}</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5 stroke-[2.5] text-white" />
                <span>{t.mainBtn}</span>
              </>
            )}
          </button>

          {/* SECONDARY BUTTON: REGENERATE */}
          <button
            type="button"
            onClick={handleRegenerate}
            className="w-full min-h-[50px] py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-xs cursor-pointer active:scale-[0.98] transition-all touch-manipulation flex items-center justify-center gap-2"
          >
            <Sparkles className={`w-4 h-4 text-indigo-600 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{t.regenerateBtn}</span>
          </button>

          {/* SIMPLE HELPFUL 1-LINE INSTRUCTION */}
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-600 pt-0.5">
            {t.helperText}
          </p>

        </section>
      </main>

      {/* 4. FOOTER: OFFICE CONTACT PHONES */}
      <footer className="w-full max-w-md mx-auto text-center pt-2 pb-0.5 border-t border-slate-200 text-xs sm:text-sm text-slate-500 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>{t.callUs}</span>
          <a href="tel:7567529600" className="text-indigo-600 font-extrabold hover:underline">7567529600</a>
          <span>•</span>
          <a href="tel:7567529700" className="text-indigo-600 font-extrabold hover:underline">7567529700</a>
        </div>
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-medium">
          <span>સાવન ટ્રાવેલ્સ</span>
          <HeartHandshake className="w-3 h-3 text-rose-500 inline" />
        </p>
      </footer>

    </div>
  );
}
