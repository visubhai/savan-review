import React, { useState, useRef, useEffect } from 'react';
import { MAIN_CHIPS } from './data/reviews';
import { generateReview } from './utils/reviewGenerator';
import { 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Pencil, 
  HeartHandshake, 
  PhoneCall 
} from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

const CONTENT = {
  en: {
    langName: 'English',
    langSub: '',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Tap what you liked to customize:',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Opening Google...',
    regenerateBtn: 'Regenerate',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copies review & opens Google → Paste on Google & select 5★',
    callUs: 'Office Inquiry:'
  },
  gu: {
    langName: 'Gujlish',
    langSub: 'ગુજરાતી',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Tamne shu gamyu (tap kari customize karo):',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Google khule che...',
    regenerateBtn: 'Regenerate',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copy thase & Google khulse → Paste kari 5★ aapo',
    callUs: 'Office Inquiry:'
  },
  hi: {
    langName: 'Hinglish',
    langSub: 'हिंदी',
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    badge: '⭐ 5-Star Review',
    chipsTitle: 'Aapko kya pasand aaya (select karein):',
    mainBtn: 'Copy & Post to Google',
    mainBtnCopied: 'Copied! Google khul raha hai...',
    regenerateBtn: 'Regenerate',
    copyOnly: 'Copy',
    copiedOnly: 'Copied!',
    editBtn: 'Edit',
    doneBtn: 'Done',
    helperText: '1-Tap: Copy hoga & Google khulega → Paste karke 5★ dein',
    callUs: 'Office Inquiry:'
  }
};

const DEFAULT_SELECTED = ['staff', 'timing', 'parcel'];

export default function App() {
  const [lang, setLang] = useState('en');
  const [selectedChips, setSelectedChips] = useState(DEFAULT_SELECTED);
  const [reviewText, setReviewText] = useState(() => generateReview(DEFAULT_SELECTED, 'en'));
  const [copiedAction, setCopiedAction] = useState(false);
  const [copiedOnly, setCopiedOnly] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const textareaRef = useRef(null);
  const t = CONTENT[lang] || CONTENT.en;

  // Language switch
  const handleLang = (newLang) => {
    setLang(newLang);
    setReviewText(generateReview(selectedChips, newLang));
  };

  // Toggle category chip
  const handleToggleChip = (chipId) => {
    setSelectedChips((prev) => {
      const next = prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId];
      
      const newReview = generateReview(next, lang);
      setReviewText(newReview);
      return next;
    });
  };

  // Regenerate fresh review
  const handleRegenerate = () => {
    setIsRegenerating(true);
    const newReview = generateReview(selectedChips, lang);
    setReviewText(newReview);
    setTimeout(() => setIsRegenerating(false), 300);
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

  // 1-Tap Copy & Post to Google (Primary CTA)
  const handleCopyAndPost = async () => {
    if (!reviewText) return;

    try {
      if (navigator.vibrate) navigator.vibrate(60);
    } catch (e) {}

    await copyToClipboard(reviewText);
    setCopiedAction(true);

    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 300);

    setTimeout(() => setCopiedAction(false), 4000);
  };

  // Copy-only button next to 5★
  const handleCopyOnly = async () => {
    if (!reviewText) return;

    try {
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {}

    await copyToClipboard(reviewText);
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
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-3.5 sm:p-5 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. TOP HEADER: BRAND */}
      <header className="w-full max-w-sm mx-auto flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-2.5">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs shrink-0"
          />
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">
              {t.title}
            </h1>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-800 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-full shadow-xs">
          <span>{t.badge}</span>
        </div>
      </header>

      {/* 2. PROMINENT 3-LANGUAGE TOGGLE: ENGLISH | GUJLISH | HINGLISH */}
      <div className="w-full max-w-sm mx-auto mt-2 bg-slate-200/70 p-1 rounded-xl border border-slate-200 shadow-inner">
        <div className="grid grid-cols-3 gap-1">
          {/* English Tab */}
          <button
            type="button"
            onClick={() => handleLang('en')}
            className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'en'
                ? 'bg-white text-indigo-600 font-black shadow-xs border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1">
              English
              {lang === 'en' && <span className="text-[11px] font-black text-indigo-600">✓</span>}
            </span>
          </button>

          {/* Gujlish Tab */}
          <button
            type="button"
            onClick={() => handleLang('gu')}
            className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'gu'
                ? 'bg-white text-indigo-600 font-black shadow-xs border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1">
              Gujlish
              {lang === 'gu' && <span className="text-[11px] font-black text-indigo-600">✓</span>}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 -mt-0.5">ગુજરાતી</span>
          </button>

          {/* Hinglish Tab */}
          <button
            type="button"
            onClick={() => handleLang('hi')}
            className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center touch-manipulation active:scale-95 ${
              lang === 'hi'
                ? 'bg-white text-indigo-600 font-black shadow-xs border border-slate-200 ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-1">
              Hinglish
              {lang === 'hi' && <span className="text-[11px] font-black text-indigo-600">✓</span>}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 -mt-0.5">हिंदी</span>
          </button>
        </div>
      </div>

      {/* 3. CENTER WORKSPACE: CHIPS + REVIEW CARD + ACTIONS */}
      <main className="w-full max-w-sm mx-auto my-auto space-y-3 py-1">
        
        {/* CHOICE CHIPS (8 OPTIONS IN 4x2 GRID) */}
        <section aria-label="Review topics" className="space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
            {t.chipsTitle}
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            {MAIN_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.id);
              const chipLabel = chip.label[lang] || chip.label.en;

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleToggleChip(chip.id)}
                  className={`min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between gap-1.5 transition-all cursor-pointer active:scale-95 touch-manipulation border ${
                    isSelected
                      ? 'bg-indigo-50 hover:bg-indigo-100/70 text-indigo-950 border-indigo-300 shadow-xs ring-1 ring-indigo-400/30'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm shrink-0">{chip.icon}</span>
                    <span className="truncate">{chipLabel}</span>
                  </div>
                  <span className={`text-[11px] font-black shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {isSelected ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* REVIEW TEXT BOX & CONTROLS (MATCHING SCREENSHOT) */}
        <section aria-label="Review content" className="space-y-2">
          
          {/* THE REVIEW CARD */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90 transition-all">
            <textarea
              ref={textareaRef}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              className="w-full text-sm sm:text-base font-normal text-slate-800 placeholder-slate-400 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed p-0"
              rows={3}
              aria-label="Review text"
            />

            {/* BAR BELOW TEXTAREA: 5★ ON LEFT | COPY & DONE/EDIT ON RIGHT */}
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs select-none">
              
              {/* 5★ BADGE (EXACTLY AS IN SCREENSHOT) */}
              <div className="flex items-center gap-1 text-slate-900 font-bold text-sm">
                <span>5★</span>
              </div>

              {/* ACTION LINKS: COPY & EDIT/DONE */}
              <div className="flex items-center gap-3">
                {/* Copy only button */}
                <button
                  type="button"
                  onClick={handleCopyOnly}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold cursor-pointer active:scale-95 transition-all py-0.5 px-1 rounded touch-manipulation"
                >
                  {copiedOnly ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span className="text-emerald-700 font-bold">{t.copiedOnly}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600 stroke-[2]" />
                      <span>{t.copyOnly}</span>
                    </>
                  )}
                </button>

                {/* Edit / Done button */}
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold cursor-pointer active:scale-95 transition-all py-0.5 px-1 rounded touch-manipulation"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                      <span className="text-indigo-600 font-bold">{t.doneBtn}</span>
                    </>
                  ) : (
                    <>
                      <Pencil className="w-3.5 h-3.5 text-slate-600 stroke-[2]" />
                      <span>{t.editBtn}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* PRIMARY BUTTON: COPY & POST TO GOOGLE */}
          <button
            type="button"
            onClick={handleCopyAndPost}
            className={`w-full min-h-[52px] py-3.5 px-5 rounded-2xl font-bold text-base transition-all duration-150 cursor-pointer active:scale-[0.98] shadow-md shadow-indigo-600/20 touch-manipulation flex items-center justify-center gap-2.5 ${
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
                <ExternalLink className="w-4 h-4 stroke-[2.5] text-white" />
                <span>{t.mainBtn}</span>
              </>
            )}
          </button>

          {/* SECONDARY BUTTON: REGENERATE */}
          <button
            type="button"
            onClick={handleRegenerate}
            className="w-full min-h-[48px] py-3 px-5 rounded-2xl font-bold text-sm sm:text-base bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-xs cursor-pointer active:scale-[0.98] transition-all touch-manipulation flex items-center justify-center gap-2"
          >
            <Sparkles className={`w-4 h-4 text-indigo-600 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{t.regenerateBtn}</span>
          </button>

          {/* SIMPLE HELPFUL 1-LINE INSTRUCTION */}
          <p className="text-center text-[10px] sm:text-[11px] font-semibold text-slate-500 pt-0.5">
            {t.helperText}
          </p>

        </section>
      </main>

      {/* 4. FOOTER: OFFICE CONTACT PHONES */}
      <footer className="w-full max-w-sm mx-auto text-center pt-2 pb-0.5 border-t border-slate-200 text-[10px] sm:text-[11px] text-slate-500 space-y-0.5">
        <div className="flex items-center justify-center gap-2">
          <PhoneCall className="w-3 h-3 text-indigo-600 shrink-0" />
          <span>{t.callUs}</span>
          <a href="tel:7567529600" className="text-indigo-600 font-bold hover:underline">7567529600</a>
          <span>•</span>
          <a href="tel:7567529700" className="text-indigo-600 font-bold hover:underline">7567529700</a>
        </div>
        <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1">
          <span>સાવન ટ્રાવેલ્સ</span>
          <HeartHandshake className="w-2.5 h-2.5 text-rose-500 inline" />
        </p>
      </footer>

    </div>
  );
}
