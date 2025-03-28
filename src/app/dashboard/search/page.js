"use client";
import { useDashboard } from "@/hooks/useDashboard";
import SearchBar from "@/components/SearchBar";
import DrugFilter from "@/components/Filters";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  const dashboard = useDashboard();

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h2 className="text-2xl font-semibold mb-4">Search FDA-Approved Drugs By Generic Name</h2>

      <SearchBar
        drugName={dashboard.drugName}
        setDrugName={dashboard.setDrugName}
        onSearch={dashboard.handleSearch}
        isLoading={dashboard.loading}
      />

      {dashboard.error && <div className="error-box">{dashboard.error}</div>}

      <h3 className="text-xl font-semibold mb-4">Select What You DO NOT Want In Your Drug</h3>

      <DrugFilter
        filters={dashboard.FILTER_CATEGORIES}
        selectedFilters={dashboard.selectedFilters}
        setSelectedFilters={dashboard.setSelectedFilters}
      />

      <SearchResults
        results={dashboard.searchResults}
        resultStats={dashboard.resultStats}
        onSave={dashboard.handleSaveDrug}
        hasSearched={dashboard.hasSearched}
        isLoading={dashboard.loading}
      />
    </div>
  );
}
