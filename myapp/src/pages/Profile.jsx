import React, { useEffect, useState } from "react";
import { useAuth, useAuthFetch } from "../components/auth_context";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    const fetchProfile = async () => {
      try {
        console.log("Fetching user info for profile.");
        const res = await authFetch("http://localhost:8000/api/me");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [authLoading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="text-xl text-gray-500 animate-pulse">Loading your profile...</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
        <div className="text-xl text-red-500">Failed to load your profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition hover:scale-[1.02]">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
          Welcome! 👋
        </h2>

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600 font-semibold">Email</span>
            <span className="text-gray-800">{userInfo.username}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600 font-semibold">Phone</span>
            <span className="text-gray-800">{userInfo.phone || "Not Provided"}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600 font-semibold">Membership</span>
            <span className={userInfo.is_premium ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {userInfo.is_premium ? "Premium Member" : "Free Member"}
            </span>
          </div>

          {userInfo.is_premium && userInfo.premium_expiry && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Premium Expires</span>
              <span className="text-blue-700 font-bold">
                {new Date(userInfo.premium_expiry).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-10 w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}