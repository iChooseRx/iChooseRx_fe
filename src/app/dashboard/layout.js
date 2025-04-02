"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { SessionTimerProvider } from "@/context/SessionTimerContext";

export default function DashboardLayout({ children }) {
  return (
    <SessionTimerProvider>
      <div className="min-h-screen bg-background text-foreground">
        <DashboardHeader />
        <main className="p-2">{children}</main>
      </div>
    </SessionTimerProvider>
  );
}
