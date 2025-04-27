import React from "react";
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
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${tickers.length + 1}, minmax(60px, 1fr))`, // Increased min-width
        }}
      >
        {/* Empty cell for corner */}
        <div></div>
        
        {/* Column Headers */}
        {tickers.map((col) => (
          <div
            key={`col-${col}`}
            className="text-sm font-bold text-center p-2"
            style={{ wordBreak: "break-word", whiteSpace: "normal" }} // Handle long tickers
          >
            {col}
          </div>
        ))}

        {/* Row Headers and Grid Cells */}
        {tickers.map((row) => (
          <React.Fragment key={`row-${row}`}>
            {/* Row Header */}
            <div className="text-sm font-bold text-right pr-2 p-2">{row}</div>

            {/* Heatmap Cells */}
            {tickers.map((col) => {
              const val = matrix[row][col];
              const bgColor = getColorForValue(val);
              return (
                <div
                  key={`${row}-${col}`}
                  className="w-full h-10 flex items-center justify-center text-xs p-2"
                  style={{
                    backgroundColor: bgColor,
                    color: Math.abs(val) > 0.5 ? "white" : "black",
                    wordBreak: "break-word",
                    whiteSpace: "normal", // Allow long text to wrap
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