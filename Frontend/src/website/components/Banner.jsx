import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const activeBooks = res.data.filter(
          (book) => book.status === "Active" && book.type === "Free"
        );
        setFeaturedBooks(activeBooks.slice(0, 8)); // first 8
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-10 my-16">
      {/* Hero Banner Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1 mt-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              BookStore
            </span>
            <br />
            Your Gateway to Endless Knowledge 📖
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Discover, Learn, and Grow with every page turned. From fiction to
            self-help, academic to adventure, we’ve got something for everyone.
            Fast & free delivery on all orders 💖
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Subscribe with your email and get{" "}
            <span className="font-semibold text-pink-500">10% off</span> your
            first order!
          </p>

          {/* Subscription Input */}
          <div className="flex items-center gap-2 bg-white/30 dark:bg-slate-800/40 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-md max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
            />
            <button className="px-5 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all shadow-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Banner Image */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src="/Banner.jpg"
            alt="Banner"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Featured Books Section */}
      <h2 className="text-3xl font-bold text-center mt-20 mb-10 text-gray-900 dark:text-white">
        📚 Featured Free Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {featuredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-40 h-48 object-cover rounded-lg mx-auto mb-4 shadow-md"
            />
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
              {book.title}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400">
              {book.author}
            </p>
            <p className="text-center mt-2 font-bold text-pink-600">
              ₹{book.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
