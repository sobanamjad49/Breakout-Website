// Required imports
import { Link } from "lucide-react"; // Ye line galat hai, yahan Link React Router se aani chahiye thi agar use karna hota
import React, { useState } from "react";

// Functional component
function Signup() {
  // State to check if user signup successfully
  const [signedUp, setSignedUp] = useState(false);

  // First name store karne ke liye (for showing on success screen)
  const [firstName, setFirstName] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload se roknay ke liye

    // Form field values collect karna
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      // API request to register new user
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
        method: "POST", // POST method for creating user
        headers: {
          "Content-Type": "application/json", // Telling server we're sending JSON data
        },
        body: JSON.stringify(data), // Converting JS object to JSON string
      });

      if (response.ok) {
        // If signup is successful
        const result = await response.json(); // Parse the response JSON

        // Set user name and update signup state
        setFirstName(data.firstName);
        setSignedUp(true);

        // Save token and user info in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Save individual details if available
        if (result.user) {
          localStorage.setItem("userId", result.user._id);
          localStorage.setItem(
            "userName",
            result.user.firstName + " " + result.user.lastName
          );
          localStorage.setItem("userEmail", result.user.email);
        }
      } else {
        alert("Signup failed!"); // Show error if response not OK
      }
    } catch (error) {
      console.error(error);
      alert("Signup error!"); // Handle network or other errors
    }
  };

  // Agar signup ho chuka hai to success message dikhayen
  if (signedUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-700">
            Account Created Successfully! 🎉
          </h2>
          <p className="text-xl mb-6">
            Welcome, <span className="font-semibold">{firstName}</span>!
          </p>
          <p className="mb-8 text-gray-700">
            Your account has been created. Please login to continue.
          </p>
          <a href="/Login">
            <button className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
              Go To LoginPage
            </button>
          </a>
        </div>
      </div>
    );
  }

  // Default: Signup form show karein
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h2>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="First name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          {/* Already have an account link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in here.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// Exporting component to be used elsewhere
export default Signup;
