"use client";
import React from "react";
import Link from "next/link";

export default function DashboardHeader({ onLogout, onDeleteAccount }) {
  return (
    <header className="bg-primary text-foreground p-4 flex justify-between items-center">
      <h1 className="text-3xl md:text-5xl font-bold">iChooseRx</h1>

      {/* ✅ Navigation Links */}
      <nav className="space-x-4">
        <Link href="/dashboard" className="text-foreground hover:underline">
          Home
        </Link>
        <Link href="/dashboard/upload" className="text-foreground hover:underline">
          📂 Upload
        </Link>
        <button
          onClick={onLogout}
          className="text-foreground hover:underline"
          aria-label="Logout"
        >
          Logout
        </button>
        <button
          onClick={onDeleteAccount}
          className="text-foreground hover:underline"
          aria-label="Delete Account"
        >
          Delete Account
        </button>
      </nav>
    </header>
  );
}
