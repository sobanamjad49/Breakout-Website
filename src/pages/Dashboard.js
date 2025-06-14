import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts"; // Charts banane ke liye

const Dashboard = () => {
  // Data ko store karne ke liye states
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // Component mount hone par data fetch karo
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Backend se data fetch karne wala function
  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get("http://localhost:7474/users/getusers");
      const productsRes = await axios.get("http://localhost:7474/products/getproduct");
      const ordersRes = await axios.get("http://localhost:7474/orders/allorders");

      const users = usersRes.data;
      const products = productsRes.data;
      const orders = ordersRes.data;

      // State update karna
      setUsersCount(users.length);
      setProductsCount(products.length);
      setOrdersCount(orders.length);

      // Revenue calculate karna
      const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      setTotalRevenue(total);

      // Pending orders count
      const pending = orders.filter((order) => order.orderStatus === "Pending").length;
      setPendingOrders(pending);

      // Har order status ka count nikalna (Pending, Delivered, etc.)
      const statusCount = {};
      orders.forEach((order) => {
        statusCount[order.orderStatus] = (statusCount[order.orderStatus] || 0) + 1;
      });

      // Bar chart ke liye data banana
      const chartData = Object.keys(statusCount).map((status) => ({
        name: status,
        count: statusCount[status],
      }));
      setOrderStatusData(chartData);

      // Recent 5 orders nikalna
      const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentOrders(sorted.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h2>

      {/* Metrics Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <MetricBox label="👤 Users" value={usersCount} color="text-indigo-600" />
        <MetricBox label="🛍️ Products" value={productsCount} color="text-indigo-600" />
        <MetricBox label="📦 Orders" value={ordersCount} color="text-indigo-600" />
        <MetricBox label="💰 Revenue" value={`Rs ${totalRevenue}`} color="text-green-600" />
        <MetricBox label="⏳ Pending" value={pendingOrders} color="text-yellow-500" />
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📈 Order Status Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={orderStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📝 Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Payment</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{order.fullName || "N/A"}</td>
                  <td className="py-2 px-4">{order.email || "N/A"}</td>
                  <td className="py-2 px-4">{order.phoneNumber || "N/A"}</td>
                  <td className="py-2 px-4">Rs {order.totalAmount}</td>
                  <td className="py-2 px-4">{order.orderStatus}</td>
                  <td className="py-2 px-4">{order.paymentStatus || "Unpaid"}</td>
                  <td className="py-2 px-4">{order.items?.length || 0}</td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Reusable Metric Box Component
const MetricBox = ({ label, value, color }) => (
  <div className="p-4 bg-white shadow rounded text-center">
    <div className="text-lg font-semibold">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

export default Dashboard;
