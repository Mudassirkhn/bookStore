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
        setFeaturedBooks(activeBooks.slice(0, 8)); // Show first 8 books
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-10">
      {/* Banner Section */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-8 md:mt-14">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Welcome to bookStore{" "}
              <span className="text-pink-500">
                Your Gateway to Endless Knowledge.
              </span>
            </h1>
            <p className="text-sm md:text-xl">
              Discover, Learn, and Grow with Every Page Turned. Unleash your
              curiosity with our wide collection of books — from fiction to
              self-help, academic to adventure. Whether you're a student, a
              dreamer, or a lifelong learner, we've got something for everyone.
              Explore curated collections. Fast & free delivery on all orders 💖
            </p>
            <p className="text-sm md:text-xl">
              Subscribe with your email and get 10% off your first order!
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <button className="btn mt-6 btn-secondary">Get Started</button>
          </div>
        </div>
        <div className="order-1 w-full mt-10 md:w-1/2">
          <img
            src="/Banner.jpg"
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt="Banner"
          />
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-8 text-gray-800 dark:text-white">
        📚 Featured Sample Books
      </h2>

      {/* Featured Free Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {featuredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-slate-800 p-6 rounded shadow"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-[187px] h-[197px] object-cover rounded mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{book.title}</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
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
