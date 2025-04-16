"use client";

import InviteForm from "@/components/admin/InviteForm";
import PendingDrugReports from "@/components/admin/PendingDrugReports";
import UnavailabilityReports from "@/components/admin/UnavailabilityReports";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h2 className="text-3xl font-semibold mb-4">🖥🔑 Admin Dashboard</h2>

      <InviteForm />
      <hr className="my-6 border-t border-borderColor" />

      <PendingDrugReports />
      <hr className="my-6 border-t border-borderColor" />

      <UnavailabilityReports />
    </div>
  );
}