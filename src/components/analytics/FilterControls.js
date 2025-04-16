"use client";

import { useState } from "react";

export default function FilterControls({ onFilterChange, initialFilters }) {
  const [drugId, setDrugId] = useState(initialFilters.drug_id || "");
  const [start, setStart] = useState(initialFilters.start || "");
  const [end, setEnd] = useState(initialFilters.end || "");

  const handleSearch = () => {
    onFilterChange({ drug_id: drugId.trim(), start, end });
  };

  const handleExportCSV = () => {
    const params = new URLSearchParams();
    if (drugId) params.append("drug_id", drugId);
    if (start) params.append("start", start);
    if (end) params.append("end", end);

    window.open(`/api/v1/admin/search_analytics.csv?${params.toString()}`, "_blank");
  };

  return (
    <div className="bg-muted p-4 rounded shadow-sm flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Drug Name</label>
        <input
          type="text"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          className="input-field"
          placeholder="e.g. ibuprofen"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Start Date</label>
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="input-field" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">End Date</label>
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="input-field" />
      </div>

      <div className="flex gap-2 mt-2 sm:mt-0">
        <button onClick={handleSearch} className="btn-primary">Search</button>
        <button onClick={handleExportCSV} className="btn-secondary">Export CSV</button>
      </div>
    </div>
  );
}