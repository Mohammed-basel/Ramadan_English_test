import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Lang } from '../lib/lang';

type Props = {
  open: boolean;
  onClose: () => void;
  lang?: Lang;
};

const FAQS_AR: { q: string; a: string }[] = [
  {
    q: "لماذا لا تشمل المنصة التفاعلية بيانات لقطاع غزة؟",
    a: "بسبب العدوان الإسرائيلي والحالة الاستثنائية، شهدت مستويات الأسعار في قطاع غزة ارتفاعاً حاداً وتقلبات غير مسبوقة وغير طبيعية، حيث تعتمد بدرجة كبيرة على الكميات التي يسمح لها بالدخول عبر المعابر المختلفة المسيطر عليها من قبل الاحتلال الإسرائيلي، إضافة إلى فقدان أسواق القطاع للعديد من السلع الأساسية وخاصة الطازج منها مثل اللحوم الحمراء والدواجن وغيرها. بالمجمل لا يمكن ضبط مستويات الأسعار في ظل هذه الأوضاع.\n\nهذا لا يعني بأن الجهاز لا يقوم بتجميع الأسعار في قطاع غزة، بل على العكس تماماً، الجهاز يقوم بتجميع الأسعار الاستهلاكية في قطاع غزة ويتم إصدار مؤشر أسعار المستهلك في القطاع.",
  },
  {
    q: "هل البيانات في الضفة تشمل القدس؟",
    a: "لا تشمل البيانات محافظة القدس، كون الأسواق فيها غير خاضعة لمنظومة الاقتصاد الفلسطيني بحكم الاحتلال، وبالتالي هناك اختلاف في مستويات الأسعار، ولا يوجد أسعار استرشادية تفرضها وزارة الاقتصاد الوطني لمحافظة القدس نتيجة لخضوع أسواقها للسيطرة الإسرائيلية. ولكن يتم تجميع بيانات الأسعار الاستهلاكية من قبل الجهاز في أسواق البلدة القديمة.",
  },
  {
    q: "لماذا لا توجد سلع مثل البندورة؟",
    a: "تم التركيز في اختيار السلع على سلع تموينية ذات طابع رمضاني يكثر الإقبال عليها في موائد رمضان كالأرز واللحوم والدواجن وغيرها. وهذا لا يعني أن سلعة مثل البندورة وغيرها غير مهمة؛ فحسب طبيعة السلع الاستهلاكية هناك سلع مهمة على مدار العام مثل معظم الخضروات.",
  },
  {
    q: "لماذا عدد السلع المختارة 25 سلعة؟",
    a: "تم اختيار سلع ذات طابع رمضاني يزداد الإقبال عليها، وتم التوافق فيها مع وزارة الاقتصاد الوطني لتوفير سعر استرشادي قابل للمقارنة مع متوسطات الأسعار المجموعة من قبل الجهاز المركزي للإحصاء.",
  },
  {
    q: "لماذا لا تجمع الأسعار بشكل يومي؟",
    a: "الرصد الأسبوعي يعبر عن وتيرة رصد للأسعار مناسبة للسلع التي تم اختيارها، بالاعتماد على سلاسل البيانات المتوفرة في الإحصاء الفلسطيني، فهي تمتاز بوتيرة تغير سعري منخفض، بمعنى لا تتغير بشكل يومي، وإنما وتيرة التغير في مستويات أسعارها متباعدة زمنياً. ولكن لاستشراف وجود أي تلاعب أو استغلال، تم تحديد المدى الزمني الأسبوعي لرصد أسعارها.",
  },
  {
    q: "كيف تم تحديد السعر الاسترشادي؟",
    a: "يتم الاستناد إلى عدة معايير في تحديد السعر الاسترشادي والذي هو بالأساس من قبل وزارة الاقتصاد الفلسطينية:\n\nأولاً: سلسلة أسعار هذه السلع المتوفرة في الإحصاء الفلسطيني وهي سلسلة بيانات شهرية منذ العام 1996، يستند إليها كمعيار لتحديد مستوى السعر المناسب.\n\nثانياً: تقوم وزارة الاقتصاد بفحص مستويات الأسعار في المراحل المختلفة للسلعة، سعر الإنتاج وسعر الجملة وسعر المستهلك وسعر الاستيراد للسلع المستوردة، وتحديد هامش الربح العادل لجميع الأطراف من المورد والمستهلك والتاجر.",
  },
  {
    q: "هل هذه المنصة متاحة للجميع، وهل سيتم تعميمها على باقي السنة؟",
    a: "نعم متاحة للجميع، وسيتم تطويرها مستقبلاً. هي حالياً تخدم 7 أسابيع منها 4 خلال شهر رمضان المبارك.",
  },
  {
    q: "لماذا لا تجمع الأسعار على مستوى المحافظة؟",
    a: "حسب طبيعة أسواق الضفة الغربية والتي تعتبر من حيث النطاق الجغرافي صغيرة ومتقاربة، وطبيعة السلع التي تغطيها المنصة والتي تتميز بتقارب أسعارها بين أسواق محافظات الضفة الغربية، وكذلك السعر الاسترشادي الذي يغطي الضفة الغربية. وهذا ينسجم مع منهجية جمع البيانات في الإحصاء الفلسطيني التي صممت بهذه المعايير لتغطي متوسطات الأسعار وتغيرها على مستوى الضفة الغربية.",
  },
  {
    q: "هل يتم محاسبة من لم يلتزم بالسعر الاسترشادي، وكيف؟",
    a: "تتولى الجهات الرسمية ممثلة بوزارة الاقتصاد تساندها جمعية حماية المستهلك، المتابعة والرقابة الميدانية والمحاسبة للمتجاوزين تبعاً للقوانين ذات العلاقة. فيما يقتصر دور الجهاز المركزي للإحصاء على رصد مستويات الأسعار وتتبع حركة واتجاهات التغير فيها، بغرض توفير أرقام إحصائية محايدة وموثوقة.",
  },
  {
    q: "عند جمع أسعار سلعة واحدة هل يتم الاكتفاء بتسعيرة واحدة من مكان واحد أو يتم جمع أكثر من تسعيرة ولأكثر من مكان؟",
    a: "منهجية جمع الأسعار تعتمد على توفير عدة مشاهدات سعرية تمكن من احتساب متوسط حسابي ممثل لسعر السلعة. حيث يتم تجميع حوالي 1650 مشاهدة سعرية بمعدل 412 تسعيرة بشكل أسبوعي لهذه السلع، لتحقيق أكبر تغطية جغرافية تغطي تباين الأسعار لهذه السلع للمنافذ بمستوياتها وأحجامها المختلفة في كل محافظة. وهي تُجمع من حوالي 600 منفذ بيع موزعة على مدار الفترة بين مختلف المحافظات.",
  },
];

const FAQS_EN: { q: string; a: string }[] = [
  {
    q: "Why doesn't the interactive platform include data for the Gaza Strip?",
    a: "Due to the Israeli aggression and the exceptional circumstances, price levels in the Gaza Strip have witnessed a sharp rise and unprecedented, abnormal fluctuations. These fluctuations are largely dependent on the quantities allowed to enter through the various crossings controlled by the Israeli occupation. Furthermore, the Strip's markets have lost many essential goods, especially fresh produce such as red meat, poultry, and others. Overall, it is impossible to control price levels under these conditions.\n\nThis does not mean that the PCBS does not collect prices in Gaza Strip. On the contrary, the PCBS collects consumer prices in Gaza Strip and publishes a Consumer Price Index (CPI) for the Strip.",
  },
  {
    q: "Does the West Bank data include Jerusalem?",
    a: "The data does not include the Jerusalem Governorate because its markets are not subject to the Palestinian economic system due to the occupation. Consequently, there are differences in price levels, and the Ministry of National Economy does not impose indicative prices for the Jerusalem Governorate because its markets are under Israeli control. However, the PCBS does collect consumer price data for the markets in the Old City.",
  },
  {
    q: "Why are essential commodities like tomatoes not included?",
    a: "The selection of goods focused on staple foods associated with Ramadan, such as rice, meat, and poultry, which are in high demand during the holy month. This does not mean that items like tomatoes are unimportant; given the nature of consumer goods, some items, like most vegetables, are essential year-round.",
  },
  {
    q: "Why were 25 goods selected?",
    a: "Goods with increased demand during Ramadan were chosen, and the selection was coordinated with the Ministry of National Economy to provide indicative prices comparable to the average prices collected by the Palestinian Central Bureau of Statistics.",
  },
  {
    q: "Why aren't prices collected daily?",
    a: "Weekly monitoring reflects a suitable price tracking frequency for the selected goods, based on the data series available at the PCBS. These goods are characterized by a low price change rate, meaning they do not change daily but rather over longer time intervals. However, to detect any manipulation or exploitation, a weekly timeframe was established for monitoring their prices.",
  },
  {
    q: "How was the indicative price determined?",
    a: "The Ministry of National Economy primarily uses several criteria to determine the indicative price:\n\nFirst: The price series for these goods available at the PCBS — a monthly data series dating back to 1996 — serves as the benchmark for determining the appropriate price level.\n\nSecond: The Ministry examines price levels at different stages of the commodity's supply chain: the production price, the wholesale price, the consumer price, and the import price for imported goods. It then determines a fair profit margin for all parties: the supplier, the consumer, and the retailer.",
  },
  {
    q: "Is this platform available to everyone, and will it be rolled out for the rest of the year?",
    a: "Yes, it is available to everyone and will be further developed in the future. Currently, it operates for seven weeks, four of which are during the holy month of Ramadan.",
  },
  {
    q: "Why aren't prices compiled at the governorate level?",
    a: "This is due to the nature of the West Bank markets, which are geographically small and close together. The platform covers goods whose prices are similar across the West Bank governorates, and the indicative price also covers the entire West Bank. This aligns with the PCBS data collection methodology, which is designed to cover average prices and their fluctuations across the West Bank.",
  },
  {
    q: "Are those who do not adhere to the indicative price held accountable, and how?",
    a: "Official bodies, represented by the Ministry of National Economy and supported by the Palestinian Society for Consumer Protection, are responsible for field monitoring and holding violators accountable according to relevant laws. The PCBS role is limited to monitoring price levels and tracking price movements and trends, in order to provide neutral and reliable statistical data.",
  },
  {
    q: "When collecting prices for a single commodity, is one price from one location sufficient, or are multiple prices collected from multiple locations?",
    a: "The price collection methodology relies on multiple price observations, enabling the calculation of a representative average price for each commodity. Approximately 1,650 price observations are collected, averaging 412 price quotes per week for these commodities, to achieve the broadest geographical coverage and reflect price diversity across outlets of varying sizes and levels in each governorate. Data is collected from approximately 600 retail outlets distributed across the various governorates throughout the monitoring period.",
  },
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
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b" dir={dir}>
            <h2 className="text-lg sm:text-xl font-black text-blue-900">
              {lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close"
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
                      <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0">▾</span>
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
