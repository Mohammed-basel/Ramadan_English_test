import React from 'react';
import { X } from 'lucide-react';
import { Lang, dirFromLang } from '../lib/lang';
import { t } from '../lib/i18n';

type FAQ = { q: { ar: string; en: string }; a: { ar: string; en: string } };

const FAQS: FAQ[] = [
  {
    q: {
      ar: 'لماذا لا تشمل المنصة التفاعلية بيانات لقطاع غزه؟',
      en: 'Why does the interactive platform not include data for the Gaza Strip?',
    },
    a: {
      ar:
        'بسبب العدوان الإسرائيلي والحالة الاستثنائية، شهدت مستويات الأسعار في قطاع غزة ارتفاعا حادا وتقلبات غير مسبوقة، وغير طبيعية، حيث تعتمد بدرجة كبيرة على الكميات التي يسمح لها بالدخول عير المعابر المختلفة المسيطر عليها من قبل الاحتلال الإسرائيلي، إضافة إلى فقدان أسواق القطاع العديد من السلع الأساسية وخاصة الطازج منها مثل اللحوم الحمراء والدواجن وغيرها، بالمجمل لا يمكن ضبط مستويات الأسعار في ظل هذه الاوضاع.\n\nوهذا ولا يعني بأن الجهاز لا يقوم بتججميع الأسعار في قطاع غزة بل على العكس تماماً، الجهاز يقوم بتجميع الأسعار الاستهلاكية في قطاع غزة ويتم اصدار مؤشر أسعار المستهلك في القطاع.',
      en:
        "Due to the exceptional conditions, price levels in the Gaza Strip have witnessed sharp increases and unprecedented volatility that are not normal market behavior. Prices there depend heavily on the quantities allowed to enter through crossings controlled by the Israeli occupation, in addition to the loss of many essential goods in local markets—especially fresh items such as red meat and poultry. In general, it is not possible to stabilize or interpret price levels under these conditions.\n\nThis does not mean that PCBS does not collect prices in Gaza. On the contrary, PCBS continues to collect consumer prices in Gaza and publishes the Consumer Price Index for the Gaza Strip.",
    },
  },
  {
    q: { ar: 'هل البيانات في الضفة تشمل القدس؟', en: 'Do the West Bank data include Jerusalem?' },
    a: {
      ar:
        'لا تشمل البيانات محافظة القدس، كون الأسواق فيها غير خاضعة لمنظومة الاقتصاد الفلسطيني، بحكم الاحتلال، وبالتالي هناك اختلاف في مستويات الأسعار، ولا يوجد أسعار استرشاديه تفرضها وزارة الاقتصاد الوطني لمحافظة القدس نتيجة لخضوع أسواقها للسيطرة الإسرائيلية. ولكن يتم تجميع بيانات الأسعار الاستهلاكية من قبل الجهاز في أسواق البلدة القديمة.',
      en:
        'The data do not include Jerusalem Governorate, because its markets are not subject to the Palestinian economic system due to the occupation. Therefore, price levels differ, and there are no indicative prices imposed by the Ministry of National Economy for Jerusalem because its markets are under Israeli control. However, PCBS does collect consumer price data from markets in the Old City.',
    },
  },
  {
    q: { ar: 'لماذا لا توجد سلع مثل البندورة؟', en: 'Why are items like tomatoes not included?' },
    a: {
      ar:
        'تم التركيز في اختيار السلع على سلع تموينية ذات طابع رمضاني يكثر الإقبال عليها في موائد رمضان كالأرز، واللحوم والدواجن، وغيرها، وهذا لا يعني ان سلعة مثل البندورة وغيرها غير مهمة، فحسب طبيعة السلع الاستهلاكية، هناك سلع مهمة على مدارة العام مثل معظم الخضروات.',
      en:
        'The selected commodities focus on staple goods with a Ramadan-related pattern of higher demand (such as rice, meat, poultry, etc.). This does not mean that items like tomatoes are not important; however, due to the nature of consumer goods, some items (like many vegetables) are important year-round and were not included in this Ramadan-focused set.',
    },
  },
  {
    q: { ar: 'لماذا عدد السلع المختارة 25 سلعه؟', en: 'Why were 25 commodities selected?' },
    a: {
      ar:
        'تم اختيار سلع ذات طابع رمضاني يزداد الإقبال عليها، وتم التوافق فيها مع وزارة الاقتصاد الوطني لتوفير سعر استرشادي قابل للمقارنة مع متوسطات الأسعار المجموعة من قبل الجهاز المركزي للإحصاء.',
      en:
        'Commodities with higher demand during Ramadan were selected, in coordination with the Ministry of National Economy, to ensure an indicative price is available and comparable with the average prices collected by PCBS.',
    },
  },
  {
    q: { ar: 'لماذا لا تجمع الأسعار بشكل يومي؟', en: 'Why are prices not collected daily?' },
    a: {
      ar:
        'الرصد الأسبوعي يعبر عن وتيرة رصد للأسعار مناسبة للسلع التي تم اختيارها، بالاعتماد على سلاسل البيانات التي تتوفر في الإحصاء الفلسطيني، فهي تمتاز بوتيرة تغير سعري منخفض، بمعنى لا تتغير بشكل يومي، وإنما وتيرة التغير في مستويات أسعارها متباعدة زمنيا، ولكن لاستشراف وجود أي تلاعب او استغلال، تم تحديد المدى الزمني الأسبوعي لرصد أسعارها.',
      en:
        'Weekly monitoring reflects an appropriate frequency for the selected commodities. Based on PCBS data series, these commodities typically have relatively low day-to-day price change. To detect potential manipulation or exploitation while remaining practical, a weekly monitoring window was adopted.',
    },
  },
  {
    q: { ar: 'كيف تم تحديد السعر الاسترشادي؟', en: 'How was the indicative price determined?' },
    a: {
      ar:
        'يتم الاستناد الى عدة معايير في تحديد السعر الاسترشادي والذي هو بالأساس من قبل وزارة الاقتصاد الفلسطينية:\nأولا: سلسلة أسعار هذه السلع المتوفرة في الإحصاء الفلسطيني وهي سلسلة بيانات شهرية منذ العام 1996، يستند اليها كمعيار لتحدي مستوى السعر المناسب.\nثانيا: تقوم وزارة الاقتصاد بفحص مستويات الأسعار في المراحل المختلفة للسلعة، سعر الإنتاج وسعر الجملة وسعر المستهلك، وسعر الاستيراد للسلع المستوردة، وتحديد هامش الربح العادل لجميع الأطراف، من المورد والمستهلك والتاجر.',
      en:
        "Several criteria are used to determine the indicative price, which is issued mainly by the Palestinian Ministry of National Economy:\nFirst: PCBS historical price series for these commodities (a monthly series since 1996) is used as a reference to define an appropriate price level.\nSecond: The Ministry reviews price levels across different stages (production, wholesale, retail/consumer, and import prices for imported goods) and determines a fair profit margin for all parties (suppliers, consumers, and retailers).",
    },
  },
  {
    q: {
      ar: 'هل هذه المنصة متاحه للجميع، وهل سيتم تعميمها على باقي السنة؟',
      en: 'Is this platform available to everyone, and will it be extended to the rest of the year?',
    },
    a: {
      ar: 'نعم متاحة للجميع، وسيتم تطويرها مستقبلاً، هي حالياً تخدم 7 أسابيع منها 4 خلال شهر رمضان المبارك.',
      en: 'Yes, it is available to everyone. It will be further developed in the future. It currently covers 7 weeks, including 4 weeks during the holy month of Ramadan.',
    },
  },
  {
    q: { ar: 'لماذا لا تجمع الأسعار على مستوى المحافظة؟', en: 'Why are prices not presented at the governorate level?' },
    a: {
      ar:
        'حسب طبيعة أسواق الضفة الغربية والتي تعتبر من حيث النطاق الجغرافي صغيرة ومتقاربة، وطبيعة السلع التي تغطيها المنصة والتي تتميز بتقارب أسعارها بين أسواق محافظات الضفة الغربية، وكذلك السعر الاسترشادي الي يغطي الضفة الغربية، وهذا ينسجم مع نهجية جمع البيانات في الإحصاء الفلسطيني، التي صممت بهذه المعايير لتغطي متوسطات الأسعار وتغيرها على مستوى الضفة الغربية.',
      en:
        'Given the geographic characteristics of West Bank markets (small and closely connected) and the selected commodities (whose prices tend to be similar across governorates), and because the indicative price applies to the West Bank overall, the platform presents results at the West Bank level—consistent with the PCBS data-collection approach designed to represent average prices and their changes for the West Bank.',
    },
  },
  {
    q: { ar: 'هل يتم محاسبة من لم يلتزم بالسعر الاسترشادي، وكيف؟', en: 'Are those who do not adhere to the indicative price held accountable, and how?' },
    a: {
      ar:
        'تتولى الجهات الرسمية ممثلة بوزارة الاقتصاد تساندها جمعية حماية المستهلك، المتابعة والرقابة الميداني والمحاسبة للمتجاوزين تبعا للقوانين ذات العلاقة، فيما يقتصر دور الجهاز المركزي للإحصاء على رصد مستويات الأسعار وتتبع حركة واتجاهات التغير فيها، بغرض توفير أرقام إحصائية محايدة وموثوقة.',
      en:
        'Official bodies—represented by the Ministry of National Economy, supported by the Palestinian Society for Consumer Protection—conduct field monitoring and enforcement according to relevant laws. The role of PCBS is limited to monitoring price levels and tracking movements and trends to provide neutral and reliable statistical figures.',
    },
  },
  {
    q: {
      ar: 'عند جمع أسعار سلعه واحد هل يتم الاكتفاء بتسعيره واحده من مكان واحد او يتم جمع أكثر من تسعيره ولأكثر من مكان؟',
      en: 'When collecting prices for one commodity, is one price from one place enough, or are multiple quotes collected?',
    },
    a: {
      ar:
        'منهجية جمع الأسعار تعتمد على توفير عدة مشاهدات سعرية، تمكن من احتساب متوسط حسابي ممثل لسعر السلعة، حيث يتم تجميع حوالي 1650 مشاهدة سعرية، بمعدل 412 تسعيرة بشكل أسبوعي لهذه السلع، لتحقيق أكبر تغطية جغرافية، تغطي تباين الأسعار لهذه السلع، للمنافذ بمستوياتها واحجامها المختلفة في كل محافظة، لأسواق الضفة العربية، فهي تجمع من حوالي 600 منفذ بيع موزعة على مدار الفترة بين مختلف المحافظات.',
      en:
        'The methodology relies on multiple price observations to calculate a representative average price for each commodity. Around 1,650 price observations are collected (about 412 quotes weekly) to achieve the broadest geographical coverage and reflect price variation across different outlets and sizes in each governorate. Data are collected from around 600 retail outlets distributed throughout the period across the various governorates.',
    },
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}

export function FaqModal({ open, onClose, lang }: Props) {
  if (!open) return null;

  const dir = dirFromLang(lang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        <div className={`flex items-center justify-between p-4 border-b ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-xl font-black text-gray-800">
            {lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100" aria-label={t('close', lang)}>
            <X />
          </button>
        </div>

        <div dir={dir} className={`p-5 max-h-[70vh] overflow-auto ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="space-y-4">
            {FAQS.map((f, idx) => (
              <div key={idx} className="border rounded-xl p-4 bg-gray-50">
                <p className="font-bold text-gray-900">{f.q[lang]}</p>
                <p className="mt-2 text-sm leading-7 text-gray-800 whitespace-pre-wrap">{f.a[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
            {t('close', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
