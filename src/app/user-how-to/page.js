"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function UserHowToPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-background text-foreground p-6">
        <h1 className="text-3xl font-bold mb-6">How to Use iChooseRx</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Searching for Drugs</h2>
          <p>
            Use the search bar to look up any FDA-approved medication by its <strong>generic name</strong>.
            Apply filters to exclude inactive ingredients (excipients) you do not want in your medication.
            Click Search.
            If no results, check the spelling of the drug and/or loosen your filtering.
            The bar graph shows total drugs returned (red) versus filterd drugs (green).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. Saving Drugs & Adding Notes</h2>
          <p>
            Click the <strong>Save</strong> button on any search result to add it to your saved list. Navigate to the saved drugs section (via the top right menu button) where you can add personal notes — such as what to ask your pharmacist or why you saved that drug.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Finding the Right NDC</h2>
          <p>
            After clicking <strong>+ Details</strong> on a drug result:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>First, read the <strong>Description</strong>: This field may list dosage strengths and other drug info.</li>
            <li>Then, <strong>Inactive Ingredients</strong>: Check this section to confirm if the formulation aligns with your filters. It may list inactive ingredients per strength if they differ.</li>
            <li>Then, <strong>How Supplied</strong>: Scroll to this section to find NDCs tied to specific dosages. You'll see lines like:<br />
              <em>5 mg: White to off-white round tablets with T370 debossed... NDC 43602-982-15</em>
            </li>
          </ul>
          <p>
            After saving the drug, navigate to the saved drugs page via the menu link, copy the NDC and paste it into the <strong>notes</strong> field of your saved drug with any other helpful notes. That way, you'll have it ready when reporting pharmacy availability.
          </p>
          <p className="mt-2">
            If there's no NDC in the <strong>How Supplied</strong> field, it may mean the drug only comes in one strength — in that case, try using the <strong>Package NDC</strong>.
          </p>
          <p className="mt-2">
            <strong>Crowdsourcing tip:</strong> Call local pharmacies and ask the pharmacist if they carry the NDC you're seeking. If they confirm availability, please report it — your contribution helps others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Reporting a Found Drug</h2>
          <p>
            From the saved drug notes or
            If you find a drug in a pharmacy, go to your saved list and click <strong>Report Pharmacy Availability</strong>.
            Fill out the form with the <strong>Pharmacy Name, Street Address, City, State, Zip, Phone, and the NDC(s)</strong> you found. You can also add additional helpful notes. Then this report will go to the Administrator (Me) to call to confirm, and them BOOM! we now have either a new pharmacy in our database with this new inventory, or we add this found drug to a pharmacy that we already have in the database. THANK YOU!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Searching Pharmacies by NDC</h2>
          <p>
            Navigate to the pharmacy search page by clicking <strong>Saved Drugs & Pharmacies</strong> in the menu button (same page as saved drugs) and enter the NDC you are looking for.
            You will see which pharmacies (if any) have that NDC reported in our system.
            At the moment this list is growing, I will eventually add a way to find pharmacies within a proximity of your location. At the moment it will list all pharmacies that have the NDC.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Reporting a Drug as Unavailable</h2>
          <p>
            If a pharmacy no longer has an NDC after you called to check, click <strong>Report Unavailable</strong> in the pharmacy view. An Administrator will get the report (Me), and then will confirm or deny to remove the NDC from that pharmacy inventory.
            This helps us keep the information current for everyone. I want to make this a good experience for all of us by keeping the data as fresh and valid as possible.
          </p>
        </section>

        <section className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-sm text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
          <h2 className="font-bold mb-2 text-yellow-700 dark:text-yellow-300">Disclaimer</h2>
          <p>
            iChooseRx does not provide medical advice, diagnosis, or treatment. This platform is not intended to diagnose, treat, cure, or prevent any disease or condition. The information on iChooseRx is curated from publicly available data and is intended to help users make informed, conscious decisions about the drugs they may be prescribed or take.
          </p>
          <p className="mt-2">
            Always consult your doctor, pharmacist, or a qualified healthcare provider before making decisions about your medications. Do your due diligence before using any drug found through iChooseRx. iChooseRx does not make any recommendations or endorsements of one drug over another.
          </p>
        </section>

        <div className="mt-6 text-sm text-gray-500">
          <p>Need more help? Reach out to us or explore the other help guides coming soon.</p>
          <div className="mt-4 flex items-center space-x-2">
            <span>📬</span>
            <Link
              href="https://www.instagram.com/ichooserx?igsh=MWpsNGJ0N3JjYWlndg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @ichooserx
            </Link>
          </div>
        </div>

        <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-block">
          ← Back to Dashboard
        </Link>
      </main>
    </>
  );
}
