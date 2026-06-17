import React, { useEffect } from "react";
import api from "../../lib/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Trash2 } from "lucide-react";

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = authUser?._id;
        const res = await api.get(`/api/cart/${userId}`);
        setCartItems(res.data?.items || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    if (authUser?._id) {
      fetchCart();
    }
  }, [authUser, setCartItems]);

  // ✅ Remove item
  const handleRemove = async (itemId) => {
    try {
      await api.delete(
        `/api/cart/remove/${authUser._id}/${itemId}`
      );
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      navigate("/order");
    }
  };

  return (
    <div className="p-6 min-h-screen dark:bg-slate-900 dark:text-white bg-gray-100 mt-5">
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-extrabold mb-8 text-pink-500 text-center drop-shadow">
          🛒 Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
            No books in cart. <span className="text-pink-500">Go shopping!</span>
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Product Details */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-5 rounded-2xl shadow-lg flex items-start gap-6 hover:shadow-xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[160px] h-[200px] object-cover rounded-xl border"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.category || "No description available."}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-pink-600">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="mt-4 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Price Summary */}
            <div className="lg:w-1/3 lg:sticky lg:top-24 self-start">
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-5">💰 Price Details</h3>
                <hr className="mb-5 border-gray-300 dark:border-gray-700" />

                <div className="flex justify-between mb-3 text-gray-700 dark:text-gray-300">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                <hr className="my-5 border-gray-300 dark:border-gray-700" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
