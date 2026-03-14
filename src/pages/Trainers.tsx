import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trainers')
      .then(res => res.json())
      .then(data => {
        setTrainers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching trainers:', err);
        setLoading(false);
      });
  }, []);

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
            Meet Our <span className="text-[#0ea5e9]">Trainers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Our certified trainers are here to push you past your limits and achieve your goals.
          </motion.p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0ea5e9]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {trainers.map((trainer, index) => (
                <motion.div 
                  key={trainer.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#0ea5e9]/50 transition-all group"
                >
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={trainer.imageUrl} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold uppercase tracking-wider mb-1 text-white">{trainer.name}</h3>
                        <p className="text-[#0ea5e9] font-bold uppercase tracking-wider text-sm">{trainer.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-6 font-medium">Experience: {trainer.experience}</p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Instagram className="h-5 w-5" /></a>
                      <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Facebook className="h-5 w-5" /></a>
                      <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Twitter className="h-5 w-5" /></a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
