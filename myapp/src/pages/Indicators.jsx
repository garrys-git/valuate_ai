import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slideshow from "../components/slideshow";
import { useAuth } from "../components/auth_context";

const indicators = [
  {
    name: "Golden Crossover",
    description: "Identifies golden and death crossovers using EMAs (50 EMA / 200 EMA) — helpful for trend reversals.",
    link: "https://in.tradingview.com/script/QhfPuf8s-Free-Golden-Crossover-50-EMA-200-EMA/",
    premium: false,
  },
  {
    name: "RSI Divergence",
    description: "Automatically highlights bullish/bearish divergences. Great for early entries.",
    link: "https://in.tradingview.com/script/JuQLlJwA-Free-RSI-Divergence/",
    premium: false,
  },
  {
    name: "MACD + RSI",
    description: "Combines the power of MACD momentum and RSI overbought/oversold signals to enhance entry precision and trend strength confirmation.",
    link: "https://in.tradingview.com/script/K5j9Bx0u-Free-MACD-RSI/",
    premium: false,
  },
  {
    name: "Inside Bar Breakout",
    description: "Automatically detects inside bar formations and highlights breakout levels—ideal for capturing early moves after price consolidation.",
    link: "https://in.tradingview.com/script/rUzPnVBq-Free-Inside-Bar-Breakout/",
    premium: false,
  },
  {
    name: "Volatility Breakout",
    description: "Tracks breakout potential based on historical volatility compression and expansion patterns. Great for swing and momentum setups.",
    link: "https://in.tradingview.com/script/WRfzjZB9-Premium-Volatility-Breakout/",
    premium: false,
  },
  {
    name: "Ichimoku Cloud",
    description: "A modern twist on the classic Ichimoku Kinko Hyo system—visualizes support, resistance, momentum, and trend direction in one compact overlay.",
    link: "https://in.tradingview.com/script/je79Viy7-Premium-Ichimoku-Cloud/",
    premium: false,
  },
  {
    name: "Supertrend",
    description: "A clean and reliable trend-following indicator that adapts to price action using ATR. Perfect for confirming reversals and exits.",
    link: "https://in.tradingview.com/script/VyMwYTFw-Premium-Supertrend/",
    premium: true,
  },
  {
    name: "Support & Resistance Auto-Detection",
    description: "Uses dynamic price action logic to automatically identify key support and resistance zones—updated in real-time as the market moves.",
    link: "https://in.tradingview.com/script/hAfD781Q-Premium-Support-Resistance-Auto-Detection/",
    premium: true,
  },
  {
    name: "SMC Multi-Timeframe Trend Breakout",
    description: "A Smart Money Concept (SMC)-driven tool that monitors multiple timeframes for institutional-level breakouts and structure shifts.",
    link: "https://in.tradingview.com/script/mzbKxXpz-Premium-SMC-Multi-Timeframe-Trend-Breakout/",
    premium: true,
  },  
];

export default function TradingIndicators() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const isPremiumUser = auth.isPremium;
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="bg-slate-300 min-h-screen py-16 px-4">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Trading Indicators</h1>
        <p className="text-gray-600 text-lg">
          Discover AI-enhanced trading tools built on proven technical analysis strategies.
        </p>

        {/* Slideshow Section */}
        <Slideshow
        images={[
            "/images/indicator-supertrend.png",
            "/images/indicator-ichimoku.png",
            "/images/indicator-smc.png",
            "/images/indicator-rsi.png",
        ]}
        />

        {/* Premium Toggle */}
        <div className="flex items-center justify-center mt-6 space-x-3">
          <span className="text-sm text-gray-600">Free Only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showPremium}
              onChange={() => {
                if (!isPremiumUser && !showPremium) {
                  navigate("/buypremium");
                  return;
                }
                setShowPremium((prev) => !prev);
              }}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
          </label>
          <span className="text-sm text-gray-600">Show Premium</span>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {indicators
          .filter((i) => showPremium || !i.premium)
          .map((indicator, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-slate-800">{indicator.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      indicator.premium
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {indicator.premium ? "Premium" : "Free"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{indicator.description}</p>
              </div>
              <a
                href={indicator.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-blue-600 hover:underline text-sm font-medium"
              >
                View on TradingView →
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}