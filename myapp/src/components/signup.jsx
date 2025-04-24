import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth_context";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", full_name: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // ✅ Auto-login after successful signup
      const loginRes = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: form.username,
          password: form.password,
        }),
      });

      if (loginRes.ok) {
        const data = await loginRes.json();
        login(data.access_token); // ✅ Save token in context
        navigate("/"); // ✅ Redirect to home
      } else {
        alert("Signup succeeded, but auto-login failed. Please log in manually.");
        navigate("/login");
      }
    } else {
      const err = await res.json();
      alert(`Signup failed: ${err.detail || "Unknown error"}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      <img src="/images/signup.svg" className="w-full max-w-sm mb-1" />
      <div className="max-w-sm mx-auto p-6 bg-white shadow rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="username"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
        <p>
          Already signed up?{" "}
          <a href="/login" className="text-slate-600 underline hover:cursor-pointer">
            Log In
          </a>{" "}
          here to continue.
        </p>
      </div>
    </div>
  );
}