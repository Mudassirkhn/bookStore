import React from "react";

function About() {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-10 mt-20">
      {/* About Section Layout */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <img
            src="/about-banner.jpg"
            alt="About Banner"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 md:pl-12 space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold">
            About <span className="text-pink-500">Our BookStore</span>
          </h1>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
            Welcome to BookStore — your ultimate destination for discovering inspiring reads.
            From bestselling novels to academic gems, we aim to deliver a seamless, joyful,
            and enriching reading experience.
          </p>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">
            Whether you're a curious student, passionate reader, or casual explorer,
            BookStore is your trusted companion on the journey of knowledge and imagination.
          </p>
          
            
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mt-20 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-pink-500">500+</h2>
          <p className="text-sm">Books Available</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-pink-500">100+</h2>
          <p className="text-sm">Happy Customers</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-pink-500">80+</h2>
          <p className="text-sm">Authors Featured</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4">Why Choose BookStore?</h2>
        <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-300">
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
