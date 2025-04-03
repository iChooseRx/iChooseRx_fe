import React from "react";
import AdSlot from "./AdSlot";

export default function AdSidebar({ side = "left" }) {
  const position = side === "right" ? "right-sidebar" : "left-sidebar";
  return (
    <div className="hidden lg:block w-48">
      <AdSlot position={position} />
    </div>
  );
}