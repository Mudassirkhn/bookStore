import express from "express";
import { signup, login, updateProfile } from "../Controllers/userController.js";
import upload from "../Middleware/Web_middleware/upload.js"; // Multer middleware

const router = express.Router();

// ✅ User Registration
router.post("/signup", signup);

// ✅ User Login
router.post("/login", login);

// ✅ Update Profile (with optional image upload)
router.put("/profile", upload.single("profileImage"), updateProfile);

export default router;
