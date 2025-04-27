import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, ChartPie, Layers, KeyRound, Info, TrendingUp, PercentCircle, DollarSign, BarChart3 } from "lucide-react";
import ChartContainer from "../components/dcf_charts_container";
import { useAuth } from "../components/auth_context";

export default function DcfCalculatorPage() {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    market: "India",
    ticker: "",
    isPremium: false,
    useML: false,
    scenario: "base",
    growthRate: 0.1,
    discountRate: 0.1,
    perpetualGrowth: 0.03,
    advancedCharts: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  
    try {
      const response = await fetch("http://localhost:8000/api/dcf/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            premium: formData.isPremium,
            useML: formData.useML,
            scenario: formData.scenario,
            growthRate: formData.growthRate,
            discountRate: formData.discountRate,
            perpetualGrowth: formData.perpetualGrowth,
            market: formData.market,
            ticker: formData.ticker,
            advancedCharts: formData.advancedCharts,
        }),
      });
  
      const data = await response.json();

      setResult({
          ticker: formData.ticker,
          ...data.report,
      });      
    } catch (error) {
      console.error("Error fetching DCF report:", error);
      setResult({
        ticker: formData.ticker,
        value: "N/A",
        status: "Error fetching data",
      });
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-500 px-8 py-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">💰 Discounted Cash Flow Calculator</h1>
          <p className="text-gray-600 mt-2">Estimate the intrinsic value of stocks based on fundamental analysis.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white shadow-lg p-6 rounded-2xl space-y-6">
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
                value={formData.market}
                onChange={(e) => handleChange("market", e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="India">India</option>
                <option value="US">US</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block mb-1 font-medium flex items-center gap-1">
                <div className="relative group">
                  <TrendingUp className="w-4 h-4 text-slate-600 cursor-pointer" />
                  <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    Enter the stock symbol (ticker), like AAPL for Apple or TCS for Tata Consultancy.
                  </div>
                </div>
                Stock Ticker
              </label>
              <input
                type="text"
                value={formData.ticker}
                onChange={(e) => handleChange("ticker", e.target.value)}
                placeholder="e.g. TCS or AAPL"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            {/* Premium Toggle (User-controlled, but gated) */}
            <div className="flex items-center justify-between relative group">
              <label className="font-medium flex items-center gap-1">
                <div className="relative group">
                  <KeyRound className="w-4 h-4 text-slate-600 cursor-pointer" />
                  <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-56 text-center z-10">
                    Unlock machine learning and advanced chart features. Premium membership required.
                  </div>
                </div>
                Use Premium Features
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!auth.isPremium && !formData.isPremium) {
                    alert("You must be a premium member to access premium features.");
                    window.location.href = "/buypremium";
                  } else {
                    handleChange("isPremium", !formData.isPremium);
                  }
                }}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  formData.isPremium ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    formData.isPremium ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* ML Toggle */}
            {formData.isPremium && (
              <div className="flex items-center justify-between relative group">
                <label className="font-medium flex items-center gap-1">
                  <div className="relative group">
                    <BrainCircuit className="w-4 h-4 text-slate-600 cursor-pointer" />
                    <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-52 text-center z-10">
                      Enable AI/ML-based future predictions for stock value instead of manual input.
                    </div>
                  </div>
                  Use Machine Learning
                </label>
                <button
                  type="button"
                  onClick={() => handleChange("useML", !formData.useML)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    formData.useML ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      formData.useML ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Advanced Charts Toggle */}
            {formData.isPremium && (
              <div className="flex items-center justify-between relative group">
                <label className="font-medium flex items-center gap-1">
                  <div className="relative group">
                    <ChartPie className="w-4 h-4 text-slate-600 cursor-pointer" />
                    <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-52 text-center z-10">
                      View extra charts like Heatmaps and ML scenarios.
                    </div>
                  </div>
                  Show Advanced Charts
                </label>
                <button
                  type="button"
                  onClick={() => handleChange("advancedCharts", !formData.advancedCharts)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    formData.advancedCharts ? "bg-purple-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      formData.advancedCharts ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Scenario if ML is ON */}
            {auth.isPremium && formData.useML && (
              <div className="relative group">
                <label className="block mb-1 font-medium flex items-center gap-1">
                  <div className="relative group">
                    <Layers className="w-4 h-4 text-slate-600 cursor-pointer" />
                    <div className="absolute right-full top-1/2 mr-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[5px] transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-2 py-1 w-52 text-center z-10">
                      Choose a forecast scenario: bullish (optimistic), base (neutral), or bearish (pessimistic).
                    </div>
                  </div>
                  Scenario
                </label>
                <select
                  value={formData.scenario}
                  onChange={(e) => handleChange("scenario", e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="bullish">Bullish</option>
                  <option value="base">Base</option>
                  <option value="bearish">Bearish</option>
                </select>
              </div>
            )}

            {/* Manual Inputs */}
            {(!formData.isPremium || !formData.useML) && (
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium flex items-center gap-1">
                    <PercentCircle className="w-4 h-4" /> Growth Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.growthRate}
                    onChange={(e) => handleChange("growthRate", parseFloat(e.target.value))}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> Discount Rate
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discountRate}
                    onChange={(e) => handleChange("discountRate", parseFloat(e.target.value))}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" /> Perpetual Growth
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.perpetualGrowth}
                    onChange={(e) => handleChange("perpetualGrowth", parseFloat(e.target.value))}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Run DCF Analysis
            </button>
          </form>

          {/* Quick Info Panel */}
          <div className="bg-white shadow-lg p-6 rounded-2xl h-fit">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-1">
              <Info className="w-4 h-4" /> Quick Tips
            </h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li><strong>DCF</strong> estimates intrinsic value based on future cash flows.</li>
              <li><strong>Growth Rate</strong>: Annual expected revenue growth.</li>
              <li><strong>Discount Rate</strong>: Rate to bring future cash to present value.</li>
              <li><strong>Perpetual Growth</strong>: Terminal growth beyond projection years.</li>
              <li>Example tickers: AAPL, MSFT, INFY, TCS</li>
            </ul>
          </div>
        </div>

        {/* Result Panel */}
        <AnimatePresence>
        {submitted && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white rounded-3xl shadow-xl p-8 space-y-10"
          >
            {/* Valuation Summary */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                📊 Valuation Summary
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Ticker:</span> {result.ticker}
                </p>
                <p>
                  <span className="font-semibold">Estimated Intrinsic Value:</span>
                  <span className="text-slate-800 font-semibold">
                    {formData.market === "India" ? " ₹" : " $"}
                    {result.valuation?.intrinsic_value?.toFixed(2)}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Current Market Price:</span>
                  <span className="text-slate-800 font-semibold">
                    {formData.market === "India" ? " ₹" : " $"}
                    {result.valuation?.current_price?.toFixed(2)}
                  </span>
                </p>
              </div>

              <span
                className={`inline-block mt-3 px-4 py-1.5 text-sm rounded-full font-medium ${
                  result.valuation?.status === "Undervalued"
                    ? "bg-green-100 text-green-700"
                    : result.valuation?.status === "Overvalued"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {result.valuation?.status}
              </span>
            </div>

            {/* Company Overview */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                🏢 Company Overview
              </h4>
              <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl text-gray-700 text-sm">
                {result.company_info?.name && (
                  <p><strong>Name:</strong> {result.company_info.name}</p>
                )}
                {result.company_info?.sector && (
                  <p><strong>Sector:</strong> {result.company_info.sector}</p>
                )}
                {result.company_info?.ceo && (
                  <p><strong>CEO:</strong> {result.company_info.ceo}</p>
                )}
                {result.company_info?.website && (
                  <p><strong>Website:</strong> <a href={result.company_info.website} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">{result.company_info.website}</a></p>
                )}
                {result.company_info?.description && (
                  <p className="col-span-2"><strong>Description:</strong> {result.company_info.description}</p>
                )}
              </div>
            </div>

            {/* Input Parameters */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                ⚙️ Input Parameters
              </h4>
              <ul className="bg-slate-50 p-4 rounded-2xl text-gray-700 text-sm space-y-2 list-disc pl-6">
                <li><strong>Growth Rate:</strong> {(result.input_parameters?.growth_rate * 100).toFixed(2)}%</li>
                <li><strong>Discount Rate:</strong> {(result.input_parameters?.discount_rate * 100).toFixed(2)}%</li>
                <li><strong>Perpetual Growth:</strong> {(result.input_parameters?.perpetual_growth * 100).toFixed(2)}%</li>
              </ul>
            </div>

            {/* Charts */}
            {result?.charts && (
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                  📈 Enhanced Visuals
                </h4>
                <div className="flex flex-col gap-8 text-sm text-slate-700">
                  {/* FCF Projection Chart */}
                  {result?.charts?.fcf_projection && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="text-md font-semibold">Free Cash Flow Projection</h5>
                        <div className="relative group">
                          <Info className="w-4 h-4 text-slate-600 cursor-pointer" />
                          <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                            Projects expected Free Cash Flows (FCF) over future years, based on growth assumptions. Higher FCF usually means better valuation.
                          </div>
                        </div>
                      </div>
                      <ChartContainer chartData={result.charts.fcf_projection} />
                    </div>
                  )}
                  {/* DCF vs Price Chart */}
                  {result?.charts?.dcf_vs_price && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="text-md font-semibold">Intrinsic Value vs Market Price</h5>
                        <div className="relative group">
                          <Info className="w-4 h-4 text-slate-600 cursor-pointer" />
                          <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                            Compares your computed intrinsic value with actual market price to visualize under/overvaluation over time.
                          </div>
                        </div>
                      </div>
                      <ChartContainer chartData={result.charts.dcf_vs_price} />
                    </div>
                  )}

                  {/* Sensitivity Heatmap */}
                  {result?.charts?.sensitivity_heatmap && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="text-md font-semibold">Sensitivity Heatmap</h5>
                        <div className="relative group">
                          <Info className="w-4 h-4 text-slate-600 cursor-pointer" />
                          <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                            Shows how intrinsic value changes based on different combinations of growth and discount rates. Helps in risk assessment.
                          </div>
                        </div>
                      </div>
                      <ChartContainer chartData={result.charts.sensitivity_heatmap} />
                    </div>
                  )}

                  {/* Sensitivity Table */}
                  {result?.charts?.sensitivity_table && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="text-md font-semibold">Sensitivity Table</h5>
                        <div className="relative group">
                          <Info className="w-4 h-4 text-slate-600 cursor-pointer" />
                          <div className="absolute left-full ml-2 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 bg-gray-800 text-white text-xs rounded-md px-3 py-2 w-64 text-left z-10">
                            A 3D tabular view of how small changes in assumptions impact the intrinsic value, highlighting the model's sensitivity.
                          </div>
                        </div>
                      </div>
                      <ChartContainer chartData={result.charts.sensitivity_table} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}