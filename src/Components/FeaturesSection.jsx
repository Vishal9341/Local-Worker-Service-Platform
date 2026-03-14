import React from 'react';
import { 
  Zap, 
  GraduationCap, 
  Home, 
  Thermometer, 
  Wrench,
  Scissors,
  Star,
  Clock,
  Shield,
  ChevronRight
} from 'lucide-react';

const FeaturesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Electrician',
      description: 'Expert electrical repairs, wiring, fixture installation, and safety checks for your home.',
      icon: Zap,
      image: 'https://plus.unsplash.com/premium_photo-1661908782924-de673a5c6988?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RWxlY3RyaWNpYW58ZW58MHx8MHx8fDA%3D',
   
    },
    {
      id: 2,
      title: 'Tutor',
      description: 'Qualified home tutors for all subjects and classes. Personalized attention for better learning.',
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    
    },
    {
      id: 3,
      title: 'Maid',
      description: 'Trusted house help for cleaning, cooking, and household chores. Verified and experienced.',
      icon: Home,
      image: 'https://plus.unsplash.com/premium_photo-1687697859912-a20ca9af9fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEZvb2QlMjBtYWtpbmd8ZW58MHx8MHx8fDA%3D',
    
    },
    {
      id: 4,
      title: 'AC Repair',
      description: 'Professional AC service, repair, gas refill, and maintenance for all brands.',
      icon: Thermometer,
      image: 'https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEFjJTIwcmVwYWlyfGVufDB8fDB8fHww',

    },
    {
      id: 5,
      title: 'Plumber',
      description: 'Expert plumbing solutions for leaks, blockages, installations, and pipe repairs.',
      icon: Wrench,
      image: 'https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGx1bWJlcnxlbnwwfHwwfHx8MA%3D%3D',
      price: '₹349',
   
    },
    {
      id: 6,
      title: 'Barber',
      description: 'Professional haircut, styling, and grooming services at your home. Save time and look great.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Services at Your Doorstep
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide range of verified and trusted service professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> 
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield size={16} className="text-green-500 mr-2" />
                    <span>Verified professional</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
            <span>View All Services</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;