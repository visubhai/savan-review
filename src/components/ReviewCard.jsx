import React, { useRef, useEffect } from 'react';
import { Edit3, Sparkles, MessageSquareQuote } from 'lucide-react';

export function ReviewCard({ reviewText, onChangeText }) {
  const textareaRef = useRef(null);

  // Auto-adjust height smoothly based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [reviewText]);

  return (
    <div className="relative rounded-2xl glass-card p-4 sm:p-5 border border-slate-200 shadow-xl shadow-slate-900/10 transition-all duration-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/30">
      
      {/* Card Header Tag */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-lg border border-orange-200/60 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
          <span>Your Customized Review</span>
        </div>
        
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
          <Edit3 className="w-3.5 h-3.5 text-slate-400" />
          <span>Tap text to edit</span>
        </div>
      </div>

      {/* Textarea Input */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={reviewText}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Select tags below to build your review or type here..."
          className="w-full text-slate-800 text-base leading-relaxed font-semibold bg-transparent border-0 focus:ring-0 focus:outline-none resize-none p-1 placeholder:text-slate-400"
          aria-label="Editable review text"
          rows={4}
        />
      </div>

      {/* Card Footer Meta */}
      <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1 text-slate-500">
          <MessageSquareQuote className="w-3.5 h-3.5 text-orange-500" />
          Ready to post
        </span>
        <span className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-600">
          {reviewText.length} characters
        </span>
      </div>
    </div>
  );
}
