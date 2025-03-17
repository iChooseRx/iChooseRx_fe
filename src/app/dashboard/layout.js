"use client";
import DashboardHeader from "@/components/DashboardHeader"; // Your top menu/header

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="p-4">{children}</main>
    </div>
  );
}
