import React from 'react';

export function ReviewOption({ option, isSelected, onToggle }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-pressed={isSelected}
      onClick={() => onToggle(option.id)}
      className={`chip-transition min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 select-none border text-left cursor-pointer active:scale-95 touch-manipulation ${
        isSelected
          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold ring-2 ring-amber-400/50'
          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-xs'
      }`}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {option.icon}
      </span>
      <span className="truncate">{option.label}</span>
      {isSelected && (
        <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/20 text-slate-950 text-xs">
          ✓
        </span>
      )}
    </button>
  );
}
