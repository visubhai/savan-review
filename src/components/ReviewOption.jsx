import React from 'react';

export function ReviewOption({ option, isSelected, onToggle }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-pressed={isSelected}
      onClick={() => onToggle(option.id)}
      className={`chip-transition min-h-[46px] w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 select-none border text-left cursor-pointer active:scale-95 touch-manipulation shadow-xs ${
        isSelected
          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400 shadow-md shadow-orange-500/25 ring-2 ring-orange-400/40 font-bold'
          : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/90 active:bg-slate-100'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base leading-none shrink-0" aria-hidden="true">
          {option.icon}
        </span>
        <span className="truncate font-semibold tracking-tight">{option.label}</span>
      </div>

      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
          isSelected
            ? 'bg-white text-orange-600 shadow-xs'
            : 'border border-slate-300 text-transparent'
        }`}
      >
        ✓
      </div>
    </button>
  );
}
