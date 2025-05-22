"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/ads/AdSlot";

export default function PreservativesPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Preservatives</h1>

        <section className="mb-8">
          <p className="mb-4">
            Preservatives are added to medications to extend shelf life and prevent microbial growth. While this can be important for safety and storage, some people may choose to avoid certain preservatives due to personal sensitivities, allergies, or health concerns.
          </p>

          <p className="mb-4">
            Some preservatives are suspected to cause skin reactions, endocrine disruption, or other unwanted effects in sensitive individuals. Others, like parabens or thimerosal, have been controversial due to their inclusion in topical or injectable products.
          </p>

          <p className="mb-4">
            At iChooseRx, we filter out drugs that contain any of the following preservatives:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Citric acid</li>
            <li>Sodium benzoate</li>
            <li>Benzoic acid</li>
            <li>Potassium sorbate</li>
            <li>Sorbic acid</li>
            <li>Butylated hydroxyanisole (BHA)</li>
            <li>Calcium ascorbate</li>
            <li>Sodium ascorbate</li>
            <li>Acetic acid</li>
            <li>Methyl hydroxybenzoate</li>
            <li>Methylparaben</li>
            <li>Benzyl alcohol</li>
            <li>Benzalkonium</li>
            <li>Chlorobutanol</li>
            <li>Thimerosal</li>
            <li>Bronopol</li>
            <li>Propylparaben</li>
            <li>Quaternium-15</li>
            <li>Bromothalonil</li>
            <li>Parabens</li>
            <li>Paraben</li>
            <li>Sulfite / Sulfites</li>
            <li>Methylchloroisothiazolinone</li>
            <li>Polyaminopropyl biguanide</li>
            <li>Phenylethyl alcohol</li>
            <li>Phenoxyethanol</li>
          </ul>

          <p className="mb-4">
            Because there are many names and variants for similar preservatives, we use a blanket filter approach. This means if any known preservative is listed in the inactive ingredients of a drug, we exclude it from your filtered results.
          </p>

          <p className="mb-4">
            This helps users who want to reduce their exposure to preservatives across the board—whether for medical, environmental, or personal wellness reasons.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: Always consult your doctor or pharmacist before making decisions about your medications.
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