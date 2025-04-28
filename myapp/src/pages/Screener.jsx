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

      console.log("Submitted Portfolio Analysis Form.");
      const res = await fetch("http://localhost:8000/api/portfolio", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("API error while submitting portfolio analysis form.");
        return null;
      } else {
        console.log("Data fetched successfully.");
        setAnalysisResult(json);
        return json;
      }
    } catch (err) {
      console.error("Failed to fetch data from Portfolio Analyzer: ", err);
      return null;
    }
  };

  return (
    <div className="p-0">
      <PortfolioAnalysisForm onSubmit={handlePortfolioAnalysisSubmit} result={analysisResult} />
    </div>
  );
}