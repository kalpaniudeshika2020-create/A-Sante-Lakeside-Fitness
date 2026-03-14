import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
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
            Get In <span className="text-[#0ea5e9]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Have questions? We're here to help you start your fitness journey.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-black uppercase tracking-wider mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[#0ea5e9]/10 p-4 rounded-lg mr-6">
                    <MapPin className="h-8 w-8 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Location</h3>
                    <p className="text-gray-400 text-lg">850 N Lake Blvd, Tahoe City, CA 96145, United States<br/>Located in: Safeway</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0ea5e9]/10 p-4 rounded-lg mr-6">
                    <Phone className="h-8 w-8 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Phone</h3>
                    <p className="text-gray-400 text-lg">+1 530-583-4283</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0ea5e9]/10 p-4 rounded-lg mr-6">
                    <Mail className="h-8 w-8 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Email</h3>
                    <p className="text-gray-400 text-lg">info@asantefitness.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0ea5e9]/10 p-4 rounded-lg mr-6">
                    <Clock className="h-8 w-8 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Hours</h3>
                    <p className="text-gray-400 text-lg">Open Daily: Closes 8 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-full min-h-[400px] rounded-xl overflow-hidden border border-white/10"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.634033230621!2d-120.14197368465053!3d39.17290197952936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80997b6b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2s850%20N%20Lake%20Blvd%2C%20Tahoe%20City%2C%20CA%2096145%2C%20USA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
