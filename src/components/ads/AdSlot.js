import React from "react";

export default function AdSlot({ position, className = "", children }) {
  return (
    <div
      className={`ad-slot ${className}`}
      data-ad-position={position}
    >
      {children ?? (
        <>
          <p className="font-medium">Sponsored Message – {position}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            This ad space supports the mission of iChooseRx to help users make informed, conscious choices about their medications.
          </p>
        </>
      )}
    </div>
  );
}