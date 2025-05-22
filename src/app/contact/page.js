"use client";

import PublicPageLayout from "@/components/layouts/PublicPageLayout";
import AdSlot from "@/components/AdSlot";

export default function ContactPage() {
  return (
    <PublicPageLayout title="Contact iChooseRx">
      <p className="mb-4">
        We would love to hear from you. Whether you have a question, found an issue, want to collaborate, or want to share your experience using iChooseRx.com feel free to reach out!
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">📧 Email</h2>
          <p>
            <a
              href="mailto:iChooseRx@gmail.com"
              className="text-primary hover:underline"
            >
              iChooseRx@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-1">📷 Instagram</h2>
          <p>
            <a
              href="https://www.instagram.com/ichooserx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @ichooserx
            </a>
          </p>
        </div>
      </div>

      <AdSlot position="contact-page-bottom" className="mt-8" />
    </PublicPageLayout>
  );
}