import React, { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Lang } from '../lib/lang';

interface PriceEntry {
  week_number: number;
  price: number | string;
  week_date?: string;
}

export interface ProductWithPrices {
  id: string | number;
  name: string;
  display_order?: number;
  reference_price?: number | string;
  prices: PriceEntry[];
}

function getLatestPrice(p: ProductWithPrices, week: number): number {
  const v = p.prices?.find((x) => x.week_number === week)?.price;
  return Number(v ?? 0);
}

function getPrevPrice(p: ProductWithPrices, week: number): number {
  if (week <= 1) return 0;
  const v = p.prices?.find((x) => x.week_number === week - 1)?.price;
  return Number(v ?? 0);
}

function computeDirection(current: number, prev: number): 'up' | 'down' | 'flat' {
  const diff = current - prev;
  if (diff > 0) return 'up';
  if (diff < 0) return 'down';
  return 'flat';
}

interface ProductTickerProps {
  products: ProductWithPrices[];
  currentWeek: number;
  selectedId: string | null;
  onSelectProduct: (id: string) => void;
  lang: Lang;
}

export function ProductTicker({ products, currentWeek, selectedId, onSelectProduct, lang }: ProductTickerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = useMemo(() => {
    return products.map((p) => {
      const cur = getLatestPrice(p, currentWeek);
      const prev = getPrevPrice(p, currentWeek);
      const dir = computeDirection(cur, prev);
      const diff = cur - prev;
      const pct = prev > 0 ? (diff / prev) * 100 : 0;
      return { ...p, cur, prev, dir, diff, pct };
    });
  }, [products, currentWeek]);

  const label = lang === 'ar' ? 'متوسط أسعار الأسبوع' : 'Weekly average prices';

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="font-extrabold text-gray-800">{label} {currentWeek}</div>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex gap-4 whitespace-nowrap ${isPaused ? '' : 'animate-ticker'}`}>
          {items.concat(items).map((p, idx) => {
            const active = selectedId && String(p.id) === String(selectedId);
            const Icon = p.dir === 'up' ? ArrowUp : p.dir === 'down' ? ArrowDown : Minus;

            return (
              <button
                key={`${p.id}-${idx}`}
                onClick={() => onSelectProduct(String(p.id))}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-bold text-gray-800">{p.name}</span>
                <span className="text-gray-500 tabular-nums">{p.cur.toFixed(2)}</span>

                <span
                  className={`inline-flex items-center gap-1 font-bold tabular-nums ${
                    p.dir === 'up' ? 'text-red-700' : p.dir === 'down' ? 'text-green-700' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {p.prev > 0 ? `${p.pct > 0 ? '+' : p.pct < 0 ? '−' : ''}${Math.abs(p.pct).toFixed(1)}%` : '—'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
