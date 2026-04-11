import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, logout, loading, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (user.role !== 'user') {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  const [activeTab, setActiveTab] = useState('Find Workers');
  const [searchQuery, setSearchQuery] = useState(location.state?.category || '');
  const [locationQuery, setLocationQuery] = useState('');
  const [workersList, setWorkersList] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [geo, setGeo] = useState({ lat: null, lng: null, status: 'idle' }); // idle|ok|denied|error
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      if (location.state?.category) {
        fetchWorkers(location.state.category, '');
      }
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude, status: 'ok' });
      },
      (err) => {
        console.warn('Geolocation error', err);
        setGeo((g) => ({ ...g, status: err?.code === 1 ? 'denied' : 'error' }));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    if (geo.status !== 'idle' && location.state?.category) {
      fetchWorkers(location.state.category, '');
    }
  }, [geo.status]);

  const fetchWorkers = async (profession, searchLocation) => {
    setLoadingWorkers(true);
    setHasSearched(true);
    try {
      const queryParams = new URLSearchParams();
      if (profession) queryParams.append('profession', profession);

      if (searchLocation && searchLocation.trim() !== '') {
        queryParams.append('location', searchLocation);
        const response = await fetch(` https://local-worker-service-platform.onrender.com/api/workers?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          setWorkersList(data.data);
        } else {
          console.error(data.message);
          setWorkersList([]);
        }
        return;
      }

      if (geo.status === 'ok' && geo.lat != null && geo.lng != null) {
        queryParams.append('lat', geo.lat);
        queryParams.append('lng', geo.lng);
        queryParams.append('radiusKm', '50'); // 50km radius to show nearby workers
        const response = await fetch(` https://local-worker-service-platform.onrender.com/api/workers/match?${queryParams}`);
        const data = await response.json();
        if (data.success) {
          setWorkersList(data.data);
        } else {
          console.error(data.message);
          setWorkersList([]);
        }
        return;
      }

      const response = await fetch(` https://local-worker-service-platform.onrender.com/api/workers?${queryParams}`);
      const data = await response.json();
      if (data.success) {
        setWorkersList(data.data);
      } else {
        console.error(data.message);
        setWorkersList([]);
      }
    } catch (error) {
      console.error('Error fetching workers', error);
      setWorkersList([]);
    } finally {
      setLoadingWorkers(false);
    }
  };

  const fetchMyBookings = async () => {
    if (!user?.token) return;
    setLoadingBookings(true);
    try {
      const res = await fetch(' https://local-worker-service-platform.onrender.com/api/bookings/mine', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.data);
      else setBookings([]);
    } catch (e) {
      console.error('Error fetching bookings', e);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'My Bookings') {
      fetchMyBookings();
      const interval = setInterval(fetchMyBookings, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const createBooking = async (worker) => {
    if (!user || !user.token) {
      alert("Please login to book a worker!");
      navigate('/login');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          workerId: worker._id,
          profession: worker.profession,
          address: user?.address,
          lat: geo.status === 'ok' ? geo.lat : undefined,
          lng: geo.status === 'ok' ? geo.lng : undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to create booking');
        return;
      }
      alert('Booking created');
      setActiveTab('My Bookings');
      fetchMyBookings();
    } catch (e) {
      console.error('Error creating booking', e);
      alert('Failed to create booking');
    }
  };

  const createOpenBooking = async () => {
    if (!user || !user.token) {
      alert("Please login to post a request!");
      navigate('/login');
      return;
    }
    if (!searchQuery) {
      alert("Please specify a service/profession (e.g., Plumber) before posting.");
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          profession: searchQuery,
          address: locationQuery || user?.address,
          lat: geo.status === 'ok' ? geo.lat : undefined,
          lng: geo.status === 'ok' ? geo.lng : undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to create open request');
        return;
      }
      alert('Open request broadcasted successfully! Nearby workers have been notified.');
      setActiveTab('My Bookings');
      fetchMyBookings();
    } catch (e) {
      console.error('Error creating open booking', e);
      alert('Failed to create open request');
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!user?.token) return;
    try {
      const res = await fetch(`https://local-worker-service-platform.onrender.com/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reason: 'Cancelled by user' }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to cancel booking');
        return;
      }
      fetchMyBookings();
    } catch (e) {
      console.error('Error cancelling booking', e);
      alert('Failed to cancel booking');
    }
  };

  const handleSearch = () => {
    fetchWorkers(searchQuery, locationQuery);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    fetchWorkers(category, locationQuery);
  };
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    address: user?.address || "Local Area",
    phone: user?.phone || "+1234567890"
  });

  const saveProfile = async () => {
    if (!user?.token) return;
    try {
      const res = await fetch(' https://local-worker-service-platform.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data);
        alert('Profile updated successfully');
        setIsEditingProfile(false);
      } else {
        alert(data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (loading || !user) return <div className="min-h-screen pt-[72px] bg-slate-50 flex items-center justify-center">Loading...</div>;

  const categories = ['Plumber', 'Electrician', 'Cleaner', 'Carpenter', 'Painter', 'Maid','Barber',];
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
            {(user ? ['Find Workers', 'My Bookings', 'Messages', 'Profile', 'Logout'] : ['Find Workers', 'Login']).map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    if (tab === 'Logout') {
                      logout();
                      navigate('/');
                    } else if (tab === 'Login') {
                      navigate('/login');
                    } else if (!user && tab !== 'Find Workers') {
                      alert("Please login to access this feature.");
                      navigate('/login');
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
            Welcome, <span className="text-indigo-600">{user?.name ? user.name.split(' ')[0] : 'Guest'}</span>
          </h1>
          <p className="text-slate-500 font-medium">Find the best local professionals for your needs.</p>
        </header>

        {activeTab === 'Find Workers' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10 p-8  rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-4">What service do you need today?</h2>
                 <div className="flex flex-col md:flex-row gap-2 max-w-3xl">
                   <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g., Plumber, Cleaners..." className="flex-1 px-5 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-300" />
                   <input type="text" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} placeholder="Location (e.g. New York)" className="flex-1 px-5 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-300" />
                   <button onClick={handleSearch} className="px-8 py-4 bg-slate-900 rounded-xl font-bold hover:bg-slate-800 transition-colors">Search</button>
                   <button onClick={createOpenBooking} className="px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-colors whitespace-nowrap">Quick Post</button>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            </div>

            {!hasSearched ? (
              <>
                <h3 className="text-xl font-bold mb-6 text-slate-800">Popular Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                  {filteredCategories.length > 0 ? filteredCategories.map(cat => (
                    <div key={cat} onClick={() => handleCategoryClick(cat)} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md hover:border-indigo-100 cursor-pointer transition-all">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 mx-auto rounded-full flex items-center justify-center mb-3 font-bold text-xl">
                        {cat[0]}
                      </div>
                      <p className="font-semibold text-sm text-slate-700">{cat}</p>
                    </div>
                  )) : (
                    <div className="col-span-full text-center text-slate-500 py-8">No categories matching this request.</div>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-8 mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Search Results</h3>
                  <button onClick={() => setHasSearched(false)} className="text-indigo-600 font-medium text-sm hover:underline">Clear Search</button>
                </div>
                
                {loadingWorkers ? (
                  <div className="text-center py-8 text-slate-500">Loading workers...</div>
                ) : workersList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workersList.map(w => (
                      <div key={w._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-full flex items-center justify-center text-xl font-bold capitalize">
                            {w.name ? w.name[0] : 'W'}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{w.name}</h4>
                            <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide">{w.profession || 'Professional'}</p>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 space-y-2 mb-6">
                          <p className="flex items-center gap-2">📍 {w.address || 'Location not specified'}</p>
                          <p className="flex items-center gap-2">📞 {w.phone || 'Contact not specified'}</p>
                          {w.distanceMeters != null && (
                            <p className="flex items-center gap-2">🧭 {(Number(w.distanceMeters) / 1000).toFixed(2)} km away</p>
                          )}
                        </div>
                        <button
                          onClick={() => createBooking(w)}
                          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-lg text-slate-600 font-medium mb-2">No worker available at your location.</p>
                    <p className="text-slate-500 text-sm">Try modifying your search criteria or checking another location.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'My Bookings' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Upcoming Services</h2>
            <div className="space-y-4">
              {loadingBookings ? (
                <div className="text-center py-8 text-slate-500">Loading bookings...</div>
              ) : bookings.length > 0 ? (
                bookings.map((bk) => (
                  <div key={bk._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{bk.profession || 'Service'}</h3>
                      <p className="text-sm text-slate-500">
                        👤 {bk.worker ? `Accepted by ${bk.worker.name}` : 'Waiting for professional...'} • 📍 {bk.address || 'Address'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Status: {bk.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {(bk.status === 'pending' || bk.status === 'accepted') && (
                        <button
                          onClick={() => cancelBooking(bk._id)}
                          className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      )}
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        bk.status === 'completed' ? 'bg-green-100 text-green-700' :
                        bk.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        bk.status === 'accepted' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bk.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-lg text-slate-600 font-medium mb-2">No bookings yet.</p>
                  <p className="text-slate-500 text-sm">Book a worker from “Find Workers”.</p>
                </div>
              )}
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
                <button onClick={saveProfile} className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl mt-4">Save Changes</button>
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
