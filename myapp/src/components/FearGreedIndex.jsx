import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#10eb1a", "#ebe110", "#eb1010"];
const COLORS = ["#133dea", "#6680eb", "#afbbee"];
const LEVEL_COLORS = {
  "Extreme Fear": "#eb1010",
  Fear: "#eb6d10",
  Neutral: "#ebe110",
  Greed: "#98eb10",
  "Extreme Greed": "#10eb1a",
};

const FearGreedGauge = ({ score, level }) => {
  const degree = (score / 100) * 180;
  return (
    <div className="relative w-64 h-32">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 110">
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="20"
        />
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke={LEVEL_COLORS[level] || "#6b7280"}
          strokeWidth="20"
          strokeDasharray={`${(score / 100) * 282.6}, 282.6`}
        />
        <circle cx="100" cy="100" r="6" fill="#000" />
        <line
          x1="100"
          y1="100"
          x2={100 + 75 * Math.cos((Math.PI * (180 - degree)) / 180)}
          y2={100 - 75 * Math.sin((Math.PI * degree) / 180)}
          stroke="#000"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default function FearGreedIndex() {
  const [data, setData] = useState(null);
  const [market, setMarket] = useState("INDIA");
  const [loading, setLoading] = useState(false);

  const fetchIndex = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/fear_greed?market=${market}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch index:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndex();
  }, [market]);

  const toggleMarket = () => {
    setMarket((prev) => (prev === "US" ? "INDIA" : "US"));
  };

  if (loading || !data) return <div className="text-center py-10">Loading data...</div>;

  return (
    <div className="py-6 px-6 flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-slate-400">Fear & Greed Index</h2>
      <button
        onClick={toggleMarket}
        className="px-4 py-2 bg-slate-400 rounded-lg text-sm text-slate-700 hover:bg-slate-300"
      >
        Toggle Market ({market})
      </button>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-30 mt-8">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-slate-400 mb-2">
            Score: {data.score} ({data.level})
          </div>
          <FearGreedGauge score={data.score} level={data.level} />
        </div>
        <div className="w-[300px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    dataKey="value"
                    data={[
                        { name: "Positive", value: Math.round(data.proportions.positive * 100)},
                        { name: "Neutral", value: Math.round(data.proportions.neutral * 100) },
                        { name: "Negative", value: Math.round(data.proportions.negative * 100) },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    >
                    {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}