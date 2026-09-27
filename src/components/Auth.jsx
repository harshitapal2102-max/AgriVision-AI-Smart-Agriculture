import React, { useState } from 'react';
import { Sprout, Store, User, Lock, Phone, MapPin, Wheat, Eye, EyeOff } from 'lucide-react';

export default function Auth({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({ name: '', mobile: '', password: '', district: '', crop: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'mobile') setErrorMsg('');
    setAuthError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!/^\d{10}$/.test(formData.mobile)) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (isLogin) {
      const res = onLogin({ mobile: formData.mobile, password: formData.password, role });
      if (!res.success) setAuthError(res.message);
    } else {
      const res = onRegister({
        role, name: formData.name || (role === 'farmer' ? 'Farmer' : 'Buyer'),
        mobile: formData.mobile, password: formData.password,
        district: formData.district, crop: formData.crop,
      });
      if (!res.success) setAuthError(res.message);
    }
  };

  const switchMode = () => { setIsLogin(!isLogin); setAuthError(''); setErrorMsg(''); };

  const inputClass = (hasError) =>
    `pl-10 w-full p-3 border rounded-xl text-sm transition-all duration-200 outline-none bg-white/80
     ${hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-forest-500'} 
     focus:bg-white`;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f2e18 0%, #1a4a28 40%, #14532d 70%, #713f12 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full opacity-20 animate-float"
        style={{ background: 'radial-gradient(circle, #22c55e, transparent)' }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full opacity-15 animate-float"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent)', animationDelay: '2s' }} />

      <div className="w-full max-w-md mx-4 animate-scaleIn">
        {/* Logo card top section */}
        <div className="text-center mb-6 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 shadow-lg animate-float"
            style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            AgriVision <span style={{ color: '#f59e0b' }}>AI</span>
          </h1>
          <p className="text-green-200/70 text-sm mt-1 font-medium">Smart Agriculture Platform</p>
        </div>

        {/* Main form card */}
        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.95)' }}>
          <div className="p-7">
            {/* Role Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-2xl mb-6 gap-1">
              {['farmer', 'buyer'].map((r) => (
                <button key={r} onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300
                    ${role === r ? 'bg-white text-forest-800 shadow-md scale-[1.02]' : 'text-gray-500 hover:text-gray-700'}`}>
                  {r === 'farmer' ? <Sprout className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Login / Register heading */}
            <h2 className="text-xl font-bold text-gray-800 mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {isLogin ? 'Welcome back 👋' : `Register as ${role === 'farmer' ? 'Farmer' : 'Buyer'}`}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 stagger">

              {!isLogin && (
                <div className="animate-fadeInUp">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    {role === 'farmer' ? 'Full Name' : 'Entity / Company Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" name="name" required value={formData.name}
                      onChange={handleChange} className={inputClass(false)}
                      placeholder={role === 'farmer' ? 'e.g. Rajesh Kumar' : 'e.g. Agro Fresh Pvt Ltd'} />
                  </div>
                </div>
              )}

              <div className="animate-fadeInUp">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" name="mobile" required value={formData.mobile}
                    onChange={handleChange} className={inputClass(!!errorMsg)}
                    placeholder="10-digit mobile number" maxLength={10} />
                </div>
                {errorMsg && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-fadeInUp">
                    <span>⚠</span> {errorMsg}
                  </p>
                )}
              </div>

              <div className="animate-fadeInUp">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} name="password" required
                    value={formData.password} onChange={handleChange}
                    className={inputClass(false)} placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && role === 'farmer' && (
                <>
                  <div className="animate-fadeInUp">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">District</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" name="district" required value={formData.district}
                        onChange={handleChange} className={inputClass(false)} placeholder="e.g. Nashik" />
                    </div>
                  </div>
                  <div className="animate-fadeInUp">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Primary Crop</label>
                    <div className="relative">
                      <Wheat className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" name="crop" required value={formData.crop}
                        onChange={handleChange} className={inputClass(false)} placeholder="e.g. Wheat, Onions" />
                    </div>
                  </div>
                </>
              )}

              {authError && (
                <div className="animate-fadeInUp bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-medium flex items-center gap-2">
                  <span>⚠</span> {authError}
                </div>
              )}

              <button type="submit"
                className="btn-shimmer w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] animate-fadeInUp"
                style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
                {isLogin ? '→  Sign In' : '→  Create Account'}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                {isLogin ? "Don't have an account? " : 'Already registered? '}
                <button onClick={switchMode}
                  className="text-forest-600 font-semibold hover:text-forest-800 transition-colors hover:underline">
                  {isLogin ? 'Register here' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-green-300/50 text-xs mt-6">
          © 2026 AgriVision AI · Smart Farming for India
        </p>
      </div>
    </div>
  );
}
