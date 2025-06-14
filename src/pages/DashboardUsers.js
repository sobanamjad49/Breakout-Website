import { useEffect, useState } from "react";
import axios from "axios";

// 👥 Users dashboard component
const DashboardUsers = () => {
  const [users, setUsers] = useState([]);         // Saare users ki list
  const [loading, setLoading] = useState(true);   // Data loading indicator
  const [error, setError] = useState("");         // Error message

  // 📦 Component load hone par users fetch karo
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Loading on
        const token = localStorage.getItem("token"); // Token auth ke liye
        const res = await axios.get("http://localhost:7474/users/getusers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched users:", res.data);

        // API ke response mein agar .users ho to wo lo, warna direct res.data lo
        setUsers(res.data.users || res.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); // Loading off
      }
    };

    fetchUsers(); // Function call
  }, []);

  // ❌ User delete karne ka function
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7474/users/deleteusers/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // User list se hata do frontend par bhi
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // 🔄 Loading aur error handling
  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  // 🖥️ UI layout
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {/* Total users count */}
      <p className="mb-4 text-gray-700">
        Total Users: <span className="font-semibold">{users.length}</span>
      </p>

      {/* Agar koi user nahi mila to message */}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Full Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Saare users ko show karo */}
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.firstName || "—"}</td>
                <td className="py-2 px-4 border-b">{user.lastName || "—"}</td>
                <td className="py-2 px-4 border-b">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}` // Full name banana
                    : user.name || "N/A"}                 // Agar name field alag ho
                </td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role || "User"}</td>
                <td className="py-2 px-4 border-b">
                  {/* 🗑️ Delete button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardUsers;
