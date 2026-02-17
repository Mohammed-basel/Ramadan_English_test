export type Lang = 'ar' | 'en';

export function getLang(): Lang {
  // 1) Query string takes priority: ?lang=en
  try {
    const p = new URLSearchParams(window.location.search);
    const q = (p.get('lang') || '').toLowerCase();
    if (q === 'en') return 'en';
    if (q === 'ar') return 'ar';
  } catch {
    // ignore
  }

  // 2) Path-based fallback: /en/ or ends with /en
  const pathname = (window.location.pathname || '').toLowerCase();
  if (pathname.includes('/en/') || pathname.endsWith('/en')) return 'en';

  return 'ar';
}

export function dirFromLang(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
