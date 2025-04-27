import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth_context";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { login, auth } = useAuth();
  
    useEffect(() => {
        if (auth?.token) {
            navigate("/", { replace: true });
        }  
    }, [auth, navigate]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(form),
    });

    if (res.ok) {
      const data = await res.json();
      login(data.access_token); // stores the token in context/localStorage
      navigate("/");
    } else {
      const err = await res.json();
      alert(`Login failed: ${err.detail || "Unknown error"}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-200 to-slate-500">
        <img src="/images/login.svg" className="w-full max-w-[300px]"/>
        <div className="max-w-sm mx-auto p-6 bg-white shadow rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Log In
            </button>
        </form>
        <p>New to the site?<br></br>Welcome! <a href="/signup" className="text-slate-600 underline hover:cursor-pointer">Sign Up</a> here to continue.</p>
        </div>
    </div>
  );
}