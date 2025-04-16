"use client";

import { useState, useEffect } from "react";
import SearchAnalyticsPanel from "@/components/analytics/SearchAnalyticsPanel";
import DashboardHeader from "@/components/DashboardHeader";

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">📊 Search Analytics</h1>
        <SearchAnalyticsPanel />
      </main>
    </div>
  );
}