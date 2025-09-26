import React from "react";
import { BookOpen, Users, PenTool } from "lucide-react";

function About() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-6 my-16 mt-24">
      {/* About Section Layout */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/about-banner.jpg"
            alt="About Banner"
            className="w-full h-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            About <span className="text-pink-500">Our BookStore</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Welcome to <span className="font-semibold">BookStore</span> — your ultimate
            destination for discovering inspiring reads. From bestselling novels
            to academic gems, we aim to deliver a seamless, joyful, and enriching
            reading experience.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you’re a curious student, passionate reader, or casual
            explorer, BookStore is your trusted companion on the journey of
            knowledge and imagination.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mt-20 mb-16">
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <BookOpen className="w-10 h-10 mx-auto text-pink-500" />
          <h2 className="text-3xl font-bold text-pink-500 mt-2">500+</h2>
          <p className="text-sm mt-1">Books Available</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <Users className="w-10 h-10 mx-auto text-pink-500" />
          <h2 className="text-3xl font-bold text-pink-500 mt-2">100+</h2>
          <p className="text-sm mt-1">Happy Customers</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <PenTool className="w-10 h-10 mx-auto text-pink-500" />
          <h2 className="text-3xl font-bold text-pink-500 mt-2">80+</h2>
          <p className="text-sm mt-1">Authors Featured</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold mb-6">Why Choose BookStore?</h2>
        <ul className="list-disc list-inside text-left text-lg text-gray-700 dark:text-gray-300 space-y-2">
          <li>Wide range of genres and curated collections</li>
          <li>Simple and secure checkout process</li>
          <li>Exciting discounts and seasonal offers</li>
          <li>Instant access to eBooks and free samples</li>
          <li>Dedicated 24/7 customer support team</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
