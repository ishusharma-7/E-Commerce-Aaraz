import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FaMoon, FaSun, FaHeart, FaShoppingCart, FaBars, FaSearch, FaUser, FaCheckSquare } from 'react-icons/fa';

export default function Navbar() {
  const { theme, toggleTheme, user, logout, cart, wishlist } = useContext(AppContext);
  const categories = ['Mens', 'Womens', 'Boys', 'Girls', 'Kids'];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm border-b dark:border-gray-700">
        <div className="flex gap-4">
          {user ? (
            <button onClick={logout} className="text-red-500 font-semibold hover:text-red-700 transition">Logout</button>
          ) : (
            <Link to="/auth" className="text-green-600 font-semibold hover:text-green-800 transition">Login / Register</Link>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 text-lg hover:rotate-12 transition-transform">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <Link to="/wishlist" className="relative text-pink-500 text-xl">
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-blue-500 text-xl">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Logo & Search */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-3xl font-bold text-primary tracking-widest">Aaraz.</Link>
        <div className="flex w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-md p-2 border border-transparent focus-within:border-primary transition-all">
          <input 
            type="text" 
            placeholder="Search entire store here..." 
            className="bg-transparent w-full outline-none px-2 text-gray-700 dark:text-gray-200" 
          />
          <button className="text-primary px-2"><FaSearch /></button>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 flex items-center">
          
          {/* Home Burger Button */}
          <div className="relative group">
            <Link 
              to="/" 
              className="flex items-center gap-2 py-3 px-6 bg-pink-700 hover:bg-pink-800 transition-colors font-bold uppercase tracking-wider"
            >
              <FaBars /> Home
            </Link>
            
            {/* Dropdown Menu - Simplified with Utility Links */}
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-2xl w-56 z-[100] border-t-2 border-primary">
              <Link to="/account" className="px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors flex items-center gap-3">
                <FaUser className="text-sm opacity-70" /> My Account
              </Link>
              <Link to="/checkout" className="px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors flex items-center gap-3">
                <FaCheckSquare className="text-sm opacity-70" /> Checkout
              </Link>
              <Link to="/cart" className="px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors flex items-center gap-3">
                <FaShoppingCart className="text-sm opacity-70 text-blue-500" /> My Cart ({cart.length})
              </Link>
              <Link to="/wishlist" className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors flex items-center gap-3">
                <FaHeart className="text-sm opacity-70 text-pink-500" /> My Wishlist ({wishlist.length})
              </Link>
            </div>
          </div>

          {/* Dedicated Category Links */}
          <nav className="hidden md:flex gap-8 ml-8">
            {categories.map(cat => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase()}`} 
                className="py-3 font-semibold hover:text-pink-200 transition-colors relative group"
              >
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