import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-indigo-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Platform</h1>
          <p className="text-lg">
            Local Worker Service Platform helps users easily find trusted
            workers .
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Our mission is to simplify the process of finding reliable local
            workers. Many people struggle to find trusted professionals for
            daily household services. Our platform connects users directly
            with skilled workers nearby.
          </p>

          <p className="text-gray-600">
            By using this platform, users can quickly locate workers such as
            plumbers, electricians, carpenters, cleaners, and more without
            wasting time searching offline.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
          alt="workers"
          className="rounded-xl shadow-lg"
        />
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">Services Available</h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Plumber</h3>
              <p className="text-gray-600">
                Find professional plumbers nearby for quick repair and
                installation services.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Electrician</h3>
              <p className="text-gray-600">
                Get skilled electricians for electrical maintenance and
                installations.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">House Maid</h3>
              <p className="text-gray-600">
                Hire trusted house maids for daily household cleaning and
                support.
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Our Platform
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">
              Simple interface to find workers quickly.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold mb-2">Local Workers</h3>
            <p className="text-gray-600 text-sm">
              Connect with workers available in your area.
            </p>
          </div>

          <div className="p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600 text-sm">
              No need to search offline for services.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl">
            <h3 className="font-semibold mb-2">Reliable Services</h3>
            <p className="text-gray-600 text-sm">
              Verified workers provide trustworthy services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;