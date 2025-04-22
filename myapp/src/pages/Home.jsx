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
    <div className="flex flex-col gap-0 px-0 py-0">
      <div className="bg-cover bg-center py-16 px-4"
        style={{ backgroundImage: "url('/images/home-hero.jpg')" }}
      >
        {/* Header */}
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl text-center">
          Simplify your <span className="text-slate-400">Finances, </span>
          <br /> Amplify your Future
        </h1>

        <p className="text-slate-200 text-sm sm:text-base max-w-2xl text-center mx-auto py-4">
          ValuateAI is an AI-powered platform to help you make smarter decisions in personal finance and investments.
          Whether trading, analyzing portfolios, or exploring investment opportunities, we provide intelligent tools to support your journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link to="/DCF">
            <button className="bg-slate-600 text-slate-200 py-2 px-4 rounded-lg hover:bg-slate-400">
              Try DCF Analysis Tool
            </button>
          </Link>
            <button className="bg-slate-600 text-slate-200 py-2 px-4 rounded-lg hover:bg-slate-400">
              Use Advanced Trading Indicators
            </button>
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
        <div className="w-full flex flex-col mt-16">
          {/* DCF Analysis */}
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/3 h-64 bg-gray-100 flex items-center justify-center py-3 px-3">
              <Slideshow images={["/images/undraw_finance_m6vw.svg", "/images/undraw_projections_fhch.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Discounted Cashflow Analysis</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Dive deep into intrinsic value calculation with our DCF Analysis tool.
                Evaluate long-term investment potential using forecasted cash flows, discount rates, and sensitivity analyses.
                A perfect assistant for value investors aiming to uncover hidden gems in the market.
              </p>
            </div>
          </div>

          {/* Portfolio Risk Analysis */}
          <div className="flex flex-col md:flex-row w-full mt-8">
            <div className="w-full md:w-1/3 h-64 bg-gray-100 flex items-center justify-center">
              <Slideshow images={["/images/undraw_stock-prices_16kd.svg", "/images/undraw_crypto-portfolio_cat6.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Portfolio Risk Analysis</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Understand your portfolio’s risk profile through advanced metrics like beta, VaR, Sharpe ratios, and sector exposures.
                Our visual insights help you identify over-concentrations and rebalance intelligently.
              </p>
            </div>
          </div>

          {/* Trading Indicators */}
          <div className="flex flex-col md:flex-row w-full mt-8">
            <div className="w-full md:w-1/3 h-64 bg-gray-100 flex items-center justify-center">
              <Slideshow images={["/images/undraw_bear-market_dhi3.svg", "/images/undraw_organizing-data_uns9.svg"]} />
            </div>
            <div className="bg-cover w-full md:w-2/3 bg-white p-6 flex flex-col justify-center"
              style={{ backgroundImage: "url('/images/home-pic-2.jpg')" }}>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Trading Indicators</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Leverage powerful trading indicators like RSI, MACD, Bollinger Bands, and EMA crossovers to refine your strategy.
                Whether short-term trading or long-term entry timing, our tools help you stay ahead of market trends.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}