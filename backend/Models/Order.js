import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      price: Number,
      image: String,
      category: String,
    },
  ],
  address: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  total: Number,
  paymentMethod: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
