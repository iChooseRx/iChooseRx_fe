"use client";

import DashboardHeader from "@/components/DashboardHeader";
import AdSlot from "@/components/AdSlot";

export default function PlaceholderPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">More on this coming soon</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          This page is under development. If you have questions you would like us to cover here, feel free to reach out on{" "}
          <a
            href="https://www.instagram.com/ichooserx/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Instagram @ichooserx
          </a>{" "}
          or email us at{" "}
          <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
            iChooseRx@gmail.com
          </a>. We are working to add practical tools and resources that make your experience more informed and empowering. Please check back soon!
        </p>

        <section className="text-left max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">What is iChooseRx?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              iChooseRx is a health transparency tool that helps users search FDA-approved drugs based on inactive ingredients, lifestyle preferences, and personal wellness filters — putting informed choices into your hands.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Is the website being updated regularly?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! We are actively expanding iChooseRx to improve filter explanations, pharmacy tools, and search functionality. We aim to provide helpful, easy-to-understand information so you can make confident medication decisions. Got ideas? Let us know via{" "}
              <a
                href="https://www.instagram.com/ichooserx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Instagram
              </a>{" "}
              or{" "}
              <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
                email
              </a>.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">How often is content updated?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We update content regularly as we learn from user needs and expand features. This includes filter logic, crowdsourced pharmacy data, and educational pages like this one.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">How can I stay informed about updates?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Follow us on{" "}
              <a
                href="https://www.instagram.com/ichooserx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Instagram @ichooserx
              </a>{" "}
              or reach out via{" "}
              <a href="mailto:iChooseRx@gmail.com" className="text-primary hover:underline">
                email
              </a>{" "}
              if you would like to receive future updates, contribute ideas, or share your experience.
            </p>
          </div>

          <AdSlot position="faq-bottom" className="h-24" />
        </section>
      </main>
    </>
  );
}