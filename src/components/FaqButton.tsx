import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Lang } from '../lib/lang';

export function FaqButton({ onClick, lang }: { onClick: () => void; lang: Lang }) {
  const label = lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة';
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      title={label}
      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
    >
      <HelpCircle width={22} height={22} />
    </button>
  );
}
