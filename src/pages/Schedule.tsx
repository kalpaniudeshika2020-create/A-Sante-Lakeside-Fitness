import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User } from 'lucide-react';

interface Class {
  id: number;
  name: string;
  trainer: string;
  day: string;
  time: string;
  duration: number;
}

export default function Schedule() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [bookingClass, setBookingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching classes:', err);
        setLoading(false);
      });
  }, []);

  const filteredClasses = classes.filter(c => c.day === selectedDay);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingClass) return;

    setSubmitStatus('submitting');
    
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        classId: bookingClass.id,
        time: bookingClass.time
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setBookingClass(null);
          setSubmitStatus('idle');
          setFormData({ name: '', phone: '', email: '', date: '' });
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    })
    .catch(() => setSubmitStatus('error'));
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="py-20 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white"
          >
            Class <span className="text-[#0ea5e9]">Schedule</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Find the perfect class to fit your schedule and goals.
          </motion.p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Day Selector */}
          <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar space-x-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-md font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedDay === day 
                    ? 'bg-[#0ea5e9] text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Classes List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0ea5e9]"></div>
            </div>
          ) : filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls, index) => (
                <motion.div 
                  key={cls.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#0ea5e9]/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-white">{cls.name}</h3>
                    <span className="bg-[#0ea5e9]/20 text-[#0ea5e9] px-3 py-1 rounded-full text-sm font-bold">
                      {cls.duration} min
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-5 w-5 mr-3 text-[#0ea5e9]" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <User className="h-5 w-5 mr-3 text-[#0ea5e9]" />
                      <span>{cls.trainer}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setBookingClass(cls)}
                    className="w-full bg-transparent border-2 border-[#0ea5e9] text-[#0ea5e9] px-4 py-2 rounded-md font-bold uppercase tracking-wider hover:bg-[#0ea5e9] hover:text-black transition-colors"
                  >
                    Book Class
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400">No classes scheduled for {selectedDay}</h3>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-xl p-8 max-w-md w-full relative"
          >
            <button 
              onClick={() => setBookingClass(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">Book Class</h2>
            <p className="text-[#0ea5e9] font-bold mb-6">{bookingClass.name} with {bookingClass.trainer}</p>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-500/20 text-green-400 p-4 rounded-md text-center font-bold">
                Booking successful! See you there.
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#0ea5e9]"
                  />
                </div>
                
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Failed to book class. Please try again.</p>
                )}
                
                <button 
                  type="submit" 
                  disabled={submitStatus === 'submitting'}
                  className="w-full bg-[#0ea5e9] text-black font-bold uppercase tracking-wider py-3 rounded-md hover:bg-[#0ea5e9]/80 transition-colors disabled:opacity-50 mt-4"
                >
                  {submitStatus === 'submitting' ? 'Booking...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
