import { useMemo, useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Info, X } from 'lucide-react';
import { PriceChange, ProductWithPrices } from '../types';
import { Lang } from '../lib/lang';
import { t } from '../lib/i18n';

interface KPICardsProps {
  maxIncrease: PriceChange | null;
  maxDecrease: PriceChange | null;
  currentWeek: number;
  products: ProductWithPrices[];
  adherencePercent?: number;
  lang: Lang;
}

function formatSignedPercent(v: number, decimals = 2) {
  const sign = v > 0 ? '+' : v < 0 ? '−' : '';
  return `${sign}${Math.abs(v).toFixed(decimals)}%`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function badgeLevel(value: number) {
  // same thresholds as your progress bar logic idea: >=70 good, >=40 warn, else bad
  if (value >= 70) return 'good';
  if (value >= 40) return 'warn';
  return 'bad';
}

export function KPICards({ maxIncrease, maxDecrease, currentWeek, products, adherencePercent, lang }: KPICardsProps) {
  const [open, setOpen] = useState(false);

  const adherence = useMemo(() => {
    if (typeof adherencePercent === 'number') return clamp(adherencePercent, 0, 100);

    // Fallback: count products with abs(change vs ref) < 5%
    const total = products.length || 1;
    let ok = 0;

    for (const p of products) {
      const weekPrice = Number(p.prices?.find((x: any) => x.week_number === currentWeek)?.price ?? 0);
      const refPrice = Number((p as any).reference_price ?? 0);
      if (refPrice <= 0) continue;

      const pct = ((weekPrice - refPrice) / refPrice) * 100;
      if (Math.abs(pct) < 5) ok += 1;
    }

    return clamp((ok / total) * 100, 0, 100);
  }, [adherencePercent, products, currentWeek]);

  const level = badgeLevel(adherence);

  const barClass =
    level === 'good' ? 'bg-green-500' : level === 'warn' ? 'bg-amber-500' : 'bg-red-500';

  const levelText =
    level === 'good'
      ? (lang === 'ar' ? 'مستوى التزام مرتفع' : 'High level of commitment')
      : level === 'warn'
      ? (lang === 'ar' ? 'مستوى التزام متوسط' : 'Medium level of commitment')
      : t('kpiLowCommitment', lang);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      {/* Compliance */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-gray-700">{t('kpiCompliance', lang)}</div>
            <div className="text-3xl font-black text-gray-900 mt-2 tabular-nums">{adherence.toFixed(0)}%</div>
            <div className="text-sm font-bold mt-1 text-gray-600">{levelText}</div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 text-gray-700 font-bold"
          >
            <Info className="w-4 h-4" />
            {t('methodologyTitle', lang)}
          </button>
        </div>

        <div className="mt-4 h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${barClass}`}
            style={{ width: `${clamp(adherence, 0, 100)}%` }}
          />
        </div>
      </div>

      {/* Highest increase */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-red-50">
            <TrendingUp className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-sm font-extrabold text-gray-700">{t('kpiMaxIncrease', lang)}</div>
        </div>

        {maxIncrease ? (
          <>
            <div className="text-lg font-black text-gray-900">{maxIncrease.product.name}</div>
            <div className="mt-2 text-2xl font-black text-red-700 tabular-nums">{formatSignedPercent(maxIncrease.percent, 2)}</div>
          </>
        ) : (
          <div className="text-gray-500 font-semibold">—</div>
        )}
      </div>

      {/* Largest decrease */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-green-50">
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-sm font-extrabold text-gray-700">{t('kpiMaxDecrease', lang)}</div>
        </div>

        {maxDecrease ? (
          <>
            <div className="text-lg font-black text-gray-900">{maxDecrease.product.name}</div>
            <div className="mt-2 text-2xl font-black text-green-700 tabular-nums">{formatSignedPercent(maxDecrease.percent, 2)}</div>
          </>
        ) : (
          <div className="text-gray-500 font-semibold">—</div>
        )}
      </div>

      {/* Week highlight */}
      <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-extrabold text-gray-700">{t('weekLabel', lang)}</div>
          <div className="text-3xl font-black text-blue-900 mt-2">{currentWeek}</div>
        </div>
        <div className="p-3 rounded-2xl bg-blue-50">
          <AlertTriangle className="w-6 h-6 text-blue-700" />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-xl font-black text-gray-900">{t('methodologyTitle', lang)}</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed">
              {t('methodologyText', lang)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
