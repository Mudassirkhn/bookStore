import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a href="/about" className="link link-hover">About us</a>
          <a href="/contact" className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
         
        </nav>
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by  Mudassir khan </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
