"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";

export default function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const menuRef = useRef(null);

  const dashboard = useDashboard();
  const handleLogout = dashboard?.handleLogout ?? (() => { });
  const handleDeleteAccount = dashboard?.handleDeleteAccount ?? (() => { });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
    setRole(localStorage.getItem("user_role") || "user");
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn-secondary btn-nav"
      >
        Menu
      </button>

      <div
        className={`absolute right-0 mt-2 sm:w-48 w-40 max-w-[calc(100vw-1rem)] bg-white text-black rounded-lg shadow-lg z-[9999] transition-transform duration-300 origin-top ${isOpen ? "scale-y-100" : "scale-y-0"
          }`}
        style={{ transformOrigin: "top" }}
      >
        <ul className="flex flex-col p-2">
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                  Home
                </Link>
              </li>
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
              {(role === "pharmacy" || role === "admin") && (
                <li>
                  <Link href="/dashboard/analytics" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                    Search Analytics
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
              <li>
                <Link href="/contact" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                  Contact
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); closeMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded">
                  Logout
                </button>
              </li>
              <li>
                <button onClick={() => { handleDeleteAccount(); closeMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded text-red-600">
                  Delete Account
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                  Home
                </Link>
              </li>
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
              <li>
                <Link href="/contact" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-200 rounded">
                  Contact
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
