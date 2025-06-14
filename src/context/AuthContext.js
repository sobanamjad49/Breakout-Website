// Context aur hooks import kar rahe hain
import { createContext, useContext, useState } from "react";

// Authentication context create kiya
const AuthContext = createContext();

// Provider component jise app ke top level par wrap karte hain
export const AuthProvider = ({ children }) => {
  // user state banayi aur initial value localStorage se li
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("adminUser"); // localStorage se data lo
    return stored ? JSON.parse(stored) : null; // agar mila to parse karo warna null
  });

  // Jab user login kare to data save karo state aur localStorage mein
  const login = (userData) => {
    setUser(userData); // React state update
    localStorage.setItem("adminUser", JSON.stringify(userData)); // localStorage mein save
  };

  // Jab user logout kare to state aur localStorage dono clear karo
  const logout = () => {
    setUser(null); // React state clear
    localStorage.removeItem("adminUser"); // admin user data hatao
    localStorage.removeItem("token");     // agar token bhi save kiya hua ho to hatao
  };

  // Provider jo value provide kar raha hai: user info, login, logout
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook jisse context ka use asaani se kiya ja sake
export const useAuth = () => useContext(AuthContext);
