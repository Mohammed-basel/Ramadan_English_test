import React from 'react';
import { Lang } from '../lib/lang';
import { t } from '../lib/i18n';

interface UpdateInfoProps {
  lang: Lang;
}

const CURRENT_UPDATE_AR = '17/2/2026';
const NEXT_UPDATE_AR = 'الإثنين، 23/2/2026';

const CURRENT_UPDATE_EN = '17/2/2026';
const NEXT_UPDATE_EN = 'Monday, 23/2/2026';

const COMPLAINTS_NUMBER = '129';

export function UpdateInfo({ lang }: UpdateInfoProps) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      className={`bg-gray-50 border rounded-xl p-4 leading-7 shadow-sm ${
        lang === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <p className="font-semibold">
        <span className="text-gray-700">{t('currentUpdateLabel', lang)}</span>{' '}
        {lang === 'ar' ? CURRENT_UPDATE_AR : CURRENT_UPDATE_EN}
      </p>

      <p className="font-semibold">
        <span className="text-gray-700">{t('nextUpdateLabel', lang)}</span>{' '}
        {lang === 'ar' ? NEXT_UPDATE_AR : NEXT_UPDATE_EN}
      </p>

      <p className="font-semibold">
        <span className="text-gray-700">{t('complaintsLabel', lang)}</span>{' '}
        {COMPLAINTS_NUMBER}
      </p>
    </div>
  );
}
