import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

export default function CorrelationHeatmap({ matrix }) {
  if (!matrix || typeof matrix !== "object") {
    return <p className="text-red-500">Invalid correlation matrix data.</p>;
  }

  const tickers = Object.keys(matrix);
  const heatmapData = [];

  tickers.forEach((rowTicker) => {
    tickers.forEach((colTicker) => {
      heatmapData.push({
        x: colTicker,
        y: rowTicker,
        value: matrix[rowTicker][colTicker],
      });
    });
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Correlation Heatmap</h2>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${tickers.length + 1}, minmax(40px, 1fr))` }}>
        <div></div>
        {tickers.map((col) => (
          <div key={`col-${col}`} className="text-sm font-bold text-center">
            {col}
          </div>
        ))}
        {tickers.map((row) => (
          <React.Fragment key={`row-${row}`}>
            <div className="text-sm font-bold text-right pr-2">{row}</div>
            {tickers.map((col) => {
              const val = matrix[row][col];
              const bgColor = getColorForValue(val);
              return (
                <div
                  key={`${row}-${col}`}
                  className="w-full h-10 flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: bgColor,
                    color: Math.abs(val) > 0.5 ? "white" : "black",
                  }}
                  title={`Corr(${row}, ${col}) = ${val.toFixed(2)}`}
                >
                  {val.toFixed(2)}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function getColorForValue(value) {
  const intensity = Math.abs(value);
  const r = value > 0 ? 255 - intensity * 100 : 255;
  const g = value > 0 ? 255 : 255 - intensity * 100;
  const b = 255 - intensity * 200;
  return `rgb(${r}, ${g}, ${b})`;
}