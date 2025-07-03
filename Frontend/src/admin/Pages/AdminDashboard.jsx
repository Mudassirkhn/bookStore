import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // Simulated stats - replace with real API calls later
  const [stats, setStats] = useState([
    { title: "Total Books", value: 120, color: "bg-blue-500" },
    { title: "Total Orders", value: 85, color: "bg-green-500" },
    { title: "Total Customers", value: 42, color: "bg-yellow-500" },
    { title: "Total Enquiries", value: 16, color: "bg-pink-500" },
  ]);

  const [orders, setOrders] = useState([
    { id: "ORD001", customer: "Mudassir", amount: "₹999", status: "Delivered" },
    { id: "ORD002", customer: "Khan", amount: "₹499", status: "Pending" },
    { id: "ORD003", customer: "Ali Khan", amount: "₹1,299", status: "Cancelled" },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 text-white ${stat.color}`}
          >
            <h2 className="text-xl font-semibold">{stat.title}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🧾 Recent Orders</h2>
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="p-2 text-black">Order ID</th>
                <th className="p-2 text-black">Customer</th>
                <th className="p-2 text-black">Amount</th>
                <th className="p-2 text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-2 text-black">{order.id}</td>
                  <td className="p-2 text-black">{order.customer}</td>
                  <td className="p-2 text-black">{order.amount}</td>
                  <td className={`p-2 font-semibold ${
                    order.status === "Delivered" ? "text-green-600" :
                    order.status === "Pending" ? "text-yellow-500" :
                    "text-red-500"
                  }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
