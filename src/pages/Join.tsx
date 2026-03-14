import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export default function Join() {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'basic';
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    plan: initialPlan,
    startDate: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ fullName: '', phone: '', email: '', plan: 'basic', startDate: '' });
      } else {
        setSubmitStatus('error');
      }
    })
    .catch(() => setSubmitStatus('error'));
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center py-20">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-10">
            <Dumbbell className="h-12 w-12 text-[#0ea5e9] mx-auto mb-4" />
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 text-white">
              Join <span className="text-[#0ea5e9]">A Sante Lakeside Fitness</span>
            </h1>
            <p className="text-gray-400">Start your transformation today.</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">Welcome to the Family!</h2>
              <p className="text-lg">Your membership application has been received. We'll contact you shortly to finalize your setup.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Membership Plan</label>
                  <select 
                    value={formData.plan}
                    onChange={e => setFormData({...formData, plan: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors appearance-none"
                  >
                    <option value="basic" className="bg-black">Basic Plan - $29/mo</option>
                    <option value="pro" className="bg-black">Pro Plan - $59/mo</option>
                    <option value="elite" className="bg-black">Elite Plan - $99/mo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Preferred Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-[#0ea5e9] transition-colors"
                  />
                </div>
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md text-sm">
                  There was an error submitting your application. Please try again or contact us directly.
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitStatus === 'submitting'}
                className="w-full bg-[#0ea5e9] text-black font-black uppercase tracking-wider py-4 rounded-md hover:bg-[#0ea5e9]/80 transition-colors disabled:opacity-50 text-lg mt-8"
              >
                {submitStatus === 'submitting' ? 'Processing...' : 'Complete Registration'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
