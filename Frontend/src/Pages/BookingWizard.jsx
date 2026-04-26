import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, FileText, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const BookingWizard = () => {
  const { profession } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    address: user?.address || '',
    date: '',
    time: '',
    issueDescription: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && !formData.address) return setError('Address is required');
    if (step === 2 && (!formData.date || !formData.time)) return setError('Date and Time are required');
    setError('');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = user?.token;
      if (!token) throw new Error("Authentication error. Please log in again.");
      
      // Combine date and time to create scheduledStart
      const scheduledStart = new Date(`${formData.date}T${formData.time}`).toISOString();

      const res = await fetch('https://local-worker-service-platform.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          profession: profession.charAt(0).toUpperCase() + profession.slice(1),
          address: formData.address,
          scheduledStart,
          issueDescription: formData.issueDescription
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to book service');

      // Success
      setStep(5); // Show success screen
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formattedProfession = profession ? profession.charAt(0).toUpperCase() + profession.slice(1) : 'Service';

  return (
    <div className="min-h-screen pt-[80px] bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent"></div>
          <h2 className="text-3xl font-black relative z-10 tracking-tight">Book a {formattedProfession}</h2>
          <p className="text-blue-100 mt-2 font-medium relative z-10">Fast, reliable, and professional service.</p>
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="px-8 pt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step} of 4</span>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {step === 1 ? 'Location' : step === 2 ? 'Schedule' : step === 3 ? 'Details' : 'Review'}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-8">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div>{error}</div>}

          {/* Step 1: Location */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <MapPin className="text-blue-600" /> Where do you need service?
              </h3>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Service Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address..."
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all min-h-[120px]"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Calendar className="text-blue-600" /> When do you need it?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-slate-200 rounded-2xl p-4 pl-12 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-2xl p-4 pl-12 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FileText className="text-blue-600" /> Describe the issue
              </h3>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Issue Details (Optional)</label>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleInputChange}
                  placeholder="E.g., The AC is not cooling properly..."
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all min-h-[150px]"
                ></textarea>
                <p className="text-sm text-slate-500 font-medium">Adding details helps the professional arrive prepared.</p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <CheckCircle className="text-blue-600" /> Review & Confirm
              </h3>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service</p>
                  <p className="text-lg font-bold text-slate-800">{formattedProfession}</p>
                </div>
                <div className="h-px bg-slate-200 w-full"></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                  <p className="text-slate-800 font-medium">{formData.address}</p>
                </div>
                <div className="h-px bg-slate-200 w-full"></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Schedule</p>
                  <p className="text-slate-800 font-medium">{formData.date} at {formData.time}</p>
                </div>
                {formData.issueDescription && (
                  <>
                    <div className="h-px bg-slate-200 w-full"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Issue Details</p>
                      <p className="text-slate-800 font-medium italic">"{formData.issueDescription}"</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">Booking Confirmed!</h3>
              <p className="text-slate-500 font-medium text-lg">Your request has been sent to nearby professionals.</p>
              <p className="text-slate-400 mt-8 text-sm font-semibold animate-pulse">Redirecting to your dashboard...</p>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? 'Confirming...' : 'Confirm Booking'} <CheckCircle size={18} />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
