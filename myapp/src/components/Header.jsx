import React from "react";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <a href="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Valuate</span>
            <span className="text-slate-700">Ai</span>
          </h1>
        </a>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search Tools...."
            defaultValue=""
          />
          <button>
            {/* Replace with a static search icon if using plain HTML */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
              />
            </svg>
          </button>
        </form>

        <ul className="flex gap-4">
          <a href="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </a>

          <a href="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </a>

          <a href="/tools">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Tools
            </li>
          </a>

         {/*  <a href="/profile">
            
            <img
              className="rounded-full h-7 w-7 object-cover"
              src="/default-avatar.jpg"
              alt="profile"
            />
          </a> */}
          
        </ul>
      </div>
    </header>
  );
}
