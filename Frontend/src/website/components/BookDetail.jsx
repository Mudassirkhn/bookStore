// src/website/pages/BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
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
        const res = await axios.get(`http://localhost:4001/book/${id}`);
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
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen px-4 py-10 mt-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* ✅ Fixed image size to 187x197 */}
        <img
          src={book.image}
          alt={book.title}
          className="w-[300px] h-[500px] object-cover rounded mx-auto"
        />
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 my-2">by {book.author}</p>
          <p className="text-xl font-semibold text-pink-600">₹{book.price}</p>
          <p className="mt-4">{book.description}</p>
          <div className="mt-6 flex gap-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>
            <Link to="/course">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                Back to Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
