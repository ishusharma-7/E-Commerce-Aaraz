import { motion } from 'framer-motion';
import { FaInstagram, FaLaptopCode, FaRocket, FaHandshake } from 'react-icons/fa';
import devPhoto from '../assets/ishu.jpg';

export default function About() {
  const socialLinks = {
    instagram: "https://www.instagram.com/ishu.sharma_7", // Replace with your actual link
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-16 py-10"
    >
      {/* Section 1: The Brand */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-black text-primary uppercase tracking-tighter">About Aaraz.</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Aaraz is a premium e-commerce vision designed to bridge the gap between high-end fashion and 
          seamless digital accessibility. Built with modern web technologies, we prioritize 
          performance, aesthetics, and user experience.
        </p>
      </section>

      {/* Section 2: Website Documentation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-primary">
          <FaRocket className="text-primary text-3xl mb-4" />
          <h3 className="font-bold text-xl dark:text-white mb-2">The Vision</h3>
          <p className="text-sm text-gray-500">To provide a mobile-first, animated shopping environment that feels as premium as the products themselves.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-blue-500">
          <FaLaptopCode className="text-blue-500 text-3xl mb-4" />
          <h3 className="font-bold text-xl dark:text-white mb-2">The Tech</h3>
          <p className="text-sm text-gray-500">Engineered using React 18, Vite, and Tailwind CSS, utilizing Framer Motion for high-fidelity UI animations.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-b-4 border-green-500">
          <FaHandshake className="text-green-500 text-3xl mb-4" />
          <h3 className="font-bold text-xl dark:text-white mb-2">Core Values</h3>
          <p className="text-sm text-gray-500">Transparency in pricing, secure local data persistence, and a commitment to dark-mode accessibility.</p>
        </div>
      </section>

      {/* Section 3: Developer Profile */}
      <section className="bg-gray-900 text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <FaLaptopCode size={150} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden shadow-2xl">
            <img src={devPhoto} alt="Ishu Sharma" /> 
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase">Ishu Sharma</h2>
              <p className="text-primary font-bold tracking-widest text-sm">Lead Developer & UI Architect</p>
            </div>
            
            <p className="text-gray-400 max-w-lg">
              Currently contributing as an **Intern at Jasiq Lab**, specializing in frontend architecture 
              and interactive user interfaces. I am passionate about creating clean, maintainable code 
              that solves real-world retail challenges.
            </p>

            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-primary transition-colors text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Professional Documentation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black dark:text-white uppercase">Project Documentation</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border dark:border-gray-700 space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Architecture</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Component-based structure for scalability.</li>
                <li>Context API for global state management.</li>
                <li>Localized storage for cart and wishlist persistence.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Performance</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Optimized assets for rapid load times.</li>
                <li>Responsive breakpoints for all mobile devices.</li>
                <li>Adaptive theme engine (Day/Night mode).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}