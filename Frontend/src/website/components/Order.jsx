import React, { useState, useEffect } from "react";
import { useCart } from "../../website/context/CartContext";
import { useAuth } from "../../website/context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Order() {
  const { cartItems, clearCart } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(true);

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  const gst = parseFloat((subtotal * 0.02).toFixed(2));
  const total = parseFloat((subtotal + gst).toFixed(2));

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ✅ Load saved address on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(`http://localhost:4001/api/address/${authUser._id}`);
        const data = await res.json();
        if (data) {
          setAddress(data);
          setShowAddressForm(false);
        }
      } catch (err) {
        console.error("Failed to load address", err);
      }
    };

    if (authUser?._id) fetchAddress();
  }, [authUser]);

  // ✅ Save address to MongoDB
  const saveAddressToDB = async () => {
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      alert("Please fill all address fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4001/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...address, userId: authUser._id }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Address saved.");
        setShowAddressForm(false);
      }
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const handleConfirmOrder = async () => {
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      alert("Please complete the address before placing an order.");
      return;
    }

    try {
      const orderData = {
        userId: authUser._id,
        items: cartItems,
        address,
        total,
        paymentMethod: "Cash on Delivery",
      };

      const res = await fetch("http://localhost:4001/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully!");
        // clearCart();
        navigate("/thank-you");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-900 dark:text-white flex flex-col lg:flex-row gap-6 mt-12">
      {/* Cart Summary */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">🛒 Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.bookId || index} className="flex items-center gap-4 border-b py-3 bg-white dark:bg-slate-800 rounded p-3 mb-2">
              <img src={item.image} alt={item.title} className="w-16 h-20 object-cover border rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.category}</p>
              </div>
              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))
        )}
      </div>

      {/* Order Sidebar */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        {/* Address Section */}
        <div className="mb-4">
          <p className="font-semibold">Delivery Address:</p>
          {!address.name ? (
            <div className="bg-yellow-100 text-yellow-800 text-sm p-2 rounded mt-2">
              No saved addresses. Please add one.{" "}
              <button className="text-blue-500 underline" onClick={() => setShowAddressForm(true)}>
                Add New Address
              </button>
            </div>
          ) : (
            <div className="bg-green-100 text-sm p-3 rounded mt-2">
              <p>{address.name}, {address.street}</p>
              <p>{address.city}, {address.state} - {address.zip}</p>
              <button className="text-blue-500 text-xs mt-2 underline" onClick={() => setShowAddressForm(true)}>
                Edit Address
              </button>
            </div>
          )}

          {/* Address Form */}
          {showAddressForm && (
            <div className="mt-3 space-y-2">
              <input type="text" name="name" placeholder="Full Name" value={address.name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700" />
              <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700" />
              <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700" />
              <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700" />
              <input type="text" name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} className="w-full p-2 border rounded dark:bg-slate-700" />
              <button className="text-sm text-green-600 hover:underline" onClick={saveAddressToDB}>
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* Payment Type */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Payment Method</label>
          <select className="w-full p-2 border rounded dark:bg-slate-700" disabled>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {/* Price Breakdown */}
        <div className="text-sm mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (2%):</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Order;
