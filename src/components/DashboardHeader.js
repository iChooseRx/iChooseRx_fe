"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes"; // ✅ Import useTheme
import { MoonIcon, SunIcon } from "./Icons"; // ✅ Import Icons
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardHeader() {
  const { handleLogout, handleDeleteAccount } = useDashboard();
  const [role, setRole] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme(); // ✅ Manage theme switching
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user_role") || "user");
      setMounted(true);
    }
  }, []);

  // Function to close menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">iChooseRx</h1>

      <div className="flex items-center space-x-4">
        {/* 🌗 Theme Toggle Button */}
        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {resolvedTheme === "dark" ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </button>
        )}

        {/* 📌 Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-secondary px-4 py-2 rounded-lg text-white font-medium transition-all duration-300"
          >
            Menu
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg transition-transform duration-300 origin-top ${menuOpen ? "scale-y-100" : "scale-y-0"
              }`}
            style={{ transformOrigin: "top" }}
          >
            <ul className="flex flex-col p-2">
              <li>
                <Link
                  href="/dashboard/user"
                  className="block px-4 py-2 hover:bg-gray-200 rounded"
                  onClick={closeMenu}
                >
                  Drug Search Dashboard
                </Link>
              </li>

              {(role === "pharmacy" || role === "admin") && (
                <li>
                  <Link
                    href="/dashboard/pharmacy"
                    className="block px-4 py-2 hover:bg-gray-200 rounded"
                    onClick={closeMenu}
                  >
                    Upload Dashboard
                  </Link>
                </li>
              )}

              {role === "admin" && (
                <li>
                  <Link
                    href="/dashboard/admin"
                    className="block px-4 py-2 hover:bg-gray-200 rounded"
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}

              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Logout
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleDeleteAccount();
                    closeMenu();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded text-red-600"
                >
                  Delete Account
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
