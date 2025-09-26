import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-12 min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white pt-28 px-6 md:px-20">
      {/* Left - Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Contact Us
        </h2>

        {/* Name */}
        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-700"
          />
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-700"
          />
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
            Email
          </label>
        </div>

        {/* Message */}
        <div className="relative mb-6">
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-slate-700"
          ></textarea>
          <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-300 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-500">
            Message
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition duration-200 shadow-md"
        >
          Send Message
        </button>
      </form>

      {/* Right - Contact Info */}
      <div className="w-full max-w-md bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-pink-500">Get in Touch</h2>

        <div className="mb-5 flex items-start gap-3">
          <FaMapMarkerAlt className="text-pink-500 text-xl mt-1" />
          <p>Lucknow, Uttar Pradesh, India (226003)</p>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <FaPhone className="text-pink-500 text-xl" />
          <p>+91-8960362827</p>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <FaEnvelope className="text-pink-500 text-xl" />
          <p>mmkhan213@gmail.com</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-6">
          {[
            { icon: <FaTwitter />, link: "https://twitter.com/" },
            { icon: <FaFacebook />, link: "https://facebook.com/" },
            { icon: <FaInstagram />, link: "https://instagram.com/" },
            {
              icon: <FaLinkedin />,
              link: "https://www.linkedin.com/in/mudassir-khan-0a91862b7/",
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-md"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
