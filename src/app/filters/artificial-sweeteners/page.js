"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/AdSlot";

export default function ArtificialSweetenersPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground px-6 py-8">
        <h1 className="text-3xl font-bold mb-4">Artificial Sweeteners</h1>

        <section className="mb-6">
          <p className="mb-2">
            Artificial sweeteners are synthetic sugar substitutes that are often much sweeter than natural sugar but contain little to no calories. They are commonly added to medications to improve taste, especially chewables, liquids, and dissolvable tablets.
          </p>
          <p>
            While they may be considered safe by regulatory agencies in certain quantities, some individuals may wish to avoid them due to personal health concerns, sensitivities, or wellness preferences. For example, artificial sweeteners have been linked in some studies to changes in gut microbiota, headaches, or blood sugar dysregulation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Why this filter exists on iChooseRx</h2>
          <p>
            If you enable the Artificial Sweeteners filter, iChooseRx will automatically exclude any medications containing common artificial sweeteners. This includes brand names and chemical names commonly found in excipient lists.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Examples of filtered ingredients</h2>
          <ul className="list-disc ml-6">
            <li>Saccharin / Sodium Saccharin</li>
            <li>Aspartame / NutraSweet / Equal</li>
            <li>Sucralose / Splenda</li>
            <li>Acesulfame K / Ace-K</li>
            <li>Neotame</li>
            <li>Advantame</li>
            <li>Cyclamate</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Why a blanket filter?</h2>
          <p>
            We chose a category-wide filter instead of selecting individual sweeteners because:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Many users may not know the chemical names for all artificial sweeteners</li>
            <li>Some manufacturers list sweeteners under brand names or obscure synonyms</li>
            <li>It supports simplicity and reduces the risk of oversight</li>
          </ul>
          <p className="mt-2">
            This approach helps ensure users can make informed and conscious decisions without needing to track every variation manually.
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