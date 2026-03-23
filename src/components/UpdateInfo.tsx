import React from 'react';

/**
 * Weekly update info block (Arabic).
 * You can later make these dates dynamic (from config/DB) if needed.
 */
export function UpdateInfo() {
  return (
    <div className="bg-gray-50 border rounded-xl p-4 text-right leading-7 shadow-sm">
      <p className="font-semibold">
        <span className="text-gray-700">التحديث الحالي:</span> 23/3/2026
      </p>
    </div>
  );
}
