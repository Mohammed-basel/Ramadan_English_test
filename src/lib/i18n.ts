import { Lang } from './lang';

export const STRINGS = {
  headerTitle: {
    ar: "منصة رصد أسعار أهم السلع الأساسية خلال شهر رمضان المبارك",
    en: "Price dashboard for essential commodities during the holy month “Ramadan”",
  },
  headerSubtitle: {
    ar: "متابعة وتحليل أسعار السلع الاستهلاكية المختارة خلال شهر رمضان",
    en: "Monitoring and analyzing the prices of selected consumer goods during the holy month “Ramadan”",
  },
  currentUpdate: {
    ar: "التحديث الحالي: 17/2/2026",
    en: "Current Update: 17/2/2026",
  },
  nextUpdate: {
    ar: "التحديث القادم: الاثنين، 23/2/2026",
    en: "Next Update: Monday, 23/2/2026",
  },
  complaints: {
    ar: "رقم شكاوى وزارة الاقتصاد الوطني: 129",
    en: "Ministry of National Economy Complaints Number: 129",
  },
  kpiComplianceTitle: {
    ar: "بالسعر الاسترشادي",
    en: "indicative price",
  },
  kpiLowCompliance: {
    ar: "مستوى التزام منخفض",
    en: "Low level of commitment",
  },
  kpiMaxIncrease: {
    ar: "أعلى نسبة ارتفاع عن السعر الاسترشادي",
    en: "Highest percentage increase above the indicative price",
  },
  kpiMaxDecrease: {
    ar: "أكبر نسبة انخفاض عن السعر الاسترشادي",
    en: "Largest percentage decrease from the indicative price",
  },
  methodologyTitle: {
    ar: "المنهجية",
    en: "Methodology",
  },
  methodologyHint: {
    ar: "عرض موجز للمنهجية والمفاهيم والمتغيرات والتغطية الجغرافية والفترة الزمنية.",
    en: "A brief overview of the methodology, concepts, variables, geographic coverage, and time period.",
  },
  searchPlaceholder: {
    ar: "ابحث عن سلعة...",
    en: "Search for a commodity...",
  },
  filterAll: { ar: "الكل", en: "All" },
  filterIncrease: { ar: "ارتفاع", en: "Increase" },
  filterDecrease: { ar: "انخفاض", en: "Decrease" },
  filterStable: { ar: "مستقر", en: "Stable" },
  downloadImage: { ar: "تحميل صورة الرسم", en: "Download chart image" },
  downloadExcel: { ar: "تحميل البيانات (Excel)", en: "Download data (Excel)" },
  selectFromList: {
    ar: "اختر سلعة من القائمة لعرض الرسم البياني.",
    en: "Select a commodity from the list to view the chart.",
  },
  methodologyText: {
    ar: `العنوان: حركة أسعار سلع أساسية مختارة خلال شهر رمضان المبارك
المصدر: الجهاز المركزي للإحصاء الفلسطيني
الشركاء: وزارة الاقتصاد الوطني، وجمعية حماية المستهلك الفلسطينية

الهدف:
• تسليط الضوء على حركة أسعار بعض السلع الأساسية المختارة خلال شهر رمضان المبارك، تلك التي يزداد الإقبال عليها خلال الشهر الفضيل، بحيث تصبح ذات أثر كبير على دخل الأسر الفلسطينية، ومقارنتها بالسعر الاسترشادي الصادر عن وزارة الاقتصاد الوطني.
• تسليط الضوء بشكل أسبوعي على حركة أسعار السلع المختارة، في الأسواق الفلسطينية، مقارنة مع السعر الاسترشادي، لقياس مستوى الالتزام بالسعر الاسترشادي، وكذلك توضيح مستوى التغيرات التي تطرأ عليها بشكل أسبوعي خلال شهر رمضان.
• ستوفر هذه المنصة سلسلة بيانات لتلك المجموعة من السلع، على مستوى السلعة على مدار شهر رمضان المبارك.

المتغيرات: السعر، نسبة التغير، مدى الالتزام.
التغطية الجغرافية: الضفة الغربية.
بداية الفترة: الأسبوع الثاني من شهر 2-2026
نهاية الفترة: الأسبوع الثالث من شهر 3-2026

المنهجية:
• تم اختيار 25 سلعة أساسية يزداد استهلاكها بشكل كبير خلال شهر رمضان المبارك، تتركز في الأرز، والزيت، واللحوم، والدواجن، واللبن، والجبن، والبيض، والسكر، والحلاوة، والطحينية، والقطايف، والبقوليات "عدس، وحمص، وفريكة"، التمور والعجوة، السميد.
• تجمع هذه السلع من 8 محافظات رئيسية في أسواق الضفة الغربية وهي "جنين، ونابلس، وقلقيلية، وطولكرم، ورام الله والبيرة، وأريحا، وبيت لحم، والخليل".
• يتم تجميع حوالي 1650 مشاهدة سعرية بمعدل 412 تسعيرة بشكل أسبوعي لهذه السلع، لتحقيق أكبر تغطية جغرافية، تغطي تباين الأسعار لهذه السلع، في أسواق الضفة العربية.
• تجمع من حوالي 600 منفذ بيع موزعة على مدار الفترة بين مختلف المحافظات.
• يتم حساب معدلات الأسعار على مستوى السلعة، ومقارنة متوسط السعر بشكل أسبوع مع السعر الاسترشادي، ومع متوسط السعر للأسبوع السابق، بحيث يتم رصد التغيرات الأسبوعية لمعدلات الأسعار، ودرجة الالتزام بالأسعار الاسترشادية لتلك السلع.
• تحديد السعر الاسترشادي "وزارة الاقتصاد":
1. تم اعتماد 25 سلعة ذات اهمية في سلة المستهلك الفلسطيني بشكل عام وفي رمضان بشكل خاص.
2. في المرحلة الأولى يتم جمع أسعار هذه السلع من محلات البيع بالتجزئة للمستهلك، حيث يتم جمع السلع من ثلاثة مصادر (محلات تجارية صغيرة، متوسطة، كبيرة الحجم)، وتجمع الأسعار من جميع المحافظات في الضفة الغربية.
3. يتم تجميع الاسعار وفحص منطقية البيانات، بحث يتم عمل متوسط، والسعر الاعلى، والسعر الاقل، وفي حال هناك اي قيم شاذة في البيانات، يتم الرجوع والتأكد منها من الميدان.
4. في المرحلة الثانية، يتم جمع اسعار بعض السلع من كبار التجار والموزعين، من أجل ضمان عدالة السعر للمستهلك وتاجر التجزئة.

مفاهيم:
نسبة الالتزام بالسعر الاسترشادي: تحسب نسبة الالتزام بمجموع عدد السلع التي تظهر تغير بأقل من 5% عند مقارنة السعر المرصود لها مع السعر الارشادي مقسوماً بالعدد الكلي للسلع وهو 25 سلعة مختارة.

السلع الملتزمة: هي السلع التي تظهر تغير بأقل من 5% عند مقارنة سعرها المرصود مع السعر الاسترشادي.

السلع غير الملتزمة: هي السلع التي تظهر تغير أعلى من 5% عند مقارنة سعرها المرصود مع السعر الاسترشادي.

سلع مرتفعة أسعارها: تعني بأن السعر المرصود أعلى من السعر الاسترشادي ويظهر نسبة تغير إيجابية.

سلع مستقرة أسعارها: تعني بأن السعر المرصود للسلعة مساوي للسعر الاسترشادي ويظهر نسبة تغير صفرية.

سلعة منخفضة أسعارها: تعني بأن السعر المرصود أقل من السعر الاسترشادي ويظهر نسبة تغير سلبية.

نسب التغير ومستويات الأسعار أسبوعيا للسلع الأساسية خلال شهر رمضان مقارنة بالأسعار الاسترشادية
`,
    en: `Title: Price Movements of Selected Basic Commodities During the Holy Month "Ramadan"
Source: Palestinian Central Bureau of Statistics
Partners: Ministry of National Economy, Palestinian Society for Consumer Protection

Objective:
• To highlight price movements of selected basic commodities during the holy month "Ramadan", those that see increased demand during this month and have a significant impact on the income of Palestinian families, and to compare these prices with the indicative price issued by the Ministry of National Economy.
• To provide weekly updates on the price movements of selected commodities in Palestinian markets, compared to the indicative price, to measure the level of adherence to the indicative price and to illustrate the extent of changes occurring weekly during “Ramadan”.
• This platform will provide a data series for this group of commodities, at the commodity level, throughout the holy month “Ramadan”.

Variables: Price, Percentage Change, Adherence to the Indicative Price.
Geographic Coverage: West Bank.
Period Start Date: Second week of February 2026
Period End Date: Third week of March 2026

Methodology:
• Twenty-five essential commodities were selected, whose consumption increases significantly during the holy month “Ramadan”. These commodities include rice, oil, meat, poultry, milk, cheese, eggs, sugar, halva, tahini, qatayef (a type of stuffed pancake), legumes (lentils, chickpeas, and freekeh), dates, and semolina.
• These commodities were collected from eight major governorates in the West Bank: Jenin, Nablus, Qalqilya, Tulkarm, Ramallah and Al-Bireh, Jericho, Bethlehem, and Hebron.
• Approximately 1,650 price observations, averaging 412 price quotes per week, were collected for these commodities to achieve the broadest possible geographical coverage and reflect price variations across the West Bank markets.
• Data was collected from approximately 600 retail outlets distributed throughout the period across the various governorates.
• Price rates are calculated at the commodity level, and the average price is compared weekly with the indicative price and with the average price of the previous week, so that weekly changes in price rates and the degree of compliance with the indicative prices for those commodities are monitored.
• Determining the Indicative Price (Ministry of Economy):
1. Twenty-five essential commodities, particularly those consumed during Ramadan, were selected for this purpose.
2. In the first phase, prices for these commodities were collected from retail outlets. These outlets were comprised of three types of stores (small, medium, and large), and prices were collected from all governorates in the West Bank.
3. The prices were compiled, and the data was checked for logic. An average, the highest price, and the lowest price were calculated. Any anomalies were investigated and verified in the field.
4. In the second phase, prices for some of these commodities were collected from major wholesalers and distributors to ensure fair pricing for both consumers and retailers.

Concepts:
Rate of compliance with the indicative price: The compliance ratio calculated by dividing the total number of goods that show a change of less than 5% when comparing their observed price to the interactive price by the total number of goods (25 selected goods).

Compliant Goods: These goods show a change of less than 5% when comparing their observed price to the interactive price.

Non-Compliant Goods: These goods show a change of more than 5% when comparing their observed price to the interactive price.

Highly Priced Goods: This means that the observed price is higher than the interactive price and shows a positive percentage change.

Stability Priced Goods: This means that the observed price of the good is equal to the interactive price and shows a zero percentage change.

Undervalued Goods: This means that the observed price is lower than the interactive price and shows a negative percentage change.

Rates of change and weekly price levels for basic commodities during Ramadan compared to indicative prices
`,
  },
} as const;

export function t<K extends keyof typeof STRINGS>(key: K, lang: Lang): string {
  return STRINGS[key][lang];
}
