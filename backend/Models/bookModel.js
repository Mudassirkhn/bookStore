import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  type: String,
  price: Number,
  category: String,
  description: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  image: String,
});


const Book = mongoose.model("Book",bookSchema);
export default Book;