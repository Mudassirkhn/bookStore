import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
}, { timestamps: true });

export default mongoose.model("Address", addressSchema);
