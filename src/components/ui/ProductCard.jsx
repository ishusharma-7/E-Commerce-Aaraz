import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaHeart, FaShoppingCart, FaBolt } from 'react-icons/fa'; // Added FaBolt for Buy Now
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Function to handle instant purchase
  const handleBuyNow = () => {
    clearCart(); // Clear current cart to focus on this single product
    addToCart(product); // Add the specific product
    navigate('/checkout'); // Redirect to checkout instantly
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden relative group border border-transparent hover:border-primary/20 transition-all duration-300"
    >
      {/* Wishlist Button */}
      <button 
        onClick={() => toggleWishlist(product)} 
        className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 dark:bg-gray-900/90 rounded-full hover:scale-110 transition-transform shadow-md"
      >
        <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} />
      </button>

      {/* Product Image */}
      <div className="h-64 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Aaraz+Fashion" }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-gray-800 dark:text-gray-200 font-black text-sm uppercase tracking-tight truncate">
          {product.name}
        </h3>
        
        <p className="text-primary font-black text-xl mt-1">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* Action Buttons Side-by-Side */}
        <div className="flex gap-2 mt-5">
          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(product)} 
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FaShoppingCart className="text-blue-500" /> Cart
          </button>

          {/* Buy Now Button */}
          <button 
            onClick={handleBuyNow} 
            className="flex-1 bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}