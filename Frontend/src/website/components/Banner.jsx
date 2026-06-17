import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { assetUrl } from "../../lib/api";

function Banner() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/book");
        const activeBooks = res.data.filter((book) => book.status === "Active");
        setFeaturedBooks(activeBooks.slice(0, 8));
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl px-4 pb-16 pt-28 sm:px-6 lg:px-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-7">
          <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
            New arrivals, best picks, fast ordering
          </span>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Find your next favorite book at BookStore.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              Browse curated reads, add books to cart, manage addresses, and place orders from one clean online bookstore.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/course" className="book-button">
              Explore Books
            </Link>
            <Link to="/about" className="book-button-secondary">
              About Store
            </Link>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
            {["Active catalog", "Easy checkout", "Order tracking"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-center text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src="/Banner.jpg"
            alt="Books arranged for online shopping"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-2xl shadow-slate-200 dark:shadow-black/40"
          />
          <div className="book-panel absolute -bottom-6 left-4 right-4 rounded-xl p-4 sm:left-auto sm:w-72">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              Fresh picks are ready
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Updated catalog cards with live backend data.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-24 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            Featured
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            Popular books
          </h2>
        </div>
        <Link
          to="/course"
          className="hidden text-sm font-semibold text-rose-600 hover:text-rose-700 sm:inline"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredBooks.map((book) => (
          <article
            key={book._id}
            className="book-panel overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={assetUrl(book.image)}
              alt={book.title}
              className="h-64 w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <h3 className="line-clamp-1 text-base font-bold text-slate-950 dark:text-white">
                {book.title}
              </h3>
              <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                {book.author}
              </p>
              <p className="font-bold text-rose-600">Rs. {book.price}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Banner;
