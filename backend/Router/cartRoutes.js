// backend/routes/cartRoutes.js
import express from "express";
import Cart from "../Models/Cart.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/add", async (req, res) => {
  const { userId, item } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items.push(item);
      await cart.save();
    } else {
      cart = new Cart({ userId, items: [item] });
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Remove item by bookId (POST)
router.post("/remove", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.bookId.toString() !== bookId
      );
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Remove item by MongoDB _id (DELETE)
router.delete("/remove/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await userCart.save();

    res.status(200).json({ success: true, message: "Item removed" });
  } catch (err) {
    console.error("Remove error:", err);
    res.status(500).json({
      success: false,
      message: "Error removing item",
      error: err.message,
    });
  }
});

export default router;
