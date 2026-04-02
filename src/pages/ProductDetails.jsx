import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { products } from '../utils/mockData';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBolt, FaHeart, FaArrowLeft, FaShieldAlt, FaTruck } from 'react-icons/fa';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, clearCart } = useContext(AppContext);

  // Find the specific product
  const product = products.find(p => p.id === parseInt(id));
  const isWishlisted = wishlist.some(item => item.id === product?.id);

  // Scroll to top whenever the product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="text-center py-20 uppercase font-black">Product Not Found</div>;

  const handleBuyNow = () => {
    clearCart();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto py-10 px-4"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-bold uppercase text-xs tracking-widest transition-colors"
      >
        <FaArrowLeft /> Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: Large Hero Image */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative group rounded-[3rem] overflow-hidden shadow-2xl border dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[500px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <button 
            onClick={() => toggleWishlist(product)}
            className="absolute top-6 right-6 p-4 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-xl hover:scale-110 transition-transform"
          >
            <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} size={24} />
          </button>
        </motion.div>

        {/* RIGHT: Product Details */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Aaraz Exclusive</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
              {product.name}
            </h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Category: {product.category}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-black text-primary">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-gray-400 line-through text-lg font-bold">₹{(product.price + 500).toLocaleString('en-IN')}</span>
            <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Save ₹500</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
            Elevate your style with the {product.name}. Designed for the modern trendsetter, 
            this piece combines premium fabric with Aaraz's signature comfort-fit technology. 
            Perfect for both casual outings and high-end events.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 border-y dark:border-gray-700 py-6">
            <div className="flex items-center gap-3 text-xs font-bold dark:text-gray-300">
              <FaTruck className="text-primary" /> Free Express Delivery
            </div>
            <div className="flex items-center gap-3 text-xs font-bold dark:text-gray-300">
              <FaShieldAlt className="text-primary" /> 1 Year Warranty
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-3 transition-all"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-600 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transform active:scale-95 transition-all"
            >
             Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}