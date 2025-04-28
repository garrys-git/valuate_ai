import React from "react";
import DcfForm from "../components/dcf_form";

export default function DcfPage() {
  const handleDcfSubmit = async (data) => {
    try {
        console.log("Submitting DCF form.");
        const res = await fetch("http://localhost:8000/api/dcf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        console.log(json); // replace with showing the data
    } catch (err) {
      console.error("Failed to fetch data from DCF Calculator: ", err);
    }
  };

  return (
    <div className="p-0 m-0">
      <DcfForm onSubmit={handleDcfSubmit} />
    </div>
  );
}
