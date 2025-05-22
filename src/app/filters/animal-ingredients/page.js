"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/AdSlot";

export default function AnimalIngredientsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Animal Ingredients</h1>

        <section className="mb-8">
          <p className="mb-4">
            Many people choose to avoid animal-derived ingredients in their medications for ethical, dietary, or health reasons. These ingredients, often used as binders, fillers, or coatings, may not be clearly labeled as animal-based.
          </p>

          <p className="mb-4">
            iChooseRx filters out drugs that contain known animal byproducts to support users who follow vegetarian, vegan, religious, or allergen-conscious lifestyles.
          </p>

          <p className="mb-4">
            We exclude medications that list any of the following animal-derived ingredients:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Bone</li>
            <li>Gelatin</li>
            <li>Lactose</li>
            <li>Anhydrous lactose</li>
            <li>Lactose monohydrate</li>
            <li>Milk</li>
            <li>Dairy</li>
            <li>Milk powder</li>
            <li>Casein</li>
            <li>Whey</li>
            <li>Sodium tallowate</li>
            <li>Tallow</li>
            <li>Shellac</li>
            <li>Carmine</li>
            <li>Honey</li>
            <li>Magnesium stearate</li>
          </ul>

          <p className="mb-4">
            Since not all inactive ingredient labels are explicit about animal sourcing, we use a blanket filter to help users minimize exposure to potential animal-based additives.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: Always consult your doctor or pharmacist if you have specific ingredient sensitivities or dietary needs.
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