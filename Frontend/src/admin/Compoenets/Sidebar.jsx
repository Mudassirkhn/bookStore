// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   List,
//   ShoppingCart,
//   Users,
//   MessageSquare,
//   User,
//   LogOut,
// } from "lucide-react";
// import { useAuth } from "../../website/context/AuthProvider";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [authUser, setAuthUser] = useAuth(); // clear auth on logout

//   const isActive = (path) =>
//     pathname.startsWith(path)
//       ? "bg-blue-500 text-white"
//       : "text-gray-700 hover:bg-gray-100";

//   const handleLogout = () => {
//     localStorage.removeItem("authUser"); // clear localStorage
//     setAuthUser(null); // reset context
//     navigate("/admin/login"); // redirect to login
//   };

//   return (
//     <aside className="w-64 h-screen bg-white shadow border-r p-4">
//       <h2 className="text-2xl font-bold mb-8">📚 Admin</h2>
//       <nav className="space-y-2">
//         <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/dashboard")}`}>
//           <LayoutDashboard className="w-5 h-5" />
//           <span>Dashboard</span>
//         </Link>
//         <Link to="/admin/books" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/books")}`}>
//           <BookOpen className="w-5 h-5" />
//           <span>Books</span>
//         </Link>
//         <Link to="/admin/categories" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/categories")}`}>
//           <List className="w-5 h-5" />
//           <span>Categories</span>
//         </Link>
//         <Link to="/admin/orders" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/orders")}`}>
//           <ShoppingCart className="w-5 h-5" />
//           <span>Orders</span>
//         </Link>
//         <Link to="/admin/customers" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/customers")}`}>
//           <Users className="w-5 h-5" />
//           <span>Customers</span>
//         </Link>
//         <Link to="/admin/enquiries" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/enquiries")}`}>
//           <MessageSquare className="w-5 h-5" />
//           <span>Enquiries</span>
//         </Link>
//         <Link to="/admin/profile" className={`flex items-center gap-3 px-3 py-2 rounded ${isActive("/admin/profile")}`}>
//           <User className="w-5 h-5" />
//           <span>Profile</span>
//         </Link>

//         {/* ✅ Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-3 py-2 rounded text-red-600 hover:bg-red-100"
//         >
          
//            <span>nishan</span>
//         </button>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
