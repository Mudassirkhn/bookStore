import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders"); // Adjust API path if needed
      // Check if data is an array or object containing array
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]); // fallback empty array
        // toast.error("Unexpected data format received");
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

  // Mark an order as delivered
  const markDelivered = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}/deliver`);
      toast.success("Order marked as delivered");
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order", error);
      toast.error("Failed to update");
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/orders/${orderId}`);
        toast.success("Order deleted");
        fetchOrders();
      } catch (error) {
        console.error("Failed to delete order", error);
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🧾 Order List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.user?.name || "Unknown"}</td>
                  <td className="p-3">₹{order.total}</td>
                  <td className="p-3">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    {!order.isDelivered && (
                      <button
                        onClick={() => markDelivered(order._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Mark Delivered
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
                <td colSpan="5" className="text-center p-5">
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
