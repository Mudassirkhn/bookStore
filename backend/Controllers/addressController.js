import Address from "../Models/addressModel.js";

// 👉 Get all addresses by userId
export const getAddressesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const addresses = await Address.find({ userId }); // ✅ returns array
    res.json(addresses);
  } catch (error) {
    console.error("Get Addresses Error:", error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

// 👉 Create a new address
export const createAddress = async (req, res) => {
  try {
    const { name, street, city, state, zip, userId } = req.body;

    const newAddress = new Address({ name, street, city, state, zip, userId });
    await newAddress.save();

    res.status(201).json({ message: "Address created", address: newAddress });
  } catch (error) {
    console.error("Create Address Error:", error);
    res.status(500).json({ message: "Failed to save address" });
  }
};

// 👉 Update address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Address.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Address not found" });

    res.json({ message: "Address updated", address: updated });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

// 👉 Delete address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Address not found" });

    res.json({ message: "Address deleted" });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
};
