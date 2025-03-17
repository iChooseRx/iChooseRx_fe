"use client";
import { useDashboard } from "@/hooks/useDashboard";
import SavedDrugs from "@/components/SavedDrugs";
import PharmacySearch from "@/components/PharmacySearch";

export default function SavedPage() {
  const dashboard = useDashboard();

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h2 className="text-3xl font-semibold mb-4">Your Saved Drugs & Find a Pharmacy</h2>

      <SavedDrugs
        drugs={dashboard.drugs}
        onDelete={dashboard.handleDeleteDrug}
        notesByDrug={dashboard.notesByDrug}
        setNotesByDrug={dashboard.setNotesByDrug}
        handleUpdateNotes={dashboard.handleUpdateNotes}
      />

      <hr className="my-6 border-t border-borderColor" />

      <PharmacySearch />
    </div>
  );
}
