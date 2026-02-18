import React from "react";
import { HelpCircle } from "lucide-react";

export function FaqButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Frequently Asked Questions"
      title="Frequently Asked Questions"
      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
    >
      <HelpCircle size={22} />
    </button>
  );
}
