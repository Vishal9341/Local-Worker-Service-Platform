import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const [activeTab, setActiveTab] = useState('Overview');
  const stats = [
    { label: 'Total Users', value: '124', icon: '👥' },
    { label: 'Active Professionals', value: '45', icon: '🛠️' },
    { label: 'Completed Jobs', value: '890', icon: '✅' },
    { label: 'Platform Revenue', value: '$4,200', icon: '💰' },
  ];

  const recentUsers = [
    { id: 1, name: ' ', email: 'arpit@example.com', role: 'user', joined: '2026-03-27' },
    { id: 2, name: ' ', email: 'vk@gmail.com', role: 'worker', joined: '2026-03-27' },
    { id: 3, name: ' ', email: 'vishal@gmail.com', role: 'admin', joined: '2026-03-26' },
  ];

  if (loading || !user) return <div className="min-h-screen pt-[72px] bg-slate-50 flex items-center justify-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen pt-[72px] bg-slate-100 flex font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="font-black text-xl tracking-tight">AdminPanel</span>
        </div>
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {['Overview', 'Manage Users', 'Service Categories', 'Reports', 'Logout'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => tab === 'Logout' ? (logout(), navigate('/')) : setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab ? 'bg-red-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  } font-semibold`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Platform Overview</h1>
            <p className="text-slate-500 font-medium">Monitoring Local Worker Service Activity</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
             <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
             <div>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-xs text-red-500 font-bold uppercase">Administrator</p>
             </div>
          </div>
        </header>

        {activeTab === 'Overview' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(s => (
                <div key={s.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Recent Registrations</h3>
                <button className="text-red-500 font-bold text-sm hover:underline">View All</button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-4">User</th>
                    <th className="px-8 py-4">Role</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-800">{u.name}</p>
                        <p className="text-sm text-slate-500">{u.email}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          u.role === 'worker' ? 'bg-blue-100 text-blue-600' : 
                          u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <button className="text-slate-400 hover:text-slate-600 font-bold">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
