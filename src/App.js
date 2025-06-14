import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,

} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./CartContext";

// Layout Wrappers
import SplashWrapper from "./SplashWrapper";

// Public Pages
import Homepage from "./Homepage";
import About from "./About";
import Contact from "./Contact";
import Terms from "./Terms";
import RefundPolicy from "./RefundPolicy";
import TrackYourOrder from "./TrackYourOrder";
import PrivacyPolicy from "./PrivacyPolicy";
import ExchangeAndReturn from "./ExchangeAndReturn";
import CancellationPolicy from "./CancellationPolicy";
import Men from "./Men";
import MenPolos from "./MenPolos";
import MenJeans from "./MenJeans";
import MenAccessories from "./MenAccessories";
import Women from "./Women";
import WomenDress from "./WomenDress";
import WomenJeans from "./WomenJeans";
import WomenAccessories from "./WomenAccessories";
import Boy from "./Boy";
import BoyPolos from "./BoysPolos";
import BoyShirts from "./BoysShirts";
import BoysAccessories from "./BoysAccessories";
import Girls from "./Girls";
import GirlsShirt from "./GirlsShirt";
import GirlsAccessories from "./GirlsAccessories";
import GirlsJeans from "./GirlsJeans";

import Login from "./Login";
import Signup from "./Signup";
import ViewCart from "./ViewCart";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import ProductList from "./ProductsList";
import ProductDetails from "./ProductDetails";

// Admin Pages
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/DashboardUsers";

import AdminLogin from "./pages/AdminLogin";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardOrders from "./pages/DashboardOrders";
import DashboardCarts from "./pages/DashboardCarts";

// Protected Routes
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/adminlogin" replace />;
  }
  return children;
};



// Separate Admin Layout
const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-4 overflow-y-auto">{children}</main>
    </div>
  </div>
);

// Separate Public Layout
const PublicRoutes = () => (
  <SplashWrapper>
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refundpolicy" element={<RefundPolicy />} />
      <Route path="/trackyourorder" element={<TrackYourOrder />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/exchangeandreturn" element={<ExchangeAndReturn />} />
      <Route path="/cancellationpolicy" element={<CancellationPolicy />} />
      <Route path="/men" element={<Men />} />
      <Route path="/menpolos" element={<MenPolos />} />
      <Route path="/menjeans" element={<MenJeans />} />
      <Route path="/menaccessories" element={<MenAccessories />} />
      <Route path="/women" element={<Women />} />
      <Route path="/womendress" element={<WomenDress />} />
      <Route path="/womenjeans" element={<WomenJeans />} />
      <Route path="/womenaccessories" element={<WomenAccessories />} />
      <Route path="/boy" element={<Boy />} />
      <Route path="/boypolos" element={<BoyPolos />} />
      <Route path="/boyshirts" element={<BoyShirts />} />
      <Route path="/boysaccessories" element={<BoysAccessories />} />
      <Route path="/girls" element={<Girls />} />
      <Route path="/girlsshirt" element={<GirlsShirt />} />
      <Route path="/girlsjeans" element={<GirlsJeans />} />
      <Route path="/girlsaccessories" element={<GirlsAccessories />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/viewcart" element={<ViewCart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productdetails/:productId" element={<ProductDetails />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
    </Routes>
  </SplashWrapper>
);

// App Component
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* All public routes wrapped in splash and header/footer */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Admin Routes (no splashwrapper here) */}
            <Route
              path="/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/DashboardUsers"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/DashboardProducts"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <DashboardProducts />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />
             <Route
              path="/DashboardCarts"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <DashboardCarts />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />
              <Route
              path="/DashboardOrders"
              element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <DashboardOrders />
                  </AdminLayout>
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
