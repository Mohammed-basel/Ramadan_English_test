import React from 'react';
import { Lang, dirFromLang } from '../lib/lang';
import { t } from '../lib/i18n';

export function UpdateInfo({ lang }: { lang: Lang }) {
  const dir = dirFromLang(lang);
  const align = dir === 'rtl' ? 'text-right' : 'text-left';

  return (
    <div className={`bg-gray-50 border rounded-xl p-4 ${align} leading-7 shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="text-gray-700">{t('currentUpdate', lang)}:</span> 17/2/2026
        </div>
        <div>
          <span className="font-semibold">{t('nextUpdate', lang)}:</span>{' '}
          {lang === 'en' ? 'Monday, 23/2/2026' : 'الاثنين الموافق 23/2/2026'}
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {lang === 'en' ? 'Updates are published weekly.' : 'التحديث يتم تغيره بشكل اسبوعي'}
      </p>
    </div>
  );
}
