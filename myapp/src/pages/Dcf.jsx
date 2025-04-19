import React from "react";

export default function DCF() {
  return (
    <div className="flex flex-col gap-6 p-10 px-4 max-w-3xl mx-auto">
      <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl text-center">
        DCF Analysis Tool
      </h1>

      {/* Input Fields */}
      <div className="flex flex-col gap-4 mt-8">
        <input
          type="text"
          placeholder="Stock ticker"
          className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <input
          type="text"
          placeholder="smart assumptions"
          className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <input
          type="text"
          placeholder=""
          className="p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      {/* Sliders or Bars */}
      <div className="flex flex-col sm:flex-row justify-between gap-160 mt-10">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-slate-700 font-semibold">Fair Value</label>
          {/* <div className="w-full h-4 bg-gray-300 rounded-full">
            <div className="h-full bg-slate-400 rounded-full w-2/3"></div>
          </div>
          <div className="w-1/3 h-6 bg-slate-400 rounded-md flex items-center justify-center text-white text-sm">
            △
          </div> */}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-slate-700 font-semibold">Mo8</label>
          {/* <div className="w-full h-4 bg-gray-300 rounded-full">
            <div className="h-full bg-slate-400 rounded-full w-1/2"></div>
          </div>
          <div className="w-full h-4 bg-gray-300 rounded-full">
            <div className="h-full bg-slate-200 rounded-full w-2/3"></div>
          </div>
          <div className="w-1/3 h-4 bg-slate-400 rounded-full"></div> */}
        </div>
      </div>

      {/* Mode Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <button className="bg-slate-400 text-black py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300">
          Beginner Mode
        </button>
        <button className="bg-slate-400 text-black py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300">
          Expert Mode
        </button>
      </div>
    </div>
  );
}
