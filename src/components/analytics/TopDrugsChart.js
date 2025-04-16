"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopDrugsChart({ data }) {
  const chartData = Object.entries(data || {}).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <div className="bg-muted p-4 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Top Searched Drugs</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}