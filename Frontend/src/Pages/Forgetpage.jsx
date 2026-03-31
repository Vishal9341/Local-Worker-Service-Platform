import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowLeft, Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & Reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('OTP sent! Please check your email (or console).');
        setStep(2);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection refused. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('Password reset successful! Redirecting to login...');
        navigate('/login');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Connection refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 transition-all duration-500 hover:shadow-indigo-500/10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
            <KeyRound className="w-10 h-10 text-indigo-600 -rotate-12" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            {step === 1 ? 'Forgot Password?' : 'Reset Password'}
          </h1>
          <p className="text-slate-500 font-medium">
            {step === 1 
              ? "We'll send a 6-digit code to your email to verify your identity." 
              : `Enter the code we sent to ${email}`}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
            ⚠️ {error}
          </div>
        )}
        {message && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-bold border border-green-100 animate-in fade-in slide-in-from-top-2">
            ✅ {message}
          </div>
        )}

        <form onSubmit={step === 1 ? handleSendOTP : handleResetPassword} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">6-Digit OTP</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter Code"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-black text-slate-900 tracking-[0.5em] placeholder:tracking-normal placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {step === 1 ? 'Send Verification Code' : 'Verify & Reset Password'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50">
          <Link
            to="/login"
            className="text-sm font-bold text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
