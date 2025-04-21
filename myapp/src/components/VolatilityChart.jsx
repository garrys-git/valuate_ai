import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer, Cell } from "recharts";

const VolatilityChart = ({ portfolioVol, benchmarkReturns }) => {
    const benchmarkArray = Object.entries(benchmarkReturns || {})
    .map(([k, v]) => [parseInt(k), v])
    .sort((a, b) => a[0] - b[0])
    .map(([_, v]) => v);

  const benchmarkVol = benchmarkArray.length > 0
    ? Math.sqrt(252) * std(benchmarkArray)
    : 0;

  const data = [
    {
      name: "Your Portfolio",
      value: portfolioVol,
      fill: portfolioVol > benchmarkVol ? "#f87171" : "#86efac",
    },
    {
      name: "Benchmark",
      value: benchmarkVol,
      fill: "#9ca3af",
    },
  ];

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">Volatility: Portfolio vs Benchmark</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Helper function
function std(arr) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

export default VolatilityChart;