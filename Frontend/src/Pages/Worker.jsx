import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Worker = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'worker')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const [activeTab, setActiveTab] = useState('My Jobs');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [geo, setGeo] = useState({ lat: null, lng: null, status: 'idle' });
  const [profileData, setProfileData] = useState({
    name: user?.name || "Professional",
    email: user?.email || "worker@example.com",
    contactNo: user?.phone || "+1 234 567 890",
    profession: user?.profession || "Plumber",
    experience: "5 Yrs",
    hourlyRate: "$25/hr",
    location: "New York, USA",
    bio: "Experienced professional dedicated to top-quality service."
  });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude, status: 'ok' }),
      (err) => setGeo((g) => ({ ...g, status: err?.code === 1 ? 'denied' : 'error' })),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const updateAvailability = async (next) => {
    if (!user?.token) return;
    try {
      const res = await fetch('http://localhost:5000/api/workers/me/availability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          isAvailable: next,
          lat: geo.status === 'ok' ? geo.lat : undefined,
          lng: geo.status === 'ok' ? geo.lng : undefined,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to update availability');
        return;
      }
      setIsAvailable(Boolean(data.data?.isAvailable));
    } catch (e) {
      console.error('Error updating availability', e);
      alert('Failed to update availability');
    }
  };

  const fetchMyJobs = async () => {
    if (!user?.token) return;
    setLoadingJobs(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings/mine', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (data.success) setJobs(data.data);
      else setJobs([]);
    } catch (e) {
      console.error('Error fetching jobs', e);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'My Jobs') fetchMyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const completeJob = async (bookingId) => {
    if (!user?.token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/complete`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to complete job');
        return;
      }
      setIsAvailable(true);
      fetchMyJobs();
    } catch (e) {
      console.error('Error completing job', e);
      alert('Failed to complete job');
    }
  };

  const cancelJob = async (bookingId) => {
    if (!user?.token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reason: 'Cancelled by worker' }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to cancel job');
        return;
      }
      setIsAvailable(true);
      fetchMyJobs();
    } catch (e) {
      console.error('Error cancelling job', e);
      alert('Failed to cancel job');
    }
  };

  const stats = [
    { label: 'Total Earnings', value: ' 0', color: 'green' },
    { label: 'Completed Jobs', value: '0', color: 'blue' },
    { label: 'Current Rating', value: '0', color: 'yellow' },
    { label: 'Active Jobs', value: '0', color: 'indigo' },
  ];

  // jobs are fetched from backend bookings

  const availableJobs = [
    { id: 101, title: 'Emergency Electrical Fix', category: 'Electrician', location: '2.5 miles away', price: '$85', urgency: 'High' },
    { id: 102, title: 'Wooden Shelf Repair', category: 'Carpenter', location: '4.0 miles away', price: '$40', urgency: 'Normal' },
    { id: 103, title: 'Garden Maintenance', category: 'Other', location: '1.2 miles away', price: '$55', urgency: 'Normal' },
    { id: 104, title: 'Bathroom Pipe Leak', category: 'Plumber', location: '3.0 miles away', price: '$90', urgency: 'High' },
    { id: 105, title: 'Deep Cleaning Service', category: 'Maid', location: '5.0 miles away', price: '$70', urgency: 'Normal' },
    { id: 106, title: 'Wall Painting', category: 'Painter', location: '1.5 miles away', price: '$150', urgency: 'Normal' },
  ].filter(job => job.category === profileData.profession || !profileData.profession);

  const navItems = [
    { name: 'My Jobs', icon: '📋' },
    { name: 'Accept Job', icon: '➕' },
    { name: 'Profile', icon: '👤' },
    { name: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="min-h-screen pt-[72px] bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">W</div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tight">WorkerPanel</span>}
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.name 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && <span className="font-semibold">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-green-500 p-0.5">
               <img src=" https://plus.unsplash.com/premium_photo-1683972509783-da5a74795bb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D" alt="Profile" className="rounded-full" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name || "Loading..."}</p>
                <p className="text-xs text-green-500 font-medium tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">{user?.name ? user.name.split(' ')[0] : 'Worker'}</span>
            </h1>
            <p className="text-slate-400 font-medium">Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateAvailability(!isAvailable)}
              className={`px-4 py-3 rounded-2xl font-bold border transition-all ${
                isAvailable
                  ? 'bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/15'
                  : 'bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/15'
              }`}
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </button>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full md:w-64 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">🔍</span>
            </div>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-2xl relative hover:bg-slate-800 transition-all">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
          </div>
        </header>

        {activeTab === 'My Jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black text-${stat.color}-400`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Active Jobs</h2>
                  <button className="text-indigo-400 font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {loadingJobs ? (
                    <div className="text-slate-400">Loading jobs...</div>
                  ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job._id} className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:bg-slate-800/80 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="p-4 bg-slate-800 rounded-2xl text-2xl group-hover:scale-110 transition-transform">📋</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-1">{job.profession || 'Job'}</h3>
                            <p className="text-slate-400 text-sm">{job.user?.name || 'Customer'}</p>
                            <p className="text-slate-500 text-xs mt-1">📍 {job.address || 'Address'}</p>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              job.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              job.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {job.status}
                            </span>
                            {job.status === 'pending' && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => cancelJob(job._id)}
                                  className="px-3 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => completeJob(job._id)}
                                  className="px-3 py-2 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-700"
                                >
                                  Complete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400">No jobs yet.</div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col">
                <h2 className="text-xl font-bold mb-8">Earnings Overview</h2>
                <div className="flex-1 flex items-end gap-3 h-48 mb-8">
                   {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                     <div key={i} className="flex-1 group relative">
                        <div 
                          style={{ height: `${h}%` }} 
                          className="bg-indigo-500/30 group-hover:bg-indigo-500 rounded-t-lg transition-all duration-500 cursor-pointer"
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ${h*2}
                        </div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 px-1 border-t border-slate-800 pt-6">
                  <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
                </div>
                <button className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Accept Job' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black mb-10 tracking-tight">Available Jobs Marketplace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableJobs.map((job) => (
                <div key={job.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all group overflow-hidden relative">
                   <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/15 transition-all"></div>
                   <div className="flex justify-between items-start mb-6">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                        job.urgency === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {job.urgency} Urgency
                      </span>
                      <span className="text-2xl font-black text-white">{job.price}</span>
                   </div>
                   <h3 className="text-xl font-bold mb-3">{job.title}</h3>
                   <p className="text-slate-400 font-medium mb-8 flex items-center gap-2">
                     <span className="text-lg">📍</span> {job.location}
                   </p>
                   <button className="w-full py-4 bg-white text-indigo-950 font-black rounded-2xl hover:bg-slate-100 transition-all transform group-hover:scale-[1.02]">
                     Accept Job
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeTab === 'Profile' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-600 p-1">
                   <img src="https://plus.unsplash.com/premium_photo-1683972509783-da5a74795bb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHJvZmlsZSUyMGljb258ZW58MHx8MHx8fDA%3D  " alt="Profile Large" className="rounded-[2.4rem] bg-slate-900" />
                </div>
                <div className="flex-1 text-center md:text-left w-full max-w-2xl">
                  {isEditingProfile ? (
                    <div className="space-y-4 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Full Name</label>
                          <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Name" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Profession</label>
                          <input type="text" value={profileData.profession} onChange={(e) => setProfileData({...profileData, profession: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Profession" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Email Address</label>
                          <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Contact No</label>
                          <input type="text" value={profileData.contactNo} onChange={(e) => setProfileData({...profileData, contactNo: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contact No" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Experience</label>
                          <input type="text" value={profileData.experience} onChange={(e) => setProfileData({...profileData, experience: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 5 Yrs" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold uppercase">Hourly Rate</label>
                          <input type="text" value={profileData.hourlyRate} onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., $25/hr" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-xs text-slate-400 font-bold uppercase">Location</label>
                          <input type="text" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Location" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-xs text-slate-400 font-bold uppercase">Bio / About</label>
                          <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} className="w-full bg-slate-800 text-white rounded-xl p-3 mt-1 h-24 resize-none outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us about your services..." />
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end mt-6">
                        <button onClick={() => setIsEditingProfile(false)} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">Cancel</button>
                        <button onClick={() => setIsEditingProfile(false)} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">Save Profile</button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-left">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
                        <div>
                          <h2 className="text-4xl font-black">{profileData.name}</h2>
                          <p className="text-xl font-bold text-indigo-400 mt-1">{profileData.profession}</p>
                        </div>
                        <button onClick={() => setIsEditingProfile(true)} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all font-bold text-white flex items-center gap-2">
                          <span>✏️</span> Edit Profile
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-6 mt-6">
                        <span className="px-4 py-2 bg-slate-800/80 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700"><span>📍</span> {profileData.location}</span>
                        <span className="px-4 py-2 bg-slate-800/80 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700"><span>✉️</span> {profileData.email}</span>
                        <span className="px-4 py-2 bg-slate-800/80 rounded-full text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700"><span>📞</span> {profileData.contactNo}</span>
                      </div>

                      <div className="mb-8 items-start justify-start flex flex-col items-start w-full gap-2">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">About</h3>
                        <p className="text-slate-300 leading-relaxed text-sm text-left">{profileData.bio}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Rating</p>
                          <p className="text-2xl font-black text-yellow-500">4.8</p>
                        </div>
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Experience</p>
                          <p className="text-xl font-black text-white">{profileData.experience}</p>
                        </div>
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Rate</p>
                          <p className="text-xl font-black text-green-400">{profileData.hourlyRate}</p>
                        </div>
                        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Jobs Done</p>
                          <p className="text-2xl font-black text-indigo-400">124</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logout Placeholder */}
        {activeTab === 'Logout' && (
          <div className="animate-in zoom-in-95 duration-500 h-full flex items-center justify-center">
             <div className="text-center max-w-sm">
                <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8">👋</div>
                <h2 className="text-3xl font-black mb-4">Logging out?</h2>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed">You'll need to log back in to access your jobs and earnings dashboard.</p>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('My Jobs')} className="flex-1 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all">Cancel</button>
                  <button onClick={() => { logout(); navigate("/"); }} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">Confirm</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Worker;
