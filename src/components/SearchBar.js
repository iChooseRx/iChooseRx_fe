"use client";
import React from "react";

export default function SearchBar({ drugName, setDrugName, onSearch, isLoading }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch(e);
  }

  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter drug's generic name"
        className="border border-borderColor rounded p-2 w-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
        aria-label="Search for a drug by its generic name"
        role="searchbox"
      />
      <button
        onClick={onSearch}
        className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
        disabled={isLoading}
        aria-label="Search"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
