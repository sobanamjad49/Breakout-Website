// React aur required hooks import kiye ja rahe hain
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Apna custom cart context

function ViewCart() {
  // CartContext se cart data aur functions le rahe hain
  const { cart, totalAmount, loading, removeFromCart, updateCartQuantity } =
    useCart();

  const navigate = useNavigate();

  // useEffect: agar user login nahi hai, to login page pe redirect karo
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/login"); // Redirect if not authenticated
    }
  }, [navigate]);

  // Quantity ko update karne ka function
  const handleUpdateQty = (productId, size, newQty, _id) => {
    if (newQty >= 1) {
      updateCartQuantity(productId, size, newQty, _id);
    }
  };

  // Jab cart loading ho raha ho to spinner dikhaye
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Agar cart khali ho to empty message aur "Continue Shopping" button
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Your cart is empty.
        </h2>
        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Jab cart mein items ho to unhein show karo
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 flex flex-col h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h1>

      {/* Cart items list */}
      <div className="flex-grow overflow-y-auto space-y-5 pr-2">
        {cart.map((item) => (
          <div
            key={`${item.productId}-${item.selectedSize}`} // Unique key har item ke liye
            className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Product image */}
            <div className="w-28 h-28 overflow-hidden rounded-md border border-gray-300 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Product details */}
            <div className="flex-grow ml-6">
              <p className="font-semibold text-lg text-gray-900">{item.name}</p>
              {item.size && (
                <p className="text-gray-600 mt-1">
                  Size: <span className="font-medium">{item.size}</span>
                </p>
              )}
              <p className="text-gray-600 mt-1">
                Price: <span className="font-medium">PKR {item.price}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
            </div>

            {/* Quantity controls and remove button */}
            <div className="flex flex-col items-center space-y-2">
              {/* Increase quantity */}
              <button
                onClick={() =>
                  handleUpdateQty(
                    item.productId,
                    item.selectedSize,
                    item.quantity + 1,
                    item._id
                  )
                }
                className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                aria-label="Increase quantity"
              >
                +
              </button>

              {/* Decrease quantity */}
              <button
                onClick={() =>
                  handleUpdateQty(
                    item.productId,
                    item.selectedSize,
                    item.quantity - 1,
                    item._id
                  )
                }
                disabled={item.quantity === 1} // Disable agar quantity 1 ho
                className={`px-3 py-1 rounded-md ${
                  item.quantity === 1
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition`}
                aria-label="Decrease quantity"
              >
                -
              </button>

              {/* Remove item */}
              <button
                onClick={() => removeFromCart(item.cartId, item._id)}
                className="text-red-600 hover:text-red-800 text-sm mt-2"
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total amount and checkout button */}
      <div className="mt-6 border-t pt-4 text-right">
        <p className="text-xl font-semibold text-gray-900">
          Total: PKR {totalAmount.toLocaleString()}
        </p>
        <Link to="/Checkout">
          <button className="mt-4 px-7 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition font-semibold">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewCart;
