import React, { useState, useContext } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showSignup, setShowSignup] = useState(false); 

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (user?.role === 'admin') return "/admin-dashboard";
    if (user?.role === 'worker') return "/worker";
    return "/user-dashboard";
  };
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "services", label: "Services", path: "/services" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

        <div className="flex justify-between items-center py-3 cursor-pointer">
          <div className="flex flex-col cursor-pointer">
            <span className="text-xl font-bold text-gray-900">
              Local <span className="text-blue-600">Worker</span>
            </span>
            <span className="text-xs text-gray-500 -mt-1">
              Service Platform
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => setActiveLink(link.id)}
                className={`font-medium transition-colors duration-200 ${
                  activeLink === link.id
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          <div className="hidden md:flex items-center space-x-4 cursor-pointer">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition ml-4"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <User size={18} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => {
                    setActiveLink(link.id);
                    setIsOpen(false);
                  }}
                  className="text-gray-700 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-700"
              >
                Login
              </Link>
              <div className="flex flex-col">
                <span className="font-semibold cursor-pointer">Sign Up</span>
                <Link
                  to="/userlogin"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1"
                >
                  User
                </Link>
                <Link
                  to="/Professional"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1"
                >
                  Professional
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;