"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function HowUsersBenefitPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">How iChooseRx Empowers You</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          We are making it easier than ever to find the right medications for your needs, values, lifestyle, and health goals. Full content coming soon!
        </p>

        <section className="text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Why Use iChooseRx?</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Find Drugs That Align with You</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you are avoiding certain additives, managing allergies, or living according to specific lifestyle choices, iChooseRx helps you quickly search FDA-approved drugs that match your criteria — without endless guesswork.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Save Time and Reduce Frustration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No more combing through hard-to-read ingredient lists. Our filters make it simple to find options that fit your personal or medical needs in just a few clicks.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Crowdsource Pharmacy Availability</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Users can report where they found specific drug formulations, helping others find pharmacies that stock the medications they need — and building a supportive, community-driven network.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">There’s Nothing Else Like It</h3>
            <p className="text-gray-600 dark:text-gray-400">
              iChooseRx was built because this tool did not exist — until now. We are dedicated to giving you transparent, conscious options when it comes to your health decisions.
            </p>
          </div>

          <p className="mt-8 text-sm italic text-gray-400">
            Your choices matter. iChooseRx makes finding the right drug — and the right pharmacy — simpler, faster, and more aligned with what matters most to you.
          </p>
        </section>
      </main>
    </>
  );
}