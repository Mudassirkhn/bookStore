// File: src/website/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

export default function Profile() {
  const [authUser, setAuthUser] = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";

  useEffect(() => {
    if (authUser) {
      setForm({
        name: authUser.name || authUser.fullname || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const { data } = await axios.put(`${BASE_URL}/user/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setAuthUser(data); // Update context
      alert("✅ Profile updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("❌ Update failed. Please check network or server logs.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-gray-100 min-h-screen mt-10">
      <div className="w-full md:w-1/4 bg-white rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">My Account</h2>
        <ul className="space-y-3">
          <li className="font-medium text-blue-600">Profile Overview</li>
          <li><a href="/my-orders">My Orders</a></li>
          <li><a href="/address">Manage Address</a></li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
              />
              <label className="block mb-2">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
              />
              <label className="block mb-2">Upload Profile Photo</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border p-2 rounded mb-4"
              />
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button className="ml-4 text-blue-600">Cancel</button>
            </div>
            <div>
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : authUser?.profileImage
                    ? `${BASE_URL}${authUser.profileImage}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
