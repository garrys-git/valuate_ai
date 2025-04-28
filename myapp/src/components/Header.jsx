import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "./auth_context";
import { useNavigate } from "react-router-dom";
import { ChevronDown, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current || dropdownRef.current.contains(e.target)) return;
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);  

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div style={{ backgroundColor: "#020d3b" }} className="flex justify-between items-center px-4 py-2 relative">
        {/* Left */}
        <div className="flex items-center z-10">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo-bg-dark.png" alt="logo" className="h-7 sm:h-10 w-auto" />
            <h1 className="font-bold text-lg sm:text-2xl flex items-center">
              <span className="text-slate-200">valuate.</span>
              <span className="text-slate-400">ai</span>
            </h1>
          </a>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center hidden md:flex">
          <div className="text-xs sm:text-sm md:text-base text-amber-400 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            <Typewriter
              words={[
                "💎 Limited Time: Unlock Full Access — No Cost! 💎",
                "🚀 Sign Up NOW! 🚀"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </div>
        </div>

        {/* Right - Navigation */}
        <div className="flex items-center gap-6 z-10" ref={dropdownRef}>
          <ul className="flex gap-6 items-center relative z-10" ref={dropdownRef}>
            <a href="/">
              <li className="hidden sm:inline text-slate-400 font-bold hover:underline hover:text-slate-100 transition">
                Home
              </li>
            </a>
            <a href="/about">
              <li className="hidden sm:inline text-slate-400 font-bold hover:underline hover:text-slate-100 transition">
                About
              </li>
            </a>

            {/* Tools Dropdown */}
            <li
              className="hidden sm:flex items-center gap-1 text-slate-400 font-bold hover:underline hover:text-slate-400 cursor-pointer transition relative"
              onClick={() => setOpenDropdown(openDropdown === "tools" ? null : "tools")}
            >
              Tools
              <ChevronDown className="h-4 w-4" />
              {openDropdown === "tools" && (
                <ul className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  <Link to="/DCF">
                    <li className="px-4 py-2 text-slate-500 hover:bg-slate-300 transition">DCF Analyzer</li>
                  </Link>
                  <Link to="/indicators">
                    <li className="px-4 py-2 text-slate-500 hover:bg-slate-300 transition">Trading Indicators</li>
                  </Link>
                  <Link to="/screener">
                    <li className="px-4 py-2 text-slate-500 hover:bg-slate-300 transition">Portfolio Risk Analyzer</li>
                  </Link>
                </ul>
              )}
            </li>
            
            {/* LOGIN / PROFILE BUTTON */}
            {!auth?.token ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-slate-600 text-white px-4 py-2 rounded-full hover:bg-slate-400 transition"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
                  className="rounded-full h-9 w-9 bg-slate-300"
                >
                  {/* Avatar icon or image */}
                  <img src="/images/header-profile.png"></img>
                </button>
                {openDropdown === "profile" && (
                  <ul className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    <a href="/profile">
                      <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer">Your Profile</li>
                    </a>
                    <a href="/buypremium">
                      <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-amber-500">Buy Premium</li>
                    </a>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                    >
                      Log Out
                    </li>
                  </ul>
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}