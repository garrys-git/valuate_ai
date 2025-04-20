import React from "react";
import Plot from "react-plotly.js";

const ChartContainer = ({ chartData }) => {
    if (!chartData) return null;
  
    return (
      <div className="rounded-xl shadow-md bg-white p-4 h-[400px] w-full">
        <Plot
          data={chartData.data}
          layout={{
            ...chartData.layout,
            autosize: true,
            margin: { t: 40, b: 40, l: 40, r: 40 },
          }}
          config={chartData.config || { responsive: true }}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler
        />
      </div>
    );
  };  

export default ChartContainer;