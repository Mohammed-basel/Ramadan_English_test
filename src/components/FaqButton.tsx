import React from "react";
import { HelpCircle } from "lucide-react";

export function FaqButton({ onClick, lang }: { onClick: () => void; lang: 'ar' | 'en' }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
      title={lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
    >
      <HelpCircle size={22} />
    </button>
  );
}
