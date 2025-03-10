"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardHeader() {
  const { handleLogout, handleDeleteAccount } = useDashboard();
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user_role") || "user");
    }
  }, []);

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-5xl font-bold">iChooseRx</h1>

      <nav className="space-x-4">
        {/* ✅ Update Home link to go to the Drug Search Dashboard */}
        <Link href="/dashboard/user" className="hover:underline">
          Drug Search Dashboard
        </Link>

        {/* ✅ Pharmacy and Admin can see Upload */}
        {(role === "pharmacy" || role === "admin") && (
          <Link href="/dashboard/pharmacy" className="hover:underline">
            Upload Dashboard
          </Link>
        )}

        {/* ✅ Admins can see Admin Dashboard */}
        {role === "admin" && (
          <Link href="/dashboard/admin" className="hover:underline">
            Admin Dashboard
          </Link>
        )}

        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
        <button onClick={handleDeleteAccount} className="hover:underline">
          Delete Account
        </button>
      </nav>
    </header>
  );
}
