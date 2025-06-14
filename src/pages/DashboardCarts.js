import React, { useEffect, useState } from "react";
import axios from "axios";

// DashboardCarts component
function DashboardCarts() {
  // Carts data aur search filter ke liye state banayi
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");

  // Component load hone par carts fetch karo
  useEffect(() => {
    fetchCarts();
  }, []);

  // Saare carts ko backend se laane ka function
  const fetchCarts = async () => {
    try {
      const res = await axios.get("http://localhost:7474/cart/all");
      setCarts(res.data); // response data ko carts mein set kar do
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  // Cart delete karne ka function
  const deleteCart = async (cartId) => {
    if (!window.confirm("Are you sure you want to delete this entire cart?"))
      return; // agar confirm nahi kiya to kuch na karo

    try {
      await axios.delete(`http://localhost:7474/cart/delete/${cartId}`);
      // delete ke baad cart list update karo
      setCarts(carts.filter((cart) => cart._id !== cartId));
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  // Search input ke according filter kiya gaya data
  const filteredCarts = carts.filter((cart) => {
    const searchTerm = search.toLowerCase();
    const fullName = `${cart.userId?.firstName || ""} ${
      cart.userId?.lastName || ""
    }`;

    return (
      cart._id.toLowerCase().includes(searchTerm) ||
      cart.userId?._id?.toLowerCase().includes(searchTerm) ||
      fullName.toLowerCase().includes(searchTerm) ||
      cart.items.some(
        (item) =>
          item.productId?.name?.toLowerCase().includes(searchTerm) ||
          item.selectedSize?.toLowerCase().includes(searchTerm)
      )
    );
  });

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">
        All Carts ({filteredCarts.length})
      </h2>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by User Name, User ID, Cart ID, Product Name, or Size..."
        className="border px-3 py-2 rounded mb-4 w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table start */}
      <div className="overflow-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Cart ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCarts.length > 0 ? (
              filteredCarts.map((cart) => (
                <tr key={cart._id} className="hover:bg-gray-50 align-top">
                  {/* Cart ID */}
                  <td className="border p-2">{cart._id}</td>

                  {/* User info */}
                  <td className="border p-2">
                    <p className="font-medium">
                      {cart.userId?.firstName} {cart.userId?.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{cart.userId?._id}</p>
                    <p className="text-xs text-gray-600">
                      {cart.userId?.email}
                    </p>
                  </td>

                  {/* Total amount */}
                  <td className="border p-2">Rs. {cart.totalAmount}</td>

                  {/* Items inside cart */}
                  <td className="border p-2">
                    {cart.items.map((item) => (
                      <div
                        key={item._id}
                        className="mb-3 flex gap-2 items-center"
                      >
                        {/* Product image */}
                        <img
                          src={item.productId?.images?.[0]}
                          alt={item.productId?.name}
                          className="w-14 h-14 object-cover border rounded"
                        />
                        {/* Product details */}
                        <div>
                          <p className="text-sm font-medium">
                            {item.productId?.name}
                          </p>
                          <p className="text-xs">Size: {item.selectedSize}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                          <p className="text-xs">
                            Price: Rs. {item.productId?.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>

                  {/* Cart created date */}
                  <td className="border p-2 text-sm">
                    {new Date(cart.createdAt).toLocaleString()}
                  </td>

                  {/* Delete Button */}
                  <td className="border p-2 text-sm">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => deleteCart(cart._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Agar koi cart na ho to yeh message dikhao
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No matching carts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardCarts;
