import express from "express";
import Address from "../Models/Address.js";

const router = express.Router();

// Get address for a user
router.get("/:userId", async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.params.userId });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update address
router.post("/", async (req, res) => {
  try {
    const { userId, name, street, city, state, zip } = req.body;
    const updated = await Address.findOneAndUpdate(
      { userId },
      { name, street, city, state, zip },
      { upsert: true, new: true }
    );
    res.json({ success: true, address: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
