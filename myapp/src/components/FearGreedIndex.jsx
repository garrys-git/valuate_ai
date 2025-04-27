import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
  const angleRad = (Math.PI * degree) / 180;
  
  return (
    <div className="relative w-64 h-40 flex items-center justify-center">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Background full arc */}
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="15"
          strokeLinecap="round"
        />

        {/* Colored progress arc */}
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke={LEVEL_COLORS[level] || "#6b7280"}
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 283}, 283`}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill="#000" />

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos(Math.PI - angleRad)}
          y2={100 - 70 * Math.sin(angleRad)}
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Score and Level */}
      <div className="absolute top-16 text-center">
        <div className="text-3xl font-bold text-slate-400">{score}</div>
        <div className="text-sm text-slate-400">{level}</div>
      </div>
    </div>
  );
};

export default function FearGreedIndex() {
  const [data, setData] = useState(null);
  const [market, setMarket] = useState("INDIA");
  const [loading, setLoading] = useState(false);

  const fetchIndex = async () => {
    setLoading(true);
  
    const cacheKey = `fear_greed_${market}`;
    const cached = localStorage.getItem(cacheKey);
  
    if (cached) {
      console.log("Using cached data:", cached);
      const parsed = JSON.parse(cached);
      const isToday = parsed.date === new Date().toISOString().slice(0, 10);
  
      if (isToday) {
        setData(parsed.data);
        setLoading(false);
        return;
      }
    }
  
    try {
      console.log("Fetching new data...");
      const res = await fetch(`http://localhost:8000/api/fear_greed?market=${market}`);
      const json = await res.json();
  
      // Save to cache with today's date
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          date: new Date().toISOString().slice(0, 10),
          data: json,
        })
      );
  
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

  if (loading || !data) return <div className="text-center text-slate-200 py-10">Loading data...</div>;

  return (
    <div className="py-6 px-6 flex flex-col items-center gap-8">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-bold text-slate-400">Fear & Greed Index</h2>

        {/* Info Icon with Tooltip */}
        <div className="relative group">
          <InformationCircleIcon className="w-6 h-6 text-slate-400 cursor-pointer" />
          <div className="absolute left-full top-0 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-[-5px] transition-all duration-300 bg-gray-800 text-white text-sm rounded-md px-3 py-2 w-64 text-center z-10">
            Fear & Greed Index measures the market sentiment.<br/>Our version uses Reddit, news headlines, volatility index (VIX), and a deep sentiment model ensemble to compute it.
          </div>
        </div>
      </div>

      {/* <button
        onClick={toggleMarket}
        className="px-4 py-2 bg-slate-400 rounded-lg text-sm text-slate-700 hover:bg-slate-300"
      >
        Toggle Market ({market})
      </button> */}

        <div className="flex items-center justify-center mt-6 space-x-3">
          <span className="text-sm text-gray-600">INDIA</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={ toggleMarket }
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
          </label>
          <span className="text-sm text-gray-600">US</span>
        </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-30 mt-8">
        <div className="flex flex-col items-center relative group">
          <div className="text-2xl font-bold text-slate-400 mb-2">
            Score: {data.score} ({data.level})
          </div>
          <FearGreedGauge score={data.score} level={data.level} />
          {/* Tooltip on Gauge Hover */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-sm rounded-md px-3 py-2 w-72 text-center z-10">
            {data.level} indicates how emotional the market is. <br/>
            Levels:<br/>
            • 0–20: Extreme Fear<br/>
            • 21–40: Fear<br/>
            • 41–60: Neutral<br/>
            • 61–80: Greed<br/>
            • 81–100: Extreme Greed
          </div>
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