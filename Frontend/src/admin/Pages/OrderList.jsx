import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/orders");
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.warn("Unexpected orders data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const approveOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:4001/api/orders/approve/${orderId}`);
      toast.success("Order approved");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to approve");
      console.error(err);
    }
  };

  const markDelivered = async (orderId) => {
    try {
      await axios.put(`http://localhost:4001/api/orders/${orderId}/deliver`);
      toast.success("Marked as Delivered");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to mark as delivered");
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:4001/api/orders/${orderId}`);
        toast.success("Order deleted");
        fetchOrders();
      } catch (error) {
        toast.error("Delete failed");
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🧾 All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded">
          <thead>
            <tr className="text-left border-b bg-gray-100 dark:bg-gray-700">
              <th className="p-3">User</th>
              <th className="p-3">Books</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3 font-medium">
                    {order.userId?.name || "Unknown"}
                  </td>

                  {/* ✅ Only show book titles */}
                  <td className="p-3">
                    <ul className="list-disc pl-5 space-y-1">
                      {order.items?.map((item, idx) => (
                        <li key={idx}>
                          {item.bookId?.title || item.title || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-3">₹{order.total}</td>

                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Cancelled"
                          ? "text-gray-500"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 space-x-2">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => approveOrder(order._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}

                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => markDelivered(order._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Deliver
                      </button>
                    )}

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
