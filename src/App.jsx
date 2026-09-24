import React, { useState, useCallback } from 'react';
import { MAIN_CHIPS } from './data/reviews';
import { generateReview } from './utils/reviewGenerator';
import { RefreshCw, Star, ExternalLink, Check, HeartHandshake, PhoneCall } from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

const CONTENT = {
  gu: {
    title: 'સાવન ટ્રાવેલ્સ',
    subtitle: 'સુરત • અમદાવાદ • મુંબઈ • પુણે • રાજકોટ',
    question: 'કેવો રહ્યો તમારો સફર?',
    subquestion: 'પસંદ કરો તમને શું ગમ્યું (ટેપ કરીને બદલો):',
    changeText: '🔄 નવું લખાણ',
    mainBtn: '⭐ ગૂગલ પર 5-Star રિવ્યૂ આપો',
    mainBtnSub: '(૧ ક્લિકમાં લખાણ કૉપી થશે & ગૂગલ ખુલશે)',
    copiedToast: '✓ લખાણ કૉપી થઈ ગયું! ગૂગલ ખુલે છે...',
    step1: '૧. ગૂગલ પર 5-સ્ટાર (⭐⭐⭐⭐⭐) આપો',
    step2: '૨. કીબોર્ડ પરથી લખાણ દબાવો & "Post" કરો',
    callUs: 'ઓફિસ પૂછપરછ:'
  },
  en: {
    title: 'SAVAN TRAVELS',
    subtitle: 'Surat • Ahmedabad • Mumbai • Pune • Rajkot',
    question: 'How was your trip?',
    subquestion: 'Tap what you liked to customize:',
    changeText: '🔄 Change text',
    mainBtn: '⭐ Post 5-Star Review on Google',
    mainBtnSub: '(1-Tap: Copies review & opens Google)',
    copiedToast: '✓ Copied! Opening Google Review...',
    step1: '1. Select 5 Stars (⭐⭐⭐⭐⭐) on Google',
    step2: '2. Tap copied text on keyboard & tap "Post"',
    callUs: 'Office Inquiry:'
  },
  hi: {
    title: 'सावन ट्रैवल्स',
    subtitle: 'सूरत • अहमदाबाद • मुंबई • पुणे • राजकोट',
    question: 'कैसा रहा आपका सफर?',
    subquestion: 'आपको क्या पसंद आया (चुनें):',
    changeText: '🔄 नया टेक्स्ट',
    mainBtn: '⭐ गूगल पर 5-Star रिव्यू दें',
    mainBtnSub: '(१ क्लिक में कॉपी होगा और गूगल खुलेगा)',
    copiedToast: '✓ कॉपी हो गया! गूगल खुल रहा है...',
    step1: '१. गूगल पर 5-स्टार (⭐⭐⭐⭐⭐) चुनें',
    step2: '२. कीबोर्ड से टेक्स्ट पेस्ट करें और "Post" दबाएं',
    callUs: 'ऑफिस पूछताछ:'
  }
};

// Default active chips: Staff, Timing, Parcel
const DEFAULT_SELECTED = ['staff', 'timing', 'parcel'];

export default function App() {
  const [lang, setLang] = useState('gu');
  const [selectedChips, setSelectedChips] = useState(DEFAULT_SELECTED);
  const [reviewText, setReviewText] = useState(() => generateReview(DEFAULT_SELECTED, 'gu'));
  const [copied, setCopied] = useState(false);

  const t = CONTENT[lang] || CONTENT.gu;

  // Change Language
  const handleLang = (newLang) => {
    setLang(newLang);
    setReviewText(generateReview(selectedChips, newLang));
  };

  // Toggle Chip
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

  // Shuffle Review
  const handleShuffle = () => {
    setReviewText(generateReview(selectedChips, lang));
  };

  // 1-Tap Copy & Open Google
  const handleAction = async () => {
    if (!reviewText) return;

    // Mobile Haptic feedback
    try {
      if (navigator.vibrate) navigator.vibrate(60);
    } catch (e) {}

    // Clipboard Copy
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(reviewText);
        success = true;
      } catch (e) {}
    }
    if (!success) {
      try {
        const ta = document.createElement('textarea');
        ta.value = reviewText;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      } catch (e) {}
    }

    setCopied(true);

    // Immediate Google launch
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 300);

    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between p-3.5 sm:p-4 selection:bg-orange-500 selection:text-white relative overflow-hidden">
      {/* Ambient subtle top brand glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-orange-600/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* TOP HEADER: BRAND */}
      <div className="w-full max-w-sm mx-auto flex items-center justify-between pt-1 relative z-10">
        <div className="flex items-center gap-2.5">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500/30 shadow-md shrink-0"
          />
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-none">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>5-Star Review</span>
        </div>
      </div>

      {/* PROMINENT VISIBLE LANGUAGE TOGGLE: GUJARATI | ENGLISH | HINDI */}
      <div className="w-full max-w-sm mx-auto mt-2.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-sm relative z-10">
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => handleLang('gu')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 touch-manipulation active:scale-95 ${
              lang === 'gu'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>ગુજરાતી</span>
            {lang === 'gu' && <span className="text-[10px]">✓</span>}
          </button>
          <button
            type="button"
            onClick={() => handleLang('en')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 touch-manipulation active:scale-95 ${
              lang === 'en'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>English</span>
            {lang === 'en' && <span className="text-[10px]">✓</span>}
          </button>
          <button
            type="button"
            onClick={() => handleLang('hi')}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 touch-manipulation active:scale-95 ${
              lang === 'hi'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>हिंदी</span>
            {lang === 'hi' && <span className="text-[10px]">✓</span>}
          </button>
        </div>
      </div>

      {/* CENTER WORKSPACE: RATING + REVIEW BUBBLE + MAIN 8 CHIPS + GIANT BUTTON */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-3 py-1 relative z-10">
        
        {/* 5-STAR HEADING */}
        <div className="text-center space-y-1">
          <div className="inline-flex gap-1 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
            {t.question}
          </h2>
        </div>

        {/* READY-MADE REVIEW TEXT BOX */}
        <div className="relative bg-slate-900/90 backdrop-blur-md text-slate-100 rounded-2xl p-3.5 shadow-xl border border-slate-700/80">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full text-xs sm:text-sm font-normal text-slate-100 placeholder-slate-500 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed p-0"
            rows={3}
            aria-label="Review text"
          />

          <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-slate-800 text-[11px]">
            <span className="text-amber-400/90 flex items-center gap-1 font-semibold text-[10px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
              <span>5-Star Rating Ready</span>
            </span>
            <button
              type="button"
              onClick={handleShuffle}
              className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-2 py-0.5 rounded-md border border-slate-700/80 cursor-pointer active:scale-95 transition-all flex items-center gap-1 text-[10px] font-semibold"
            >
              <RefreshCw className="w-2.5 h-2.5 text-orange-400" />
              <span>{t.changeText}</span>
            </button>
          </div>
        </div>

        {/* MAIN CHOICE CHIPS (8 CHIPS IN 4x2 GRID) */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 text-center">
            {t.subquestion}
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            {MAIN_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.id);
              const chipLabel = chip.label[lang] || chip.label.gu;

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleToggleChip(chip.id)}
                  className={`min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-1.5 transition-all cursor-pointer active:scale-95 touch-manipulation border ${
                    isSelected
                      ? 'bg-orange-500/15 text-orange-200 border-orange-500/60 shadow-sm shadow-orange-500/10'
                      : 'bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 border-slate-800/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm shrink-0">{chip.icon}</span>
                    <span className="truncate">{chipLabel}</span>
                  </div>
                  <span className={`text-[11px] font-bold shrink-0 ${isSelected ? 'text-orange-400' : 'text-slate-600'}`}>
                    {isSelected ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE GIANT 1-TAP REVIEW BUTTON */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleAction}
            className={`w-full min-h-[60px] py-3 px-4 rounded-2xl font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-lg touch-manipulation flex flex-col items-center justify-center border ${
              copied
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/40 shadow-emerald-900/30'
                : 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-orange-400/30 shadow-orange-950/40 executive-glow'
            }`}
          >
            {copied ? (
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 stroke-[2.5] text-white" />
                <span className="text-sm sm:text-base font-bold tracking-wide text-white">{t.copiedToast}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-base font-bold">
                  <Star className="w-4 h-4 fill-white text-white shrink-0" />
                  <span className="tracking-tight">{t.mainBtn}</span>
                  <ExternalLink className="w-4 h-4 opacity-90 stroke-[2.5] shrink-0" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/90 font-medium mt-0.5">
                  {t.mainBtnSub}
                </span>
              </>
            )}
          </button>

          {/* ULTRA-SIMPLE 2-STEP INSTRUCTION */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2 text-center text-xs space-y-0.5">
            <p className="font-semibold text-amber-300 text-[10px] sm:text-[11px]">
              {t.step1}
            </p>
            <p className="font-medium text-slate-400 text-[10px] sm:text-[11px]">
              {t.step2}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER: CONTACT PHONES */}
      <div className="w-full max-w-sm mx-auto text-center pt-2 pb-0.5 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 space-y-0.5 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <PhoneCall className="w-3 h-3 text-orange-400 shrink-0" />
          <span>{t.callUs}</span>
          <a href="tel:7567529600" className="text-orange-400 font-semibold hover:underline">7567529600</a>
          <span>•</span>
          <a href="tel:7567529700" className="text-orange-400 font-semibold hover:underline">7567529700</a>
        </div>
        <p className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
          <span>સાવન ટ્રાવેલ્સ</span>
          <HeartHandshake className="w-2.5 h-2.5 text-slate-500 inline" />
        </p>
      </div>

    </div>
  );
}
