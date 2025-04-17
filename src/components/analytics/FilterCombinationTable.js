"use client";

export default function FilterCombinationTable({ filters, label }) {
  if (!filters || Object.keys(filters).length === 0) return null;

  const rows = Object.entries(filters).map(([key, count]) => {
    const filterArray = Array.isArray(key)
      ? key
      : typeof key === "string"
        ? key.split(",").map((s) => s.trim())
        : [];

    const readableFilters = filterArray
      .map((f) => f.replace(/_/g, " "))
      .sort((a, b) => a.localeCompare(b)); // ✅ alphabetical

    return { filters: readableFilters, count };
  });

  return (
    <div className="bg-muted p-4 rounded shadow-sm max-h-[500px] overflow-y-auto custom-scroll">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left px-2 py-1 border-b border-borderColor">Filters</th>
            <th className="text-left px-2 py-1 border-b border-borderColor">Search Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-borderColor align-top">
              <td className="px-2 py-1">
                <div className="flex flex-wrap gap-1">
                  {row.filters.map((filter, i) => (
                    <span
                      key={i}
                      className="bg-[color:var(--hover-bg)] text-[color:var(--foreground)] px-2 py-0.5 rounded text-xs font-medium"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-2 py-1">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}