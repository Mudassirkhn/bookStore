import React, { useEffect, useState } from "react";
import { useCart } from "../../website/context/CartContext";
import { useAuth } from "../../website/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { cartItems, clearCart } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [billingAddressId, setBillingAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const BASE_URL = "http://localhost:4001";

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price * (item.quantity || 1)), 0);
  const gst = parseFloat((subtotal * 0.02).toFixed(2));
  const total = parseFloat((subtotal + gst).toFixed(2));

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/address/${authUser._id}`);
        const addresses = res.data || [];
        setSavedAddresses(addresses);

        const defaultAddress = addresses.find((addr) => addr.default === true);
        if (defaultAddress) {
          setShippingAddressId(defaultAddress._id);
          setBillingAddressId(defaultAddress._id);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };

    if (authUser?._id) fetchAddresses();
  }, [authUser]);

  const extractAddressFields = (addr) => ({
    name: addr.name,
    street: addr.street,
    city: addr.city,
    state: addr.state,
    zip: addr.zip,
    phone: addr.phone,
    email: addr.email,
  });

  const handlePlaceOrder = async () => {
    if (!shippingAddressId || !billingAddressId) {
      alert("Please select both Shipping and Billing addresses.");
      return;
    }

    const shippingAddress = savedAddresses.find((a) => a._id === shippingAddressId);
    const billingAddress = savedAddresses.find((a) => a._id === billingAddressId);

    const formattedItems = cartItems.map((item) => ({
      bookId: item.bookId,
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
      category: item.category,
    }));

    try {
      const orderData = {
        userId: authUser._id,
        items: formattedItems,
        shippingAddress: extractAddressFields(shippingAddress),
        billingAddress: extractAddressFields(billingAddress),
        total,
        paymentMethod,
      };

      const res = await axios.post(`${BASE_URL}/api/orders/place`, orderData);
      if (res.data.success) {
        alert("✅ Order placed successfully");
        clearCart();
        navigate("/thank-you");
      } else {
        alert("❌ Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert("❌ Error placing order");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-900 dark:text-white mt-16">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 🛒 Cart Summary */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">🛒 Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.bookId}-${idx}`}
                className="bg-white dark:bg-slate-800 rounded p-4 mb-4 flex items-center gap-4"
              >
                <img src={item.image} alt={item.title} className="w-16 h-20 rounded" />
                <div className="flex-1">
                  <h4>{item.title}</h4>
                  <p className="text-sm">{item.category}</p>
                  <p className="text-sm">Qty: {item.quantity || 1}</p>
                </div>
                <strong>₹{(item.price * (item.quantity || 1)).toFixed(2)}</strong>
              </div>
            ))
          )}
        </div>

        {/* 📦 Order Panel */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Order Details</h3>

          {/* 📍 Address Selection */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Shipping Address</label>
              <select
                value={shippingAddressId}
                onChange={(e) => setShippingAddressId(e.target.value)}
                className="w-full p-2 border rounded dark:bg-slate-700"
              >
                <option value="">-- Select Shipping Address --</option>
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.name}, {addr.street}, {addr.city} {addr.default ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Billing Address</label>
              <select
                value={billingAddressId}
                onChange={(e) => setBillingAddressId(e.target.value)}
                className="w-full p-2 border rounded dark:bg-slate-700"
              >
                <option value="">-- Select Billing Address --</option>
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.name}, {addr.street}, {addr.city} {addr.default ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 💳 Payment Method */}
          <div className="mt-4">
            <label className="block font-semibold mb-1">Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded dark:bg-slate-700"
            >
              <option>Cash on Delivery</option>
              <option>Google Pay</option>
            </select>
          </div>

          {/* 🖼️ Google Pay QR Code */}
          {paymentMethod === "Google Pay" && (
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-green-500">Scan QR Code using Google Pay</p>
              <img
                src="/gpay-qr.png"
                alt="Google Pay QR"
                className="mx-auto mt-2 w-48 h-48 object-contain rounded border"
              />
            </div>
          )}

          {/* 💰 Price Breakdown */}
          <div className="mt-6 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst.toFixed(18)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(18)}</span>
            </div>
          </div>

          {/* 🛒 Place Order */}
          <button className="btn btn-success w-full mt-6" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
