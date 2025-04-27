"use client";

const PnLBarChart = ({ tickerPnL, market }) => {
  // Convert the PnL data into an array
  const data = Object.entries(tickerPnL).map(([ticker, pnl]) => ({
    ticker,
    pnl,
  }));

  // Calculate total absolute P&L for proportional length
  const totalPnL = data.reduce((acc, d) => acc + Math.abs(d.pnl), 0);

  // Sort data by absolute P&L descending to emphasize larger P&Ls
  const sortedData = [...data].sort((a, b) => Math.abs(b.pnl) - Math.abs(a.pnl));

  // Get color gradient for positive/negative P&L
  const getColor = (pnl) => {
    if (pnl > 0) {
      return `linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(0, 128, 0, 1) 100%)`; // Green for positive
    }
    return `linear-gradient(90deg, rgba(239, 68, 68, 1) 0%, rgba(255, 0, 0, 1) 100%)`; // Red for negative
  };

  // Currency symbol based on the market
  const currencySymbol = market === "India" ? "₹" : "$";

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 w-full">
      {/* PnL Bar */}
      <div className="relative w-full h-20 rounded-lg overflow-hidden shadow-md bg-gray-100 flex">
        {sortedData.map((entry, index) => {
          const widthPercent = (Math.abs(entry.pnl) / totalPnL) * 100;

          return (
            <div
              key={index}
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${widthPercent}%`,
                background: getColor(entry.pnl),
                borderRight: index === sortedData.length - 1 ? "none" : "1px solid white",
              }}
            ></div>
          );
        })}
      </div>

      {/* PnL Table */}
      <div className="w-full md:w-1/2 max-h-64 overflow-y-auto mt-4 md:mt-0">
        <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-3 py-2">Ticker</th>
              <th className="px-3 py-2">P&L</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-3 py-2">{entry.ticker}</td>
                <td
                  className={`px-3 py-2 ${
                    entry.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {entry.pnl >= 0 ? "+" : "-"} {currencySymbol}{Math.abs(entry.pnl).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PnLBarChart;