import React from 'react';

/**
 * Weekly update info block (Arabic).
 * You can later make these dates dynamic (from config/DB) if needed.
 */
export function UpdateInfo() {
  return (
    <div className="bg-gray-50 border rounded-xl p-4 text-right leading-7 shadow-sm">
      <p className="font-semibold">
        <span className="text-gray-700">التحديث الحالي:</span> 17/2/2026
      </p>

      <p className="mt-1">
        <span className="font-semibold">التحديث القادم:</span> الاثنين الموافق 23/2/2026
      </p>

      <p className="text-sm text-gray-600 mt-2">التحديث يتم تغيره بشكل اسبوعي</p>
    </div>
  );
}
