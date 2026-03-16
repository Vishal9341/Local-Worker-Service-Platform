import React, { useState } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Navigation links with routing path
  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "services", label: "Services", path: "/services" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              Local <span className="text-blue-600">Worker</span>
            </span>

            <span className="text-xs text-gray-500 -mt-1">
              Service Platform
            </span>
          </div>

          {/* Desktop Links */}
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

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">

            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <User size={18} />
              <span>Login</span>
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>

          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Menu */}
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

              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;