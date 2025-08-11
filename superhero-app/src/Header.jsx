import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand (Links to Home) */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-red-500 transition"
        >
          <span className="text-red-500">Hero</span>Dex
        </Link>

        {/* Navigation for medium and larger screens */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-red-500 transition">
            About
          </Link>
        </nav>

        {/* Only About link for small screens */}
        <nav className="md:hidden font-medium">
          <Link to="/" className="hover:text-red-500 transition mr-4">
            Home
          </Link>
          <Link to="/about" className="hover:text-red-500 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
