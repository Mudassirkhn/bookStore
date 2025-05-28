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
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 min-h-screen bg-gray-100 pt-24 px-6 md:px-20">
      {/* Left - Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* Right - Contact Info */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Address</h2>
        <div className="mb-4 flex items-start gap-2">
          <FaMapMarkerAlt className="text-pink-500 mt-1" />
          <p>
            <strong>Address:</strong> Lucknow, Uttar Pradesh, India (226003)
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FaPhone className="text-pink-500" />
          <p>
            <strong>Phone:</strong> +91-8960362827
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <FaEnvelope className="text-pink-500" />
          <p>
            <strong>Email:</strong> mmkhan213@gmail.com
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-6">
          <a href="https://twitter.com/" className="text-blue-900 hover:text-pink-500" target="_blank">
            <FaTwitter size={24} />
          </a>
          <a href="https://facebook.com/" className="text-blue-700 hover:text-pink-500" target="_blank">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com/" className="text-red-700 hover:text-pink-500" target="_blank">
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mudassir-khan-0a91862b7/"
            className="text-blue-700 hover:text-pink-500"
            target="_blank"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
