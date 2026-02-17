import React, { useMemo, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import { ProductWithPrices } from '../types';
import { formatWeekLabel } from '../lib/weekLabels';
import { Lang } from '../lib/lang';
import { t } from '../lib/i18n';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

type ViewMode = 'all' | 'price' | 'change';

const persistentRefLinePlugin: Plugin = {
  id: 'persistentRefLine',
  afterDraw: (chart) => {
    const anyChart = chart as any;
    const { ctx, chartArea, scales } = anyChart;
    const yBar = scales?.yBar;
    const opts = (anyChart.options?.plugins as any)?.persistentRefLine;
    if (!ctx || !chartArea || !yBar || !opts?.display) return;
    if (opts.refValue === undefined || opts.refValue === null) return;

    const yPos = yBar.getPixelForValue(opts.refValue);
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.strokeStyle = '#dc2626';
    ctx.moveTo(chartArea.left, yPos);
    ctx.lineTo(chartArea.right, yPos);
    ctx.stroke();
    ctx.restore();
  },
};

const whiteBackgroundPlugin: Plugin = {
  id: 'whiteBackground',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

ChartJS.register(persistentRefLinePlugin);
ChartJS.register(whiteBackgroundPlugin);

interface PriceChartProps {
  products: ProductWithPrices[];
  currentWeek?: number;
  lang: Lang;
}

export function PriceChart({ products, currentWeek = 1, lang }: PriceChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const chartRef = useRef<any>(null);

  // Chart is designed for 1 selected product; if multiple selected, pick first.
  const product = products.length ? products[0] : null;

  const { labels, weeklyPrices, pctVsRef, refValue } = useMemo(() => {
    if (!product) return { labels: [], weeklyPrices: [], pctVsRef: [], refValue: 0 };

    const sorted = [...(product.prices || [])]
      .filter((p) => p.week_number <= currentWeek)
      .sort((a, b) => a.week_number - b.week_number);

    const lbls = sorted.map((p) => formatWeekLabel(p.week_number, lang as any, p.week_date));
    const prices = sorted.map((p) => Number(p.price ?? 0));

    const ref = Number((product as any).reference_price ?? (product as any).referencePrice ?? 0);
    const pct = prices.map((x) => (ref > 0 ? ((x - ref) / ref) * 100 : 0));

    return { labels: lbls, weeklyPrices: prices, pctVsRef: pct, refValue: ref };
  }, [product, currentWeek, lang]);

  const datasetBarLabel = lang === 'ar' ? 'السعر الأسبوعي' : 'Weekly price';
  const datasetLineLabel = lang === 'ar' ? 'التغيّر % عن الاسترشادي' : '% change vs indicative';

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        ...(viewMode === 'all' || viewMode === 'price'
          ? [
              {
                type: 'bar' as const,
                label: datasetBarLabel,
                data: weeklyPrices,
                yAxisID: 'yBar',
              },
            ]
          : []),
        ...(viewMode === 'all' || viewMode === 'change'
          ? [
              {
                type: 'line' as const,
                label: datasetLineLabel,
                data: pctVsRef,
                yAxisID: 'yLine',
                tension: 0.3,
                pointRadius: 3,
              },
            ]
          : []),
      ],
    };
  }, [labels, weeklyPrices, pctVsRef, viewMode, datasetBarLabel, datasetLineLabel]);

  const options: ChartOptions<'bar'> = useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const tickSize = isMobile ? 11 : 13;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
        persistentRefLine: { display: true, refValue: refValue },
      } as any,
      scales: {
        x: { ticks: { font: { size: tickSize } } },
        yBar: { position: 'left', beginAtZero: true },
        yLine: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false } },
      },
    };
  }, [refValue]);

  const downloadChart = () => {
    const chart = chartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image('image/png', 1);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chart_week_${currentWeek}.png`;
    a.click();
  };

  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">{t('chartTitle', lang)}</h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              className={`px-3 py-2 text-sm font-bold ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode('all')}
            >
              {t('all', lang)}
            </button>
            <button
              className={`px-3 py-2 text-sm font-bold ${viewMode === 'price' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode('price')}
            >
              {lang === 'ar' ? 'السعر' : 'Price'}
            </button>
            <button
              className={`px-3 py-2 text-sm font-bold ${viewMode === 'change' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setViewMode('change')}
            >
              {lang === 'ar' ? 'التغير' : 'Change'}
            </button>
          </div>

          <button
            onClick={downloadChart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            {t('downloadChart', lang)}
          </button>
        </div>
      </div>

      <div className="relative h-[420px]">
        <Chart ref={chartRef} type="bar" data={data as any} options={options} />
      </div>
    </div>
  );
}
