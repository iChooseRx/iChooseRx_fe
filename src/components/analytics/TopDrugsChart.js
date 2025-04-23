"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopDrugsChart({ data }) {
  const chartData = Object.entries(data || {}).map(([name, count]) => ({
    name,
    count,
  }));

  if (chartData.length === 0) return null;

  return (
    <div className="bg-muted p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Top Searched Drugs</h3>
      <ResponsiveContainer width="100%" height={chartData.length * 40 || 300}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <XAxis
            type="number"
            stroke="var(--foreground)"
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="var(--foreground)"
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
            width={120}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border-color)",
              fontSize: "0.875rem",
            }}
            labelStyle={{ color: "var(--foreground)" }}
            itemStyle={{ color: "var(--foreground)" }}
          />
          <Bar dataKey="count" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
