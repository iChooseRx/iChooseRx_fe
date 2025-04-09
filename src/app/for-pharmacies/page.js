"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function PlaceholderPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Page Coming Soon</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
          This page is under construction. We’re working on adding helpful information for this topic.
        </p>
      </main>
    </>
  );
}
