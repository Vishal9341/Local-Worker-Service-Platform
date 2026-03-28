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
  const [profileData, setProfileData] = useState({
    name: user?.name || "Professional",
    profession: user?.profession || "Plumber",
    experience: "5 Yrs"
  });

  const stats = [
    { label: 'Total Earnings', value: '$1,250.00', color: 'green' },
    { label: 'Completed Jobs', value: '48', color: 'blue' },
    { label: 'Current Rating', value: '4.9', color: 'yellow' },
    { label: 'Active Jobs', value: '3', color: 'indigo' },
  ];

  const jobs = [
    { id: 1, title: 'Bathroom Pipe Leakage', customer: 'John Doe', price: '$45', status: 'In Progress', icon: '🔧' },
    { id: 2, title: 'Full House Cleaning', customer: 'Sarah Smith', price: '$120', status: 'Pending', icon: '🧹' },
    { id: 3, title: 'AC Filter Replacement', customer: 'Mike Johnson', price: '$60', status: 'Completed', icon: '❄️' },
  ];

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
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="rounded-full" />
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
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black text-${stat.color}-400`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Job Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Active Jobs</h2>
                  <button className="text-indigo-400 font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:bg-slate-800/80 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-slate-800 rounded-2xl text-2xl group-hover:scale-110 transition-transform">{job.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                          <p className="text-slate-400 text-sm">{job.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-indigo-400 mb-1">{job.price}</p>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                             job.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-400' : 
                             job.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Overview - New Feature */}
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

        {/* Accept Job Section */}
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
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile Large" className="rounded-[2.4rem] bg-slate-900" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  {isEditingProfile ? (
                    <div className="space-y-4 mb-6">
                      <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full bg-slate-800 text-white rounded p-2" placeholder="Name" />
                      <select value={profileData.profession} onChange={(e) => setProfileData({...profileData, profession: e.target.value})} className="w-full bg-slate-800 text-white rounded p-2">
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Maid">Maid</option>
                        <option value="Painter">Painter</option>
                        <option value="Other">Other</option>
                      </select>
                      <button onClick={() => setIsEditingProfile(false)} className="px-6 py-2 bg-green-600 text-white rounded-xl">Save</button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-4xl font-black mb-4">{profileData.name}</h2>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                        <span className="px-5 py-2 bg-slate-800 rounded-full text-xs font-black text-indigo-300 border border-slate-700">
                          {profileData.profession}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto md:mx-0">
                        <div className="text-center md:text-left border-r border-slate-800 pr-6">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Rating</p>
                          <p className="text-xl font-black text-yellow-500">4.9/5</p>
                        </div>
                        <div className="text-center md:text-left border-r border-slate-800 pr-6">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Exp</p>
                          <p className="text-xl font-black text-white">{profileData.experience}</p>
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Level</p>
                          <p className="text-xl font-black text-indigo-400">Pro</p>
                        </div>
                      </div>
                      <button onClick={() => setIsEditingProfile(true)} className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30">
                        Edit Profile Details
                      </button>
                    </>
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
