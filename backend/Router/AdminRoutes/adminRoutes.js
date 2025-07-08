import express from "express";
import {
  loginAdmin,
  changeAdminPassword,
} from "../../Controllers/AdminController/adminController.js";
import Admin from "../../Models/AdminModels/adminModel.js";

const router = express.Router();

// ✅ Admin Login
router.post("/login", loginAdmin);

// ✅ Change Password
router.post("/change-password", changeAdminPassword);

// ✅ Create Default Admin (one-time setup route)
router.post("/create", async (req, res) => {
  try {
    const defaultEmail = "admin@example.com";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    // Create new admin
    const newAdmin = new Admin({
      name: "Admin",
      email: defaultEmail,
      password: "admin123", // Optional: Hash before save if not handled in model
    });

    await newAdmin.save();
    res.status(201).json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

export default router;
