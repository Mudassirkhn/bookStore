// src/website/pages/BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../lib/api";
import { useCart } from "../context/CartContext";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Book not found or failed to fetch.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        {error}
        <div className="mt-4">
          <Link to="/course">
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 dark:text-white min-h-screen px-4 py-16 mt-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        {/* Left: Book Image */}
        <div className="flex justify-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-[320px] h-[480px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Book Details */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">{book.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            by <span className="font-medium">{book.author}</span>
          </p>

          <p className="text-2xl font-bold text-pink-600">₹{book.price}</p>

          {/* Extra Info */}
          <div className="flex flex-wrap gap-4">
            {book.category && (
              <span className="bg-pink-100 text-pink-600 dark:bg-pink-600/30 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium">
                {book.category}
              </span>
            )}
            {book.status && (
              <span className="bg-green-100 text-green-600 dark:bg-green-600/30 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {book.status}
              </span>
            )}
          </div>

          <p className="text-md leading-relaxed">{book.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-all shadow-md">
              Buy Now
            </button>
            <Link to="/course">
              <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md">
                Back to Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
