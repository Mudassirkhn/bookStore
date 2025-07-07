import express from "express";
import Order from "../Models/Order.js"; // ✅ Make sure the filename matches exactly

const router = express.Router();

// ✅ 1. Place a new order
router.post("/place", async (req, res) => {
  try {
    const { userId, items, address, total, paymentMethod } = req.body;

    const newOrder = new Order({
      userId,
      items,
      address,
      total,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Order failed", error: error.message });
  }
});

// ✅ 2. Get all orders of a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch user orders", error: error.message });
  }
});

// ✅ 3. Cancel an order
router.put("/cancel/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Delivered")
      return res.status(400).json({ message: "Delivered orders cannot be cancelled" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

export default router;
