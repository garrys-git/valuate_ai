// import React from "react";

// export default function Screener() {
//   const companies = [
//     { name: "Company A", score: "87", tag: "Growth" },
//     { name: "Company B", score: "74", tag: "Value" },
//     { name: "Company C", score: "65", tag: "Stable" },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 text-slate-700">
//       <h1 className="text-3xl font-bold mb-6">Screener Page</h1>

//       {/* Filter section */}
//       <div className="flex flex-col gap-4 mb-8">
//         <label className="flex items-center gap-2">
//           <input type="checkbox" className="w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Filter by sector"
//             className="w-full border rounded px-3 py-2 text-sm"
//           />
//         </label>
//         <label className="flex items-center gap-2">
//           <input type="checkbox" className="w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Filter by market cap"
//             className="w-full border rounded px-3 py-2 text-sm"
//           />
//         </label>
//       </div>

//       {/* Table Section */}
//       <div className="border rounded-lg shadow-md overflow-hidden">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-slate-200 text-slate-700 font-semibold">
//             <tr>
//               <th className="px-4 py-3">Company Name</th>
//               <th className="px-4 py-3">Score</th>
//               <th className="px-4 py-3">Tag</th>
//             </tr>
//           </thead>
//           <tbody>
//             {companies.map((company, idx) => (
//               <tr
//                 key={idx}
//                 className="odd:bg-white even:bg-slate-50 hover:bg-slate-100"
//               >
//                 <td className="px-4 py-3">{company.name}</td>
//                 <td className="px-4 py-3">{company.score}</td>
//                 <td className="px-4 py-3">
//                   <span className="bg-slate-400 text-black px-3 py-1 rounded-lg text-xs font-medium">
//                     {company.tag}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import PortfolioAnalysisForm from "../components/portolio_analysis_form";

export default function PortolioAnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handlePortfolioAnalysisSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("market", data.market);
      formData.append("premium", data.isPremium);
      formData.append("manual", data.useManualEntry);

      if (data.useManualEntry) {
        const cleanedEntries = data.entries.map((entry) => ({
          ...entry,
          ltp: entry.ltp === "" ? null : parseFloat(entry.ltp),
        }));
        formData.append("entries", JSON.stringify(cleanedEntries));
      } else {
        formData.append("csvFile", data.csvFile);
      }

      const res = await fetch("http://localhost:8000/api/portfolio", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("❌ API error:", json);
        return null;
      } else {
        console.log("✅ Analysis Result:", json);
        setAnalysisResult(json);
        return json;
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      return null;
    }
  };

  return (
    <div className="p-8">
      <PortfolioAnalysisForm onSubmit={handlePortfolioAnalysisSubmit} result={analysisResult} />
    </div>
  );
}