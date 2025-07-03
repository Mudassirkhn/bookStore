import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = form;

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    try {
      const res = await axios.post("/api/admin/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success(res.data.message || "Password changed successfully!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password</label>
          <input type="password" name="oldPassword" value={form.oldPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>New Password</label>
          <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
