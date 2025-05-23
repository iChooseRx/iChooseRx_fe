"use client";
import { useDashboard } from "@/hooks/useDashboard";
import SearchBar from "@/components/SearchBar";
import DrugFilter from "@/components/Filters";
import SearchResults from "@/components/SearchResults";
// import { AdBelowHeader } from "@/components/ads";
// import { AdSlot } from "@/components/ads";
// import TimeBasedAdGateModal from "@/components/ads/TimeBasedAdGateModal";

export default function SearchPage() {
  const dashboard = useDashboard();

  return (
    <>
      {/* <AdBelowHeader /> */}

      <div className="min-h-screen bg-background text-foreground px-4 pb-4">
        <h2 className="text-2xl font-semibold mb-2">
          Search FDA-Approved Drugs By Generic Name
        </h2>

        <SearchBar
          drugName={dashboard.drugName}
          setDrugName={dashboard.setDrugName}
          onSearch={dashboard.handleSearch}
          isLoading={dashboard.loading}
        />

        {dashboard.error && <div className="error-box">{dashboard.error}</div>}

        <h3 className="text-xl font-semibold mb-2">
          Select What You DO NOT Want In Your Drug
        </h3>

        <DrugFilter
          filters={dashboard.FILTER_CATEGORIES}
          selectedFilters={dashboard.selectedFilters}
          setSelectedFilters={dashboard.setSelectedFilters}
        />

        {dashboard.filtersHaveChanged && (
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={dashboard.handleSearch}
              className="btn-primary btn-wide"
              disabled={dashboard.loading}
            >
              Update Search
            </button>
          </div>
        )}

        {/* <AdSlot position="below-filters" className="h-24 my-4" /> */}

        <SearchResults
          results={dashboard.searchResults}
          resultStats={dashboard.resultStats}
          onSave={dashboard.handleSaveDrug}
          hasSearched={dashboard.hasSearched}
          isLoading={dashboard.loading}
        />
      </div>

      {/* <TimeBasedAdGateModal /> */}
    </>
  );
}
