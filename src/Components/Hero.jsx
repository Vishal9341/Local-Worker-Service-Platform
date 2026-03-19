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
              {/* <div>
                <Link to="/Professional">
                <button className="bg-linear-to-r from-blue-600 to-blue-300 w-half  font-semibold rounded-xl px-6 py-3 text-4xl font-medium text-cyan-50 hover:from-blue-300 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2  group-hover:shadow-lg ">
                <span>Be a Professional</span> 
                 </button>
                </Link>
              </div> */}
              
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
    </div>
  );
};

export default ServiceHero;
