"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function SugarAlcoholsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Sugar Alcohols</h1>

        <section className="mb-8">
          <p className="mb-4">
            Sugar alcohols are a class of sweeteners commonly used in medications, especially in chewables, syrups, and dissolvables. While they are lower in calories than sugar, they can cause digestive upset in some individuals and may be avoided for various health or dietary reasons.
          </p>

          <p className="mb-4">
            iChooseRx filters out drugs that list sugar alcohols in their inactive ingredients to support users managing sensitivities, digestive concerns, or following specific dietary guidelines.
          </p>

          <p className="mb-4">
            We exclude medications containing any of the following sugar alcohols:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Erythritol</li>
            <li>Xylitol</li>
            <li>Maltitol</li>
            <li>Sorbitol</li>
            <li>Isomalt</li>
            <li>Mannitol</li>
            <li>Lactitol</li>
            <li>Hydrogenated starch hydrolysates</li>
            <li>Glycerol</li>
            <li>Threitol</li>
          </ul>

          <p className="mb-4">
            Since inactive ingredient labels don’t always list quantities or clarify potential combinations, iChooseRx uses a blanket filter to help users avoid sugar alcohols altogether.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: Always consult your doctor or pharmacist if you experience gastrointestinal side effects or are unsure about ingredients in your medication.
          </p>
        </section>

        <Link href="/filter-explainer" className="text-primary hover:underline">
          ← Back to Filter Explainer
        </Link>
      </main>
    </>
  );
}