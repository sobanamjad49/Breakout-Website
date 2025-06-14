import { createContext, useContext, useEffect, useState } from "react";

// 🔄 Cart context create kar rahe hain
const CartContext = createContext();

// 🛒 CartProvider component jo poori app ko cart access deta hai
export const CartProvider = ({ children }) => {
  // 🧺 Cart ka state: items aur totalAmount
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });

  // ⏳ Loading state for async operations
  const [loading, setLoading] = useState(true);

  // 🔄 Cart fetch karne ka function (backend se)
  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Agar userId/token na ho toh empty cart show karo
    if (!userId || !token) {
      setCart({ items: [], totalAmount: 0 });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Agar response theek aaye toh cart update karo
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to fetch cart");
        setCart({ items: [], totalAmount: 0 });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  // 📦 Component mount hone par cart fetch karo
  useEffect(() => {
    fetchCart();
  }, [localStorage.getItem("userId")]);

  // 🔁 Jab user login kare (custom event se), tab bhi cart fetch karo
  useEffect(() => {
    const handleLogin = () => fetchCart();
    window.addEventListener("userLogin", handleLogin);
    return () => window.removeEventListener("userLogin", handleLogin);
  }, []);

  // ➕ Cart mein item add karne ka function
  const addToCart = async (item) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId: item._id,
          quantity: item.quantity,
          selectedSize: item.size,
        }),
      });

      // Agar add success ho jaye toh cart dobara fetch karo
      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  // ❌ Cart se item delete karne ka function
  const removeFromCart = async (cartId, itemId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart/delete/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart");
    }
  };

  // 🔁 Cart item quantity update karne ka function
  const updateCartQuantity = async (productId, size, newQuantity, itemId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          productId,
          itemId,
          selectedSize: size,
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart");
    }
  };

  // 🧹 Poora cart clear karne ka function (logout ya order ke baad)
  const clearCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cart/clear/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCart({ items: [], totalAmount: 0 });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart");
    }
  };

  // 🌍 Context provide kar rahe hain poore app mein
  return (
    <CartContext.Provider
      value={{
        cart: cart.items,
        totalAmount: cart.totalAmount,
        loading,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 💡 Custom hook for easy access to cart context
export const useCart = () => useContext(CartContext);
