"use client";

export default function DrugFilterBreakdown({ drugName, combinations }) {
  const hasData = Array.isArray(combinations) && combinations.length > 0;

  return (
    <div className="bg-muted p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">
        Filter Combinations for <em>{drugName}</em>
      </h3>

      {hasData ? (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left px-2 py-1">Filters</th>
              <th className="text-left px-2 py-1">Search Count</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combo, idx) => (
              <tr key={idx} className="border-t border-gray-300">
                <td className="px-2 py-1">{combo.filters.join(", ")}</td>
                <td className="px-2 py-1">{combo.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-sm text-gray-500">
          No filter combination data available for <em>{drugName}</em>.
        </p>
      )}
    </div>
  );
}