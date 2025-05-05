"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function PlaceholderPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">More on this coming soon</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          This page is in the works, reach out on Instagram Please reach out to on instagram <a
            href="https://www.instagram.com/ichooserx/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @ichooserx
          </a> or email <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
            iChooseRx@gmail.com
          </a> if you have questions you would like to see answered here. We are working to add helpful resources and tools to empower your medication and pharmacy choices. Please check back soon for updates!
        </p>

        <section className="text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">What is iChooseRx?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              iChooseRx is a platform that helps users search FDA-approved drugs based on filters like inactive ingredients, lifestyle preferences, and wellness goals.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Is the website being updated regularly?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, we are actively expanding iChooseRx to provide detailed information for every filter, pharmacy tool, and feature. In addition to informational pages, we regularly update app functionality and user experience for user benefit. Our goal is to deliver high-quality and helpful content that is easy for a user to understand. Please reach out to on instagram <a
                href="https://www.instagram.com/ichooserx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @ichooserx
              </a> or email <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
                iChooseRx@gmail.com
              </a> if you have any suggestions for improvements or testimonials. Your voice can help shape the future of iChooseRx and help other users.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">How often is content updated?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              New content is added and updated regularly as we continue improving the platform and responding to community needs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">How can I stay informed about updates?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You can follow our updates on the iChooseRx homepage, instagram Please reach out to on instagram <a
                href="https://www.instagram.com/ichooserx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @ichooserx
              </a> or email <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
                iChooseRx@gmail.com
              </a> if you would like to receive future announcements.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
