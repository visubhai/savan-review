import React from 'react';
import { MousePointerClick, Sparkles } from 'lucide-react';

export function KeyboardVisualMockup({ lang = 'gu', reviewPreview = 'સાવન ટ્રાવેલ્સ સાથે ખૂબ જ સારો અનુભવ રહ્યો...' }) {
  const isGu = lang === 'gu';
  const isHi = lang === 'hi';

  const tipText = isGu
    ? 'ગૂગલ ખુલે એટલે તમારા કીબોર્ડ પર આ રીતે લખાણ દેખાશે — ફક્ત તેના પર ટચ કરો!'
    : isHi
    ? 'गूगल खुलते ही आपके कीबोर्ड के ऊपर यह टेक्स्ट दिखेगा — बस उस पर टच करें!'
    : 'On Google, tap this copied text bar right above your keyboard!';

  return (
    <div className="w-full bg-slate-900/95 border border-amber-500/40 rounded-2xl p-3.5 shadow-2xl space-y-2.5 text-center">
      <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>સૌથી સરળ રીત (The Easiest Way)</span>
      </div>

      <p className="text-xs text-amber-100 font-semibold leading-relaxed px-1">
        {tipText}
      </p>

      {/* PHONE KEYBOARD SIMULATION */}
      <div className="bg-slate-950 rounded-xl p-2 border border-slate-800 shadow-inner max-w-xs mx-auto space-y-1.5">
        
        {/* GBOARD CLIPBOARD SUGGESTION PILL (THE MAGIC TRICK) */}
        <div className="relative">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-[11px] py-1.5 px-3 rounded-lg flex items-center justify-between shadow-md ring-2 ring-amber-300 animate-pulse">
            <span className="truncate max-w-[200px] text-left">
              📋 {reviewPreview}
            </span>
            <span className="bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-black shrink-0 ml-1.5 flex items-center gap-0.5">
              <MousePointerClick className="w-3 h-3 text-amber-400" />
              <span>ટચ કરો</span>
            </span>
          </div>

          {/* BOUNCING FINGER ARROW INDICATOR */}
          <div className="absolute -top-3 -right-2 text-xl bounce-arrow">
            👇
          </div>
        </div>

        {/* MINI DUMMY KEYBOARD KEYS */}
        <div className="space-y-1 pt-1 opacity-40 select-none pointer-events-none">
          <div className="flex justify-center gap-1 text-[9px] font-mono text-slate-400">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <span key={k} className="bg-slate-800 w-5 h-6 rounded flex items-center justify-center border border-slate-700">{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1 text-[9px] font-mono text-slate-400">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <span key={k} className="bg-slate-800 w-5 h-6 rounded flex items-center justify-center border border-slate-700">{k}</span>
            ))}
          </div>
          <div className="flex justify-center gap-1 text-[9px] font-mono text-slate-400">
            <span className="bg-slate-800 w-16 h-5 rounded flex items-center justify-center text-[8px]">SPACE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
