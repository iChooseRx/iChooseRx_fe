"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function HarmfulAdditivesPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Other Potentially Harmful Additives</h1>

        <section className="mb-8">
          <p className="mb-4">
            Some inactive ingredients have raised concerns due to their potential long-term health effects, allergenic potential, or interactions with certain conditions. These additives may serve as binders, fillers, or colorants in medications.
          </p>

          <p className="mb-4">
            iChooseRx filters out drugs that contain these ingredients to support users seeking to minimize exposure to substances with possible toxicity, irritation, or environmental concerns.
          </p>

          <p className="mb-4">
            We exclude medications that contain any of the following additives:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Titanium dioxide</li>
            <li>Talc</li>
            <li>Polysorbate 80</li>
            <li>Carrageenan</li>
            <li>Propylene glycol</li>
            <li>BHT (Butylated hydroxytoluene)</li>
            <li>BHA (Butylated hydroxyanisole)</li>
          </ul>

          <p className="mb-4">
            Because manufacturers often do not specify amounts or cumulative exposure, iChooseRx uses a blanket filter to help users eliminate medications with these controversial additives from their options.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: If you are concerned about any of these ingredients, consult your healthcare provider for safe alternatives and medical guidance.
          </p>
        </section>

        <div className="my-6">
          <AdSlot position="added-sugar-page-bottom" className="h-24" />
        </div>

        <Link href="/filter-explainer" className="text-primary hover:underline">
          ← Back to Filter Explainer
        </Link>
      </main>
    </>
  );
}