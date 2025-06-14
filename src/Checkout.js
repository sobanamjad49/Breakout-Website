import React, { useState } from "react";
import { useCart } from "./CartContext"; // CartContext se cart data lene ke liye hook
import axios from "axios"; // API calls ke liye
import { useNavigate } from "react-router-dom"; // Page navigation ke liye

function Checkout() {
  // Cart data (items) ko context se le rahe hain
  const { cart } = useCart();

  // React Router ka hook, jisse hum order place hone ke baad dusre page pe ja saken
  const navigate = useNavigate();

  // Payment method state, initially blank
  const [paymentMethod, setPaymentMethod] = useState("");

  // Form state jisme user ki details hongi
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    shippingAddress: "",
    city: "",
    postalCode: "",
  });

  // Loading state, jab order place ho raha ho tab button disable karne ke liye
  const [loading, setLoading] = useState(false);

  // Message state to show success or error messages
  const [message, setMessage] = useState("");

  // Cart items ka subtotal calculate karna (price * quantity ka sum)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Example user ID (in real app, ye login se milega)
  const userId = "6650c1e984d456fcb0a21b33";

  // Form input fields handle karne ke liye generic function
  const handleChange = (e) => {
    // Spread existing form, aur sirf changed field ko update karo
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Jab user checkout button dabaye to ye function chalega
  const handleCheckout = async () => {
    // Agar payment method select nahi hua to alert karo
    if (!paymentMethod) return alert("Please select a payment method.");

    // Order data prepare karna jo backend ko bhejna hai
    const orderData = {
      userId, // current user ID
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      // Cart ke har item ko ek order item me convert karna
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        selectedSize: item.size,
        name: item.name,
        image: item.image,
        price: item.price,
        description: item.description || "",
        category: item.category || "Uncategorized",
      })),
      totalAmount: subtotal,
      shippingAddress: form.shippingAddress,
      city: form.city,
      postalCode: form.postalCode,
      paymentMethod,
    };

    try {
      setLoading(true); // Loading start
      // Backend API ko order data bhejna (replace URL apne backend ke hisaab se)
      const res = await axios.post("http://localhost:7474/orders/New", orderData);

      setMessage("Order placed successfully!"); // Success message show karo
      console.log(res.data);

      // Order place hone ke baad OrderHistory page pe redirect karo aur order data pass karo
      navigate("/OrderHistory", { state: { order: orderData } });
    } catch (err) {
      console.error(err);
      setMessage("Failed to place the order. Try again."); // Error message show karo
    } finally {
      setLoading(false); // Loading end
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg my-12">
      {/* Logo Section */}
      <div className="flex justify-center mb-10">
        <img
          src="https://miro.medium.com/v2/resize:fit:1200/0*J6xdKbSxTHqU_xPp.png"
          alt="Breakout Logo"
          className="h-24 w-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Main Grid: Left = Form, Right = Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Side: User Information & Payment Form */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900 border-b pb-3 mb-6">
            Checkout
          </h2>

          {/* Form Inputs: Loop through fields to render inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["fullName", "email", "phoneNumber", "shippingAddress", "city", "postalCode"].map((field) => (
              <input
                key={field}
                name={field} // input ka name = state key
                value={form[field]} // form state ka relevant value
                onChange={handleChange} // onChange event handler
                placeholder={field.replace(/([A-Z])/g, " $1")} // Label placeholder me camelCase ko readable text me convert
                type={field === "email" ? "email" : "text"} // Email field type special
                className="border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
            <div className="flex flex-col gap-3">
              {/* Cash On Delivery option */}
              <label
                className={`cursor-pointer flex items-center gap-3 p-4 border rounded-lg transition-shadow ${
                  paymentMethod === "COD"
                    ? "border-indigo-600 shadow-md bg-indigo-50"
                    : "border-gray-300 hover:shadow-lg"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="text-gray-800 font-medium">
                  Cash on Delivery (COD)
                </span>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              disabled={loading} // disable jab loading true ho
              onClick={handleCheckout}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold py-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Complete Purchase"}
            </button>

            {/* Success or Error message */}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Footer Links */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-indigo-700 underline">
              <a href="/RefundPolicy" className="hover:text-indigo-900">Refund Policy</a>
              <a href="/PrivacyPolicy" className="hover:text-indigo-900">Privacy Policy</a>
              <a href="/Terms" className="hover:text-indigo-900">Terms & Conditions</a>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md sticky top-24 max-h-[80vh] overflow-y-auto">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-3">
            Order Summary
          </h2>

          {/* Agar cart empty hai to message dikhayein */}
          {cart.length === 0 ? (
            <p className="text-gray-500 italic">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto text-sm">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-indigo-100 text-gray-800 font-semibold">
                    <th className="px-3 py-2 border">Image</th>
                    <th className="px-3 py-2 border">Name</th>
                    <th className="px-3 py-2 border">Size</th>
                    <th className="px-3 py-2 border">Qty</th>
                    <th className="px-3 py-2 border">Price</th>
                    <th className="px-3 py-2 border">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Cart items ko rows me map karo */}
                  {cart.map((item) => (
                    <tr key={item._id + item.size} className="text-center">
                      <td className="border px-2 py-1">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                      </td>
                      <td className="border px-3 py-2">{item.name}</td>
                      <td className="border px-3 py-2">{item.size || "N/A"}</td>
                      <td className="border px-3 py-2">{item.quantity}</td>
                      <td className="border px-3 py-2">Rs {item.price * item.quantity}</td>
                      <td className="border px-3 py-2">{item.category || "Uncategorized"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pricing summary below the table */}
          <div className="border-t mt-6 pt-6 space-y-3 text-gray-800 text-sm">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>Rs {subtotal}</span>
            </div>
          </div>

          {/* Small note about taxes */}
          <p className="text-xs text-gray-400 mt-4 italic">
            Prices include all applicable taxes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
