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
        const activeBooks = res.data.filter(book => book.status === "Active");
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
        <div className="mt-28 text-center">
          <h1 className="text-2xl md:text-3xl">
            Explore our wide range of course books and start your learning journey today!{" "}
            <span className="text-pink-500">Here!</span>
          </h1>
          
          
          
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((item) => (
            <Cards key={item._id} item={item} onBuy={() => handleBuy(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Course;

// ✅ Updated Cards component with 187x197 image size
function Cards({ item, onBuy }) {
  return (
    <div className="border p-4 rounded-md shadow hover:shadow-lg transition bg-white dark:bg-slate-800 text-center">
      <Link to={`/book/${item._id}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-[187px] h-[197px] object-cover rounded mx-auto"
        />
        <h2 className="mt-2 text-lg font-semibold dark:text-white">{item.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.author}</p>
        <p className="text-pink-500 font-bold">₹{item.price}</p>
      </Link>
      <button
        onClick={() => onBuy(item)}
        className="mt-2 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
