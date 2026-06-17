import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { assetUrl } from "../../lib/api";
import { useCart } from "../context/CartContext";

function Course() {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await api.get("/book");
        const activeBooks = res.data.filter((book) => book.status === "Active");
        setBooks(activeBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-screen-2xl px-0 md:px-10 lg:px-20">
        <div className="mt-20 flex flex-col gap-4 border-b border-slate-200 pb-8 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
              Catalog
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-extrabold text-slate-950 dark:text-white md:text-5xl">
              Explore books for every shelf.
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Discover active books from your live catalog and add them straight to cart.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {books.map((item) => (
            <BookCard key={item._id} item={item} onBuy={() => addToCart(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BookCard({ item, onBuy }) {
  return (
    <article className="book-panel flex overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/book/${item._id}`} className="group flex w-full flex-col">
        <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={assetUrl(item.image)}
            alt={item.title}
            className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-600 shadow dark:bg-slate-950">
            Rs. {item.price}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h2 className="line-clamp-1 text-base font-bold text-slate-950 dark:text-white">
            {item.title}
          </h2>
          <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
            {item.author}
          </p>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                onBuy(item);
              }}
              className="book-button w-full"
            >
              Add to Cart
            </button>
            <span className="book-button-secondary w-full">View Details</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default Course;
