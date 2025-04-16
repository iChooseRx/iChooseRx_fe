"use client";

export default function FilterCombinationTable({ filters, label }) {
  if (!filters || Object.keys(filters).length === 0) return null;

  const rows = Object.entries(filters).map(([key, count]) => {
    const readable = Array.isArray(key) ? key.join(", ") : key;
    return { filters: readable, count };
  });

  return (
    <div className="bg-muted p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left px-2 py-1">Filters</th>
            <th className="text-left px-2 py-1">Search Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-300">
              <td className="px-2 py-1">{row.filters}</td>
              <td className="px-2 py-1">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
