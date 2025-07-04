import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-base-200 text-base-content dark:bg-slate-900 dark:text-white p-6 sm:p-10 rounded">
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
          <a href="/about" className="link link-hover">About us</a>
          <a href="/contact" className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        {/* Bottom copyright section */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Mudassir Khan</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
