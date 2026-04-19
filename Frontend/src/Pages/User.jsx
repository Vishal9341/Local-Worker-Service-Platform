import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Professional = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    Password: "",
    profession: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      if (/[^0-9]/.test(value)) {
        alert("write proper number");
      }
      value = value.replace(/[^0-9]/g, '');
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("write proper number");
      setError("Please write a proper phone number (only numeric characters are allowed)");
      return;
    }

    setLoading(true);

    try {
      // Create payload matching the backend schema
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.Password, // Match the state property name
        phone: formData.phone,
        address: formData.address,
        role: "user" // Hardcoding role based on this form's purpose
      };

      const res = await fetch('https://local-worker-service-platform.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      alert("Details Submitted Successfully!");
      
      // Auto-login after signup
      login(data);
      navigate('/user-dashboard'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          User Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
 
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

             <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="Password"
              name="Password"
              placeholder="Enter your Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              pattern="[0-9]+"
              title="Please write a proper phone number (only numeric characters are allowed)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

        
    

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Professional;