import express from "express";
import {
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../Controllers/bookController.js";

import Book from "../Models/bookModel.js"; // ⬅️ Import your Book model here

const router = express.Router();

// 📚 Get all books
router.get("/", getBook);

// 📖 Get a single book by ID ✅ NEW
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➕ Create a new book
router.post("/", createBook);

// ✏️ Update a book by ID
router.put("/:id", updateBook);

// ❌ Delete a book by ID
router.delete("/:id", deleteBook);

export default router;
