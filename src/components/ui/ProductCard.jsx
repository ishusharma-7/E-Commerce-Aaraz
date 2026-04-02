import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useContext(AppContext);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative group">
      <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full hover:scale-110 transition-transform">
        <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} />
      </button>
      <div className="h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-gray-800 dark:text-gray-200 font-medium truncate">{product.name}</h3>
        <p className="text-primary font-bold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
        <button onClick={() => addToCart(product)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}