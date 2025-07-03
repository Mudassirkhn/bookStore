import React, { useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const [authUser] = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch cart items from MongoDB on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = authUser?._id;
        const res = await axios.get(`http://localhost:4001/api/cart/${userId}`);
        setCartItems(res.data?.items || []);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    if (authUser?._id) {
      fetchCart();
    }
  }, [authUser, setCartItems]);

  // ✅ Remove item from cart in MongoDB and update UI
  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4001/api/cart/remove/${authUser._id}/${itemId}`);
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
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-pink-500 text-center">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-center">No books in cart.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Product Details */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-slate-800 p-4 rounded shadow flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[187px] h-[197px] object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.category || "No description available."}
                    </p>
                    <p className="mt-2 font-bold text-pink-600">₹{item.price}</p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Price Summary */}
            <div className="lg:w-1/3 bg-white dark:bg-slate-800 p-6 rounded shadow h-fit">
              <h3 className="text-xl font-bold mb-4">Price Details</h3>
              <hr className="mb-4" />
              <div className="flex justify-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
