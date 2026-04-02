import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { products } from '../../utils/mockData'; // Import products for searching
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMoon, FaSun, FaHeart, FaShoppingCart, 
  FaBars, FaSearch, FaUser, FaChevronRight, FaCreditCard, FaTimes 
} from 'react-icons/fa';

export default function Navbar() {
  const { theme, toggleTheme, user, logout, cart, wishlist } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- Search Logic States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const menuRef = useRef(null);
  const searchContainerRef = useRef(null); // Ref to detect clicks outside search
  const navigate = useNavigate();
  
  const categories = ['Mens', 'Womens', 'Boys', 'Girls', 'Kids'];

  // Handle Search Input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase()) || 
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6); // Limit to 6 suggestions for UI cleanliness
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    toggleMenu(e);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm border-b dark:border-gray-700">
        <div className="flex gap-3 sm:gap-4">
          {user ? (
            <button onClick={logout} className="text-red-500 font-semibold hover:text-red-700 transition">Logout</button>
          ) : (
            <Link to="/auth" className="text-green-600 font-semibold hover:text-green-800 transition">Login / Register</Link>
          )}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleTheme} 
            className="relative flex items-center justify-center w-8 h-8 text-gray-600 dark:text-yellow-400 text-lg focus:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 30, opacity: 0, rotate: 40 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -30, opacity: 0, rotate: -40 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </motion.div>
            </AnimatePresence>
          </button>

          <Link to="/wishlist" onClick={closeMenu} className="flex relative text-pink-500 text-xl hover:scale-110 transition-transform">
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" onClick={closeMenu} className="flex relative text-blue-500 text-xl hover:scale-110 transition-transform">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-3xl font-bold text-primary tracking-widest" onClick={closeMenu}>Aaraz.</Link>
        
        <div ref={searchContainerRef} className="relative flex w-full md:w-1/2">
          <div className="flex w-full bg-gray-100 dark:bg-gray-800 rounded-md p-2 border border-transparent focus-within:border-primary transition-all">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              className="bg-transparent w-full outline-none px-2 text-gray-700 dark:text-gray-200" 
            />
            <button className="text-primary px-2 hover:scale-110 transition-transform"><FaSearch /></button>
          </div>

          <AnimatePresence>
            {showSuggestions && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden z-[100] border dark:border-gray-700"
              >
                {suggestions.length > 0 ? (
                  suggestions.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b last:border-0 dark:border-gray-700"
                    >
                      <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-md" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{product.name}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{product.category}</p>
                      </div>
                      <p className="ml-auto text-xs font-bold text-gray-400">₹{product.price}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">No products found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Primary Nav */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 flex items-center">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={handleHomeClick}
              className={`flex items-center gap-2 py-3 px-6 transition-colors font-bold uppercase tracking-wider ${isMenuOpen ? 'bg-pink-900' : 'bg-pink-700 hover:bg-pink-800'}`}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />} Home
            </button>
            
            {/* UPDATED: Added scrolling and max-height for mobile only */}
            <div className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col absolute bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-2xl w-64 z-[100] border-t-4 border-pink-900 animate-in fade-in zoom-in-95 duration-150 max-h-[75vh] md:max-h-none overflow-y-auto custom-scrollbar`}>
              
              <Link to="/account" onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                <span className="flex items-center gap-3"><FaUser className="text-xs" /> My Account</span>
                <FaChevronRight className="text-[10px] opacity-30" />
              </Link>

              <Link to="/about" onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                <span className="flex items-center gap-3 font-medium">About Us</span>
                <FaChevronRight className="text-[10px] opacity-30" />
              </Link>

              <Link to="/checkout" onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                <span className="flex items-center gap-3"><FaCreditCard className="text-xs" /> Checkout</span>
                <FaChevronRight className="text-[10px] opacity-30" />
              </Link>

              <Link to="/wishlist" onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                <span className="flex items-center gap-3"><FaHeart className="text-xs text-pink-500" /> My Wishlist</span>
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{wishlist.length}</span>
              </Link>

              <Link to="/cart" onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                <span className="flex items-center gap-3"><FaShoppingCart className="text-xs text-blue-500" /> My Cart</span>
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">{cart.length}</span>
              </Link>

              <div className="md:hidden">
                <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Shop Categories</div>
                {categories.map(cat => (
                  <Link key={cat} to={`/category/${cat.toLowerCase()}`} onClick={closeMenu} className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors">
                    {cat} <FaChevronRight className="text-[10px] opacity-30" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 ml-8">
            {categories.map(cat => (
              <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="py-3 font-semibold hover:text-pink-200 transition-colors relative group">
                {cat}'s
                <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-pink-200 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}