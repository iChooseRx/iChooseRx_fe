"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function ForManufacturersPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Connect with Conscious Consumers</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          We're building tools to help manufacturers connect with patients who are actively seeking transparency and alignment with their health values. Full content coming soon!
        </p>

        <section className="text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">How iChooseRx Can Support Manufacturers</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Enhance Patient Trust</h3>
            <p className="text-gray-600 dark:text-gray-400">
              iChooseRx highlights medication options based on user-driven filters. Manufacturers who offer clear, conscious formulations can build stronger, more trusted relationships with patients actively looking for those choices.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Access Anonymous Search Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We're developing analytics to help manufacturers understand what users are searching for — anonymously — providing insights into ingredient preferences, trending concerns, and opportunities for future formulations.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Promote Transparency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Conscious consumers value transparency. iChooseRx aims to create a bridge where manufacturers who prioritize clear labeling and mindful formulation can stand out positively.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Future Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-400">
              In the future, we plan to offer featured placements, awareness campaigns, and direct collaboration opportunities for manufacturers who align with conscious choice principles.
            </p>
          </div>

          <p className="mt-8 text-sm italic text-gray-400">
            Stay tuned — we're excited to help build stronger patient-manufacturer connections.
          </p>
        </section>
      </main>
    </>
  );
}
