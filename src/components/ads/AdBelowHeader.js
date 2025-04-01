import React from "react";
import AdSlot from "./AdSlot";

export default function AdBelowHeader() {
  return (
    <div className="mb-2">
      <AdSlot position="below-dashboard-header" className="h-24" />
    </div>
  );
}
