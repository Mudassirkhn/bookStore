import React from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../../lib/api";

function Cards({ item, onBuy }) {
  return (
    <article className="book-panel overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/book/${item._id || item.id}`} className="block">
        <img
          src={assetUrl(item.image)}
          alt={item.title || "Book"}
          className="h-64 w-full object-cover"
        />
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
            {item.category || item.type || "Book"}
          </p>
          <h2 className="mt-1 line-clamp-1 text-base font-bold text-slate-950 dark:text-white">
            {item.title || item.name}
          </h2>
          <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
            {item.author}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-rose-600">Rs. {item.price}</span>
          <button type="button" onClick={onBuy} className="book-button px-3 py-2">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default Cards;
