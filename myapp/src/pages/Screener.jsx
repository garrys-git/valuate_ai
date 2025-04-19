import React from "react";

export default function Screener() {
  const companies = [
    { name: "Company A", score: "87", tag: "Growth" },
    { name: "Company B", score: "74", tag: "Value" },
    { name: "Company C", score: "65", tag: "Stable" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-slate-700">
      <h1 className="text-3xl font-bold mb-6">Screener Page</h1>

      {/* Filter section */}
      <div className="flex flex-col gap-4 mb-8">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Filter by sector"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <input
            type="text"
            placeholder="Filter by market cap"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </label>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-200 text-slate-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Tag</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, idx) => (
              <tr
                key={idx}
                className="odd:bg-white even:bg-slate-50 hover:bg-slate-100"
              >
                <td className="px-4 py-3">{company.name}</td>
                <td className="px-4 py-3">{company.score}</td>
                <td className="px-4 py-3">
                  <span className="bg-slate-400 text-black px-3 py-1 rounded-lg text-xs font-medium">
                    {company.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
