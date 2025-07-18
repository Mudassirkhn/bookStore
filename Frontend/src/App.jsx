import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./website/context/AuthProvider";

// ✅ Layouts
import WebsiteLayout from "./website/Layout/WebsiteLayout";

// ✅ Public website pages
import Home from "./website/Pages/Home";
import About from "./website/components/About";
import Contact from "./website/components/Contact";
import SignUp from "./website/components/Signup";
import Courses from "./website/components/Course";
import Cart from "./website/components/Cart";
import Order from "./website/components/Order";
import ThankYou from "./website/components/ThankYou";

// ✅ My Account pages
import Profile from "./website/User Account/Profile";
import MyOrders from "./website/User Account/MyOrders";
import ManageAddress from "./website/User Account/ManageAddress";

// ✅ Book detail page
import BookDetail from "./website/components/BookDetail";

// ✅ Admin layout and pages
import AdminLayout from "./admin/Pages/AdminLayout";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import Books from "./admin/Pages/ManageBooks";
import Users from "./admin/Pages/ManageUsers";
import OrderList from "./admin/Pages/OrderList";
import LoginPage from "./admin/Pages/LoginPage";
import ChangePassword from "./admin/Pages/ChangePassword";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
      <Routes>

        {/* ✅ Website with Navbar */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />

          {/* ✅ Auth Protected Routes */}
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/my-orders"
            element={authUser ? <MyOrders /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/address"
            element={authUser ? <ManageAddress /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/order"
            element={authUser ? <Order /> : <Navigate to="/signup" replace />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Route>

        {/* ✅ Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ✅ Admin Panel (protected layout) */}
        <Route
          path="/admin"
          element={authUser ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* ❌ Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
