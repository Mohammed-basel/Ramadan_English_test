import { useEffect, useRef, useState } from 'react';
import { ChevronDown, PhoneCall } from 'lucide-react';
import { Lang } from '../lib/lang';

type Props = {
  lang: Lang;
  phone?: string;
};

/**
 * Compact "Complaints" callout:
 * - Shows icon + one word by default.
 * - Expands on hover (desktop) and on click/tap (mobile).
 * - Accessible: keyboard focus + Esc to close.
 */
export function ComplaintsPill({ lang, phone = '129' }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const title = lang === 'en' ? 'Complaints' : 'الشكاوى';
  const full =
    lang === 'en'
      ? `For complaints or inquiries about prices, please contact the Ministry of National Economy at: ${phone}`
      : `لتقديم الشكاوى أو الاستفسارات حول الأسعار يرجى التواصل مع وزارة الاقتصاد الوطني على الرقم: ${phone}`;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className={
            "w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 shadow-sm transition " +
            "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          }
          aria-expanded={open}
          aria-label={title}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-blue-200">
                <PhoneCall className="h-5 w-5 text-blue-700" />
              </span>

              <div className={lang === 'en' ? 'text-left' : 'text-right'}>
                <div className="font-semibold">{title}</div>
                {open && (
                  <div className="mt-1 text-sm text-blue-800 leading-relaxed">
                    {full}
                  </div>
                )}
              </div>
            </div>

            <ChevronDown
              className={`h-5 w-5 text-blue-700 transition ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
