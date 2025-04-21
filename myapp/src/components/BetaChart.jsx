import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";

const BetaChart = ({ betas }) => {
  const data = Object.entries(betas).map(([ticker, beta]) => ({
    ticker,
    beta,
  }));

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">Stock-wise Beta (vs Market)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ticker" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={1} stroke="gray" strokeDasharray="3 3" label="Market Beta (1)" />
          <Bar dataKey="beta" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BetaChart;