"use client";
import React from "react";

export default function SearchBar({ drugName, setDrugName, onSearch, isLoading }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch(e);
  }

  return (
    <div className="flex items-center space-x-4 mb-2">
      <input
        type="text"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter drug's generic name"
        className="input-field w-full"
        aria-label="Search for a drug by its generic name"
        role="searchbox"
      />
      <button
        onClick={onSearch}
        className="btn-primary px-4 py-2 rounded"
        disabled={isLoading}
        aria-label="Search"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
