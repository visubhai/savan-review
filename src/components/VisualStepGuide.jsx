import React from 'react';
import { Star, Smartphone, Send, MousePointerClick } from 'lucide-react';

export function VisualStepGuide({ t }) {
  return (
    <div className="w-full bg-slate-900/90 text-white rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <span className="text-lg">💡</span>
        <h3 className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-wide uppercase">
          {t.steps.title}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* STEP 1 */}
        <div className="bg-slate-800/80 rounded-xl p-2.5 flex flex-col items-center text-center border border-slate-700/60 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs mb-1.5 ring-1 ring-amber-400/40">
            1
          </div>
          <div className="flex gap-0.5 text-amber-400 mb-1">
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-200 leading-tight">
            5-Star આપો
          </p>
          <span className="text-[9px] text-slate-400 mt-0.5">
            (Select 5 Stars)
          </span>
        </div>

        {/* STEP 2 */}
        <div className="bg-slate-800/80 rounded-xl p-2.5 flex flex-col items-center text-center border border-slate-700/60 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs mb-1.5 ring-1 ring-emerald-400/40">
            2
          </div>
          <div className="bg-slate-950 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400 border border-emerald-500/40 mb-1 flex items-center gap-1">
            <MousePointerClick className="w-2.5 h-2.5" />
            <span>Paste / ટચ</span>
          </div>
          <p className="text-[11px] font-bold text-slate-200 leading-tight">
            કીબોર્ડથી Paste
          </p>
          <span className="text-[9px] text-slate-400 mt-0.5">
            (Tap suggestion)
          </span>
        </div>

        {/* STEP 3 */}
        <div className="bg-slate-800/80 rounded-xl p-2.5 flex flex-col items-center text-center border border-slate-700/60 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs mb-1.5 ring-1 ring-blue-400/40">
            3
          </div>
          <div className="text-blue-400 mb-1">
            <Send className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] font-bold text-slate-200 leading-tight">
            'Post' દબાવો
          </p>
          <span className="text-[9px] text-slate-400 mt-0.5">
            (Done!)
          </span>
        </div>
      </div>

      {/* KEYBOARD SMART HINT */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2 flex items-center gap-2 text-left">
        <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-[10px] text-amber-200 leading-snug font-medium">
          <strong>સરળ રીત:</strong> ગૂગલમાં બોક્સ પર ટચ કરશો એટલે તમારા મોબાઇલ કીબોર્ડની ઉપર જ આખું લખાણ દેખાશે, ફક્ત તેના પર ટચ કરો!
        </p>
      </div>
    </div>
  );
}
