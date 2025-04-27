import React from 'react';
import { FaXTwitter, FaLinkedin, FaMedium } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#020d3b" }} className="w-full  text-gray-300 py-4">
      <div className="px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">valuate.ai</h2>
          <p className="text-sm text-gray-400 mt-1">
            Simplify your Finances, Amplify your Future.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a href="https://x.com/valuate_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaXTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
          <a href="https://medium.com/@harman_30" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaMedium />
          </a>
        </div>

        {/* Right Side */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400 mt-2">
            📧 Contact us: <a href="mailto:valuate.ai@gmail.com" className="underline hover:text-white">valuate.ai@gmail.com</a>
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} valuate.ai. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}