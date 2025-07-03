// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [authUser] = useAuth();

  // ✅ Fetch cart from MongoDB
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (authUser?._id) {
          const res = await axios.get(`http://localhost:4001/api/cart/${authUser._id}`);
          setCartItems(res.data?.items || []);
        }
      } catch (error) {
        console.error("❌ Failed to fetch cart:", error.message);
      }
    };

    fetchCart();
  }, [authUser]);

  // ✅ Add item to cart
  const addToCart = async (book) => {
    const item = {
      bookId: book._id,
      title: book.title,
      price: book.price,
      image: book.image,
      category: book.category,
    };

    try {
      setCartItems((prev) => [...prev, item]); // Optimistic UI
      await axios.post("http://localhost:4001/api/cart/add", {
        userId: authUser._id,
        item,
      });
    } catch (error) {
      console.error("❌ Error adding to cart:", error.message);
    }
  };

  // ✅ Remove item from MongoDB and local state
  const removeFromCart = async (bookId) => {
    try {
      const userId = authUser._id;

      await axios.delete(`http://localhost:4001/api/cart/remove/${userId}/${bookId}`);

      setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));
    } catch (error) {
      console.error("❌ Error removing item from cart:", error.message);
    }
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
