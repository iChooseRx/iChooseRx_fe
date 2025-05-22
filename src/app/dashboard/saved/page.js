"use client";
import { useDashboard } from "@/hooks/useDashboard";
import SavedDrugs from "@/components/SavedDrugs";
import PharmacySearch from "@/components/PharmacySearch";
// import { AdBelowHeader } from "@/components/ads";
// import TimeBasedAdGateModal from "@/components/ads/TimeBasedAdGateModal";

export default function SavedPage() {
  const dashboard = useDashboard();

  return (
    <>
      {/* <AdBelowHeader /> */}

      <div className="min-h-screen bg-background text-foreground px-1">
        <h2 className="text-3xl font-semibold mb-2">
          Your Saved Drugs & Find a Pharmacy
        </h2>

        <section className="min-h-[300px]">
          <SavedDrugs
            drugs={dashboard.drugs}
            onDelete={dashboard.handleDeleteDrug}
            handleUpdateNotes={dashboard.handleUpdateNotes}
          />
        </section>

        <hr className="my-2 border-t border-borderColor" />

        <PharmacySearch />
      </div>
      {/* <TimeBasedAdGateModal /> */}
    </>
  );
}
