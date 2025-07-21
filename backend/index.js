// ✅ Imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

// ✅ Route Imports
import bookRouter from "./Router/bookRouter.js";
import userRouter from "./Router/userRouter.js";
import adminRoute from "./Router/AdminRoutes/adminRoutes.js";
import cartRoutes from "./Router/cartRoutes.js";
import addressRoutes from "./Router/addressRoutes.js";
import orderRoutes from "./Router/orderRoutes.js";

// ✅ Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.DB_URL || "mongodb://localhost:27017/bookstore";

// ✅ Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // ✅ Added this
  "http://localhost:3000",
  "https://bookstore-wj9e.onrender.com"
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ CORS blocked request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ JSON & Form Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Static Folder
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ MongoDB Connection
mongoose
  .connect(URI, {})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// ✅ Routes
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/api/admin", adminRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
