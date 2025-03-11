// src/app/dashboard/PharmacyDashboard.js
"use client";
import FileUpload from "@/components/FileUpload";

export default function PharmacyDashboard() {
  return (
    <div>
      <h1>Pharmacy Dashboard</h1>
      <FileUpload />
      {/* Show a table of uploaded files, filter controls, etc. */}
    </div>
  );
}
