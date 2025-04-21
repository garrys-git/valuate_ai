import React, { useState } from "react";
import { BarChart3, Upload, Plus, Trash2 } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import VolatilityChart from "./VolatilityChart";
import BetaChart from "./BetaChart";
import CorrelationHeatmap from "./CorrelationHeatmap";
import CumulativeReturnsChart from "./CumulativeReturnsChart";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function PortfolioAnalysisForm({ onSubmit, result }) {
  const [market, setMarket] = useState("US");
  const [isPremium, setIsPremium] = useState(false);
  const [useManualEntry, setUseManualEntry] = useState(false);
  const [manualEntries, setManualEntries] = useState([
    { ticker: "", quantity: "", avgPrice: "", ltp: "" },
  ]);
  const [csvFile, setCsvFile] = useState(null);

  const handleEntryChange = (index, field, value) => {
    const updated = [...manualEntries];
    updated[index][field] = value;
    setManualEntries(updated);
  };

  const addEntry = () => {
    setManualEntries([...manualEntries, { ticker: "", quantity: "", avgPrice: "", ltp: "" }]);
  };

  const removeEntry = (index) => {
    const updated = [...manualEntries];
    updated.splice(index, 1);
    setManualEntries(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(
      useManualEntry
        ? { market, isPremium, useManualEntry, entries: manualEntries }
        : { market, isPremium, useManualEntry, csvFile }
    );
  };
  

  // Chart prep
  const pieData = (labels, data) => ({
    labels,
    datasets: [{ data, backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"] }],
  });

  const barData = (labels, data) => ({
    labels,
    datasets: [{ label: "Allocation %", data, backgroundColor: "#3B82F6" }],
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">🧮 Portfolio Analyzer</h1>
        <p className="text-gray-600 mt-2">Smart Insights, Smart Investing</p>
      </div>

      {/* Form + Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Form (2/3) */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-2xl space-y-6 md:col-span-2">
          <div>
            <label className="block mb-1 font-medium flex items-center gap-1">
              <BarChart3 className="w-4 h-4" /> Select Market
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="US">US</option>
              <option value="India">India</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Premium User</label>
            <button
              type="button"
              onClick={() => setIsPremium(!isPremium)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isPremium ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  isPremium ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Manual Entry</label>
            <button
              type="button"
              onClick={() => setUseManualEntry(!useManualEntry)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                useManualEntry ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  useManualEntry ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {useManualEntry && (
            <div className="space-y-4">
              {manualEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 items-center">
                  <input type="text" placeholder="Ticker" value={entry.ticker}
                    onChange={(e) => handleEntryChange(index, "ticker", e.target.value)} className="border px-2 py-1 rounded-lg" />
                  <input type="number" placeholder="Quantity" value={entry.quantity}
                    onChange={(e) => handleEntryChange(index, "quantity", e.target.value)} className="border px-2 py-1 rounded-lg" />
                  <input type="number" placeholder="Avg Price" value={entry.avgPrice}
                    onChange={(e) => handleEntryChange(index, "avgPrice", e.target.value)} className="border px-2 py-1 rounded-lg" />
                  <input type="number" placeholder="LTP (Optional)" value={entry.ltp}
                    onChange={(e) => handleEntryChange(index, "ltp", e.target.value)} className="border px-2 py-1 rounded-lg" />
                  <button type="button" onClick={() => removeEntry(index)} className="text-red-500 hover:text-red-700 ml-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addEntry} className="flex items-center gap-1 text-blue-600 font-medium">
                <Plus size={16} /> Add Stock
              </button>
            </div>
          )}

          {!useManualEntry && (
            <div>
              <label className="block mb-1 font-medium flex items-center gap-1">
                <Upload className="w-4 h-4" /> Upload CSV
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files[0])}
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Analyze Portfolio
          </button>
        </form>

        {/* Info Panel (1/3) */}
        <div className="bg-white shadow-lg p-6 rounded-2xl space-y-4 h-fit">
          <h2 className="text-lg font-semibold">ℹ️ Quick Info</h2>
          <ul className="list-disc text-sm text-gray-700 ml-5 space-y-2">
            <li><strong>Ticker:</strong> Stock symbol (e.g., AAPL, INFY)</li>
            <li><strong>Quantity:</strong> Number of shares owned</li>
            <li><strong>Avg Price:</strong> Your average buy price</li>
            <li><strong>LTP:</strong> Current price (optional)</li>
            <li><strong>CSV Upload:</strong> Format: Ticker, Quantity, AvgPrice, LTP</li>
          </ul>
          <p className="text-xs text-gray-500">Premium users unlock advanced analytics like volatility, beta, and correlation. Data is never stored.</p>
        </div>
      </div>

      {/* Display Results */}
      {result && (
        <div className="bg-white shadow p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold">📊 Portfolio Analysis Report</h2>

          {/* Quick Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="font-semibold text-blue-600">₹ {result.report.total_investment}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Concentration Risk</p>
              <p className="font-semibold text-blue-600">{result.report.concentration_risk}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Benchmark %</p>
              <p className="font-semibold text-blue-600">{result.report.benchmark_allocation_percent}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overlap Count</p>
              <p className="font-semibold text-blue-600">{result.report.benchmark_overlap.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-medium">Benchmark Overlap</h3>
              <ul className="list-disc ml-5">
                {result.report.benchmark_overlap.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Sector Allocation</h3>
              <Pie data={pieData(Object.keys(result.report.sector_allocation), Object.values(result.report.sector_allocation))} />
            </div>
            <div>
              <h3 className="font-medium">Ticker Allocation</h3>
              <Bar data={barData(Object.keys(result.report.ticker_allocation), Object.values(result.report.ticker_allocation))} />
            </div>
          </div>

          {/* Premium metrics */}
          {result.metrics && (
            <div className="space-y-4 mt-8">
              <h2 className="text-xl font-semibold">🔒 Premium Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-500">Portfolio Volatility</p>
                  <p className="font-semibold">{result.metrics.portfolio_volatility}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-500">Diversification Score</p>
                  <p className="font-semibold">{result.metrics.diversification_score}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-500">Score</p>
                  <p className="font-semibold">{result.metrics.score}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Tips</h3>
                {result.metrics.tips.length > 0 ? (
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {result.metrics.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-1 text-sm text-green-600">🎉 Bravo! Your portfolio is well optimized!</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <VolatilityChart
                  portfolioVol={result.metrics.portfolio_volatility}
                  benchmarkReturns={result.metrics.benchmark_returns}
                />
                <BetaChart betas={result.metrics.beta} />
                <CorrelationHeatmap matrix={result.metrics.correlation_matrix} />
                <CumulativeReturnsChart
                  portfolioReturns={result.metrics.portfolio_returns}
                  benchmarkReturns={result.metrics.benchmark_returns}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}