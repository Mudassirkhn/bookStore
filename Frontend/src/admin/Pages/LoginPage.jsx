import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../website/context/AuthProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4001/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("authUser", JSON.stringify(res.data.admin));
      setAuthUser(res.data.admin);

      navigate("/admin/dashboard");
      alert("Login successful!");
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        autoComplete="off" // 🔒 Prevent form autocomplete
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          name="admin-email"
          autoComplete="new-email" // 🛑 Prevent browser email suggestions
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          name="admin-password"
          autoComplete="new-password" // 🛑 Prevent password suggestion
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
