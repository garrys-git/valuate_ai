import React, { useEffect, useState } from "react";
import { useAuth, useAuthFetch } from "../components/auth_context";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const authFetch = useAuthFetch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authLoading } = useAuth(); // <-- Import authLoading!

  useEffect(() => {
    if (authLoading) return; // <-- Don't fetch if still loading auth
    const fetchProfile = async () => {
      try {
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
  }, [authLoading]); // <-- Now correctly depends on authLoading
  

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Your Profile</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Username/Email:</span>
            <span className="text-gray-900">{userInfo.username}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Phone:</span>
            <span className="text-gray-900">{userInfo.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Premium Status:</span>
            <span className={userInfo.is_premium ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {userInfo.is_premium ? "Premium Member" : "Free Member"}
            </span>
          </div>

          {userInfo.is_premium && userInfo.premium_expiry && (
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Premium Expires:</span>
              <span className="text-blue-600 font-semibold">
                {new Date(userInfo.premium_expiry).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}