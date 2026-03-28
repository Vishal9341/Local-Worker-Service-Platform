import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, or if the role isn't 'user', redirect them
    if (!loading && (!user || user.role !== 'user')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const [activeTab, setActiveTab] = useState('Find Workers');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    address: user?.address || "Local Area",
    phone: user?.phone || "+1234567890"
  });

  if (loading || !user) return <div className="min-h-screen pt-[72px] bg-slate-50 flex items-center justify-center">Loading...</div>;

  const activeBookings = [
    { id: 1, service: 'Plumbing Repair', worker: 'Alice Smith', date: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
    { id: 2, service: 'Electrical Wiring', worker: 'Pending', date: 'Next Tuesday', status: 'Searching' }
  ];

  const categories = ['Plumbers', 'Electricians', 'Cleaners', 'Carpenters', 'Painters', 'HVAC'];
  const filteredCategories = categories.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-[72px] bg-slate-50 text-slate-800 flex font-sans">
      <aside className="w-64 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">U</div>
          <span className="font-black text-xl tracking-tight text-slate-900">UserPanel</span>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {['Find Workers', 'My Bookings', 'Messages', 'Profile', 'Logout'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    if (tab === 'Logout') {
                      logout();
                      navigate('/');
                    } else {
                      setActiveTab(tab);
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-slate-900">
            Welcome, <span className="text-indigo-600">{user?.name ? user.name.split(' ')[0] : 'User'}</span>
          </h1>
          <p className="text-slate-500 font-medium">Find the best local professionals for your needs.</p>
        </header>

        {activeTab === 'Find Workers' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-4">What service do you need today?</h2>
                 <div className="flex gap-2 max-w-xl">
                   <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g., Plumber, Cleaners..." className="flex-1 px-5 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-300" />
                   <button className="px-8 py-4 bg-slate-900 rounded-xl font-bold hover:bg-slate-800 transition-colors">Search</button>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-slate-800">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {filteredCategories.length > 0 ? filteredCategories.map(cat => (
                <div key={cat} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md hover:border-indigo-100 cursor-pointer transition-all">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 mx-auto rounded-full flex items-center justify-center mb-3 font-bold text-xl">
                    {cat[0]}
                  </div>
                  <p className="font-semibold text-sm text-slate-700">{cat}</p>
                </div>
              )) : (
                <div className="col-span-full text-center text-slate-500 py-8">No workers found for your search.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'My Bookings' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Upcoming Services</h2>
            <div className="space-y-4">
              {activeBookings.map(bk => (
                <div key={bk.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{bk.service}</h3>
                    <p className="text-sm text-slate-500">📅 {bk.date} • 👤 {bk.worker}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    bk.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {bk.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Profile' && (
          <div className="animate-in fade-in duration-500 max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Your Profile</h2>
            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                  <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                  <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Phone</label>
                  <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Address</label>
                  <input type="text" value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button onClick={() => setIsEditingProfile(false)} className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl mt-4">Save Changes</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold">
                    {profileData.name[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{profileData.name}</h3>
                    <p className="text-slate-500">Member since 2024</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t pt-6">
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{profileData.address}</p>
                  </div>
                </div>
                <button onClick={() => setIsEditingProfile(true)} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 mt-4">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
