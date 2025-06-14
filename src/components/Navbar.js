// Authentication context se user aur logout function le rahe hain
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // Auth context se user ka data aur logout function mil raha hai
  const { user, logout } = useAuth();

  return (
    // Header section (navbar)
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      {/* Right side: user info aur logout button */}
      <div className="flex items-center gap-4">
        {/* User ka email dikhana (agar user logged in hai) */}
        <span>👤 {user?.email}</span>

        {/* Logout button */}
        <button
          onClick={logout} // Jab button click ho to logout function chale
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
