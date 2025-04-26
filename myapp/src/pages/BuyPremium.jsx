import React, { useEffect, useState } from "react";
import { useAuth } from "../components/auth_context";
import { useNavigate } from "react-router-dom";

export default function BuyPremium() {
  const { auth, login } = useAuth();
  const token = auth?.token;
  const isPremium = auth?.isPremium;
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [alreadyPremium, setAlreadyPremium] = useState(false);

  useEffect(() => {
    if (isPremium) {
      setAlreadyPremium(true);
      setTimeout(() => navigate("/"), 5000); // redirect after 2.5s
    }
    setChecking(false);
  }, [isPremium, navigate]);

  const handleBuyPremium = async () => {
    console.log("buying premium: ", token);
    const res = await fetch("http://localhost:8000/api/payment/create_order", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("razorpay data: ", data);

    const options = {
      key: data.razorpay_key,
      amount: data.amount,
      currency: data.currency,
      name: "Valuate AI",
      description: "Premium Membership",
      order_id: data.order_id,
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:8000/api/payment/verify_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          }),
        });

        if (verifyRes.ok) {
          login(token, true);
          alert("🎉 Premium Unlocked!");
          window.location.reload(); // or navigate('/')
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (checking) return null;

  if (alreadyPremium) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">
          <h2 className="text-3xl font-bold text-green-600 mb-4">You're already Premium 🎉</h2>
          <p className="text-gray-700 text-lg">
            You have full access to advanced features and tools.
            Redirecting you to the home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300 py-6 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Upgrade to Premium</h2>
      <p className="text-lg text-slate-600 mb-5 text-center max-w-2xl">
        Unlock full access to all premium indicators, trading tools, and advanced features — all for just <strong>₹499</strong>.
      </p>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Free Membership */}
        <div className="border rounded-xl p-6 flex flex-col">
          <h3 className="text-2xl font-semibold mb-4 text-slate-700 text-center">Free Membership</h3>
          <ul className="flex-1 space-y-3 text-gray-600">
            <li>✅ Access to limited free indicators</li>
            <li>✅ Basic trading tools</li>
            <li>✅ Community support</li>
            <li>🚫 No early-access to new features</li>
            <li>🚫 No premium-only signals</li>
          </ul>
        </div>

        {/* Premium Membership */}
        <div className="border-2 border-blue-600 rounded-xl p-6 flex flex-col bg-blue-50">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 text-center">Premium Membership</h3>
          <ul className="flex-1 space-y-3 text-gray-700 font-medium">
            <li>✨ Full access to all premium indicators</li>
            <li>✨ Early access to new tools & features</li>
            <li>✨ Access to ML backed rates for DCF Analysis</li>
            <li>✨ Advanced visualization with premium charts</li>
            <li>✨ Access premium risk metrics for Portfolio Analysis</li>
            <li>✨ Premium-only AI signals</li>
            <li>✨ Priority email support</li>
            <li>✨ Future upgrades included</li>
          </ul>
        </div>
      </div>

      {/* Buy Button */}
      <button
        onClick={handleBuyPremium}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-xl shadow-lg transition-all"
      >
        Buy Premium for ₹499
      </button>
    </div>
  );
}