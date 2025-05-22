"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function FilterExplainerPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Understanding iChooseRx Filters</h1>

        <p className="mb-6">
          iChooseRx filters allow you to screen out inactive ingredients (excipients) that may be
          personally or medically important to avoid. Rather than selecting individual ingredients,
          each filter category removes a whole class of related additives, which keeps things simple
          and aligned with how these ingredients appear in drug databases.
        </p>

        <p className="mb-6">
          Learn more about each filter below, why someone may want to use it, and why we use a
          blanket category approach:
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <Link href="/filters/artificial-colors" className="text-primary hover:underline">
              Artificial Colors
            </Link>
          </li>
          <li>
            <Link href="/filters/artificial-sweeteners" className="text-primary hover:underline">
              Artificial Sweeteners
            </Link>
          </li>
          <li>
            <Link href="/filters/artificial-flavors" className="text-primary hover:underline">
              Artificial Flavors
            </Link>
          </li>
          <li>
            <Link href="/filters/preservatives" className="text-primary hover:underline">
              Preservatives
            </Link>
          </li>
          <li>
            <Link href="/filters/gluten" className="text-primary hover:underline">
              Gluten
            </Link>
          </li>
          <li>
            <Link href="/filters/added-sugar" className="text-primary hover:underline">
              Added Sugar
            </Link>
          </li>
          <li>
            <Link href="/filters/animal-ingredients" className="text-primary hover:underline">
              Animal Ingredients
            </Link>
          </li>
          <li>
            <Link href="/filters/endocrine-disruptors" className="text-primary hover:underline">
              Endocrine Disruptors
            </Link>
          </li>
          <li>
            <Link href="/filters/sugar-alcohols" className="text-primary hover:underline">
              Sugar Alcohols
            </Link>
          </li>
          <li>
            <Link href="/filters/harmful-additives" className="text-primary hover:underline">
              Other Potentially Harmful Additives
            </Link>
          </li>
        </ul>

        <div className="my-8">
          <AdSlot position="filter-explainer-bottom" className="h-24" />
        </div>

        <p className="mt-10 text-sm text-gray-500">
          These filters are not medical advice. Always consult a qualified healthcare professional to
          decide what matters for you.
        </p>
      </main>
    </>
  );
}