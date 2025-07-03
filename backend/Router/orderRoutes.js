import express from "express";
import Order from "../Models/Order.js";

const router = express.Router();

router.post("/place", async (req, res) => {
  try {
    const { userId, items, address, total, paymentMethod } = req.body;

    // ✅ Save the order
    const newOrder = new Order({
      userId,
      items,
      address,
      total,
      paymentMethod,
    });

    await newOrder.save();

    // ✅ No cart clearing in MongoDB here

    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Order failed", error: error.message });
  }
});

export default router;



