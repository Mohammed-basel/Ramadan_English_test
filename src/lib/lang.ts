export type Lang = 'ar' | 'en';

export function getLangFromPathname(pathname: string = window.location.pathname): Lang {
  const p = (pathname || '').toLowerCase();
  // Treat any URL containing /en/ or ending with /en as English
  if (p.includes('/en/') || p.endsWith('/en')) return 'en';
  return 'ar';
}

/**
 * Determine language from URL.
 * Priority:
 * 1) ?lang=en|ar
 * 2) pathname (/en/)
 * Default: ar
 */
export function getLangFromUrl(url: string = window.location.href): Lang {
  try {
    const u = new URL(url);
    const q = (u.searchParams.get('lang') || '').toLowerCase().trim();
    if (q === 'en') return 'en';
    if (q === 'ar') return 'ar';
    return getLangFromPathname(u.pathname);
  } catch {
    // Fallback for very old browsers / unusual environments
    return getLangFromPathname(window.location.pathname);
  }
}

export function dirFromLang(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
