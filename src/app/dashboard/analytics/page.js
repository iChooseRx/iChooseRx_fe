"use client";

import SearchAnalyticsPanel from "@/components/analytics/SearchAnalyticsPanel";

export default function AnalyticsDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">📊 Search Analytics</h1>
      <SearchAnalyticsPanel />
    </div>
  );
}
