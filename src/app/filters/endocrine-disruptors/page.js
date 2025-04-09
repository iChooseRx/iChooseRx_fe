"use client";

import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function EndocrineDisruptorsPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">Endocrine Disruptors</h1>

        <section className="mb-8">
          <p className="mb-4">
            Endocrine disruptors are substances that may interfere with the body’s hormonal system. Even in small doses, some of these compounds are linked to developmental, reproductive, neurological, and immune effects in both humans and wildlife.
          </p>

          <p className="mb-4">
            iChooseRx filters out medications containing known or suspected endocrine disruptors to help users reduce their exposure to these potentially harmful substances.
          </p>

          <p className="mb-4">
            The following ingredients are among those we filter out under this category:
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Atrazine</li>
            <li>Atenolol</li>
            <li>DEET</li>
            <li>DDT</li>
            <li>Estrone</li>
            <li>Meprobamate</li>
            <li>Bisphenol A (BPA)</li>
            <li>Dioxins</li>
            <li>Parabens / Paraben</li>
            <li>Perchlorate</li>
            <li>PFAS (Per- and polyfluoroalkyl substances)</li>
            <li>Phthalates</li>
            <li>Plasticizers</li>
            <li>Phytoestrogens</li>
            <li>PBDEs (Polybrominated diphenyl ethers)</li>
            <li>PCBs (Polychlorinated biphenyls)</li>
            <li>Triclosan</li>
            <li>Trimethoprim</li>
            <li>Retinol</li>
            <li>Benzoyl peroxide</li>
            <li>Salicylic acid</li>
            <li>Glyphosate</li>
            <li>Cadmium</li>
            <li>Lead</li>
          </ul>

          <p className="mb-4">
            Because the research on endocrine disruptors is still evolving and exposures may be cumulative, we take a conservative approach by using a blanket filter for any mention of these compounds.
          </p>

          <p className="text-sm text-gray-500 italic">
            Reminder: This filter is provided to support informed decision-making. Please consult a healthcare professional for personalized medical advice.
          </p>
        </section>

        <Link href="/filter-explainer" className="text-primary hover:underline">
          ← Back to Filter Explainer
        </Link>
      </main>
    </>
  );
}