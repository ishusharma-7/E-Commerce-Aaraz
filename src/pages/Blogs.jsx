import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../utils/mockData';
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaQuoteLeft } from 'react-icons/fa';

export default function Blogs() {
  const [expandedId, setExpandedId] = useState(null);

  const blogPosts = [
    { 
      id: 1, 
      title: "Summer Fashion Trends 2026", 
      date: "April 1, 2026", 
      excerpt: "Discover the hottest styles hitting the streets of Ranchi this summer...", 
      content: "This summer, Ranchi is seeing a massive shift towards breathable organic cottons and oversized silhouettes. Key trends include pastel linen co-ord sets, chunky platform sandals, and sustainable accessories. At Aaraz, we've curated a collection that focuses on 'Cool Comfort'—ensuring you stay stylish even in the peak heat of Jharkhand.",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=500" 
    },
    { 
      id: 2, 
      title: "How to Style Your Aaraz Blazers", 
      date: "March 25, 2026", 
      excerpt: "From office meetings to evening dinners, here is how to rock a blazer...", 
      content: "The Aaraz Navy Blue Blazer is a versatile powerhouse. For a professional look, pair it with our slim-fit white formal shirt and charcoal trousers. Transitioning to a night out? Swap the trousers for dark wash denim and a graphic tee. Our blazers are engineered with a slight stretch to ensure full mobility.",
      img: "https://i.pinimg.com/1200x/35/e5/f4/35e5f4424b89ca7af0f8cf6bcf79b1f6.jpg" 
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-20 px-4">
      <section>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tighter">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogPosts.map(post => (
            <motion.div 
              layout
              key={post.id} 
              // --- HERO HOVER ANIMATION ---
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 } 
              }}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl border border-transparent hover:border-primary/20 dark:border-gray-700 transition-shadow duration-300 h-fit cursor-default"
            >
              {/* Image Container with Zoom Effect */}
              <div className="h-72 overflow-hidden relative group">
                <motion.img 
                  src={post.img} 
                  alt={post.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  Trending
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex items-center text-xs text-primary font-bold gap-2">
                  <FaCalendarAlt /> {post.date}
                </div>
                <h3 className="text-2xl font-bold dark:text-white leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <AnimatePresence>
                  {expandedId === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {post.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => toggleExpand(post.id)}
                  className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:tracking-[0.2em] transition-all pt-2"
                >
                  {expandedId === post.id ? (
                    <>Show Less <FaChevronUp /></>
                  ) : (
                    <>Read More <FaChevronDown /></>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-[4rem] border dark:border-gray-700">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tighter text-center">Customer Voice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <motion.div 
              key={t.id} 
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-md relative group border dark:border-gray-800"
            >
              <FaQuoteLeft className="text-primary/10 text-5xl absolute top-4 left-4 group-hover:text-primary/20 transition-colors" />
              <p className="italic text-gray-600 dark:text-gray-300 relative z-10 mb-6 leading-relaxed">"{t.review}"</p>
              <div className="flex items-center gap-4 border-t dark:border-gray-800 pt-4">
                <img src={t.image} className="w-12 h-12 rounded-full border-2 border-primary" alt={t.name} />
                <div>
                  <h4 className="font-bold dark:text-white">{t.name}</h4>
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Verified Buyer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}