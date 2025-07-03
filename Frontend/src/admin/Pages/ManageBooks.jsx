import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "Free",
    price: "",
    category: "",
    description: "",
    status: "Active",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4001/book");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = async () => {
    const { title, author, category, description, price } = form;
    if (!title || !author || !category || !description || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4001/book", form);
      setBooks([...books, res.data]);
      resetForm();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:4001/book/${editId}`, form);
      const updatedBook = res.data;
      setBooks(books.map((b) => (b._id === updatedBook._id ? updatedBook : b)));
      resetForm();
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:4001/book/${id}`);
        setBooks(books.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Error deleting book:", err);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      type: "Free",
      price: "",
      category: "",
      description: "",
      status: "Active",
      image: "",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Manage Books</h1>

      <div className="flex gap-6">
        {/* Left: Form */}
        <div className="w-1/3 border border-gray-300 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Book" : "Add New Book"}</h2>

          <div className="space-y-3">
            <input type="text" name="title" placeholder="Book Title" value={form.title} onChange={handleChange} className="border w-full p-2 rounded" />
            <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} className="border w-full p-2 rounded" />
            <select name="type" value={form.type} onChange={handleChange} className="border w-full p-2 rounded">
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border w-full p-2 rounded" />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border w-full p-2 rounded" />
            <select name="status" value={form.status} onChange={handleChange} className="border w-full p-2 rounded">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="border w-full p-2 rounded" />
            {form.image && <img src={form.image} alt="preview" className="h-32 object-contain border rounded" />}
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border w-full p-2 rounded" rows={3}></textarea>
            <div className="mt-2">
              {isEditing ? (
                <>
                  <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">Update</button>
                  <button onClick={() => { resetForm(); setIsEditing(false); setEditId(null); }} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </>
              ) : (
                <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Add Book</button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Table */}
        <div className="w-2/3 overflow-x-auto border border-gray-300 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Book List</h2>
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr><td colSpan="9" className="text-center p-4">No books found.</td></tr>
              ) : (
                books.map((book, index) => (
                  <tr key={book._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{book.image ? <img src={book.image} alt="book" className="h-12 w-auto" /> : "No image"}</td>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.author}</td>
                    <td className="border p-2">{book.type}</td>
                    <td className="border p-2">₹{book.price}</td>
                    <td className="border p-2">{book.category}</td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${book.status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="border p-2 text-center">
                      <div className="flex justify-center items-center space-x-3 text-lg">
                        <button onClick={() => handleEdit(book)} className="text-yellow-500 hover:text-yellow-600">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
