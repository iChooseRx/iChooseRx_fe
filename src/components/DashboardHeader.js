"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardHeader() {
  const { handleLogout, handleDeleteAccount } = useDashboard();
  const [role, setRole] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("user_role") || "user");
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Function to close menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-primary text-white h-20 flex justify-between items-center px-10">
      <h1 className="text-4xl font-bold">iChooseRx</h1>

      {/* Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-secondary px-4 py-2 rounded-lg text-white font-medium transition-all duration-300"
        >
          Menu
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg transition-transform duration-300 origin-top ${menuOpen ? "scale-y-100" : "scale-y-0"
            }`}
          style={{ transformOrigin: "top" }}
        >
          <ul className="flex flex-col p-2">
            <li>
              <Link
                href="/dashboard/search"
                className="block px-4 py-2 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                Drug Search
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/saved"
                className="block px-4 py-2 hover:bg-gray-200 rounded"
                onClick={closeMenu}
              >
                Saved Drugs & Pharmacies
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
    </header>
  );
}
