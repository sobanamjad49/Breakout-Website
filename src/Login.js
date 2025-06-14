import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component start
function Login() {
  // Email aur password store karne ke liye state banai
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator
  const navigate = useNavigate(); // Redirect karne ke liye

  // Jab user form submit kare
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload hone se roken
    setLoading(true); // Button par loading show kare

    const data = { email, password }; // Form ka data

    try {
      // Backend ko request bhejna login ke liye
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON format bataya
        },
        body: JSON.stringify(data), // Data ko JSON banakar bhejna
      });

      const result = await response.json(); // Backend ka jawab (response)

      if (response.ok) {
        // Agar login successful ho

        // Token aur user ki info localStorage mein save karo
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Agar user data mile to aur info bhi save karo
        if (result.user) {
          localStorage.setItem("userId", result.user._id);
          localStorage.setItem(
            "userName",
            result.user.firstName + " " + result.user.lastName
          );
          localStorage.setItem("userEmail", result.user.email);
        }

        // Login hone ka signal app ke dusre components ko do
        window.dispatchEvent(new Event("userLogin"));

        // Home page par redirect karo
        navigate("/");
      } else {
        // Agar error aaye to alert dikhao
        alert("Login failed: " + (result.message || "Invalid credentials"));
      }
    } catch (error) {
      // Agar fetch mein error ho to
      console.error("Login error:", error);
      alert("Login error: Please try again later.");
    } finally {
      setLoading(false); // Loading khatam karo
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>

        {/* Form Start */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Email change hone par value update
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Password change hone par value update
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} // Jab tak loading true ho button disable rahe
            className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"} {/* Text change hoga loading ke hisaab se */}
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-600 hover:underline">
            Sign up here.
          </Link>
        </p>

        {/* Return to store link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-700 hover:underline">
            ← Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login; // Component ko export karna
