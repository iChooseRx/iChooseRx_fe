import React from "react";

export default function AdSlot({ position, className = "", children }) {
  return (
    <div
      className={`ad-slot text-xs text-center py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 rounded ${className}`}
      data-ad-position={position}
    >
      {children ?? `Ad Placeholder – ${position}`}
    </div>
  );
}