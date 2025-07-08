import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const ManageAddress = () => {
  const [authUser] = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [editingId, setEditingId] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4001";

  const fetchAddresses = async () => {
    if (!authUser?._id) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/address/${authUser._id}`);
      const addressList = Array.isArray(res.data)
        ? res.data
        : res.data && typeof res.data === "object"
        ? [res.data]
        : [];
      setAddresses(addressList);
    } catch (err) {
      console.error("❌ Error fetching addresses:", err);
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [authUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/api/address/${editingId}`, form);
        toast.success("✅ Address updated");
      } else {
        await axios.post(`${BASE_URL}/api/address`, {
          ...form,
          userId: authUser._id,
        });
        toast.success("✅ Address added");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      });
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      console.error("❌ Error saving address:", err);
      toast.error("Failed to save address");
    }
  };

  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/address/${id}`);
      toast.success("✅ Address deleted");
      fetchAddresses();
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="p-6 mt-10 min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">📍 Manage Address</h2>

      {/* Address Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input input-bordered" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input input-bordered" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input input-bordered" />
          <input name="street" value={form.street} onChange={handleChange} placeholder="Street Address" className="input input-bordered" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input input-bordered" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input input-bordered" />
          <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP Code" className="input input-bordered" />
        </div>
        <div className="mt-4 text-right">
          <button onClick={handleSubmit} className="btn btn-primary">
            {editingId ? "Update Address" : "Add Address"}
          </button>
        </div>
      </div>

      {/* Saved Addresses */}
      {addresses?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr._id} className="border p-4 rounded shadow bg-white dark:bg-slate-800">
              <p><strong>{addr.name}</strong></p>
              <p>{addr.email}</p>
              <p>{addr.phone}</p>
              <p>{addr.street}, {addr.city}</p>
              <p>{addr.state} - {addr.zip}</p>
              <div className="mt-2 flex gap-4">
                <button onClick={() => handleEdit(addr)} className="btn btn-sm btn-outline">Edit</button>
                <button onClick={() => handleDelete(addr._id)} className="btn btn-sm btn-error text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          No addresses saved yet.
        </p>
      )}
    </div>
  );
};

export default ManageAddress;
