import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 py-4 bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">Hero</span>Dex. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
