import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-slate-200 shadow-md">
      <div style={{ backgroundColor: "#afbbee" }} className="flex justify-between items-center px-4 py-2">
        {/* Logo and Brand Name aligned left */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/images/undraw_investing_kncz.svg"
            alt="logo"
            className="h-7 sm:h-10 w-auto"
          />
          <h1 className="font-bold text-lg sm:text-2xl flex items-center">
            <span className="text-slate-500">Valuate</span>
            <span className="text-slate-700">AI</span>
          </h1>
        </a>

        {/* Nav Links */}
        <ul className="flex gap-6 items-center relative" ref={dropdownRef}>
          <a href="/">
            <li className="hidden sm:inline text-slate-700 hover:underline hover:text-slate-900 transition">
              Home
            </li>
          </a>

          <a href="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline hover:text-slate-900 transition">
              About
            </li>
          </a>

          <li
            className="hidden sm:flex items-center gap-1 text-slate-700 hover:underline hover:text-slate-900 cursor-pointer transition"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            Tools
            <ChevronDown className="h-4 w-4" />
            {showDropdown && (
              <ul className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                <a href="/DCF">
                  <li className="px-4 py-2 hover:bg-slate-100 transition">DCF Analyzer</li>
                </a>
                <a href="/compare">
                  <li className="px-4 py-2 hover:bg-slate-100 transition">Trading Indicators</li>
                </a>
                <a href="/screener">
                  <li className="px-4 py-2 hover:bg-slate-100 transition">Portfolio Risk Analyzer</li>
                </a>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}