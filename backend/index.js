import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import bookRouter from "./Router/bookRouter.js";
import userRouter from "./Router/userRouter.js";
import adminRoute from "./Router/AdminRoutes/adminRoutes.js";
import cartRoutes from "./Router/cartRoutes.js";
import addressRoutes from "./Router/addressRoutes.js";
import orderRoutes from "./Router/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const URI = process.env.DB_URL || "mongodb://localhost:27017/bookstore";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://bookstore-wj9e.onrender.com",
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((url) => url.trim()).filter(Boolean)
    : []),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      console.warn("CORS blocked request from:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err.message));

app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/api/admin", adminRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Bookstore API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "bookstore-api" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
