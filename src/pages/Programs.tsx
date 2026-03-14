import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Program {
  id: number;
  name: string;
  description: string;
  trainer: string;
  imageUrl: string;
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        setPrograms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching programs:', err);
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
            Training <span className="text-[#0ea5e9]">Programs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            From heavy lifting to high-intensity interval training, we have the right program to help you crush your goals.
          </motion.p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0ea5e9]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div 
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-[#0ea5e9]/50 transition-all group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={program.imageUrl} 
                      alt={program.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#0ea5e9] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                        {program.trainer}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-3">{program.name}</h3>
                    <p className="text-gray-400 mb-6 h-20 overflow-hidden line-clamp-3">
                      {program.description}
                    </p>
                    <Link 
                      to="/schedule" 
                      className="inline-flex items-center text-[#0ea5e9] font-bold uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Book Class <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
