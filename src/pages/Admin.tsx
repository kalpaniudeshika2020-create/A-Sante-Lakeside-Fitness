import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Activity, Settings, LogOut } from 'lucide-react';

interface Member {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  plan: string;
  startDate: string;
  createdAt: string;
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string;
  className: string;
  date: string;
  time: string;
  createdAt: string;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'bookings'>('dashboard');
  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/members').then(res => res.json()),
      fetch('/api/admin/bookings').then(res => res.json())
    ])
    .then(([membersData, bookingsData]) => {
      setMembers(membersData);
      setBookings(bookingsData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0ea5e9]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-black uppercase tracking-wider text-[#0ea5e9]">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md font-bold uppercase tracking-wider transition-colors ${activeTab === 'dashboard' ? 'bg-[#0ea5e9]/10 text-[#0ea5e9]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Activity className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md font-bold uppercase tracking-wider transition-colors ${activeTab === 'members' ? 'bg-[#0ea5e9]/10 text-[#0ea5e9]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users className="h-5 w-5" />
            <span>Members</span>
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md font-bold uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'bg-[#0ea5e9]/10 text-[#0ea5e9]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Calendar className="h-5 w-5" />
            <span>Bookings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-md font-bold uppercase tracking-wider text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-md font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-black uppercase tracking-wider mb-8">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider">Total Members</h3>
                    <Users className="h-6 w-6 text-[#0ea5e9]" />
                  </div>
                  <p className="text-4xl font-black">{members.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider">Class Bookings</h3>
                    <Calendar className="h-6 w-6 text-[#0ea5e9]" />
                  </div>
                  <p className="text-4xl font-black">{bookings.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 font-bold uppercase tracking-wider">Active Trainers</h3>
                    <Activity className="h-6 w-6 text-[#0ea5e9]" />
                  </div>
                  <p className="text-4xl font-black">3</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold uppercase tracking-wider">Recent Members</h3>
                    <button onClick={() => setActiveTab('members')} className="text-[#0ea5e9] text-sm hover:underline">View All</button>
                  </div>
                  <div className="p-6">
                    {members.slice(0, 5).map(member => (
                      <div key={member.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-bold">{member.fullName}</p>
                          <p className="text-sm text-gray-400">{member.email}</p>
                        </div>
                        <span className="bg-[#0ea5e9]/20 text-[#0ea5e9] px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {member.plan}
                        </span>
                      </div>
                    ))}
                    {members.length === 0 && <p className="text-gray-500 text-center py-4">No members yet.</p>}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold uppercase tracking-wider">Recent Bookings</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-[#0ea5e9] text-sm hover:underline">View All</button>
                  </div>
                  <div className="p-6">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-bold">{booking.name}</p>
                          <p className="text-sm text-gray-400">{booking.className}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{booking.date}</p>
                          <p className="text-xs text-gray-400">{booking.time}</p>
                        </div>
                      </div>
                    ))}
                    {bookings.length === 0 && <p className="text-gray-500 text-center py-4">No bookings yet.</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black uppercase tracking-wider">Member Management</h1>
                <button className="bg-[#0ea5e9] text-black px-4 py-2 rounded-md font-bold uppercase tracking-wider hover:bg-[#0ea5e9]/80 transition-colors">
                  Add Member
                </button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black border-b border-white/10">
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Name</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Contact</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Plan</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Start Date</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(member => (
                        <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium">{member.fullName}</td>
                          <td className="p-4">
                            <div className="text-sm">{member.email}</div>
                            <div className="text-xs text-gray-500">{member.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="bg-[#0ea5e9]/20 text-[#0ea5e9] px-2 py-1 rounded-sm text-xs font-bold uppercase">
                              {member.plan}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-400">{member.startDate}</td>
                          <td className="p-4">
                            <button className="text-blue-400 hover:text-blue-300 mr-3 text-sm font-bold uppercase">Edit</button>
                            <button className="text-red-400 hover:text-red-300 text-sm font-bold uppercase">Delete</button>
                          </td>
                        </tr>
                      ))}
                      {members.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">No members found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black uppercase tracking-wider">Class Bookings</h1>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black border-b border-white/10">
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Member</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Class</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Date & Time</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Status</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-xs text-gray-500">{booking.email}</div>
                          </td>
                          <td className="p-4 font-bold text-[#0ea5e9]">{booking.className}</td>
                          <td className="p-4">
                            <div className="text-sm">{booking.date}</div>
                            <div className="text-xs text-gray-500">{booking.time}</div>
                          </td>
                          <td className="p-4">
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-sm text-xs font-bold uppercase">
                              Confirmed
                            </span>
                          </td>
                          <td className="p-4">
                            <button className="text-red-400 hover:text-red-300 text-sm font-bold uppercase">Cancel</button>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">No bookings found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
