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
  { q: "كيف يتم احتساب نسبة الالتزام؟", a: "يتم اعتبار السلعة ملتزمة إذا كان التغير أقل من 5% مقارنة بالسعر الاسترشادي، ثم تُحسب نسبة السلع الملتزمة من إجمالي السلع المختارة." },
  { q: "كم عدد السلع التي تشملها المنصة؟", a: "تشمل المنصة 25 سلعة أساسية يزداد استهلاكها خلال شهر رمضان المبارك، من بينها الأرز والزيت واللحوم والدواجن والبيض والسكر والتمور وغيرها." },
  { q: "ما هي المحافظات التي تغطيها البيانات؟", a: "تغطي البيانات 8 محافظات رئيسية في الضفة الغربية: جنين، ونابلس، وقلقيلية، وطولكرم، ورام الله والبيرة، وأريحا، وبيت لحم، والخليل." },
  { q: "كم مرة يتم تحديث البيانات؟", a: "يتم تحديث البيانات بشكل أسبوعي خلال شهر رمضان المبارك." },
  { q: "ما الفرق بين السعر الأسبوعي والسعر الاسترشادي؟", a: "السعر الأسبوعي هو متوسط الأسعار المرصودة فعلياً في الأسواق لتلك الأسبوع، أما السعر الاسترشادي فهو السعر الذي حددته وزارة الاقتصاد الوطني كسعر مرجعي عادل للسلعة." },
  { q: "كيف يمكنني تنزيل البيانات؟", a: "يمكنك تنزيل البيانات بصيغة Excel بالضغط على زر 'تصدير Excel' الموجود في لوحة الفلترة أعلى الصفحة." },
  { q: "ما معنى الأسهم الحمراء والخضراء في بطاقات المنتجات؟", a: "السهم الأحمر يشير إلى أن سعر السلعة أعلى من السعر الاسترشادي (ارتفاع)، والسهم الأخضر يشير إلى أن سعر السلعة أقل من السعر الاسترشادي (انخفاض)." },
];

const FAQS_EN: { q: string; a: string }[] = [
  { q: "Why don't some commodities appear in the chart?", a: "Select a commodity from the list first. If a commodity has no data for a given week, it means no price observations were recorded for that week." },
  { q: "What is the indicative price?", a: "It is the price issued by the Ministry of National Economy. Weekly average observed prices are compared against it to measure compliance." },
  { q: "How is the compliance rate calculated?", a: "A commodity is considered compliant if the change is less than 5% compared to the indicative price. The compliance rate is the share of compliant commodities out of the 25 selected commodities." },
  { q: "How many commodities does the platform cover?", a: "The platform covers 25 essential commodities whose consumption increases significantly during Ramadan, including rice, oil, meat, poultry, eggs, sugar, dates, and more." },
  { q: "Which governorates does the data cover?", a: "The data covers 8 major governorates in the West Bank: Jenin, Nablus, Qalqilya, Tulkarm, Ramallah and Al-Bireh, Jericho, Bethlehem, and Hebron." },
  { q: "How often is the data updated?", a: "Data is updated weekly throughout the month of Ramadan." },
  { q: "What is the difference between the weekly price and the indicative price?", a: "The weekly price is the average of prices actually observed in markets during that week. The indicative price is the reference price set by the Ministry of National Economy as a fair benchmark for the commodity." },
  { q: "How can I download the data?", a: "You can download the data in Excel format by clicking the 'Export Excel' button in the filter panel at the top of the page." },
  { q: "What do the red and green arrows on product cards mean?", a: "A red arrow means the commodity's price is above the indicative price (increase). A green arrow means it is below the indicative price (decrease)." },
];

export function FaqModal({ open, onClose, lang = 'ar' }: Props) {
  const faqs = lang === 'en' ? FAQS_EN : FAQS_AR;
  const dir = lang === 'en' ? 'ltr' : 'rtl';
  const textAlign = lang === 'en' ? 'text-left' : 'text-right';

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
        aria-label="Close"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b" dir={dir}>
            <h2 className="text-lg sm:text-xl font-black text-blue-900">{lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`max-h-[75vh] overflow-y-auto p-5 ${textAlign}`} dir={dir}>
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

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold"
              >
                {lang === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
