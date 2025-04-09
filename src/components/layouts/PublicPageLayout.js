// components/layouts/PublicPageLayout.js
"use client";
import DashboardHeader from "@/components/DashboardHeader";

export default function PublicPageLayout({ title, children }) {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground px-4 py-8 max-w-4xl mx-auto">
        {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
        {children}
      </main>
    </>
  );
}