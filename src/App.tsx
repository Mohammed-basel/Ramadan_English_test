import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Download, Filter } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { PriceChart } from './components/PriceChart';
import { KPICards } from './components/KPICards';
import { ProductTicker } from './components/ProductTicker';
import { sampleProducts } from './data/sampleProducts';
import { loadDataFromCSV } from './lib/csvLoader';
import { Lang, getLangFromUrl, dirFromLang } from './lib/lang';
import { t } from './lib/i18n';
import { formatWeekLabel } from './lib/weekLabels';
import { calculatePriceChange, getChangeCategory } from './lib/calc';
import { ProductWithPrices } from './types';

type FilterType = 'all' | 'increase' | 'decrease' | 'stable';

function App() {
  const [products, setProducts] = useState<ProductWithPrices[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [maxWeek, setMaxWeek] = useState<number>(1);
  const [usingSampleData, setUsingSampleData] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const lang: Lang = useMemo(() => getLangFromUrl(), []);
  const dir = useMemo(() => dirFromLang(lang), [lang]);

  // Mobile UX: after selecting from dropdown, auto-scroll to chart after a short delay (small screens only)
  const chartScrollTimerRef = useRef<number | null>(null);

  // UX: keep the *default* (first-load) highlighted product visible without scrolling,
  // but do NOT reshuffle cards when the user makes selections.
  const [initialTopId, setInitialTopId] = useState<string | null>(null);
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const ALL_VALUE = '__all__';
  
const adherenceByWeek: Record<number, number> = {
  1: 24,
  2: 28,
  3: 24,
};

const manualAdherence = adherenceByWeek[currentWeek] ?? 0;

  
  const weekOptions = useMemo(() => {
    const map = new Map<number, string>();
    for (const p of products) {
      for (const pr of p.prices) {
        if (!map.has(pr.week_number) && pr.week_date) {
          map.set(pr.week_number, pr.week_date);
        }
      }
    }

    return Array.from({ length: maxWeek }, (_, i) => {
      const w = i + 1;
      const weekDate = map.get(w);
      return { w, label: formatWeekLabel(w, lang, weekDate) };
    });
  }, [products, maxWeek]);

  const sortArabic = (a: string, b: string) => a.localeCompare(b, 'ar', { sensitivity: 'base' });

  const getMaxWeek = (items: ProductWithPrices[]) =>
    Math.max(...items.flatMap((p) => p.prices.map((pr) => pr.week_number)), 1);

  const getHighestIncreaseProductId = (items: ProductWithPrices[], week: number) => {
    if (!items.length) return null;
    const changes = items.map((p) => calculatePriceChange(p, week));
    const max = changes.reduce((m, x) => (x.percent > m.percent ? x : m), changes[0]);
    return max?.product?.id ?? null;
  };

  // If embedded in an iframe, notify parent page with our height (PCBS integration).
  useEffect(() => {
    const sendHeight = () => {
      if (window.self !== window.top) {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({ type: 'pcbs-iframe-resize', height }, '*');
      }
    };

    sendHeight();
    window.addEventListener('resize', sendHeight);

    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);

  const useSampleData = () => {
    const sorted = [...sampleProducts].sort((a, b) => sortArabic(a.name, b.name));
    const mw = getMaxWeek(sorted);
    setProducts(sorted);
    setMaxWeek(mw);
    setCurrentWeek(mw);
    const defId = getHighestIncreaseProductId(sorted, mw);
    setSelectedId(defId);
    setInitialTopId(defId);
    setHasUserSelected(false);
    setUsingSampleData(true);
  };

  async function loadData() {
    setLoading(true);
    try {
      const data = await loadDataFromCSV(lang);
      if (!data || data.length === 0) throw new Error('No data found in CSV files');

      const sorted = [...data].sort((a, b) => sortArabic(a.name, b.name));
      const mw = getMaxWeek(sorted);
      setProducts(sorted);
      setMaxWeek(mw);
      setCurrentWeek(mw);
      const defId = getHighestIncreaseProductId(sorted, mw);
      setSelectedId(defId);
      setInitialTopId(defId);
      setHasUserSelected(false);
      setUsingSampleData(false);
    } catch (error) {
      console.error('CSV load failed. Falling back to sample data.', error);
      useSampleData();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const scrollToProduct = (id: string) => {
    // First try the wrapper element id, then fallback to the button id.
    const el = document.getElementById(`product-${id}`) ?? document.getElementById(`product-btn-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToChart = () => {
    const chartEl = document.getElementById('chart-section');
    if (!chartEl) return;
    chartEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectProduct = (id: string | null, source: 'dropdown' | 'card' | 'other' = 'other') => {
    // User-driven selection (dropdown/card) should not reshuffle the list.
    setHasUserSelected(true);
    setSelectedId(id);

    // If the user picks a specific commodity from the dropdown, price-change filtering should be reset.
    // (Price-change filter is intended for the 'All commodities' list.)
    if (source === 'dropdown' && id !== null) {
      setFilterType('all');
    }

    // Cancel any pending chart auto-scroll when selection changes.
    if (chartScrollTimerRef.current) {
      window.clearTimeout(chartScrollTimerRef.current);
      chartScrollTimerRef.current = null;
    }

    if (id) {
      // Let React paint selection styles before scrolling.
      window.setTimeout(() => scrollToProduct(id), 50);

      // Small screens only: after selecting (dropdown or card), scroll to chart after 3 seconds.
      const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;
      if ((source === 'dropdown' || source === 'card') && isSmallScreen) {
        chartScrollTimerRef.current = window.setTimeout(() => {
          scrollToChart();
          chartScrollTimerRef.current = null;
        }, 1500);
      }
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = true;

      const priceChange = calculatePriceChange(product, currentWeek);
      const category = getChangeCategory(priceChange.percent);

      let matchesFilter = true;
      if (filterType === 'increase') matchesFilter = category === 'increase';
      if (filterType === 'decrease') matchesFilter = category === 'decrease';
      if (filterType === 'stable') matchesFilter = category === 'stable';

      return matchesSearch && matchesFilter;
    });
  }, [products, filterType, currentWeek]);

  const weekDirectionCounts = useMemo(() => {
    let up = 0;
    let down = 0;
    for (const p of filteredProducts) {
      const ch = calculatePriceChange(p, currentWeek);
      const cat = getChangeCategory(ch.percent);
      if (cat === 'increase') up += 1;
      if (cat === 'decrease') down += 1;
    }
    return { up, down };
  }, [filteredProducts, currentWeek]);

  const displayedProducts = useMemo(() => {
    // Only on FIRST load: place the default-highlighted product at the top.
    // After the user interacts, keep the original alphabetical order.
    const list = [...filteredProducts];
    if (hasUserSelected || !initialTopId) return list;

    const idx = list.findIndex((p) => p.id === initialTopId);
    if (idx <= 0) return list;
    const [picked] = list.splice(idx, 1);
    list.unshift(picked);
    return list;
  }, [filteredProducts, hasUserSelected, initialTopId]);


  const selectedProduct = selectedId ? products.find((p) => p.id === selectedId) || null : null;

  const allPriceChanges = useMemo(
    () => products.map((p) => calculatePriceChange(p, currentWeek)),
    [products, currentWeek]
  );

  const maxIncrease = useMemo(() => {
    if (allPriceChanges.length === 0) return null;
    return allPriceChanges.reduce((max, item) => (item.percent > max.percent ? item : max), allPriceChanges[0]);
  }, [allPriceChanges]);

  const maxDecrease = useMemo(() => {
    if (allPriceChanges.length === 0) return null;
    return allPriceChanges.reduce((min, item) => (item.percent < min.percent ? item : min), allPriceChanges[0]);
  }, [allPriceChanges]);

  const exportToExcel = async () => {
    const headers = lang === 'en'
      ? ['Commodity', 'Week', 'Weekly Price', 'Indicative Price', '% Change vs Indicative', 'NIS Change vs Indicative', 'Previous Week Price', '% Change vs Previous', 'NIS Change vs Previous']
      : ['المنتج', 'الأسبوع', 'السعر الأسبوعي', 'السعر الاسترشادي', 'التغيّر عن الاسترشادي %', 'التغيّر عن الاسترشادي (NIS)', 'السعر للأسبوع السابق', 'التغيّر عن الأسبوع السابق %', 'التغيّر عن الأسبوع السابق (NIS)'];

    const rows = filteredProducts.map((product) => {
      const weekPrice = product.prices.find((p) => p.week_number === currentWeek)?.price ?? 0;
      const prevPrice = currentWeek > 1 ? product.prices.find((p) => p.week_number === currentWeek - 1)?.price ?? 0 : 0;

      const diffRef = weekPrice - product.reference_price;
      const pctRef = product.reference_price ? (diffRef / product.reference_price) * 100 : 0;

      const diffPrev = weekPrice - prevPrice;
      const pctPrev = prevPrice ? (diffPrev / prevPrice) * 100 : 0;

      return [
        product.name,
        currentWeek,
        weekPrice.toFixed(2),
        Number(product.reference_price).toFixed(2),
        pctRef.toFixed(1),
        diffRef.toFixed(2),
        prevPrice.toFixed(2),
        pctPrev.toFixed(1),
        diffPrev.toFixed(2),
      ];
    });

// Export as XLSX (Excel)
const XLSX = await import('xlsx');

const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Prices');

const arrayBuffer: ArrayBuffer = XLSX.write(workbook, {
  bookType: 'xlsx',
  type: 'array',
}) as any;

const blob = new Blob([arrayBuffer], {
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.setAttribute('download', `ramadan_prices_week_${currentWeek}.xlsx`);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">{lang === 'en' ? 'Loading...' : 'جاري التحميل...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50" dir={dir}>
      <div className="max-w-[1800px] mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-black text-blue-900 leading-tight">
            {t('headerTitle', lang)}
          </h1>
          <p className="text-lg text-gray-600 font-semibold mt-3">
            {t('headerSubtitle', lang)}
          </p>
            <div className="mt-4 mx-auto max-w-4xl">
              <div
                className={`text-gray-800 ${lang === 'en' ? 'text-left' : 'text-right'}`}
                style={{
                  fontSize: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <p className="font-semibold">
                  <span className="text-gray-700">{t('currentUpdate', lang)}</span>
                </p>
              <p className="font-semibold">
                {lang === 'en' ? (
                  <>
                    <span className="text-gray-700">Next Update:</span> Monday, 23/2/2026 at 10:00 AM
                  </>
                ) : (
                  <>
                    <span className="text-gray-700">التحديث القادم:</span> الاثنين الموافق 23/2/2026 الساعة 10:00 صباحًا
                  </>
                )}
              </p>
              </div>
            </div>
        </header>

        {usingSampleData && (
          <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {lang === 'en'
              ? <>Sample data is being displayed. To show real data, place CSV files inside the <span className="font-bold">/data/</span> folder on the server (products.csv and weekly_prices.csv).</>
              : <>يتم عرض بيانات تجريبية. لعرض البيانات الحقيقية ضع ملفات CSV داخل مجلد <span className="font-bold">/data/</span> على الخادم (products.csv و weekly_prices.csv).</>
            }
          </div>
        )}



      <KPICards lang={lang} 
        products={products}
        currentWeek={currentWeek}
        maxIncrease={maxIncrease}
        maxDecrease={maxDecrease}
        adherencePercent={manualAdherence}
      />
                  <div className={`bg-blue-50 border border-blue-200 rounded-xl p-3 ${lang === 'en' ? 'text-left' : 'text-right'} text-sm leading-6`}>
                    <i class="fa-solid fa-phone ml-2 mr-2"></i>
            {lang === 'en'
              ? <>Ministry of National Economy complaints number: <span className="font-black ml-2">129</span></>
              : <>رقم وزارة الاقتصاد الوطني لتقديم الشكاوى: <span className="font-black mr-2">129</span></>
            }
          </div>
        <ProductTicker
          lang={lang}
          products={products}
          currentWeek={currentWeek}
          selectedId={selectedId}
          onSelectProduct={(id) => selectProduct(String(id), 'dropdown')}
        />
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Select commodity' : 'اختيار السلعة'}</label>
              <select
                value={selectedId ?? ALL_VALUE}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === ALL_VALUE) selectProduct(null, 'dropdown');
                  else selectProduct(v, 'dropdown');
                }}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
              >
                <option value={ALL_VALUE}>{lang === 'en' ? 'All' : 'الكل'}</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Price change' : 'تغير السعر'}</label>
              <div className="flex gap-2">
                <Filter className="text-gray-400 w-5 h-5 self-center" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as FilterType)}
                  disabled={selectedId !== null}
                  className={`flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors ${
                    selectedId !== null ? 'opacity-50 cursor-not-allowed' : 'focus:border-blue-600'
                  }`}
                >
                  <option value="all">{lang === 'en' ? 'All' : 'الكل'}</option>
                  <option value="increase">{lang === 'en' ? 'Price increase' : 'ارتفاع الأسعار'}</option>
                  <option value="decrease">{lang === 'en' ? 'Price decrease' : 'انخفاض الأسعار'}</option>
                  <option value="stable">{lang === 'en' ? 'Stable' : 'مستقرة'}</option>
                </select>
              </div>
            </div>

            <div className="w-full md:w-[220px]">
              <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'en' ? 'Week' : 'الأسبوع'}</label>
              <select
                value={currentWeek}
                onChange={(e) => setCurrentWeek(Number(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
              >
                {weekOptions.map(({ w, label }) => (
                  <option key={w} value={w}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={exportToExcel}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              {lang === 'en' ? 'Export Excel' : 'تصدير Excel'}
            </button>
          </div>

<div className="mt-3 text-sm text-gray-600 flex items-center gap-2 whitespace-nowrap leading-none">
  <span className="font-semibold">{lang === 'en' ? 'Commodities:' : 'عدد السلع:'}</span>
  <span className="font-bold text-blue-600">{filteredProducts.length}</span>

  <span className="mx-2 text-gray-300">|</span>

  <span className="inline-flex items-center gap-1 text-red-700 font-semibold">
    <ArrowUp className="w-4 h-4" />
    {weekDirectionCounts.up}
  </span>

  <span className="text-gray-300">/</span>

  <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
    <ArrowDown className="w-4 h-4" />
    {weekDirectionCounts.down}
  </span>
</div>

</div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8">
          <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2" style={{minHeight:"400px",maxHeight: "650px"}}>
            <div className="grid grid-cols-1 gap-4 px-4 py-2">
              {displayedProducts.map((product) => (
                <div key={product.id} id={`product-${product.id}`}>
                  <ProductCard lang={lang} 
                    product={product}
                    isSelected={selectedId === product.id}
                    isDimmed={!!selectedId && selectedId !== product.id}
                    onToggle={() => selectProduct(product.id, 'card')}
                    isHighestIncrease={maxIncrease?.product.id === product.id}
                    isLowestDecrease={maxDecrease?.product.id === product.id}
                    currentWeek={currentWeek}
                  />
                </div>
              ))}
            </div>
          </div>

          <div id="chart-section">
            {selectedProduct ? (
              <PriceChart language={lang}  products={[selectedProduct]} currentWeek={currentWeek} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-xl text-gray-500 font-semibold">{lang === 'en' ? 'Select a commodity from the list to view the chart' : 'اختر سلعة من القائمة لعرض الرسم البياني'}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;