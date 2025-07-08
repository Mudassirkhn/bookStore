import express from "express";
import Address from "../Models/Address.js";

const router = express.Router();

// ✅ Get all addresses for a user
router.get("/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new address
router.post("/", async (req, res) => {
  try {
    const { userId, name, email, phone, street, city, state, zip } = req.body;

    const newAddress = new Address({
      userId,
      name,
      email,
      phone,
      street,
      city,
      state,
      zip,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update existing address
router.put("/:id", async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete address
router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
