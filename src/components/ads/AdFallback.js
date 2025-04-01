import React from "react";
import AdSlot from "./AdSlot";

export default function AdFallback({ position = "fallback" }) {
  return <AdSlot position={position} />;
}