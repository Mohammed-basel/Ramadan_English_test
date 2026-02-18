export type Lang = 'ar' | 'en';

export function getLangFromUrl(): Lang {
  try {
    const params = new URLSearchParams(window.location.search || '');
    const q = (params.get('lang') || '').toLowerCase();
    if (q === 'en') return 'en';
    if (q === 'ar') return 'ar';
  } catch {
    // ignore
  }
  return 'ar';
}

export function dirFromLang(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
