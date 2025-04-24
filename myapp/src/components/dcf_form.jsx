import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingUp, PercentCircle, DollarSign, BarChart3 } from "lucide-react";
// import DcfChartsLayout from "../components/dcf_charts_layout";
import ChartContainer from "../components/dcf_charts_container";

export default function DcfCalculatorPage() {
  const [formData, setFormData] = useState({
    market: "US",
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
  
    //   setResult({
    //     ticker: formData.ticker,
    //     value: data.report.estimated_value || "$123.45",
    //     status: data.report.valuation_status || "Undervalued", // fallback if backend doesn't return these
    //   });
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
    <div className="min-h-screen bg-slate-200 px-8 py-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">💰 Discounted Cash Flow Calculator</h1>
          <p className="text-gray-600 mt-2">Estimate the intrinsic value of stocks based on fundamental analysis.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 bg-white shadow-lg p-6 rounded-2xl space-y-6">
            <div>
              <label className="block mb-1 font-medium flex items-center gap-1">
                <BarChart3 className="w-4 h-4" /> Select Market
              </label>
              <select
                value={formData.market}
                onChange={(e) => handleChange("market", e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="US">US</option>
                <option value="India">India</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> Stock Ticker
              </label>
              <input
                type="text"
                value={formData.ticker}
                onChange={(e) => handleChange("ticker", e.target.value)}
                placeholder="e.g. AAPL or TCS"
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </div>

            {/* Premium Toggle */}
            <div className="flex items-center justify-between">
              <label className="font-medium">Premium User</label>
              <button
                type="button"
                onClick={() => handleChange("isPremium", !formData.isPremium)}
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
              <div className="flex items-center justify-between">
                <label className="font-medium">Use Machine Learning</label>
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
            <div className="flex items-center justify-between">
                <label className="font-medium">Show Advanced Charts</label>
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
            {formData.isPremium && formData.useML && (
              <div>
                <label className="block mb-1 font-medium">Scenario</label>
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
            className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
            >
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">📊 Valuation Summary</h3>
                <p className="text-gray-700">Ticker: <strong>{result.ticker}</strong></p>
                <p className="text-gray-700">Estimated Intrinsic Value: <strong>${result.valuation?.intrinsic_value?.toFixed(2)}</strong></p>
                <p className="text-gray-700">Current Market Price: <strong>${result.valuation?.current_price?.toFixed(2)}</strong></p>
                <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                result.valuation?.status === "Undervalued"
                    ? "bg-green-100 text-green-800"
                    : result.valuation?.status === "Overvalued"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                {result.valuation?.status}
                </span>
            </div>

            <div>
                <h4 className="text-lg font-semibold">🏢 Company Overview</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
                {result.company_info?.name && <p><strong>Name:</strong> {result.company_info.name}</p>}
                {result.company_info?.sector && <p><strong>Sector:</strong> {result.company_info.sector}</p>}
                {result.company_info?.ceo && <p><strong>CEO:</strong> {result.company_info.ceo}</p>}
                {result.company_info?.website && (
                    <p><strong>Website:</strong> <a href={result.company_info.website} className="text-blue-600 underline" target="_blank" rel="noreferrer">{result.company_info.website}</a></p>
                )}
                {result.company_info?.description && (
                    <p className="col-span-2"><strong>Description:</strong> {result.company_info.description}</p>
                )}
                </div>
            </div>

            <div>
                <h4 className="text-lg font-semibold">⚙️ Input Parameters</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li><strong>Growth Rate:</strong> {(result.input_parameters?.growth_rate * 100).toFixed(2)}%</li>
                <li><strong>Discount Rate:</strong> {(result.input_parameters?.discount_rate * 100).toFixed(2)}%</li>
                <li><strong>Perpetual Growth:</strong> {(result.input_parameters?.perpetual_growth * 100).toFixed(2)}%</li>
                </ul>
            </div>


            {result?.charts && (
                <div>
                    <h4 className="text-lg font-semibold">📈 Enhanced Visuals</h4>
                    <div className="grid md:grid-cols-1 gap-4 text-sm text-gray-700 items-center">
                        {result?.charts?.fcf_projection && (
                            <ChartContainer chartData={result.charts.fcf_projection} />
                        )}

                        {result?.charts?.dcf_vs_price && (
                            <ChartContainer chartData={result.charts.dcf_vs_price} />
                        )}
                        
                        {result?.charts?.sensitivity_heatmap && (
                            <ChartContainer chartData={result.charts.sensitivity_heatmap} />
                        )}

                        {result?.charts?.sensitivity_table && (
                            <ChartContainer chartData={result.charts.sensitivity_table} />
                        )}
                        
                        {/* <div>
                            <strong>FCF Growth Values:</strong>
                            <ul className="list-disc pl-5">
                            {result.premium_features.sensitivity.fcf_growth_vals.map((g, i) => (
                                <li key={`fcf-${i}`}>{(g * 100).toFixed(2)}%</li>
                            ))}
                            </ul>
                        </div> */}
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