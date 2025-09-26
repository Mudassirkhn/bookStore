// src/website/pages/Order.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [authUser] = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/api/orders/user/${authUser._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    if (authUser?._id) fetchOrders();
  }, [authUser]);

  const resolveImageSrc = (image) => {
    if (!image) return "/default-book.png";
    if (image.startsWith("data:image/")) return image;
    return `http://localhost:4001/uploads/${image}`;
  };

  const totalAllOrders = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const toggleAccordion = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Delivered":
        return `${base} bg-green-100 text-green-700`;
      case "Pending":
        return `${base} bg-red-100 text-red-700`;
      case "Processing":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Shipped":
        return `${base} bg-blue-100 text-blue-700`;
      case "Cancelled":
        return `${base} bg-gray-100 text-gray-500`;
      case "Approved":
        return `${base} bg-purple-100 text-purple-700`;
      default:
        return `${base} bg-gray-200 text-gray-700`;
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    return `${addr.name}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}`;
  };

  const handleCancel = async (orderId) => {
    try {
      const confirm = window.confirm("Are you sure you want to cancel this order?");
      if (!confirm) return;

      await axios.put(`http://localhost:4001/api/orders/cancel/${orderId}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
      );

      alert("Order cancelled successfully.");
    } catch (err) {
      alert("Failed to cancel order.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You have not placed any orders yet.
        </p>
      ) : (
        <>
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 mb-6 rounded-2xl shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
                <div className="text-sm">
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
                <div>
                  <span className={statusBadge(order.status)}>{order.status}</span>
                </div>
              </div>

              {/* Books Preview */}
              <div className="mt-4 flex gap-4 overflow-x-auto py-2">
                {order.items.map((item) => (
                  <div key={item._id} className="flex-shrink-0 text-center">
                    <img
                      src={resolveImageSrc(item.image)}
                      alt={item.title}
                      className="w-28 h-36 object-cover rounded border bg-white"
                    />
                    <p className="text-sm mt-1">{item.title}</p>
                    <p className="text-green-700 font-bold text-sm">₹{item.price}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                ))}
              </div>

              {/* Accordion Toggle */}
              <div className="mt-4 text-right">
                <button
                  onClick={() => toggleAccordion(order._id)}
                  className="text-blue-600 underline text-sm hover:text-blue-800 transition-colors"
                >
                  {expandedOrder === order._id ? "Hide Details" : "View Full Details"}
                </button>
              </div>

              {/* Accordion Body */}
              {expandedOrder === order._id && (
                <div className="mt-4 border-t pt-4 text-sm space-y-2 transition-all duration-300">
                  <p><strong>Shipping Address:</strong> {formatAddress(order.shippingAddress)}</p>
                  <p><strong>Billing Address:</strong> {formatAddress(order.billingAddress)}</p>
                  <p><strong>Total Amount:</strong> ₹{order.total}</p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto transition-transform duration-200 hover:scale-105">
                      Track Order
                    </button>
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={order.status === "Cancelled" || order.status === "Delivered"}
                      className={`px-4 py-2 rounded text-white w-full sm:w-auto ${
                        order.status === "Cancelled" || order.status === "Delivered"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 transition-transform duration-200 hover:scale-105"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Total of all orders */}
          <div className="text-right text-lg font-bold mt-10 border-t pt-4 text-gray-800 dark:text-white">
            🧾 Total Spent on All Orders: ₹{totalAllOrders.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
