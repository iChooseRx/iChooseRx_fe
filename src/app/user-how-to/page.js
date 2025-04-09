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
            Click the <strong>Save</strong> button on any search result to add it to your saved list. Navigate to the saved drugs section (using the menu button at the top right of the page),
            you can add personal notes to remember why you saved a drug or what to ask your pharmacist, or anything else really.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Finding the Right NDC</h2>
          <p>
            When you view drug details (click + details), scroll down to the <strong>Description</strong> field, look for a section like <strong>Inactive Ingredients</strong> make sure to confirm the inactive ingredients match your filters. There will also be a decsciption of each strength of the result. Once you confirm the strength you want matches your wants or needs, scroll down to the <strong>How Supplied</strong> field.
            This is where you can find the exact NDC that matches the dosage or strength you are looking for. You will see something like this in the <strong>How Supplied</strong> field with all of the strengths <strong>5 mg: White to off white round tablets with T370 debossed on one side and four partial bisects on other side. NDC 43602-982-15</strong>. Add that NDC to the notes of your saved drug for reference. Now you can easily add that NDC to the availability report once you find it in the next step. If there is no NDC in the <strong>How Supplied</strong> field, then it may mean there is only one strength and you may be able to use the <strong>Package NDC</strong> number to find the drug at a pharmacy.
            Crowdsourcing: Call your local pharmacies (shop local) and ask for a pharmacist, tell them the NDCs you are looking for, in my experiences they will then search and tell you if they have it available. Please report if you found a drug to help us spread awareness and empowerment to our users.
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
