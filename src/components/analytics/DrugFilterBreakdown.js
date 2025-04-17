"use client";

export default function DrugFilterBreakdown({ drugName, combinations }) {
  const hasData = Array.isArray(combinations) && combinations.length > 0;

  return (
    <div className="bg-muted p-4 rounded shadow-sm text-foreground max-h-[500px] overflow-y-auto custom-scroll">
      <h3 className="text-lg font-semibold mb-2">
        Filter Combinations for <em>{drugName}</em>
      </h3>

      {hasData ? (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-borderColor">
              <th className="text-left px-2 py-1">Filters</th>
              <th className="text-left px-2 py-1">Search Count</th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((combo, idx) => {
              const readableFilters = [...combo.filters]
                .map((f) => f.replace(/_/g, " "))
                .sort((a, b) => a.localeCompare(b));

              return (
                <tr key={idx} className="border-t border-borderColor align-top">
                  <td className="px-2 py-1">
                    <div className="flex flex-wrap gap-1">
                      {readableFilters.map((filter, i) => (
                        <span
                          key={i}
                          className="bg-[color:var(--hover-bg)] text-[color:var(--foreground)] px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {filter}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-1">{combo.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          No filter combination data available for <em>{drugName}</em>.
        </p>
      )}
    </div>
  );
}