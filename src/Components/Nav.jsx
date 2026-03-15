import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home', href: '#Home' },
    { id: 'services', label: 'Services', href: '#Service' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section - Left Side */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight">
                Local<span className="text-blue-600">Worker</span>
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Service Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <a
                  href={link.href}
                  onClick={() => setActiveLink(link.id)}
                  className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                    activeLink === link.id
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </a>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <a 
              href="#login" 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <User size={18} />
              <span>Login</span>
            </a>

            <button className="bg-blue-600 text-white mx-10  px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-2">
              <span>Sign Up</span>
            
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
             
            </button>
          </div>

          <button 
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <div key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.id);
                      setIsOpen(false);
                    }}
                    className={`block py-2 font-medium ${
                      activeLink === link.id
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </a>
                  
                  
                   
                
                </div>
              ))}
              
  
              <a 
                href="#login" 
                className="flex items-center space-x-2 py-2 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                <span>Login</span>
              </a>
              
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex  items-center justify-center space-x-2 mt-2">
                <span>Sign Up</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;