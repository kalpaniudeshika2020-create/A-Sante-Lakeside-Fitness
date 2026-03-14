import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <img 
            src="https://i.ibb.co/VYksv9Z0/2026-03-14-05-16-14-A-Sante-Lakeside-Fitness-Google-Maps.jpg" 
            alt="A Sante Lakeside Fitness" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[#0ea5e9]/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-[#0ea5e9] mb-4"
          >
            A Sante Lakeside Fitness
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white"
          >
            Best Gym in <br />
            <span className="text-[#0ea5e9]">Tahoe City.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Wide selection of equipment, friendly people, great views of the lake, and a HOT sauna.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/join" 
              className="w-full sm:w-auto bg-[#0ea5e9] text-white px-8 py-4 rounded-md font-black uppercase tracking-wider hover:bg-[#0ea5e9]/80 transition-colors text-lg flex items-center justify-center group"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/programs" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-lg flex items-center justify-center"
            >
              View Programs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#0ea5e9]/50 transition-colors"
            >
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-6">
                <Dumbbell className="h-8 w-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-4">Great Equipment</h3>
              <p className="text-gray-400">Great options here from Nautilus to free weights. Has all the machines you can ask for.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#0ea5e9]/50 transition-colors"
            >
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-4">Lake Views & Sauna</h3>
              <p className="text-gray-400">Highlights are lakeview while running on the treadmill and the coed sauna.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#0ea5e9]/50 transition-colors"
            >
              <div className="w-14 h-14 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-[#0ea5e9]" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-4">Clean & Helpful</h3>
              <p className="text-gray-400">Clean facility, helpful staff, and nice showers. $75/month is a good deal, too.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black uppercase tracking-tighter mb-12"
          >
            What Our Members Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-left"
            >
              <div className="flex text-[#0ea5e9] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"Wide selection of equipment, friendly people, great views of the lake, and a HOT sauna. $75/month is a good deal, too."</p>
              <div className="font-bold uppercase text-[#0ea5e9]">- Jeffrey Stern</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-left"
            >
              <div className="flex text-[#0ea5e9] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"Best gym in Tahoe City area and west shore. Has all the machines you can ask for. Clean, helpful staff, and nice showers. Highlights are lakeview while running on the treadmill and the coed sauna."</p>
              <div className="font-bold uppercase text-[#0ea5e9]">- Aidan Belleau</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-left"
            >
              <div className="flex text-[#0ea5e9] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-gray-300 mb-6 italic">"Awesome staff and great equipment. Great options here from Nautilus to free weights."</p>
              <div className="font-bold uppercase text-[#0ea5e9]">- Local Guide</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000" 
            alt="Gym Motivation" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-gray-300 mb-10">Join A Sante Lakeside Fitness today and get access to the best equipment and views in Tahoe City.</p>
          <Link 
            to="/join" 
            className="inline-block bg-[#0ea5e9] text-white px-10 py-5 rounded-md font-black uppercase tracking-wider hover:bg-[#0ea5e9]/80 transition-colors text-xl"
          >
            Become a Member
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

// Need to import Dumbbell for the features section
import { Dumbbell as DumbbellIcon } from 'lucide-react';
const Dumbbell = DumbbellIcon;
