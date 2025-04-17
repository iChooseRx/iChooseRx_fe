"use client";

import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { downloadSearchAnalyticsCSV } from "@/services/api";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function FilterControls({ onFilterChange, initialFilters }) {
  const [drugId, setDrugId] = useState(initialFilters.drug_id || "");
  const [range, setRange] = useState([
    {
      startDate: initialFilters.start ? new Date(initialFilters.start) : new Date(),
      endDate: initialFilters.end ? new Date(initialFilters.end) : new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleSearch = () => {
    onFilterChange({
      drug_id: drugId.trim(),
      start: format(range[0].startDate, "yyyy-MM-dd"),
      end: format(range[0].endDate, "yyyy-MM-dd"),
    });
  };

  return (
    <div className="bg-muted p-4 rounded shadow-sm flex flex-col sm:flex-row sm:flex-wrap gap-4 relative">
      {/* Drug Name */}
      <div className="flex flex-col min-w-[200px]">
        <label className="text-sm font-medium mb-1">Drug Name</label>
        <input
          type="text"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          className="input-field"
          placeholder="e.g. ibuprofen"
        />
      </div>

      {/* Date Range Picker */}
      <div className="flex flex-col relative min-w-[250px]">
        <label className="text-sm font-medium mb-1">Date Range</label>
        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="input-field text-left whitespace-nowrap"
        >
          {`${format(range[0].startDate, "MMM dd, yyyy")} → ${format(
            range[0].endDate,
            "MMM dd, yyyy"
          )}`}
        </button>

        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute mt-2 border border-borderColor rounded shadow-lg bg-[color:var(--background)] text-[color:var(--foreground)] z-50"
          >
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
              maxDate={new Date()}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 items-center pt-6 sm:pt-0">
        <button onClick={handleSearch} className="btn-primary">Search</button>
        <button
          onClick={() =>
            downloadSearchAnalyticsCSV({
              drug_id: drugId.trim(),
              start: format(range[0].startDate, "yyyy-MM-dd"),
              end: format(range[0].endDate, "yyyy-MM-dd"),
            })
          }
          className="btn-secondary"
        >
          ⬇ Download CSV
        </button>
      </div>
    </div>
  );
}