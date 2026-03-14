import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Membership() {
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
            Membership <span className="text-[#0ea5e9]">Plans</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Choose the plan that fits your goals. No hidden fees, no long-term contracts.
          </motion.p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[#0ea5e9]/50 transition-all flex flex-col"
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Basic Plan</h3>
              <p className="text-gray-400 mb-6">Perfect for those who just want to lift.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">$75</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Full Gym Access</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Coed Sauna Access</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Free Weights & Nautilus</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Lakeview Cardio Equipment</span>
                </li>
              </ul>
              <Link 
                to="/join?plan=basic" 
                className="w-full block text-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                Join Basic
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0ea5e9]/10 rounded-xl p-8 border-2 border-[#0ea5e9] transform md:-translate-y-4 flex flex-col relative"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0ea5e9] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 text-[#0ea5e9]">Pro Plan</h3>
              <p className="text-gray-400 mb-6">For those who want to take it to the next level.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$99</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Unlimited Fitness Classes</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>1 Personal Training Session/mo</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Guest Passes (2/mo)</span>
                </li>
              </ul>
              <Link 
                to="/join?plan=pro" 
                className="w-full block text-center bg-[#0ea5e9] text-white px-6 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-[#0ea5e9]/80 transition-colors"
              >
                Join Pro
              </Link>
            </motion.div>

            {/* Elite Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-[#0ea5e9]/50 transition-all flex flex-col"
            >
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">Elite Plan</h3>
              <p className="text-gray-400 mb-6">The ultimate fitness experience.</p>
              <div className="mb-8">
                <span className="text-5xl font-black">$149</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>4 Personal Training Sessions/mo</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Custom Nutrition Plan</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-[#0ea5e9] mr-3 shrink-0" />
                  <span>Unlimited Guest Passes</span>
                </li>
              </ul>
              <Link 
                to="/join?plan=elite" 
                className="w-full block text-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                Join Elite
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
