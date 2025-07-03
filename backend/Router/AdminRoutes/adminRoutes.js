import express from "express";
import { loginAdmin, changeAdminPassword } from "../../Controllers/AdminController/adminController.js";
import Admin from "../../Models/AdminModels/adminModel.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/change-password", changeAdminPassword);

router.post("/create", async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@example.com" });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
