import express from "express";
import Order from "../Models/Order.js";

const router = express.Router();

/**
 * ✅ Place a new order
 */
router.post("/place", async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      billingAddress,
      total,
      paymentMethod,
    } = req.body;

    if (
      !userId ||
      !items?.length ||
      !shippingAddress ||
      !billingAddress ||
      !total ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const newOrder = new Order({
      userId,
      items,
      shippingAddress,
      billingAddress,
      total,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.message,
    });
  }
});

/**
 * ✅ Get all orders (for admin)
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")          // Get user info
      .populate("items.bookId", "title")         // Get book titles
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch all orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * ✅ Get orders by user (My Orders)
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId })
      .populate("items.bookId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch user orders error:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

/**
 * ✅ Approve an order (Admin)
 */
router.put("/approve/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "Processing" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order approved", order });
  } catch (error) {
    console.error("❌ Approve order error:", error);
    res.status(500).json({ message: "Failed to approve order" });
  }
});

/**
 * ✅ Mark as Delivered (Admin)
 */
router.put("/:orderId/deliver", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "Delivered" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order marked as delivered", order });
  } catch (error) {
    console.error("❌ Deliver order error:", error);
    res.status(500).json({ message: "Failed to mark as delivered" });
  }
});

/**
 * ✅ Cancel an order (User)
 */
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    console.error("❌ Cancel order error:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

/**
 * ✅ Delete an order (Admin)
 */
router.delete("/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("❌ Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
