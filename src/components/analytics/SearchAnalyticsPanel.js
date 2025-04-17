"use client";

import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import TopDrugsChart from "./TopDrugsChart";
import FilterCombinationTable from "./FilterCombinationTable";
import DrugFilterBreakdown from "./DrugFilterBreakdown";
import { fetchSearchAnalytics } from "@/services/api";

export default function SearchAnalyticsPanel() {
  const [globalAnalytics, setGlobalAnalytics] = useState(null);
  const [filteredAnalytics, setFilteredAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ drug_id: "", start: "", end: "" });

  useEffect(() => {
    fetchGlobalAnalytics(); // only once on mount
  }, []);

  useEffect(() => {
    if (query.drug_id || query.start || query.end) {
      fetchFilteredAnalytics(query);
    } else {
      setFilteredAnalytics(null); // clear out filtered view if no query
    }
  }, [query]);

  const fetchGlobalAnalytics = async () => {
    try {
      const data = await fetchSearchAnalytics(); // no params
      setGlobalAnalytics(data);
    } catch (err) {
      console.error("Failed to load global analytics:", err);
    }
  };

  const fetchFilteredAnalytics = async (filters) => {
    setLoading(true);
    try {
      const data = await fetchSearchAnalytics(filters);
      setFilteredAnalytics(data);
    } catch (err) {
      console.error("Failed to load filtered analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setQuery(newFilters);
  };

  const handleClearSearch = () => {
    setQuery({ drug_id: "", start: "", end: "" });
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls + Clear Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <FilterControls onFilterChange={handleFilterChange} initialFilters={query} />
        {(query.drug_id || query.start || query.end) && (
          <button onClick={handleClearSearch} className="btn-secondary whitespace-nowrap">
            🔄 Clear Search
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-sm text-gray-500 animate-pulse">
          Loading analytics...
        </p>
      )}

      {/* Drug-specific breakdown first */}
      {filteredAnalytics?.drug_id && (
        <DrugFilterBreakdown
          drugName={filteredAnalytics.drug_id}
          combinations={filteredAnalytics.filter_combinations}
        />
      )}

      {/* Then always show global analytics */}
      {globalAnalytics && (
        <>
          <TopDrugsChart data={globalAnalytics.most_searched_drugs} />
          <FilterCombinationTable
            filters={globalAnalytics.top_filter_combinations}
            label="Top Filter Combinations"
          />
        </>
      )}
    </div>
  );
}