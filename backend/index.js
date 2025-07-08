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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.DB_URL || "mongodb://localhost:27017/bookstore";

// ✅ Improved CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000", // include if using Vite/CRA
  "https://bookstore-wj9e.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked request from:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Middleware
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
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/api/admin", adminRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
