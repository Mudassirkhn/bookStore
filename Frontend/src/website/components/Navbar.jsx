import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartContext";
import Login from "./Login";
import Logout from "./Logout";

function Navbar() {
  const [authUser] = useAuth();
  const { cartItems } = useCart();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    document.body.classList.toggle("dark", theme === "dark");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/course">Course</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About</Link></li>
      <li>
        <Link to="/cart" className="relative">
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs px-2">
              {cartItems.length}
            </span>
          )}
        </Link>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto px-4 md:px-20 fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        sticky
          ? "shadow-md bg-base-200 dark:bg-slate-700"
          : "bg-base-100 dark:bg-slate-800"
      }`}
    >
      <div className="navbar py-2">
        {/* Left - Logo & Hamburger */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-slate-700 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold ml-2">bookStore</Link>
        </div>

        {/* Center - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right - Search, Theme, Account */}
        <div className="navbar-end space-x-3 items-center">
          {/* Search */}
          <div className="hidden md:block">
            <label className="px-3 py-2 border rounded-md flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          {/* Theme Toggle */}
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              checked={theme === "dark"}
            />
            {theme === "dark" ? (
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.95 2.05a1 1 0 010 1.414L14.414 6a1 1 0 01-1.414-1.414l.535-.535a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-2.05 4.95a1 1 0 00-1.414 0l-.535.535a1 1 0 101.414 1.414l.535-.535a1 1 0 000-1.414zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.95-2.05a1 1 0 010 1.414l-.535.535a1 1 0 11-1.414-1.414l.535-.535a1 1 0 011.414 0zM3 10a1 1 0 011-1H5a1 1 0 110 2H4a1 1 0 01-1-1zm2.05-4.95a1 1 0 00-1.414 0l-.535.535A1 1 0 104.05 7.05l.535-.535a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>

          {/* Auth Area */}
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <FaUserCircle className="text-2xl" />
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-slate-800 dark:text-white rounded-box w-52"
              >
                <li><Link to="/profile">🧑 My Profile</Link></li>
                <li><Link to="/my-orders">📦 My Orders</Link></li>
                <li><Link to="/address">📍 Manage Address</Link></li>
                <li><Logout /></li>
              </ul>
            </div>
          ) : (
            <div>
              <a
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </a>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
