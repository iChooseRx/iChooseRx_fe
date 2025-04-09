import React from "react";
import AdSlot from "./AdSlot";

export default function AdSidebar({ side = "left" }) {
  const position = side === "right" ? "right-sidebar" : "left-sidebar";
  return (
    <aside className="hidden lg:block w-52 p-2">
      <AdSlot position={position} className="h-96" />
    </aside>
  );
}