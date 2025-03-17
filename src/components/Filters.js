"use client";
import React from "react";

export default function DrugFilter({ filters, selectedFilters, setSelectedFilters }) {
  const toggleFilter = (filterKey) => {
    setSelectedFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <label
          key={filter.key}
          className="flex items-center space-x-2 bg-background border border-borderColor p-2 rounded shadow-sm cursor-pointer hover:bg-[var(--hover-light)] dark:hover:bg-[var(--hover-dark)] transition-colors"
        >
          <input
            type="checkbox"
            checked={selectedFilters.includes(filter.key)}
            onChange={() => toggleFilter(filter.key)}
            className="form-checkbox text-primary focus:ring-primary"
          />
          <span className="text-sm text-foreground">{filter.label}</span>
        </label>
      ))}
    </div>
  );
}
