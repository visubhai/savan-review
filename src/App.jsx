import React, { useState, useCallback } from 'react';
import { generateReview } from './utils/reviewGenerator';
import { RefreshCw, Star, ExternalLink, Check, Copy, HeartHandshake, PhoneCall } from 'lucide-react';

export const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJoZ0ZYgBP4DsRglX2PXFQ7rk';

const CONTENT = {
  gu: {
    title: 'સાવન ટ્રાવેલ્સ',
    subtitle: 'સુરત • અમદાવાદ • મુંબઈ • પુણે • રાજકોટ',
    question: 'કેવો રહ્યો તમારો સફર?',
    subquestion: '૫-સ્ટાર રિવ્યૂ આપીને અમને પ્રોત્સાહિત કરો',
    changeText: '🔄 બીજું લખાણ',
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
    subquestion: 'Rate us 5-stars to support us',
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
    subquestion: 'हमें 5-स्टार रेटिंग देकर प्रोत्साहित करें',
    changeText: '🔄 नया टेक्स्ट',
    mainBtn: '⭐ गूगल पर 5-Star रिव्यू दें',
    mainBtnSub: '(१ क्लिक में कॉपी होगा और गूगल खुलेगा)',
    copiedToast: '✓ कॉपी हो गया! गूगल खुल रहा है...',
    step1: '१. गूगल पर 5-स्टार (⭐⭐⭐⭐⭐) चुनें',
    step2: '२. कीबोर्ड से टेक्स्ट पेस्ट करें और "Post" दबाएं',
    callUs: 'ऑफिस पूछताछ:'
  }
};

export default function App() {
  const [lang, setLang] = useState('gu');
  const [reviewText, setReviewText] = useState(() => generateReview(['staff', 'timing', 'parcel'], 'gu'));
  const [copied, setCopied] = useState(false);

  const t = CONTENT[lang] || CONTENT.gu;

  // Change Language
  const handleLang = (newLang) => {
    setLang(newLang);
    setReviewText(generateReview(['staff', 'timing', 'parcel'], newLang));
  };

  // Shuffle Review
  const handleShuffle = () => {
    setReviewText(generateReview(['staff', 'timing', 'parcel'], lang));
  };

  // 1-Tap Copy & Open Google
  const handleAction = async () => {
    if (!reviewText) return;

    // Haptic feedback for mobile
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

    // Immediate Google launch (no blocking delays)
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 300);

    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col justify-between p-4 selection:bg-orange-500 selection:text-white">
      
      {/* TOP HEADER: BRAND + LANGUAGE TOGGLE */}
      <div className="w-full max-w-sm mx-auto flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <img
            src="/savan-logo.png"
            alt="Savan Travels"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500 shadow-md shrink-0"
          />
          <div>
            <h1 className="text-base font-black tracking-tight text-white leading-none">
              {t.title}
            </h1>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* COMPACT LANGUAGE SWITCHER */}
        <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => handleLang('gu')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              lang === 'gu' ? 'bg-orange-500 text-white font-black' : 'text-slate-400'
            }`}
          >
            ગુજ
          </button>
          <button
            type="button"
            onClick={() => handleLang('en')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              lang === 'en' ? 'bg-orange-500 text-white font-black' : 'text-slate-400'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => handleLang('hi')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              lang === 'hi' ? 'bg-orange-500 text-white font-black' : 'text-slate-400'
            }`}
          >
            हिं
          </button>
        </div>
      </div>

      {/* CENTER CARD: RATING + REVIEW BUBBLE + GIANT BUTTON */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-4 py-2">
        
        {/* BIG 5-STAR RATING DISPLAY */}
        <div className="text-center space-y-1">
          <div className="inline-flex gap-1.5 text-amber-400 p-1">
            <Star className="w-7 h-7 fill-amber-400 stroke-amber-500 animate-pulse" />
            <Star className="w-7 h-7 fill-amber-400 stroke-amber-500 animate-pulse" />
            <Star className="w-7 h-7 fill-amber-400 stroke-amber-500 animate-pulse" />
            <Star className="w-7 h-7 fill-amber-400 stroke-amber-500 animate-pulse" />
            <Star className="w-7 h-7 fill-amber-400 stroke-amber-500 animate-pulse" />
          </div>
          <h2 className="text-lg font-black text-white tracking-tight">
            {t.question}
          </h2>
          <p className="text-xs text-amber-200/90 font-semibold">
            {t.subquestion}
          </p>
        </div>

        {/* READY-MADE REVIEW TEXT BOX */}
        <div className="relative bg-white text-slate-800 rounded-2xl p-4 shadow-2xl border-2 border-amber-400/80">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full text-sm sm:text-base font-bold text-slate-900 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed p-0"
            rows={4}
            aria-label="Review text"
          />

          <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100 text-xs font-bold text-slate-400">
            <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-extrabold">
              ✓ 5-Star Rating Ready
            </span>
            <button
              type="button"
              onClick={handleShuffle}
              className="text-orange-600 hover:text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200 cursor-pointer active:scale-95 transition-all flex items-center gap-1 text-[11px] font-black"
            >
              <RefreshCw className="w-3 h-3 text-orange-600" />
              <span>{t.changeText}</span>
            </button>
          </div>
        </div>

        {/* THE GIANT 1-TAP REVIEW BUTTON */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleAction}
            className={`w-full min-h-[66px] py-4 px-4 rounded-2xl font-black transition-all duration-200 cursor-pointer active:scale-95 shadow-2xl touch-manipulation flex flex-col items-center justify-center border ${
              copied
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white border-emerald-400 ring-4 ring-emerald-500/40 shadow-emerald-500/40'
                : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 border-orange-400 ring-4 ring-orange-400/50 shadow-orange-500/50 google-glow-active'
            }`}
          >
            {copied ? (
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 stroke-[3] text-white animate-bounce" />
                <span className="text-base tracking-wide text-white">{t.copiedToast}</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-base sm:text-lg">
                  <Star className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
                  <span className="tracking-tight">{t.mainBtn}</span>
                  <ExternalLink className="w-4 h-4 opacity-90 stroke-[3] shrink-0" />
                </div>
                <span className="text-[11px] text-slate-900/90 font-bold mt-0.5">
                  {t.mainBtnSub}
                </span>
              </>
            )}
          </button>

          {/* ULTRA-SIMPLE 2-STEP INSTRUCTION */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-center text-xs space-y-1">
            <p className="font-extrabold text-amber-300 text-[11px]">
              {t.step1}
            </p>
            <p className="font-bold text-slate-300 text-[11px]">
              {t.step2}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER: CONTACT PHONES */}
      <div className="w-full max-w-sm mx-auto text-center pt-2 pb-1 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-center gap-2">
          <PhoneCall className="w-3 h-3 text-amber-400" />
          <span>{t.callUs}</span>
          <a href="tel:7567529600" className="text-amber-400 font-extrabold hover:underline">7567529600</a>
          <span>•</span>
          <a href="tel:7567529700" className="text-amber-400 font-extrabold hover:underline">7567529700</a>
        </div>
        <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <span>સાવન ટ્રાવેલ્સ</span>
          <HeartHandshake className="w-3 h-3 text-rose-500 inline" />
        </p>
      </div>

    </div>
  );
}
