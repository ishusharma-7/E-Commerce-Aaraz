import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ProductCard from '../components/ui/ProductCard';
import { products, testimonials, brands } from '../utils/mockData';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const getProducts = (cat) => products.filter(p => p.category === cat);

  return (
    <div className="space-y-16">
      <section className="h-64 md:h-96 rounded-lg overflow-hidden shadow-lg bg-pink-100 flex items-center justify-center">
         <h2 className="text-4xl md:text-6xl font-bold text-gray-800">SUMMER SALE 30% OFF</h2>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white uppercase">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Mens', 'Womens', 'Boys', 'Girls', 'Kids'].map(cat => (
            <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="h-40 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition shadow-md">
              <span className="text-xl font-bold text-gray-800">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {['mens', 'womens'].map(category => (
        <section key={category} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 dark:text-white uppercase border-l-4 border-primary pl-3">{category} Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {getProducts(category).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}