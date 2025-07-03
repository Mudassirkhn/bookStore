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
import orderRoutes from "./Router/orderRoutes.js"; // ✅ Ensure orderRoutes.js has `export default router`

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.DB_URL || "mongodb://localhost:27017/bookstore"; // Fallback URI

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ MongoDB Connection
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err.message));

// ✅ API Routes
app.use("/book", bookRouter);               // Books (Course page)
app.use("/user", userRouter);               // Auth (Signup/Login)
app.use("/api/admin", adminRoute);          // Admin Panel
app.use("/api/cart", cartRoutes);           // Cart
app.use("/api/address", addressRoutes);     // Address
app.use("/api/orders", orderRoutes);        // ✅ Orders

// ✅ Root
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running...");
});




// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
