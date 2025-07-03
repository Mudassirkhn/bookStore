import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [authUser] = useAuth();

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

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          You have not placed any orders yet.
        </p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-6 rounded-md shadow bg-white dark:bg-slate-800">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Total Amount:</strong> ₹{order.total}</p>
              <p>
                <strong>Address:</strong> {order.address.name}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zip}
              </p>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold mb-2">Items:</h4>
              <ul className="list-disc ml-5 text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.title} - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
