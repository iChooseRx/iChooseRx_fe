"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function PrivacyPolicyPage() {
  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen flex flex-col items-center justify-start bg-background text-foreground p-6">
        <div className="max-w-3xl w-full space-y-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

          <p>
            At iChooseRx, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect basic account information such as your email address and password to create and manage your account. We do not sell or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, personalize your experience, and communicate with you. We may also use aggregated, anonymized data for analytics and service improvement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
          <p>
            We use third-party services like Google AdSense to serve ads. These services may collect information using cookies or similar technologies. You can review Google privacy practices for more information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
          <p>
            iChooseRx uses cookies to enhance functionality and improve your experience. You can disable cookies through your browser settings, but some features may not function properly.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices</h2>
          <p>
            You can delete your account information at any time by logging in and selecting delete account from the menu. If you have questions or requests regarding your data, please contact us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>

          <p className="text-sm text-gray-500 mt-8 text-center">
            Last updated: April 28, 2025
          </p>
        </div>
      </main>
    </>
  );
}
