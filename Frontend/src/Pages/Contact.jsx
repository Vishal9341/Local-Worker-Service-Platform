import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br bg-slate-50 text-black font-sans  selection:text-black">
      

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto leading-relaxed">
            Have questions about our local worker services? We're here to help you connect with the best professionals in your area.
          </p>
        </div>
      </section>

      <main className=" max-w-7xl mx-auto px-4 pb-24 grid lg:grid-cols-2 gap-16 items-start">
    
        <div className="bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100 p-8 rounded-2xl shadow-lg border border-black rounded-3xl p-8 md:p-12 shadow-2xl relative group overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
          
          <form className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black-200 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Name" 
                  className="w-full  border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Write your E-mail" 
                  className="w-full  border  rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">Service Required</label>
              <select className="w-full  border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-400">
                <option>General Inquiry</option>
                <option>Plumbing Service</option>
                <option>Electrical Work</option>
                <option>Cleaning Service</option>
                <option>Other</option>
                <input type="text"></input>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black ml-1">Your Message</label>
              <textarea 
                rows="5" 
                placeholder="Tell us how we can help you today..." 
                className="w-full b border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </div>

        <div className="lg:pt-12 space-y-12">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 w-fit rounded-xl border border-blue-500/20 text-blue-400 ring-4 ring-blue-500/5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="text-slate-400">support@localworker.com</p>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-indigo-500/10 w-fit rounded-xl border border-indigo-500/20 text-indigo-400 ring-4 ring-indigo-500/5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold">Call Support</h3>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Connect with us</h4>
            <div className="flex gap-4">
              {['Face Book', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-20 h-10 flex items-center justify-center rounded-2xl  border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all font-bold text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>       
        </div>
      </main>
    </div>
  );
};

export default Contact;
