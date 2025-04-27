import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FearGreedIndex from "../components/FearGreedIndex";
import Slideshow from "../components/slideshow";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];
const LEVEL_COLORS = {
  "Extreme Fear": "#dc2626",
  "Fear": "#f97316",
  "Neutral": "#d97706",
  "Greed": "#10b981",
  "Extreme Greed": "#059669",
};

export default function Home() {
  const [fgData, setFgData] = useState(null);
  const [market, setMarket] = useState("US");
  const [cache, setCache] = useState({});

  const fetchFGIndex = async (selectedMarket) => {
    if (cache[selectedMarket]) {
      setFgData(cache[selectedMarket]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/fear_greed?market=${selectedMarket}`);
      const json = await res.json();
      setFgData(json);
      setCache((prev) => ({ ...prev, [selectedMarket]: json }));
    } catch (err) {
      console.error("Failed to fetch FG index", err);
    }
  };

  useEffect(() => {
    fetchFGIndex(market);
  }, [market]);

  return (
    <div style={{ backgroundColor: "#020d3b" }} className="flex flex-col gap-0 px-2 py-1">
      <div className="bg-cover bg-center py-16 px-4 rounded-4xl"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
      >
        {/* Header */}
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl text-center">
        <span className="text-slate-400">Simplify</span> your Finances,
          <br /> <span className="text-slate-400">Amplify</span> your Future
        </h1>

        <p className="text-slate-200 text-sm sm:text-base max-w-2xl text-center mx-auto py-4">
          <a href="https://x.com/valuate_ai"><span className="text-slate-400 text-bold">valuate.ai </span></a> is an AI-powered platform to help you make smarter decisions in personal finance and investments.
          Whether trading, analyzing portfolios, or exploring investment opportunities, we provide intelligent tools to support your journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link to="/dcf">
            <button className="bg-slate-600 text-slate-200 py-2 px-4 rounded-lg hover:bg-slate-400">
              Try DCF Analysis Tool
            </button>
          </Link>
          <Link to="/indicators">
            <button className="bg-slate-600 text-slate-200 py-2 px-4 rounded-lg hover:bg-slate-400">
              Use Advanced Trading Indicators
            </button>
          </Link>
          <Link to="/screener">
            <button className="bg-slate-600 text-slate-200 py-2 px-4 rounded-lg hover:bg-slate-400">
              Conduct a Portfolio Risk Analysis
            </button>
          </Link>
        </div>
      </div>

        {/* Fear & Greed Index Section */}
        <div className="py-0 px-0 flex flex-col items-center gap-2 max-w-xl mx-auto">
          <FearGreedIndex />
        </div>

        {/* Feature Sections */}
        <div className="px-4 w-full flex flex-col mt-16">
          {/* DCF Analysis */}
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full md:w-1/3 h-64 bg-slate-300 flex items-center justify-center py-3 px-3 rounded-2xl">
              <Slideshow images={["/images/undraw_finance_m6vw.svg", "/images/undraw_projections_fhch.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center rounded-2xl"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Discounted Cash Flow (DCF) Stock Valuation</h2>
              <p className="text-slate-200 text-base leading-relaxed">
                Accurately calculate a stock’s true worth with our intelligent DCF Calculator.  
                Forecast future cash flows, apply discount rates, and analyze fair value based on proven investment models.  
                Perfect for long-term investors seeking undervalued opportunities.  
                <br /><br />
                <strong>New to DCF?</strong> DCF (Discounted Cash Flow) is a method where future company profits are projected and adjusted back to today’s value, helping you find the real price of a stock. <a href=""><span className="text-slate-300 text-bold underline">Learn more.</span></a>
              </p>
            </div>
          </div>

          {/* Portfolio Risk Analysis */}
          <div className="flex flex-col md:flex-row w-full mt-8 gap-4">
            <div className="w-full md:w-1/3 h-64 bg-slate-300 flex items-center justify-center rounded-2xl">
              <Slideshow images={["/images/undraw_stock-prices_16kd.svg", "/images/undraw_crypto-portfolio_cat6.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center rounded-2xl"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Portfolio Risk and Return Analyzer</h2>
              <p className="text-slate-200 text-base leading-relaxed">
                Get a 360° view of your investment portfolio's risk and performance.  
                Analyze returns, volatility, Sharpe ratios, diversification levels, and sector allocations instantly. Our portfolio analyzer helps you find over-concentration risks, improve diversification, and maximize returns smartly.
                <br /><br />
                <strong>Not familiar?</strong> Sharpe Ratio measures return vs risk; higher is better. Beta shows how much your portfolio moves compared to the market. <a href=""><span className="text-slate-300 text-bold underline">Learn more.</span></a>
              </p>
            </div>
          </div>

          {/* Trading Indicators */}
          <div className="flex flex-col md:flex-row w-full mt-8 gap-4">
            <div className="w-full md:w-1/3 h-64 bg-slate-300 flex items-center justify-center rounded-2xl">
              <Slideshow images={["/images/undraw_bear-market_dhi3.svg", "/images/undraw_organizing-data_uns9.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center rounded-2xl"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Technical Trading Indicators</h2>
              <p className="text-slate-200 text-base leading-relaxed">
                Upgrade your trading decisions with real-time technical analysis tools.  
                Track key indicators like RSI (Relative Strength Index), MACD (Moving Average Convergence Divergence), Moving Averages, and Smart Money Concepts (SMC) effortlessly. Whether you are swing trading or fine-tuning long-term entries, our trading indicators help you catch trends early and exit smarter.
                <br /><br />
                <strong>Don't know?</strong> RSI shows if a stock is overbought or oversold. MACD helps spot trend reversals. SMC helps spot institutional activities to capture trends better. <a href=""><span className="text-slate-300 text-bold underline">Learn more.</span></a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}