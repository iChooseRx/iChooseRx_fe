"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function DocsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-300"
      >
        Docs
      </button>

      <div
        className={`absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white text-black rounded-lg shadow-lg transition-transform duration-300 origin-top-right z-50 ${isOpen ? "scale-y-100" : "scale-y-0"}`}
        style={{ transformOrigin: "top right" }}
      >
        <ul className="flex flex-col p-2">
          <li>
            <Link href="/user-how-to" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              How to Use iChooseRx
            </Link>
          </li>
          <li>
            <Link href="/why-ichooserx" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              Why iChooseRx Exists
            </Link>
          </li>
          <li>
            <Link href="/how-users-benefit" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              How Users Benefit
            </Link>
          </li>
          <li>
            <Link href="/filter-explainer" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              Filter Explainer
            </Link>
          </li>
          <li>
            <Link href="/faq" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              FAQ
            </Link>
          </li>
          <li>
            <Link href="/for-pharmacies" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              For Pharmacies
            </Link>
          </li>
          <li>
            <Link href="/for-manufacturers" className="block px-4 py-2 hover:bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              For Manufacturers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
