import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import { products, testimonials, brands } from '../utils/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const getProductsByCategory = (category) => products.filter(p => p.category === category);

  // Define the slider data for easy maintenance
  const heroSlides = [
    {
      id: 'mens',
      title: "MEN'S",
      subtitle: "STREET STYLE",
      offer: "UP TO 40% OFF",
      btnText: "SHOP COLLECTION",
      bgColor: "bg-slate-100",
      img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1528&auto=format&fit=crop",
      textColor: "text-blue-600"
    },
    {
      id: 'womens',
      title: "WOMEN'S",
      subtitle: "SUMMER CHIC",
      offer: "NEW ARRIVALS",
      btnText: "EXPLORE NOW",
      bgColor: "bg-rose-50",
      img: "https://i.pinimg.com/736x/c9/b7/9b/c9b79b1810298b97157574e7d62a5c92.jpg",
      textColor: "text-primary"
    },
    {
      id: 'boys',
      title: "BOY'S",
      subtitle: "PLAYTIME READY",
      offer: "BUY 2 GET 1 FREE",
      btnText: "VIEW BOYS",
      bgColor: "bg-blue-50",
      img: "https://i.pinimg.com/736x/01/d3/30/01d3308f6bb69f975644d16f2fb47002.jpg",
      textColor: "text-blue-500"
    },
    {
      id: 'girls',
      title: "GIRL'S",
      subtitle: "PARTY SEASON",
      offer: "FESTIVE DEALS",
      btnText: "SHOP GIRLS",
      bgColor: "bg-purple-50",
      img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1470&auto=format&fit=crop",
      textColor: "text-purple-500"
    },
    {
      id: 'kids',
      title: "BABY & KIDS",
      subtitle: "COZY COMFORT",
      offer: "SOFT ORGANIC COTTON",
      btnText: "SHOP INFANTS",
      bgColor: "bg-yellow-50",
      img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1470&auto=format&fit=crop",
      textColor: "text-amber-600"
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* --- HERO SECTION: EXPANDED 5-SLIDE BANNERS --- */}
      <section className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px]">
        
        {/* 1. Large Auto Slider (70% Width) */}
        <div className="w-full lg:w-[70%] h-[350px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border dark:border-gray-700">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect={'fade'} // Professional fade transition
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            loop={true}
            className="h-full w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`relative h-full w-full ${slide.bgColor} dark:bg-gray-800 flex items-center px-8 lg:px-16 overflow-hidden`}>
                   {/* Text Content */}
                   <motion.div 
                     initial={{ x: -50, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ duration: 0.8 }}
                     className="z-10 max-w-lg space-y-4"
                   >
                      <h3 className={`${slide.textColor} font-black tracking-[0.3em] uppercase text-sm`}>
                        {slide.offer}
                      </h3>
                      <h2 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.9]">
                        {slide.title} <br/> 
                        <span className="text-2xl lg:text-4xl font-light tracking-tight text-gray-500 dark:text-gray-400">
                          {slide.subtitle}
                        </span>
                      </h2>
                      <Link 
                        to={`/category/${slide.id}`} 
                        className="inline-block bg-gray-900 dark:bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-transform shadow-lg"
                      >
                        {slide.btnText}
                      </Link>
                   </motion.div>

                   {/* Image Content */}
                   <img 
                     src={slide.img} 
                     className="absolute right-0 bottom-0 h-full w-[65%] object-cover object-center opacity-90 md:opacity-100 mask-gradient-left" 
                     alt={slide.title} 
                   />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* 2. Side Promotional Banners (30% Width - Unchanged) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4 h-full">
          <motion.div whileHover={{ scale: 1.02 }} className="h-[242px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Sale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-bold bg-primary w-fit px-2 py-1 rounded mb-2">LIMITED TIME</span>
              <h3 className="text-2xl font-black uppercase">Fashion Sale</h3>
              <p className="text-xs opacity-80">Up to 50% Off on Premium Brands</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="h-[242px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Trends" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <p className="text-xs font-medium italic text-primary">New Trend 2026</p>
              <h3 className="text-2xl font-black uppercase">Women's Hub</h3>
              <Link to="/category/womens" className="mt-2 text-xs font-bold underline hover:text-primary transition-colors">SHOP COLLECTION</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REST OF THE PAGE: CATEGORIES, PRODUCTS, ETC --- */}
      {/* (Keep previous category and product slider code here) */}

    </div>
  );
}