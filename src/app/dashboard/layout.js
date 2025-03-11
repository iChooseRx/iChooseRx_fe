"use client";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ Always Show Dashboard Header */}
      <DashboardHeader />

      {/* ✅ Render Page Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
