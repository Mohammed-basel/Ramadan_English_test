import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Lang } from '../lib/lang';

type Props = {
  open: boolean;
  onClose: () => void;
  lang?: Lang;
};

const FAQS_AR: { q: string; a: string }[] = [
  { q: "لماذا لا تظهر بعض السلع في الرسم؟", a: "يجب تحديد السلعة من القائمة أولاً. إذا لم تظهر بيانات لسلعة معينة في أسبوع ما فهذا يعني عدم توفر رصد سعري لها في ذلك الأسبوع." },
  { q: "ما المقصود بالسعر الاسترشادي؟", a: "هو السعر الصادر عن وزارة الاقتصاد الوطني، وتتم مقارنة متوسط السعر المرصود به لقياس مستوى الالتزام." },
  { q: "كيف يتم احتساب نسبة الالتزام؟", a: "يتم اعتبار السلعة ملتزمة إذا كان التغير أقل من 5% مقارنة بالسعر الاسترشادي، ثم تُحسب نسبة السلع الملتزمة من إجمالي السلع المختارة." }
];

const FAQS_EN: { q: string; a: string }[] = [
  { q: "Why don’t some commodities appear in the chart?", a: "Select a commodity from the list first. If a commodity has no data for a given week, it means no price observations were recorded for that week." },
  { q: "What is the indicative price?", a: "It is the price issued by the Ministry of National Economy, and weekly average observed prices are compared against it to measure compliance." },
  { q: "How is the compliance rate calculated?", a: "A commodity is considered compliant if the change is less than 5% compared to the indicative price. The compliance rate is the share of compliant commodities out of the selected set." }
];

export function FaqModal({ open, onClose, lang = 'ar' }: Props) {
  const faqs = lang === 'en' ? FAQS_EN : FAQS_AR;
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="إغلاق"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-lg sm:text-xl font-black text-blue-900">{lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="إغلاق"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto p-5 text-right">
            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <details
                  key={idx}
                  className="group border rounded-xl bg-gray-50 open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer select-none px-4 py-3 font-bold text-gray-900 list-none">
                    <div className="flex items-start justify-between gap-3">
                      <span className="leading-7">{item.q}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-700 leading-7 whitespace-pre-line">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-5 flex justify-start">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
