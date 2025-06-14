import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  // logout function context se le rahe hain
  const { logout } = useAuth();

  return (
    // Sidebar ka main container
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      
      {/* Sidebar ka title */}
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation links */}
      <nav className="flex-grow p-4 space-y-2">
        {/* Dashboard link */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        {/* Users page link */}
        <NavLink
          to="/DashboardUsers"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Users
        </NavLink>

        {/* Products page link */}
        <NavLink
          to="/DashboardProducts"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Products
        </NavLink>

        {/* Cart page link */}
        <NavLink
          to="/DashboardCarts"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Cart
        </NavLink>

        {/* Orders page link */}
        <NavLink
          to="/DashboardOrders"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Order
        </NavLink>
      </nav>

      {/* Logout button */}
      <button
        onClick={logout} // Jab click ho, logout function chale
        className="m-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
