import React from "react";
import { Link } from "react-router-dom";
import ToolCard from "../components/ToolCard";
export default function Home() {
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Simplify your <span className="text-slate-500">Finances , </span>
          <br />
          Amplify your future
        </h1>
        <div className="text-gray-700 text-xs sm:text-sm">
          ValuateAi AI is an AI-powered platform designed to help investors make
          smarter decisions in personal finance and investments.
          <br />
          Whether you're planning your budget, analyzing portfolios, or
          exploring new investment opportunities, Valuea provides intelligent
          tools and insights to support your financial journey.
        </div>
        {/*  <a
          href="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
        </a> */}
        <div className="flex flex-wrap justify-center gap-80 mt-4 p-4">
          <Link to="/DCF">
            <button className="bg-slate-400 text-black py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300">
              Try DCF Tool
            </button>
          </Link>

          <button className="bg-slate-400 text-black py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300">
            Compare Portfolios
          </button>
          <Link to="/screener">
            <button className="bg-slate-400 text-black py-2 px-4 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300">
              Use Screener
            </button>
          </Link>
        </div>

        {/* Tools Section */}
        <h2 className="text-3xl sm:text-4xl font-bold  text-slate-700 mt-12 mb-6">
          Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-80 max-w-6xl mx-auto p-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl">Tool 1</h3>
            <ToolCard></ToolCard>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl">Tool 2</h3>
            <ToolCard></ToolCard>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-xl">Tool 3</h3>
            <ToolCard></ToolCard>
          </div>
        </div>
      </div>

      {/* swiper */}
      {/* <div className='h-[500px]'>
    <div
      style={{
        background: `url('https://via.placeholder.com/1200x500') center no-repeat`,
        backgroundSize: 'cover',
      }}
      className='h-full w-full'
    ></div>
  </div> */}

      {/* listing results for offer, sale and rent */}

      {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    
    <div>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
        <a className='text-sm text-blue-800 hover:underline' href='/search?offer=true'>
          Show more offers
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
      </div>
    </div>

    <div>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
        <a className='text-sm text-blue-800 hover:underline' href='/search?type=rent'>
          Show more places for rent
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
      </div>
    </div>

    <div>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
        <a className='text-sm text-blue-800 hover:underline' href='/search?type=sale'>
          Show more places for sale
        </a>
      </div>
      <div className='flex flex-wrap gap-4'>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
        <div className='w-60 h-40 bg-gray-200 rounded-lg'></div>
      </div>
    </div>
  </div> */}
    </div>
  );
}
