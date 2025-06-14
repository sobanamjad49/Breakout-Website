import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Apna banaya hua Auth context

const AdminLogin = () => {
  // Email aur password store karne ke liye form state
  const [form, setForm] = useState({ email: "", password: "" });

  // login function AuthContext se mila hai
  const { login } = useAuth();

  // navigate ka use page redirect ke liye hota hai
  const navigate = useNavigate();

  // Form submit hone par ye function chalega
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload na ho

    try {
      // Backend par login request bhejna
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, form);

      // Response se user aur token nikaalna
      const { user, token } = res.data;

      // Sirf admin role wale ko aage jaane dena
      if (user.role !== "admin") {
        alert("❌ Access denied. Aap admin nahi hain.");
        return;
      }

      // Token localStorage mein save karna
      localStorage.setItem("token", token);

      // AuthContext mein user set karna (frontend state)
      login(user);

      // Dashboard page par redirect karna
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        "Login failed: " + (error.response?.data?.message || "Kuch ghalat ho gaya")
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">🔐 Admin Login</h2>

        {/* Email field */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
