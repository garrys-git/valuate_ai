import React, { useState } from "react";
import { BarChart3, KeyRound, Upload, Plus, Type, Trash2 } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import VolatilityChart from "./VolatilityChart";
import BetaChart from "./BetaChart";
import CorrelationHeatmap from "./CorrelationHeatmap";
import CumulativeReturnsChart from "./CumulativeReturnsChart";
import { useAuth } from "../components/auth_context";
import PnLBarChart from "./PnLBarChart";
import { Atom } from "react-loading-indicators";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function PortfolioAnalysisForm({ onSubmit, result }) {
  const { auth } = useAuth();
  const [market, setMarket] = useState("India");
  const [isPremium, setIsPremium] = useState(false);
  const [useManualEntry, setUseManualEntry] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await onSubmit(
      useManualEntry
        ? { market, isPremium, useManualEntry, entries: manualEntries }
        : { market, isPremium, useManualEntry, csvFile }
    );
    setLoading(false);
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
    
    <div className="min-h-screen space-y-12 bg-gradient-to-b from-slate-200 to-slate-500 px-8 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">🧮 Portfolio Analyzer</h1>
        <p className="text-gray-600 mt-2">Smart Insights, Smart Investing</p>
      </div>

      {/* Form + Info Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Form (2/3) */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-2xl space-y-6 md:col-span-2">
          <div className="relative group">
            <label className="block mb-1 font-medium flex items-center gap-1">
              <div className="relative group">
                <BarChart3 className="w-4 h-4 text-slate-600 cursor-pointer" />
                <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    Select the market you want to analyze, like US stocks or Indian stocks.
                </div>
              </div>
              Select Market
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="India">India</option>
              <option value="US">US</option>
            </select>
          </div>

          <div className="flex items-center justify-between relative group">
              <label className="font-medium flex items-center gap-1">
                <div className="relative group">
                  <KeyRound className="w-4 h-4 text-slate-600 cursor-pointer" />
                  <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    Unlock premium risk analysis metrics like volatility & beta along with advanced chart features. Premium membership required.
                  </div>
                </div>
                Use Premium Features
              </label>
            <button
              type="button"
              onClick={() => {
                if (!auth.isPremium && !isPremium) {
                  alert("You must be a premium member to access premium features.");
                  window.location.href = "/buypremium";
                } else {
                  setIsPremium(!isPremium);
                }
              }}
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

          <div className="flex items-center justify-between relative group">
            <label className="font-medium flex items-center gap-1">
                <div className="relative group">
                  <Type className="w-4 h-4 text-slate-600 cursor-pointer" />
                  <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    Manually enter your portfolio data. Last Traded Price is optional. Make sure to enter correct Tickers.
                  </div>
                </div>
                Manual Entry
            </label>
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
            <div className="relative group">
              <label className="font-medium flex items-center gap-1">
                <div className="relative group">
                  <Upload className="w-4 h-4" />
                  <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    We support various formats. If there is any failure to generate your report then it is recommended to upload a file with Zerodha's portfolio report format, i.e. with columns as follows; Instrument, Qty., Avg. cost, LTP (Optional).
                  </div>
                </div>
                Upload CSV / Excel
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
            <li><strong>CSV Upload:</strong> Recommended Format: Instrument, Qty., Avg. cost, LTP (Optional)</li>
          </ul>
          <p className="text-xs text-gray-500">Premium users unlock advanced analytics like volatility, beta, and correlation. Data is never stored.</p>
        </div>
      </div>

      {/* Display Results */}
      {loading && (
          <div className="flex justify-center items-center">
            <Atom color="#080e71" size="small" textColor="" /><br></br>
            <p style={ {textColor: "3431cc"} }>Loading your report...</p>
          </div>
      )}
      {!loading && result && (
        <div className="bg-white shadow-lg p-8 rounded-2xl space-y-8">

          {/* Portfolio Analysis Header */}
          <h2 className="text-2xl font-semibold text-center text-blue-700">📊 Portfolio Analysis Report</h2>

          {/* Quick Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-600">Total Investment
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This is the total amount you have invested in your portfolio. Higher investment amounts could signify greater portfolio risk or diversification.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </p>
              <p className="font-semibold text-blue-600">{market === "India" ? "₹" : "$"} {Math.round(result.report.total_investment)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-600">Concentration Risk
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This measures how much of your portfolio is invested in a single asset or sector. A high concentration risk means you're more exposed to individual asset performance.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </p>
              <p className="font-semibold text-blue-600">{result.report.concentration_risk}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-600">Benchmark %
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This percentage represents the allocation of your portfolio compared to a benchmark, such as the NIFTY 50 or S&P 500. A higher percentage shows alignment with the benchmark.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </p>
              <p className="font-semibold text-blue-600">{result.report.benchmark_allocation_percent}%</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-600">Overlap Count
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    The number of assets in your portfolio that overlap with your benchmark. A higher count means your portfolio has greater alignment with the benchmark.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </p>
              <p className="font-semibold text-blue-600">{result.report.benchmark_overlap.length}</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Sector Allocation Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4">Sector Allocation
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This chart shows how your portfolio is distributed across various sectors. A diversified sector allocation can reduce risk.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </h3>
              <Pie data={pieData(Object.keys(result.report.sector_allocation), Object.values(result.report.sector_allocation))} />
            </div>

            {/* Benchmark Overlap */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4">Benchmark Overlap
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This shows the assets in your portfolio that overlap with your chosen benchmark. The higher the overlap, the more similar your portfolio is to the benchmark.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </h3>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                {result.report.benchmark_overlap.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            {/* Ticker Allocation Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4">Ticker Allocation
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This chart displays the allocation of your portfolio across individual stocks (tickers). A more evenly spread allocation can help reduce risk.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </h3>
              <Bar data={barData(Object.keys(result.report.ticker_allocation), Object.values(result.report.ticker_allocation))} />
            </div>
          </div>

            {/* PnL Allocation Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4">Profit & Loss
                {/* Info Icon with Tooltip */}
                <div className="relative group inline-block">
                  <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                    This chart displays the Profit & Loss of your investments. Size of each section is relative to the absolute P&L as displayed in the table besides it.
                  </span>
                  <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                </div>
              </h3>
              <PnLBarChart tickerPnL={result.report.ticker_pnl} market={market}/>
            </div>

          {/* Premium Metrics Section */}
          {result.metrics && (
            <div className="space-y-8 mt-8">
              <h2 className="text-2xl font-semibold text-center text-blue-700">🔒 Premium Metrics</h2>

              {/* Premium Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
                  <p className="text-gray-600">Portfolio Volatility
                    {/* Info Icon with Tooltip */}
                    <div className="relative group inline-block">
                      <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        This metric shows the degree of variation in your portfolio’s returns over time. Higher volatility indicates higher potential risk.
                      </span>
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                    </div>
                  </p>
                  <p className="font-semibold text-blue-600">{result.metrics.portfolio_volatility}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
                  <p className="text-gray-600">Diversification Score
                    {/* Info Icon with Tooltip */}
                    <div className="relative group inline-block">
                      <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        This score (Herfindahl Index) measures how diversified your portfolio is across various assets and sectors. A higher score indicates better diversification. Ranges from 0 to 1.
                      </span>
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                    </div>
                  </p>
                  <p className="font-semibold text-blue-600">{result.metrics.diversification_score}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-lg">
                  <p className="text-gray-600">Score
                    {/* Info Icon with Tooltip */}
                    <div className="relative group inline-block">
                      <span className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        This score, calculated according using our personal formula, summarizes the overall health of your portfolio based on factors like risk, returns, and diversification. A higher score is typically better.
                      </span>
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                    </div>
                  </p>
                  <p className="font-semibold text-blue-600">{result.metrics.score}</p>
                </div>
              </div>
              {/* Premium Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Volatility Chart */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-md font-semibold">Portfolio Volatility</h5>
                    <div className="relative group">
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                      <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        This metric shows the degree of variation in your portfolio’s returns over time. Higher volatility indicates higher potential risk.
                      </div>
                    </div>
                  </div>
                  <VolatilityChart
                    portfolioVol={result.metrics.portfolio_volatility}
                    benchmarkReturns={result.metrics.benchmark_returns}
                  />
                </div>

                {/* Beta Chart */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-md font-semibold">Portfolio Beta</h5>
                    <div className="relative group">
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                      <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        Portfolio Beta indicates how sensitive your portfolio is to market movements. A higher Beta suggests greater risk relative to the market.
                      </div>
                    </div>
                  </div>
                  <BetaChart betas={result.metrics.beta} />
                </div>

                {/* Correlation Heatmap */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-md font-semibold">Correlation Heatmap</h5>
                    <div className="relative group">
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                      <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        Visualizes the correlation between different assets in your portfolio. Positive values indicate assets move together, while negative values show inverse relationships.
                      </div>
                    </div>
                  </div>
                  <CorrelationHeatmap matrix={result.metrics.correlation_matrix} />
                </div>

                {/* Cumulative Returns Chart */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-md font-semibold">Cumulative Returns</h5>
                    <div className="relative group">
                      <span className="w-4 h-4 text-slate-600 cursor-pointer">ℹ️</span>
                      <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                        Shows the total returns of the portfolio compared to a benchmark over time. Indicates the overall growth and performance of the portfolio.
                      </div>
                    </div>
                  </div>
                  <CumulativeReturnsChart
                    portfolioReturns={result.metrics.portfolio_returns}
                    benchmarkReturns={result.metrics.benchmark_returns}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}