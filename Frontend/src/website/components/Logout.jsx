import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Remove correct key
      localStorage.removeItem("authUser");  // ✅ Correct key for website users
      localStorage.removeItem("token");     // ✅ Also remove token if stored

      // Clear auth state
      setAuthUser(null);

      toast.success("Logout Successfully");

      // Redirect user after logout
      navigate("/"); // or navigate("/") if you want to go to homepage
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
    >
      Logout
    </button>
  );
}

export default Logout;
