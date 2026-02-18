import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Lang, dirFromLang } from '../lib/lang';

type Props = {
  open: boolean;
  onClose: () => void;
  lang: Lang;
};

const FAQS: Record<Lang, { q: string; a: string }[]> = {
  ar: [
  {
    "q": "لماذا لا تشمل المنصة التفاعلية بيانات لقطاع غزه؟",
    "a": "بسبب العدوان الإسرائيلي والحالة الاستثنائية، شهدت مستويات الأسعار في قطاع غزة ارتفاعا حادا وتقلبات غير مسبوقة، وغير طبيعية، حيث تعتمد بدرجة كبيرة على الكميات التي يسمح لها بالدخول عير المعابر المختلفة المسيطر عليها من قبل الاحتلال الإسرائيلي، إضافة إلى فقدان أسواق القطاع العديد من السلع الأساسية وخاصة الطازج منها مثل اللحوم الحمراء والدواجن وغيرها، بالمجمل لا يمكن ضبط مستويات الأسعار في ظل هذه الاوضاع.\n\nوهذا ولا يعني بأن الجهاز لا يقوم بتجميع الأسعار في قطاع غزة بل على العكس تماماً، الجهاز يقوم بتجميع الأسعار الاستهلاكية في قطاع غزة ويتم اصدار مؤشر أسعار المستهلك في القطاع."
  },
  {
    "q": "هل البيانات في الضفة تشمل القدس؟",
    "a": "لا تشمل البيانات محافظة القدس، كون الأسواق فيها غير خاضعة لمنظومة الاقتصاد الفلسطيني، بحكم الاحتلال، وبالتالي هناك اختلاف في مستويات الأسعار، ولا يوجد أسعار استرشاديه تفرضها وزارة الاقتصاد الوطني لمحافظة القدس نتيجة لخضوع أسواقها للسيطرة الإسرائيلية. ولكن يتم تجميع بيانات الأسعار الاستهلاكية من قبل الجهاز في أسواق البلدة القديمة."
  },
  {
    "q": "لماذا لا توجد سلع مثل البندورة؟",
    "a": "تم التركيز في اختيار السلع على سلع تموينية ذات طابع رمضاني يكثر الإقبال عليها في موائد رمضان كالأرز، واللحوم والدواجن، وغيرها، وهذا لا يعني ان سلعة مثل البندورة وغيرها غير مهمة، فحسب طبيعة السلع الاستهلاكية، هناك سلع مهمة على مدارة العام مثل معظم الخضروات."
  },
  {
    "q": "لماذا عدد السلع المختارة 25 سلعه؟",
    "a": "تم اختيار سلع ذات طابع رمضاني يزداد الإقبال عليها، وتم التوافق فيها مع وزارة الاقتصاد الوطني لتوفير سعر استرشادي قابل للمقارنة مع متوسطات الأسعار المجموعة من قبل الجهاز المركزي للإحصاء."
  },
  {
    "q": "لماذا لا تجمع الأسعار بشكل يومي؟",
    "a": "الرصد الأسبوعي يعبر عن وتيرة رصد للأسعار مناسبة للسلع التي تم اختيارها، بالاعتماد على سلاسل البيانات التي تتوفر في الإحصاء الفلسطيني، فهي تمتاز بوتيرة تغير سعري منخفض، بمعنى لا تتغير بشكل يومي، وإنما وتيرة التغير في مستويات أسعارها متباعدة زمنيا، ولكن لاستشراف وجود أي تلاعب او استغلال، تم تحديد المدى الزمني الأسبوعي لرصد أسعارها."
  },
  {
    "q": "كيف تم تحديد السعر الاسترشادي؟",
    "a": "يتم الاستناد الى عدة معايير في تحديد السعر الاسترشادي والذي هو بالأساس من قبل وزارة الاقتصاد الفلسطينية:\nأولا: سلسلة أسعار هذه السلع المتوفرة في الإحصاء الفلسطيني وهي سلسلة بيانات شهرية منذ العام 1996، يستند اليها كمعيار لتحدي مستوى السعر المناسب.\nثانيا: تقوم وزارة الاقتصاد بفحص مستويات الأسعار في المراحل المختلفة للسلعة، سعر الإنتاج وسعر الجملة وسعر المستهلك، وسعر الاستيراد للسلع المستوردة، وتحديد هامش الربح العادل لجميع الأطراف، من المورد والمستهلك والتاجر."
  },
  {
    "q": "هل هذه المنصة متاحه للجميع، وهل سيتم تعميمها على باقي السنة؟",
    "a": "نعم متاحة للجميع، وسيتم تطويرها مستقبلاً، هي حالياً تخدم 7 أسابيع منها 4 خلال شهر رمضان المبارك."
  },
  {
    "q": "لماذا لا تجمع الأسعار على مستوى المحافظة؟",
    "a": "حسب طبيعة أسواق الضفة الغربية والتي تعتبر من حيث النطاق الجغرافي صغيرة ومتقاربة، وطبيعة السلع التي تغطيها المنصة والتي تتميز بتقارب أسعارها بين أسواق محافظات الضفة الغربية، وكذلك السعر الاسترشادي الي يغطي الضفة الغربية، وهذا ينسجم مع نهجية جمع البيانات في الإحصاء الفلسطيني، التي صممت بهذه المعايير لتغطي متوسطات الأسعار وتغيرها على مستوى الضفة الغربية."
  },
  {
    "q": "هل يتم محاسبة من لم يلتزم بالسعر الاسترشادي، وكيف؟",
    "a": "تتولى الجهات الرسمية ممثلة بوزارة الاقتصاد تساندها جمعية حماية المستهلك، المتابعة والرقابة الميداني والمحاسبة للمتجاوزين تبعا للقوانين ذات العلاقة، فيما يقتصر دور الجهاز المركزي للإحصاء على رصد مستويات الأسعار وتتبع حركة واتجاهات التغير فيها، بغرض توفير أرقام إحصائية محايدة وموثوقة."
  },
  {
    "q": "عند جمع أسعار سلعه واحد هل يتم الاكتفاء بتسعيره واحده من مكان واحد او يتم جمع أكثر من تسعيره ولأكثر من مكان؟",
    "a": "منهجية جمع الأسعار تعتمد على توفير عدة مشاهدات سعرية، تمكن من احتساب متوسط حسابي ممثل لسعر السلعة، حيث يتم تجميع حوالي 1650 مشاهدة سعرية، بمعدل 412 تسعيرة بشكل أسبوعي لهذه السلع، لتحقيق أكبر تغطية جغرافية، تغطي تباين الأسعار لهذه السلع، للمنافذ بمستوياتها واحجامها المختلفة في كل محافظة، لأسواق الضفة العربية، فهي تجمع من حوالي 600 منفذ بيع موزعة على مدار الفترة بين مختلف المحافظات."
  }
],
  en: [
  {
    "q": "Why doesn’t the interactive platform include data for the Gaza Strip?",
    "a": "Due to the Israeli aggression and the exceptional situation, price levels in the Gaza Strip have experienced sharp increases and unprecedented, abnormal volatility. Prices there depend heavily on the quantities allowed to enter through crossings controlled by the Israeli occupation. In addition, many basic commodities—especially fresh items such as red meat and poultry—have disappeared from markets. Overall, it is not possible to control or interpret price levels under these conditions.\n\nThis does not mean that PCBS does not collect prices in Gaza. On the contrary, PCBS continues collecting consumer prices in Gaza and publishes the Consumer Price Index for the Strip."
  },
  {
    "q": "Do the West Bank data include Jerusalem?",
    "a": "The data do not include Jerusalem Governorate because its markets are not subject to the Palestinian economic system due to the occupation. Therefore, price levels differ, and there are no indicative prices imposed by the Ministry of National Economy for Jerusalem because its markets are under Israeli control. However, PCBS does collect consumer price data in the markets of the Old City."
  },
  {
    "q": "Why are there no items such as tomatoes?",
    "a": "The selected commodities focus on Ramadan-related staple goods that see high demand on Ramadan tables, such as rice, meat, poultry, and others. This does not mean tomatoes and similar items are unimportant; by nature, some commodities (especially many vegetables) are important throughout the entire year."
  },
  {
    "q": "Why were 25 commodities selected?",
    "a": "Commodities with a Ramadan character and increased demand were selected, and this selection was agreed upon with the Ministry of National Economy to provide indicative prices that can be compared with the average prices collected by PCBS."
  },
  {
    "q": "Why aren’t prices collected daily?",
    "a": "Weekly monitoring is an appropriate frequency for the selected commodities based on the price series available in Palestinian statistics. These commodities typically have a low price-change frequency and do not change daily. To help detect any manipulation or exploitation, a weekly time window was set for monitoring their prices."
  },
  {
    "q": "How was the indicative price determined?",
    "a": "Several criteria are used to determine the indicative price, which is primarily set by the Palestinian Ministry of National Economy:\nFirst: the price series for these commodities available at PCBS—a monthly series since 1996—used as a benchmark to determine an appropriate price level.\nSecond: the Ministry examines prices across different stages of the commodity (producer price, wholesale price, consumer price, and import price for imported goods) and determines a fair profit margin for all parties: suppliers, consumers, and retailers."
  },
  {
    "q": "Is this platform available to everyone, and will it be extended to the rest of the year?",
    "a": "Yes, it is available to everyone and will be developed further in the future. Currently, it serves 7 weeks, including 4 weeks during the holy month of Ramadan."
  },
  {
    "q": "Why aren’t prices collected at the governorate level?",
    "a": "Given the nature of West Bank markets—which are geographically small and close to each other—and the commodities covered by the platform, whose prices tend to be relatively similar across West Bank governorates, and because the indicative price applies to the West Bank overall, the approach aligns with PCBS data-collection methodology designed to cover average prices and their changes at the West Bank level."
  },
  {
    "q": "Are those who do not adhere to the indicative price held accountable, and how?",
    "a": "Official bodies, represented by the Ministry of National Economy and supported by the Consumer Protection Society, are responsible for follow-up, field inspection, and accountability for violations according to relevant laws. The role of PCBS is limited to monitoring price levels and tracking their movements and trends to provide neutral and reliable statistical figures."
  },
  {
    "q": "When collecting a price for one commodity, is a single quote from one place enough, or are multiple quotes collected from multiple places?",
    "a": "The price-collection methodology relies on obtaining multiple price observations to calculate a representative arithmetic average for the commodity’s price. About 1,650 price observations are collected—an average of 412 quotes per week—for these commodities to achieve the broadest possible geographic coverage and reflect price variation across outlets of different sizes and levels in each governorate. Data are collected from around 600 retail outlets across the period and across governorates."
  }
],
};

export function FaqModal({ open, onClose, lang }: Props) {
  const dir = dirFromLang(lang);
  const align = dir === 'rtl' ? 'text-right' : 'text-left';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const items = FAQS[lang] ?? FAQS.ar;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label={lang === 'en' ? 'Close' : 'إغلاق'}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden" dir={dir}>
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-lg sm:text-xl font-black text-blue-900">
              {lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label={lang === 'en' ? 'Close' : 'إغلاق'}
              title={lang === 'en' ? 'Close' : 'إغلاق'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`max-h-[75vh] overflow-y-auto p-5 ${align}`}>
            <div className="space-y-3">
              {items.map((item, idx) => (
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

            <div className={`mt-5 flex ${dir === 'rtl' ? 'justify-start' : 'justify-end'}`}>
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
