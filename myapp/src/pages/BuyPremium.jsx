import React from "react";
import { useAuth } from "../components/auth_context";

export default function BuyPremium() {
  const { auth, login } = useAuth();
  const token = auth?.token;

  const handleBuyPremium = async () => {
    console.log("buying premium: ", token)
    const res = await fetch("http://localhost:8000/api/payment/create_order", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log("razorpay data: ", data)

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
          login(token, true); // ✅ isPremium set
          alert("🎉 Premium Unlocked!");
          window.location.reload(); // optional
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-semibold mb-4">Upgrade to Premium</h2>
      <p className="text-lg mb-6 text-gray-600">Access all premium tools for ₹499.</p>
      <button
        onClick={handleBuyPremium}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg"
      >
        Buy Premium
      </button>
    </div>
  );
}