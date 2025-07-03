import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast"; // ✅ Only toast, not Toaster

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      toast.success("Signup successful!");

      localStorage.setItem("authUser", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      toast.error("Signup failed: " + errorMessage);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-black dark:text-white px-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 outline-none"
              {...register("fullname", { required: "Name is required" })}
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
