import React, { useEffect, useState } from "react"; // React and hooks import kiye
import axios from "axios"; // Axios for API requests

function DashboardOrders() {
  // Orders ka state
  const [orders, setOrders] = useState([]);
  // Search field ka value
  const [searchTerm, setSearchTerm] = useState("");
  // Order status filter value
  const [statusFilter, setStatusFilter] = useState("");
  // Current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Orders per page
  const ordersPerPage = 5;

  // Component mount hone par orders fetch karo
  useEffect(() => {
    fetchOrders();
  }, []);

  // Backend se orders get karna
  const fetchOrders = () => {
    axios
      .get("http://localhost:7474/orders/allorders")
      .then((res) => setOrders(res.data)) // response ko state mein daal diya
      .catch((err) => console.log(err)); // agar error aaye toh console mein
  };

  // Order ka status update karna
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, orderStatus: newStatus } : order
    );
    setOrders(updatedOrders); // frontend pe update

    axios
      .put(`http://localhost:7474/orders/update/${id}`, {
        orderStatus: newStatus,
      }) // backend update
      .then((res) => console.log("Order status updated:", res.data))
      .catch((err) => console.log("Error updating status:", err));
  };

  // Payment status update karna
  const handlePaymentStatusChange = (id, newPaymentStatus) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, paymentStatus: newPaymentStatus } : order
    );
    setOrders(updatedOrders);

    axios
      .put(`http://localhost:7474/orders/update/${id}`, {
        paymentStatus: newPaymentStatus,
      }) // payment status backend pe update
      .then((res) => console.log("Payment status updated:", res.data))
      .catch((err) => console.log("Error updating payment status:", err));
  };

  // Order delete karna with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://localhost:7474/orders/delete/${id}`)
        .then(() => {
          // Order remove karna state se
          setOrders((prev) => prev.filter((order) => order._id !== id));
        })
        .catch((err) => console.error("Error deleting order:", err));
    }
  };

  // Search and filter functionality
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber?.includes(searchTerm) ||
      order._id?.includes(searchTerm) ||
      order.userId?.includes(searchTerm);

    const matchesStatus = statusFilter
      ? order.orderStatus === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination ke liye calculation
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Status ke color CSS classes
  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Processing") return "bg-blue-100 text-blue-800";
    if (status === "Shipped") return "bg-purple-100 text-purple-800";
    if (status === "Delivered") return "bg-green-100 text-green-800";
    if (status === "Cancelled") return "bg-red-100 text-red-800";
    if (status === "Received") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-700";
  };

  // Render part (JSX) starts here...
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Order Management</h1>
        <p className="text-gray-600 text-sm mt-1">
          Review, update, and manage customer orders
        </p>
      </div>

      {/* Search + Status Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, city, etc."
          className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="px-4 py-2 w-full md:w-1/4 border border-gray-300 rounded shadow-sm"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Count */}
      <div className="mb-3 text-sm text-gray-700 font-medium">
        Total Orders: {filteredOrders.length}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Shipping</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Ye table ke rows generate kar raha hai */}
            {currentOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3 break-all text-blue-600 font-medium">{order._id}</td>
                <td className="p-3 break-all text-gray-700">{order.userId}</td>
                <td className="p-3">
                  <div className="font-medium text-gray-800">{order.fullName}</div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                  <div className="text-xs text-gray-500">{order.phoneNumber}</div>
                </td>
                <td className="p-3 text-xs text-gray-700">
                  <div>{order.shippingAddress}</div>
                  <div>{order.city}</div>
                  <div>Postal: {order.postalCode}</div>
                </td>
                <td className="p-3 space-y-2">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-start gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-xs text-gray-500">Rs {item.price}</p>
                        {item.category && (
                          <p className="text-xs text-blue-600 font-medium">
                            Category: {item.category}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </td>
                <td className="pl-[1.75rem] font-bold text-green-600">
                  Rs {order.totalAmount}
                </td>
                <td className="p-3 text-sm">
                  <div>{order.paymentMethod}</div>
                  {order.paymentMethod === "COD" ? (
                    <>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          handlePaymentStatusChange(order._id, e.target.value)
                        }
                        className="text-xs border mt-1 px-2 py-1 rounded bg-gray-50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                      </select>
                      <div
                        className={`mt-1 text-xs font-medium inline-block px-2 py-1 rounded ${getStatusColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </div>
                    </>
                  ) : (
                    <div
                      className={`text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}
                    >
                      {order.paymentStatus}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="text-sm px-2 py-1 border rounded bg-gray-50 mb-1"
                  >
                    <option value="">-- Select Status --</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {order.orderStatus && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  )}
                </td>
                <td className="p-3 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardOrders;
