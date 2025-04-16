"use client";

import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import TopDrugsChart from "./TopDrugsChart";
import FilterCombinationTable from "./FilterCombinationTable";
import DrugFilterBreakdown from "./DrugFilterBreakdown";
import { fetchSearchAnalytics } from "@/services/api";
import { downloadSearchAnalyticsCSV } from "@/services/api";

export default function SearchAnalyticsPanel() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ drug_id: "", start: "", end: "" });

  useEffect(() => {
    fetchAnalytics();
  }, [query]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const data = await fetchSearchAnalytics(query);
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (newFilters) => setQuery(newFilters);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <FilterControls onFilterChange={handleFilterChange} initialFilters={query} />
      </div>

      {loading && <p>Loading...</p>}
      {!loading && analytics && (
        <>
          {!query.drug_id && (
            <>
              <TopDrugsChart data={analytics.most_searched_drugs} />
              <FilterCombinationTable
                filters={analytics.top_filter_combinations}
                label="Top Filter Combinations"
              />
            </>
          )}

          {query.drug_id && (
            <DrugFilterBreakdown
              drugName={analytics.drug_id}
              combinations={analytics.filter_combinations}
            />
          )}
        </>
      )}
    </div>
  );
}