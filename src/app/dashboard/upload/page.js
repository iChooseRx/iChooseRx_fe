"use client";

import FileUpload from "@/components/FileUpload";
import DashboardHeader from "@/components/DashboardHeader"; // ✅ Import Navbar/Header

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ Include Dashboard Header */}
      <DashboardHeader />

      {/* ✅ Upload Page Content */}
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">📂 Upload Pharmacy Inventory</h1>
        <p className="mb-6">Drag & drop a pharmacy inventory file below or click to select one.</p>
        <FileUpload />
      </main>
    </div>
  );
}
