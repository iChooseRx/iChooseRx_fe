"use client";

import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/AdSlot";

export default function ForPharmaciesPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Grow Your Pharmacy with iChooseRx</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          We are building tools to help local pharmacies thrive by connecting them with patients actively searching for specific medications. Full content coming soon!
        </p>

        <section className="text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">How iChooseRx Can Support Your Pharmacy</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Increase Foot Traffic</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Patients using iChooseRx are already looking for specific drug formulations that match their needs and values. By being visible to them, your pharmacy can become their trusted destination.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Boost Revenue</h3>
            <p className="text-gray-600 dark:text-gray-400">
              When patients know where they can find the medications they want, it can lead to more prescriptions filled, additional retail purchases, and long-term customer loyalty.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Strengthen Community Trust</h3>
            <p className="text-gray-600 dark:text-gray-400">
              By helping patients find drugs that align with their health needs and personal values, your pharmacy becomes a leader in conscious care within your community.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Support for Physicians and Prescribers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Doctors want to know where their patients can reliably get the treatments they prescribe. iChooseRx can help create connections between pharmacies and local prescribers who value access, trust, and patient-centered care.
            </p>
          </div>

          <p className="mt-8 text-sm italic text-gray-400">
            Stay tuned — we are excited to help pharmacies grow and strengthen their role as trusted health allies.
          </p>
        </section>

        <div className="my-6">
          <AdSlot position="added-sugar-page-bottom" className="h-24" />
        </div>
      </main>
    </>
  );
}