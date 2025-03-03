"use client";
import { useDashboard } from "../../hooks/useDashboard";
import DashboardHeader from "@/components/DashboardHeader";
import SearchBar from "@/components/SearchBar";
import DrugFilter from "@/components/Filters";
import SearchResults from "@/components/SearchResults";
import SavedDrugs from "@/components/SavedDrugs";
import PharmacySearch from "@/components/PharmacySearch";

export default function DashboardClient() {
  const dashboard = useDashboard();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader
        onLogout={dashboard.handleLogout}
        onDeleteAccount={dashboard.handleDeleteAccount}
      />

      <main className="grid grid-cols-2 gap-6 h-screen p-6">
        {/* ✅ Left Column: Saved Drugs & Pharmacy Search */}
        <div className="pr-4 border-r border-borderColor">
          <SavedDrugs
            drugs={dashboard.drugs}
            onDelete={dashboard.handleDeleteDrug}
            notesByDrug={dashboard.notesByDrug}
            setNotesByDrug={dashboard.setNotesByDrug}
            handleUpdateNotes={dashboard.handleUpdateNotes}
          />

          {/* ✅ Pharmacy Search BELOW Saved Drugs */}
          <PharmacySearch />
        </div>

        {/* ✅ Right Column: Drug Search & Results */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Search FDA-Approved Drugs By Generic Name
          </h2>

          <SearchBar
            drugName={dashboard.drugName}
            setDrugName={dashboard.setDrugName}
            onSearch={dashboard.handleSearch}
            isLoading={dashboard.loading}
          />
          <h3 className="text-xl font-semibold mb-4">
            Select What You DO NOT Want In Your Drug (Then Click Search)
          </h3>
          <DrugFilter
            filters={dashboard.FILTER_CATEGORIES}
            selectedFilters={dashboard.selectedFilters}
            setSelectedFilters={dashboard.setSelectedFilters}
          />

          {dashboard.searchResults.length > 0 && (
            <SearchResults
              results={dashboard.searchResults}
              resultStats={dashboard.resultStats}
              onSave={dashboard.handleSaveDrug}
            />
          )}
        </div>
      </main>
    </div>
  );
}
