import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useState, useEffect } from 'react'; 
import { FaChevronUp } from 'react-icons/fa'; 
import ProductCard from '../components/ui/ProductCard';
import { products, testimonials, brands } from '../utils/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const getProductsByCategory = (category) => products.filter(p => p.category === category);

  // --- Scroll to Top Logic ---
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowScroll(true);
      else setShowScroll(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryImages = {
    Mens: "https://i.pinimg.com/originals/07/96/f1/0796f14dcd4b05bed07d2cd97263181d.jpg",
    Womens: "https://tse2.mm.bing.net/th/id/OIP.Nn2Wi7IVDdmizKvTpT6QMQHaLH?w=824&h=1236&rs=1&pid=ImgDetMain&o=7&rm=3",
    Boys: "https://tse3.mm.bing.net/th/id/OIP.z8vNqY2I8ZUFiy3a9FWHwAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    Girls: "https://i.pinimg.com/originals/ad/4d/69/ad4d69c8c90e9ea21164de31d664aa63.jpg",
    Kids: "https://tse1.explicit.bing.net/th/id/OIP.B5uIf_OAI0jEU2T0wRWyBgHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3"
  };

  const heroSlides = [
    { id: 'mens', title: "MEN'S", subtitle: "STREET STYLE", offer: "UP TO 40% OFF", btnText: "SHOP COLLECTION", bgColor: "bg-slate-100", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1528&auto=format&fit=crop", textColor: "text-blue-600" },
    { id: 'womens', title: "WOMEN'S", subtitle: "SUMMER CHIC", offer: "NEW ARRIVALS", btnText: "EXPLORE NOW", bgColor: "bg-rose-50", img: "https://i.pinimg.com/736x/c9/b7/9b/c9b79b1810298b97157574e7d62a5c92.jpg", textColor: "text-primary" },
    { id: 'boys', title: "BOY'S", subtitle: "PLAYTIME READY", offer: "BUY 2 GET 1 FREE", btnText: "VIEW BOYS", bgColor: "bg-blue-50", img: "https://i.pinimg.com/736x/01/d3/30/01d3308f6bb69f975644d16f2fb47002.jpg", textColor: "text-blue-500" },
    { id: 'girls', title: "GIRL'S", subtitle: "PARTY SEASON", offer: "FESTIVE DEALS", btnText: "SHOP GIRLS", bgColor: "bg-purple-50", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1470&auto=format&fit=crop", textColor: "text-purple-500" },
    { id: 'kids', title: "BABY & KIDS", subtitle: "COZY COMFORT", offer: "SOFT ORGANIC COTTON", btnText: "SHOP INFANTS", bgColor: "bg-yellow-50", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1470&auto=format&fit=crop", textColor: "text-amber-600" }
  ];

  const CategoryProductSlider = ({ title, category }) => {
    const categoryProducts = getProductsByCategory(category);
    return (
      <section className="transform-gpu">
        <div className="flex items-end justify-between mb-8 border-b-2 border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">{title}</h2>
            <div className="h-1 w-20 bg-primary mt-2"></div>
          </div>
          <Link to={`/category/${category}`} className="bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full text-xs font-black uppercase hover:bg-primary hover:text-white transition-all">View All</Link>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          // FIX: Only loop if we have enough products to fill the view breakpoints
          loop={categoryProducts.length > 4} 
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categoryProducts.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  };

  return (
    <div className="space-y-20 relative overflow-x-hidden">
      
      {/* --- MOBILE UPWARD NAVIGATION --- */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="md:hidden fixed bottom-6 right-6 z-[60] bg-primary text-white p-4 rounded-full shadow-2xl border-2 border-white dark:border-gray-700 active:scale-90 transition-transform"
          >
            <FaChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px] transform-gpu">
        <div className="w-full lg:w-[70%] h-[350px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border dark:border-gray-700">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect={'fade'}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            loop={true}
            className="h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`relative h-full w-full ${slide.bgColor} dark:bg-gray-800 flex items-center px-8 lg:px-16 overflow-hidden`}>
                   <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="z-10 max-w-lg space-y-4">
                      <h3 className={`${slide.textColor} font-black tracking-[0.3em] uppercase text-sm`}>{slide.offer}</h3>
                      <h2 className="text-4xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.9]">
                        {slide.title} <br/> 
                        <span className="text-2xl lg:text-4xl font-light tracking-tight text-gray-500 dark:text-gray-400">{slide.subtitle}</span>
                      </h2>
                      <Link to={`/category/${slide.id}`} className="inline-block bg-gray-900 dark:bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-transform shadow-lg">
                        {slide.btnText}
                      </Link>
                   </motion.div>
                   <img src={slide.img} className="absolute right-0 bottom-0 h-full w-[65%] object-cover object-center opacity-90 md:opacity-100 will-change-transform" style={{maskImage: 'linear-gradient(to right, transparent, black 40%)'}} alt={slide.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="w-full lg:w-[30%] flex flex-col gap-4 h-full transform-gpu">
          <motion.div whileHover={{ scale: 1.02 }} className="h-[242px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Sale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <span className="text-xs font-bold bg-primary w-fit px-2 py-1 rounded mb-2">LIMITED TIME</span>
              <h3 className="text-2xl font-black uppercase">Fashion Sale</h3>
              <p className="text-xs opacity-80 text-left">Up to 50% Off</p>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="h-[242px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Trends" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <p className="text-xs font-medium italic text-primary">New Trend 2026</p>
              <h3 className="text-2xl font-black uppercase">Women's Hub</h3>
              <Link to="/category/womens" className="mt-2 text-xs font-bold underline hover:text-primary transition-colors">SHOP COLLECTION</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORY CIRCULAR SWIPER --- */}
      <section className="py-12 bg-gray-100/50 dark:bg-gray-800/30 rounded-[3rem] p-4 md:p-8 border border-white dark:border-gray-800 shadow-inner transform-gpu">
        <div className="text-center mb-10">
            <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-2">Discover</h4>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">Shop by Category</h2>
        </div>

        <Swiper 
          modules={[Autoplay]} 
          spaceBetween={15}
          slidesPerView={2.2}
          autoplay={{ delay: 3000, disableOnInteraction: false }} 
          // FIX: Set to false if items <= max slidesPerView (5)
          loop={['Mens', 'Womens', 'Boys', 'Girls', 'Kids'].length > 5} 
          observer={true}
          observeParents={true}
          breakpoints={{ 
            640: { slidesPerView: 3, spaceBetween: 20 }, 
            1024: { slidesPerView: 5, spaceBetween: 30 } 
          }}
        >
          {['Mens', 'Womens', 'Boys', 'Girls', 'Kids'].map(cat => (
            <SwiperSlide key={cat}>
              <Link to={`/category/${cat.toLowerCase()}`} className="group block text-center">
                <div className="relative aspect-square rounded-full overflow-hidden border-4 md:border-8 border-white dark:border-gray-700 shadow-xl mx-auto w-28 h-28 md:w-44 md:h-44 mb-4">
                  <img 
                    src={categoryImages[cat]} 
                    alt={cat} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform" 
                  />
                </div>
                <h3 className="font-black text-gray-800 dark:text-white group-hover:text-primary transition-colors text-sm md:text-lg uppercase">{cat}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- PRODUCT AUTO-SLIDERS --- */}
      <div className="space-y-24 transform-gpu">
        <CategoryProductSlider title="Men's Top Section" category="mens" />
        <CategoryProductSlider title="Women's Hub" category="womens" />
        <CategoryProductSlider title="Boy's Choice" category="boys" />
        <CategoryProductSlider title="Girl's Selection" category="girls" />
      </div>

      {/* --- TESTIMONIALS --- */}
      <section className="relative py-28 bg-gray-900 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl transform-gpu">
        <div className="absolute inset-0 opacity-20 grayscale scale-110">
           <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Store" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-12 uppercase tracking-tighter">Customer Reviews</h2>
          <Swiper 
            modules={[Autoplay, Pagination]} 
            autoplay={{ delay: 5000 }} 
            loop={testimonials.length > 1} 
            pagination={{ clickable: true }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="pb-14">
                <div className="mb-10 flex justify-center">
                   <div className="p-1 rounded-full bg-gradient-to-tr from-primary to-blue-500 shadow-2xl">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-900 overflow-hidden">
                         <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                   </div>
                </div>
                <p className="text-lg md:text-3xl italic leading-relaxed text-gray-100 font-light px-4">"{t.review}"</p>
                <div className="mt-8">
                    <h4 className="font-black uppercase tracking-[0.3em] text-white">— {t.name}</h4>
                    <p className="text-xs text-primary font-bold mt-1 uppercase">Verified Customer</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- BRAND SLIDER --- */}
      <section className="py-16 transform-gpu">
        <Swiper 
          modules={[Autoplay]} 
          spaceBetween={20} 
          slidesPerView={3} 
          autoplay={{ delay: 2000 }} 
          // FIX: Only loop if brands exceed max view (6)
          loop={brands.length > 6} 
          breakpoints={{ 
            768: { slidesPerView: 4 }, 
            1024: { slidesPerView: 6 } 
          }}
        >
          {brands.map(brand => (
            <SwiperSlide key={brand.id}>
              <div className="flex justify-center items-center h-16 md:h-24 opacity-30 hover:opacity-100 transition-all cursor-pointer">
                 <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-12 grayscale hover:grayscale-0" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
}