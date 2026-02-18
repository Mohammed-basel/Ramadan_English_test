import { useMemo, useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import { PriceChange, ProductWithPrices } from '../types';
import { Lang, dirFromLang } from '../lib/lang';
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

export function KPICards({
  maxIncrease,
  maxDecrease,
  currentWeek,
  products,
  adherencePercent,
  lang,
}: KPICardsProps) {
  const [openMethodology, setOpenMethodology] = useState(false);
  const dir = dirFromLang(lang);

  const computedAdherence = useMemo(() => {
    if (typeof adherencePercent === 'number') return clamp(adherencePercent, 0, 100);
    if (!products?.length) return 0;

    // Fallback: count products whose observed price <= indicative price (very simple proxy)
    const count = products.reduce((acc, p) => {
      const price = p.prices.find(x => x.week_number === currentWeek)?.price ?? 0;
      const ref = p.reference_price ?? 0;
      if (ref <= 0) return acc;
      return price <= ref ? acc + 1 : acc;
    }, 0);

    return Math.round((count / products.length) * 100);
  }, [adherencePercent, products, currentWeek]);

  const adherence = computedAdherence;
  const adherenceLevel = adherence >= 70 ? 'good' : adherence >= 40 ? 'warn' : 'bad';

  const adherenceStyles =
    adherenceLevel === 'good'
      ? {
          ring: 'bg-green-100',
          text: 'text-green-700',
          value: 'text-green-700',
          icon: <CheckCircle2 className="text-green-600" width={34} height={34} />,
          hint: t('kpiHighCommitment', lang),
        }
      : adherenceLevel === 'warn'
      ? {
          ring: 'bg-amber-100',
          text: 'text-amber-800',
          value: 'text-amber-800',
          icon: <AlertTriangle className="text-amber-600" width={34} height={34} />,
          hint: t('kpiNeedsMonitoring', lang),
        }
      : {
          ring: 'bg-red-100',
          text: 'text-red-700',
          value: 'text-red-700',
          icon: <AlertTriangle className="text-red-600" width={34} height={34} />,
          hint: t('kpiLowCommitment', lang),
        };

  return (
    <>
      <div dir={dir} className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        {/* Adherence */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
          <div className={`${adherenceStyles.ring} rounded-full p-4 flex-shrink-0`}>
            {adherenceStyles.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-gray-700 font-bold text-base mb-1">
              {t('kpiCompliance', lang)}
            </h3>

            <div className="flex items-end justify-between gap-3">
              <p className={`text-3xl font-black ${adherenceStyles.value}`}>
                {adherence}%
              </p>
              <p className={`text-sm font-semibold ${adherenceStyles.text}`}>
                {adherenceStyles.hint}
              </p>
            </div>

            <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden" aria-label={t('kpiCompliance', lang)}>
              <div className="h-2 rounded-full bg-blue-600" style={{ width: `${adherence}%` }} />
            </div>

            <div className="mt-2 text-xs text-gray-500">
              {t('weekLabel', lang)} {currentWeek}
            </div>
          </div>
        </div>

        {/* Max increase */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-gray-700 font-bold text-base mb-1">{t('kpiMaxIncrease', lang)}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {t('weeklyComparedToIndicative', lang)} {currentWeek}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
              <TrendingUp className="text-red-600" width={28} height={28} />
            </div>
          </div>

          {maxIncrease ? (
            <div className="mt-4">
              <p className="font-bold text-gray-900 truncate">{maxIncrease.productName}</p>
              <p className="text-3xl font-black text-red-600 mt-2">
                {formatSignedPercent(maxIncrease.percentChange, 1)}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">{t('loading', lang)}</p>
          )}
        </div>

        {/* Max decrease */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-gray-700 font-bold text-base mb-1">{t('kpiMaxDecrease', lang)}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {t('weeklyComparedToIndicative', lang)} {currentWeek}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
              <TrendingDown className="text-green-600" width={28} height={28} />
            </div>
          </div>

          {maxDecrease ? (
            <div className="mt-4">
              <p className="font-bold text-gray-900 truncate">{maxDecrease.productName}</p>
              <p className="text-3xl font-black text-green-600 mt-2">
                {formatSignedPercent(maxDecrease.percentChange, 1)}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">{t('loading', lang)}</p>
          )}
        </div>

        {/* Methodology quick card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-gray-700 font-bold text-base mb-2">{t('methodologyTitle', lang)}</h3>
              <p className="text-sm text-gray-600">
                {t('methodologySummary', lang)}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
              <Info className="text-blue-600" width={28} height={28} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenMethodology(true)}
            className="mt-4 inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
          >
            {t('viewDetails', lang)}
          </button>
        </div>
      </div>

      {/* Methodology modal */}
      {openMethodology && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpenMethodology(false)} />
          <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
            <div className={`flex items-center justify-between p-4 border-b ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <h3 className="text-xl font-black text-gray-800">{t('methodologyTitle', lang)}</h3>
              <button
                type="button"
                onClick={() => setOpenMethodology(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label={t('close', lang)}
              >
                <X />
              </button>
            </div>

            <div dir={dir} className={`p-5 max-h-[70vh] overflow-auto ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {/* Render as pre to keep official line breaks & bullets */}
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-900">
{t('methodologyText', lang)}
              </pre>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setOpenMethodology(false)}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
              >
                {t('close', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
