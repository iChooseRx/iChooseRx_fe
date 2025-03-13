"use client";
import FileUpload from "@/components/FileUpload";

export default function PharmacyDashboard() {
  return (
    <div className="p-6">
      {/* Improved Title */}
      <h1 className="text-3xl font-bold text-primary mb-6">
        🏥 Pharmacy Dashboard
      </h1>

      {/* File Upload Section */}
      <FileUpload />

      {/* Placeholder for future features */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-6">
          📊 Uploaded Files
        </h2>
        <p className="text-foreground">
          Here, you'll see a list of all uploaded files once implemented.
        </p>
      </div>
    </div>
  );
}
