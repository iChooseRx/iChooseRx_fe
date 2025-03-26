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

export default function ResultsChart({ resultStats }) {
  if (!resultStats) return null;

  const chartData = [
    {
      name: "Results",
      totalResults: resultStats?.total_results || 0,
      filteredResults: resultStats?.filtered_results || 0,
    },
  ];

  return (
    <div className="mb-4 w-full h-[150px]">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical">
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "var(--foreground)" }}
            axisLine={{ stroke: "var(--border-color)" }}
            tickLine={{ stroke: "var(--border-color)" }}
          />
          <XAxis
            type="number"
            domain={[0, "dataMax + 10"]}
            tick={{ fill: "var(--foreground)" }}
            axisLine={{ stroke: "var(--border-color)" }}
            tickLine={{ stroke: "var(--border-color)" }}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border-color)",
              fontWeight: "bold",
            }}
            labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
          />
          <Bar
            dataKey="totalResults"
            name="Total Results"
            fill="var(--error)"
            barSize={20}
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="filteredResults"
            name="Filtered Results"
            fill="var(--secondary)"
            barSize={20}
            radius={[0, 4, 4, 0]}
          />
          <Legend
            content={() => (
              <div className="text-center font-bold text-foreground">
                <span className="mr-4" style={{ color: "var(--error)" }}>
                  Total Results: {resultStats?.total_results || 0}
                </span>
                <span style={{ color: "var(--secondary)" }}>
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
