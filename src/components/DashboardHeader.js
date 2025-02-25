"use client";
import React from "react";

export default function DashboardHeader({ onLogout, onDeleteAccount }) {
  return (
    <header className="bg-primary text-foreground p-4 flex justify-between items-center">
      <h1 className="text-3xl md:text-5xl font-bold">iChooseRx</h1>
      <div className="space-x-4">
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
      </div>
    </header>
  );
}
