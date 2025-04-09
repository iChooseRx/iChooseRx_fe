"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function ArtificialColorsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Artificial Colors</h1>

        <section className="mb-6">
          <p className="mb-4">
            Artificial colors are synthetic dyes used to enhance the appearance of medications, especially in chewables, liquids, and some tablets or capsules. These dyes often have no therapeutic purpose but are added to improve visual appeal or create brand consistency.
          </p>
          <p className="mb-4">
            Some users may choose to avoid artificial colors due to concerns about potential sensitivities, allergic reactions, hyperactivity in children, or general wellness goals. While the FDA permits their use in medications, emerging research and public sentiment have led some people to seek alternatives.
          </p>
          <p className="mb-4">
            iChooseRx includes a blanket filter for artificial colors to help users easily exclude any drugs that list ingredients like:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>FD&amp;C Red No. 40, Yellow 5, Yellow 6, Blue 1, Red 3, Blue 2, Green 3, and any other FD&amp;C color</li>
            <li>Aluminum Lake variants</li>
            <li>Synthetic Color / Dye / Colorant</li>
            <li>Artificial Dye or Artificial Coloring</li>
            <li>Grape 501417c</li>
          </ul>
          <p className="mb-4">
            Rather than making users choose which dyes to filter individually, we group these ingredients under a single Artificial Colors filter to simplify the experience and avoid confusion from obscure dye names or manufacturer variations.
          </p>
        </section>

        <section className="mt-10">
          <Link
            href="/filter-explainer"
            className="text-primary hover:underline"
          >
            ← Back to Filter Explainer
          </Link>
        </section>
      </main>
    </>
  );
}
