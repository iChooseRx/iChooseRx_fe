'use client';

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function ArtificialFlavorsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen px-6 py-8 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-6">Artificial Flavors</h1>

        <section className="mb-6">
          <p className="mb-4">
            Artificial flavors are synthetic compounds used to mimic the taste or aroma of natural ingredients.
            In medications, they are commonly added to improve palatability—especially in chewable, liquid, or dissolvable forms.
          </p>
          <p>
            These flavors may be derived from petrochemicals or other synthetic sources. Some people choose to avoid artificial flavors
            due to concerns about long-term exposure to certain compounds, potential allergic reactions, or because they wish to minimize
            consumption of synthetic additives as part of a wellness or elimination protocol.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Why This Filter Exists</h2>
          <p>
            Our artificial flavor filter removes medications that list synthetic flavoring agents in the inactive ingredients.
            This may include terms like artificial flavor, imitation flavor, or specific synthetics like benzophenone or pulegone.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients We Filter Out</h2>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            <li>Artificial Flavor / Artificial Flavors / Imitation Flavor</li>
            <li>Artificial Mixed Berry / Cherry / Peach / Grape / Fruit Punch / Cranberry / Black Cherry / Blackberry</li>
            <li>Artificial Bubblegum Flavor / Bubble Gum</li>
            <li>Synthetically-derived Benzophenone</li>
            <li>Ethyl Acrylate, Methyl Eugenol, Pulegone, Myrcene, Styrene</li>
            <li>Flavor N&amp;A, Vanillin, Nature Identical Flavor, Natural Identical Flavors</li>
            <li>Grape 501417C</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Why We Use a Blanket Filter</h2>
          <p>
            Rather than allow users to toggle specific flavoring compounds, we apply a single filter that flags any
            presence of synthetic or imitation flavoring. This helps simplify your decision-making process and
            ensures you are only seeing options that meet your overall preference to avoid artificial flavors entirely.
          </p>
        </section>

        <div className="my-6">
          <AdSlot position="artificial-flavors-page-bottom" className="h-24" />
        </div>

        <Link href="/filter-explainer" className="text-primary hover:underline">
          ← Back to Filter Explainer
        </Link>
      </main>
    </>
  );
}