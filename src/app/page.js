'use client';

import Link from 'next/link';
import MatrixBackground from '@/components/MatrixBackground';
import DashboardHeader from '@/components/DashboardHeader';

export default function LandingPage() {
  return (
    <>
      <DashboardHeader />

      <main className="h-screen w-full overflow-x-hidden flex flex-col items-center justify-center px-6 text-center bg-background text-foreground">
        <MatrixBackground />

        <div className="z-0 w-full max-w-2xl rounded-xl shadow-lg">
          <div
            style={{ backgroundColor: 'var(--background)' }}
            className="p-8 rounded-xl border border-borderColor"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Your Meds, Your Choice.
            </h1>

            <p className="text-lg sm:text-xl mb-8 font-medium">
              iChooseRx helps you make informed choices about FDA-approved drugs — based on <span className="font-semibold">your</span> values, allergies, and wellness goals.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <button className="btn-primary px-6 py-3 rounded-2xl text-lg font-medium">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="btn-secondary px-6 py-3 rounded-2xl text-lg font-medium">
                  Sign Up
                </button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 italic">
              Ads coming soon — you might see placeholders. Your feedback helps shape the future.
            </p>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
