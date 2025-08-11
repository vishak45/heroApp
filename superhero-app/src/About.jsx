import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-900/80 rounded-2xl p-8 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-6">
          <span className="text-red-500">About</span>
          <span className="text-white"> Us</span>
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Welcome to <span className="text-red-500 font-bold">Hero</span><span className="text-white">Dex</span>, your ultimate destination for exploring superheroes from all universes.
          We bring you a comprehensive and interactive database where you can search, discover, and learn everything about your favorite heroes.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our mission is to create a vibrant community of superhero enthusiasts by providing detailed information, engaging content, and an intuitive user experience.
          Whether you're a casual fan or a hardcore collector, <span className="text-red-500 font-bold">Hero</span><span className="text-white">Dex</span> has something for everyone.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-red-500">Powered By</h2>
        <p className="text-gray-300 leading-relaxed">
          This website is powered by the <a href="https://superheroapi.com/" target="_blank" rel="noreferrer" className="text-white underline hover:text-red-400">SuperHero API</a>,
          ensuring up-to-date and accurate superhero data from multiple publishers.
        </p>
      </div>
    </div>
  );
}
