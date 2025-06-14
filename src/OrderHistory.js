import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download } from "lucide-react";

// Yeh component order confirmation aur invoice dikhata hai
const OrderHistory = () => {
  const location = useLocation(); // Location se order data la raha hai
  const navigate = useNavigate(); // Page navigation ke liye
  const order = location.state?.order; // order object ko location se nikaala

  const [orderStatus, setOrderStatus] = useState("confirmed"); // Order ka current status

  // Jab bhi order aaye to usay localStorage mein save karo
  useEffect(() => {
    if (order) {
      const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      const newOrder = { ...order, id: Date.now() }; // Har order ka unique ID
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));
    }
  }, [order]);

  // Status ko time ke sath change karo: confirmed -> packed -> shipped
  useEffect(() => {
    if (!order) return;
    const statuses = ["confirmed", "packed", "shipped"];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < statuses.length) setOrderStatus(statuses[i]);
      else clearInterval(interval); // Jab last status ho jaye to band kar do
    }, 3000); // Har 3 second baad change hoga
    return () => clearInterval(interval); // Clean-up
  }, [order]);

  // Invoice ko print/download karne ka function
  const handlePrint = () => {
    const printContent = document.getElementById("invoice"); // Invoice ka HTML content
    const printWindow = window.open("", "", "width=800,height=600"); // Nayi window kholna
    printWindow.document.write("<html><head><title>Invoice</title>");
    printWindow.document.write(`
      <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 20px; color: #222; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        td, th { border: 1px solid #ccc; padding: 12px; text-align: left; }
        img { width: 60px; height: auto; object-fit: cover; border-radius: 6px; }
      </style>`);
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent.innerHTML); // HTML content inject
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print(); // Print command
    printWindow.close(); // Window band kar do
  };

  // Agar order nahi mila to user ko message do
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No order found.
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Order progress bar dikhane ke liye step component
  const ProgressStep = ({ step, label }) => {
    const active = step === orderStatus;
    const done = (step === "confirmed" && orderStatus !== "confirmed") ||
                 (step === "packed" && orderStatus === "shipped");

    return (
      <div className="flex items-center space-x-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-lg ${
            done ? "bg-green-600" : active ? "bg-indigo-600" : "bg-gray-300"
          }`}
        >
          {done ? "✓" : step[0].toUpperCase()}
        </div>
        <span className={`font-semibold ${active || done ? "text-gray-900" : "text-gray-400"}`}>
          {label}
        </span>
      </div>
    );
  };

  // Grand total calculate karna
  const grandTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 max-w-5xl mx-auto">
      <CheckCircle className="text-green-500 w-24 h-24 mb-8 mx-auto" />
      <h1 className="text-4xl font-bold text-center mb-3">Order Placed Successfully!</h1>
      <p className="text-center text-lg mb-8">
        Shukriya, <strong>{order.fullName || order.name}</strong>! Aapka order mil gaya hai.
      </p>

      {/* Order Status Steps */}
      <div className="flex justify-center space-x-12 bg-white p-6 rounded-lg shadow mb-10">
        <ProgressStep step="confirmed" label="Confirmed" />
        <ProgressStep step="packed" label="Packed" />
        <ProgressStep step="shipped" label="Shipped" />
      </div>

      {/* Invoice Area */}
      <div id="invoice" className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p><strong>Name:</strong> {order.fullName || order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phoneNumber}</p>
            <p><strong>Address:</strong> {order.shippingAddress}</p>
            <p><strong>City:</strong> {order.city}</p>
          </div>
          <div>
            <p><strong>Postal Code:</strong> {order.postalCode}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod || "N/A"}</p>
            <p><strong>Total Amount:</strong> Rs. {order.totalAmount || grandTotal}</p>
          </div>
        </div>

        {/* Order Items */}
        <h3 className="text-xl font-semibold mt-8 border-b pb-2">Items Ordered</h3>
        <table className="w-full mt-4 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td><img src={item.image} alt={item.name} className="w-14 h-14 rounded" /></td>
                <td>{item.name}</td>
                <td>{item.category || "—"}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-50">
              <td colSpan="5" className="text-right pr-4">Grand Total:</td>
              <td>Rs. {grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex space-x-6 mt-10">
        <button onClick={handlePrint} className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Print / Download Invoice
        </button>
        <button onClick={() => navigate("/")} className="bg-gray-800 text-white px-6 py-3 rounded-lg">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
