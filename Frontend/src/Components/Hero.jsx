import React from 'react';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";

const ServiceHero = () => {
  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between">

<div className="">
  <p className="text-lg md:text-4xl text-gray-600 max-w-2xl">
              India's most trusted platform for home services.<br className="text-xl font-semibold text-gray-700">
              </br> Connect with verified 
              professionals for plumbing, electrical, cleaning, and more. <br>
              </br>
              <span className="block mt-2 font-semibold text-blue-600">
                Quality work, guaranteed!
              </span>
              <br></br>
            </p>

</div>
           
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" alt="Spa Service" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" alt="Massage Service" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" alt="Handyman Repair" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 hover:object-[50%_40%]" />
          </div>
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src="https://plus.unsplash.com/premium_photo-1661717412133-e8d57b0027f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q29vayUyMGZvb2QlMjBieSUyMHdvbWVufGVufDB8fDB8fHww" alt="AC Repair" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>

      {/* New Join Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-500 text-lg font-medium">Choose your account type and join our growing community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Account Card */}
          <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-500 hover:bg-white transition-all duration-500 hover:shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">👤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">User Account</h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              Looking for expert help? Register as a user to find, book, and review the best local professionals near you.
            </p>
            <Link to="/User" className="inline-flex items-center justify-center w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
              Join as User
            </Link>
          </div>

          {/* Professional Account Card */}
          <div className="group bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-500 hover:bg-white transition-all duration-500 hover:shadow-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🛠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Account</h3>
            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              Are you a skilled worker? Sign up to receive job requests, expand your business, and earn more.
            </p>
            <Link to="/Professional" className="inline-flex items-center justify-center w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200">
              Join as Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceHero;
