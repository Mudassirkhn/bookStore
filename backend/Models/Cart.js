import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      title: String,
      price: Number,
      image: String,
      category: String,
    },
  ],
}, { timestamps: true });

// 👇 Use ESM export instead of module.exports
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
