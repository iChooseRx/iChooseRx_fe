"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function AddedSugarPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Added Sugar</h1>

        <section className="mb-8">
          <p className="mb-4">
            Added sugars are sometimes used in medications to improve taste or act as binders in tablets. However, many people—especially those managing metabolic health, insulin resistance, or inflammation—prefer to avoid added sugars in any form.
          </p>

          <p className="mb-4">
            iChooseRx filters out drugs that contain any known forms of added sugars in the inactive ingredients list. This includes both obvious and less obvious sources.
          </p>

          <p className="mb-4 font-semibold">We filter out any drugs containing:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Added sugar</li>
            <li>High-fructose corn syrup (HFCS)</li>
            <li>HFCS 55</li>
            <li>HFCS 42</li>
            <li>Corn syrup</li>
            <li>Evaporated cane juice</li>
            <li>Cane sugar</li>
            <li>Fruit juice concentrate</li>
            <li>Dextrose</li>
            <li>Fructose</li>
            <li>Glucose</li>
            <li>Sugar</li>
            <li>Sucrose</li>
            <li>Maltodextrin</li>
            <li>Compressible sugar</li>
            <li>Sucrose syrup</li>
            <li>Honey</li>
            <li>Molasses</li>
            <li>Maple syrup</li>
            <li>Brown sugar</li>
            <li>Beet sugar</li>
            <li>Raw sugar</li>
            <li>Turbinado sugar</li>
            <li>Sorghum syrup</li>
          </ul>

          <p className="mb-4">
            While some of these might seem natural, they still count as added sugars and can interfere with personal dietary goals or medical needs. Our filter simplifies your experience by excluding any drug that lists one of these sweeteners.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: Always consult your healthcare provider before making medication decisions.
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