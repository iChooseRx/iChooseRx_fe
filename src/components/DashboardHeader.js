"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/hooks/useDashboard";
import DocsDropdown from "@/components/DocsDropdown";

export default function DashboardHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith("/dashboard");

  const dashboard = useDashboard();

  const [role, setRole] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      setIsLoggedIn(!!token);
      setRole(localStorage.getItem("user_role") || "user");
    }
  }, []);

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

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = dashboard?.handleLogout ?? (() => { });
  const handleDeleteAccount = dashboard?.handleDeleteAccount ?? (() => { });

  return (
    <header className="h-20 flex justify-between items-center px-10 bg-primary text-white">
      <h1 className="text-4xl font-bold">iChooseRx</h1>

      {/* Menu */}
      <div className="flex space-x-4 items-center">
        <DocsDropdown />
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Menu
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg transition-transform duration-300 origin-top ${menuOpen ? "scale-y-100" : "scale-y-0"}`}
            style={{ transformOrigin: "top" }}
          >
            <ul className="flex flex-col p-2">
              {isLoggedIn ? (
                <>
                  {/* Role-based dashboard links */}
                  <li>
                    <Link href="/dashboard/search" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                      Drug Search
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/saved" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                      Saved Drugs & Pharmacies
                    </Link>
                  </li>
                  {(role === "pharmacy" || role === "admin") && (
                    <li>
                      <Link href="/dashboard/pharmacy" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                        Upload Dashboard
                      </Link>
                    </li>
                  )}
                  {role === "admin" && (
                    <li>
                      <Link href="/dashboard/admin" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}

                  {/* Public & utility links */}
                  <li>
                    <Link href="/user-how-to" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                      User: How To
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded">
                      Logout
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { handleDeleteAccount(); closeMenu(); }} className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded text-red-600">
                      Delete Account
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup/user" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}