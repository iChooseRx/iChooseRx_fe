"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Displays a bar chart comparing total vs. filtered results.
 */
export default function ResultsChart({ resultStats }) {
  // Prepare data for Recharts
  const chartData = [
    {
      name: "Results",
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  if (!resultStats) return null;

  return (
    <div style={{ width: "100%", height: 150 }} className="mb-4">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical">
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "var(--foreground)" }}
            axisLine={{ stroke: "var(--foreground)" }}
            tickLine={{ stroke: "var(--foreground)" }}
          />
          <XAxis
            type="number"
            domain={[0, "dataMax + 10"]}
            tick={{ fill: "var(--foreground)" }}
            axisLine={{ stroke: "var(--foreground)" }}
            tickLine={{ stroke: "var(--foreground)" }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--foreground)",
              fontWeight: "bold",
            }}
            labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
          />
          <Bar
            dataKey="totalResults"
            name="Total Results"
            fill="#e74c3c"
            barSize={20}
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="filteredResults"
            name="Filtered Results"
            fill="#2ecc71"
            barSize={20}
            radius={[0, 4, 4, 0]}
          />
          <Legend
            content={() => (
              <div className="text-center font-bold" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "#e74c3c", marginRight: "10px" }}>
                  Total Results: {resultStats?.total_results || 0}
                </span>
                <span style={{ color: "#2ecc71" }}>
                  Filtered Results: {resultStats?.filtered_results || 0}
                </span>
              </div>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
