import React from 'react';

const Service = () => {
  const services = [
    {
      title: 'Plumbing Works',
      description: 'Expert fixing for leaks, pipes, and bathroom installations with certified professionals.',
      price: 'Starts at $49',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.568.01l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l2.387 2.387a2 2 0 102.828 2.828l2.387-2.387a2 2 0 10-2.828-2.828l-2.387 2.387z"/></svg>
      ),
      color: 'blue'
    },
    {
      title: 'Electrical Repair',
      description: 'Safe and reliable electrical maintenance, wiring, and appliance repairs 24/7.',
      price: 'Starts at $59',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      ),
      color: 'yellow'
    },
    {
      title: 'House Cleaning',
      description: 'Deep cleaning services for homes and offices using eco-friendly products.',
      price: 'Starts at $39',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
      ),
      color: 'green'
    },
    {
      title: 'Carpentry',
      description: 'Custom furniture repair and woodwork by skilled local craftsmen.',
      price: 'Starts at $55',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      ),
      color: 'orange'
    },
    {
      title: 'Painting Service',
      description: 'Interior and exterior painting services with premium finishes.',
      price: 'Starts at $99',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
      ),
      color: 'pink'
    },
    {
      title: 'Appliance Repair',
      description: 'Fast fixing for refrigerators, washing machines, and AC units.',
      price: 'Starts at $45',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
      ),
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12 selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto text-center mb-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6 tracking-wide uppercase">
          Specialized Services
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Professional Help, <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">At Your Doorstep</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Connect with trusted local experts for all your home maintenance and repair needs. Quality guaranteed, prices transparent.
        </p>
      </header>

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/80 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute -right-12 -top-12 w-32 h-32 bg-${service.color}-500/5 rounded-full blur-3xl group-hover:bg-${service.color}-500/15 transition-all duration-500`}></div>
            
            {/* Icon */}
            <div className={`p-4 bg-${service.color}-500/10 rounded-2xl w-fit mb-6 text-${service.color}-400 group-hover:scale-110 transition-transform duration-500`}>
              {service.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              {service.description}
            </p>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">
                {service.price}
              </span>
              <button className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                Book Service
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto mt-32 p-12 rounded-[3rem] bg-linear-to-br from-indigo-600 to-blue-700 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Can't find what you're looking for?
          </h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            Our team is constantly expanding. Tell us what you need and we'll find the right expert for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:bg-slate-100 transition-all transform hover:scale-105">
              Custom Quote
            </button>
            <button className="px-10 py-4 bg-indigo-900/30 text-white font-black rounded-2xl border border-indigo-400/30 hover:bg-indigo-900/50 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
