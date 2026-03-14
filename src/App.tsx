import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

// Components
import Home from './pages/Home';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Membership from './pages/Membership';
import Schedule from './pages/Schedule';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Join from './pages/Join';
import Admin from './pages/Admin';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-[#0ea5e9]" />
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Home</Link>
              <Link to="/programs" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Programs</Link>
              <Link to="/trainers" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Trainers</Link>
              <Link to="/schedule" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Schedule</Link>
              <Link to="/membership" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Membership</Link>
              <Link to="/gallery" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Gallery</Link>
              <Link to="/contact" className="hover:text-[#0ea5e9] transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider">Contact</Link>
              <Link to="/join" className="bg-[#0ea5e9] text-white hover:bg-[#0ea5e9]/80 transition-colors px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider">Join Now</Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Home</Link>
              <Link to="/programs" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Programs</Link>
              <Link to="/trainers" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Trainers</Link>
              <Link to="/schedule" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Schedule</Link>
              <Link to="/membership" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Membership</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Gallery</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-[#0ea5e9] px-3 py-2 rounded-md text-base font-medium uppercase">Contact</Link>
              <Link to="/join" onClick={() => setIsOpen(false)} className="block bg-[#0ea5e9] text-white px-3 py-2 rounded-md text-base font-bold uppercase mt-4">Join Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-[#0ea5e9]" />
              <span className="text-2xl font-bold tracking-tighter uppercase text-white">A Sante Lakeside Fitness</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Awesome staff, great equipment, and beautiful views of the lake.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#0ea5e9] transition-colors"><Twitter className="h-6 w-6" /></a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/programs" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Programs</Link></li>
              <li><Link to="/trainers" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Trainers</Link></li>
              <li><Link to="/schedule" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Schedule</Link></li>
              <li><Link to="/membership" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Membership</Link></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span>850 N Lake Blvd, Tahoe City, CA 96145, United States</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 text-[#0ea5e9] shrink-0" />
                <span>+1 530-583-4283</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 text-[#0ea5e9] shrink-0" />
                <span>info@asantefitness.com</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe for fitness tips and gym updates.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-md w-full focus:outline-none focus:border-[#0ea5e9] text-white transition-colors"
              />
              <button type="submit" className="bg-[#0ea5e9] text-white px-4 py-2 rounded-r-md font-bold hover:bg-[#0ea5e9]/80 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} A Sante Lakeside Fitness. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - React Router v6 Routes component doesn't explicitly type the key prop, but it's required for AnimatePresence */}
      <Routes location={location} key={location.pathname as string}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/programs" element={<PageWrapper><Programs /></PageWrapper>} />
        <Route path="/trainers" element={<PageWrapper><Trainers /></PageWrapper>} />
        <Route path="/membership" element={<PageWrapper><Membership /></PageWrapper>} />
        <Route path="/schedule" element={<PageWrapper><Schedule /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/join" element={<PageWrapper><Join /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans">
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatedRoutes />
        </main>
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <motion.a 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
          href="https://wa.me/15305834283" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#0ea5e9] text-white p-4 rounded-full shadow-lg hover:bg-[#0ea5e9]/80 transition-colors z-50 flex items-center justify-center"
        >
          <Phone className="h-6 w-6" />
        </motion.a>
      </div>
    </Router>
  );
}
