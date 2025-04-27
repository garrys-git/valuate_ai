import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CumulativeReturnsChart({ portfolioReturns, benchmarkReturns }) {
  if (!portfolioReturns || !benchmarkReturns) {
    return <p className="text-red-500">Missing returns data.</p>;
  }

  const sortedPortfolio = Object.entries(portfolioReturns)
    .map(([k, v]) => [parseInt(k), v])
    .sort((a, b) => a[0] - b[0]);

  const sortedBenchmark = Object.entries(benchmarkReturns)
    .map(([k, v]) => [parseInt(k), v])
    .sort((a, b) => a[0] - b[0]);

  // Calculate cumulative returns
  const cumulativeData = [];
  let portfolioCumulative = 1;
  let benchmarkCumulative = 1;

  for (let i = 0; i < Math.min(sortedPortfolio.length, sortedBenchmark.length); i++) {
    const [day, pReturn] = sortedPortfolio[i];
    const [, bReturn] = sortedBenchmark[i];

    portfolioCumulative *= (1 + pReturn);
    benchmarkCumulative *= (1 + bReturn);

    cumulativeData.push({
      day,
      Portfolio: portfolioCumulative,
      Benchmark: benchmarkCumulative,
    });
  }

  return (
    <div className="mt-8">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cumulativeData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Portfolio" stroke="#4f46e5" dot={false} />
          <Line type="monotone" dataKey="Benchmark" stroke="#9ca3af" strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}