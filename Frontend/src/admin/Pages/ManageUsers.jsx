import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "HR",
    status: "Active",
  });

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("Unexpected users data format:", data);
      }
    } catch (error) {
      console.error("Failed to load users", error);
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", formData);
      toast.success("User added");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "HR",
        status: "Active",
      });
      fetchUsers();
    } catch (error) {
      console.error("Add user error", error);
      toast.error("Failed to add user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">👤 Manage Users</h1>

      {/* Add User Form */}
      <form
        onSubmit={addUser}
        className="mb-8 p-6 bg-white border border-gray-300 rounded shadow-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="p-2 border border-gray-300 rounded w-full"
            required
          />

          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="HR">HR</option>
            <option value="Editor">Editor</option>
            <option value="Developer">Developer</option>
            <option value="Friend">Friend</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>

      {/* User List */}
      <div className="overflow-x-auto bg-white border border-gray-300 rounded shadow-sm">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Role</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border border-gray-300">{user.name}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">{user.role}</td>
                  <td className="p-3 border border-gray-300">{user.status}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
