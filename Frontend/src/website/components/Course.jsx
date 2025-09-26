// src/website/pages/Course.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Course() {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const activeBooks = res.data.filter((book) => book.status === "Active");
        setBooks(activeBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, []);

  const handleBuy = (item) => {
    addToCart(item);
  };

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white py-16 px-4 mt-1">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Heading */}
        <div className="mt-28 text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Explore our wide range of books and{" "}
            <span className="text-pink-500">start your learning journey!</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Browse through categories, discover new authors, and find your next
            favorite book.
          </p>
        </div>

        {/* Books Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {books.map((item) => (
            <Cards key={item._id} item={item} onBuy={() => handleBuy(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course;

// ✅ Redesigned Cards Component
function Cards({ item, onBuy }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      <Link to={`/book/${item._id}`} className="relative group">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[250px] object-cover transform group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-lg shadow">
          ₹{item.price}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-grow text-center">
        <h2 className="text-lg font-semibold line-clamp-1 dark:text-white">
          {item.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {item.author}
        </p>

        <div className="mt-auto space-y-2">
          <button
            onClick={() => onBuy(item)}
            className="w-full bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>
          <Link
            to={`/checkout/${item._id}`}
            className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl hover:opacity-90 transition"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
