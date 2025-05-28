import React from "react";

function AboutSection() {
  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mt-17 text-pink-600">About Our BookStore</h1>
        <p className="text-lg mb-10 mt-8">
          Welcome to BookStore, your one-stop destination for discovering amazing books across genres. 
          Our mission is to ignite your love for reading by providing a seamless online experience.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-pink-500">10,000+</h2>
            <p className="text-sm">Books Available</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-pink-500">2,000+</h2>
            <p className="text-sm">Happy Customers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-pink-500">500+</h2>
            <p className="text-sm">Authors Featured</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Why Choose BookStore?</h2>
          <ul className="list-disc list-inside text-left max-w-2xl mx-auto">
            <li>Wide range of genres and collections</li>
            <li>User-friendly interface and fast checkout</li>
            <li>Regular offers and discounts</li>
            <li>Instant access to eBooks</li>
            <li>24/7 customer support</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div>
          <h3 className="text-xl font-medium mb-2">Ready to explore?</h3>
          <a href="/course">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition">
              Browse Books
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
