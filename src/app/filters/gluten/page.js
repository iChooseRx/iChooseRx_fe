"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function GlutenPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Gluten</h1>

        <section className="mb-8">
          <p className="mb-4">
            Gluten is a protein found in grains like wheat, barley, and rye. While it’s most commonly associated with food, it can also be found in medications through inactive ingredients like starches, binders, or fillers.
          </p>

          <p className="mb-4">
            For individuals with celiac disease, gluten sensitivity, or those following a gluten-free lifestyle, consuming even trace amounts of gluten may lead to adverse effects such as gastrointestinal discomfort, inflammation, or more serious autoimmune reactions.
          </p>

          <p className="mb-4">
            iChooseRx filters out drugs containing any of the following gluten-containing ingredients:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Wheat</li>
            <li>Barley</li>
            <li>Starch</li>
            <li>Pregelatinized starch</li>
            <li>Modified starch</li>
            <li>Malt</li>
            <li>Dextrates</li>
            <li>Dextrin</li>
            <li>Sodium starch glycolate</li>
            <li>Rye</li>
            <li>Triticale</li>
            <li>Gluten</li>
            <li>Brewers yeast / Brewers yeast</li>
            <li>Wheat berries / Wheatberries</li>
            <li>Wheat starch</li>
            <li>Flour</li>
            <li>Durum</li>
            <li>Emmer</li>
            <li>Semolina</li>
            <li>Spelt</li>
            <li>Farina</li>
            <li>Farro</li>
            <li>Graham</li>
            <li>KAMUT® khorasan wheat</li>
            <li>Einkorn wheat</li>
          </ul>

          <p className="mb-4">
            Because these ingredients may appear under different names or formulations, we use a blanket filter to ensure no hidden gluten slips through. This gives users greater confidence and control over what they put in their bodies.
          </p>

          <p className="text-sm text-gray-500 italic">
            Note: Always check with your pharmacist if you have a severe gluten allergy or celiac disease. While iChooseRx helps flag common gluten-containing ingredients, manufacturers may change formulations.
          </p>
        </section>

        <div className="my-6">
          <AdSlot position="gluten-page-bottom" className="h-24" />
        </div>

        <Link href="/filter-explainer" className="text-primary hover:underline">
          ← Back to Filter Explainer
        </Link>
      </main>
    </>
  );
}