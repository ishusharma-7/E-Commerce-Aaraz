import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';

export default function Auth() {
  const { loginUser, registerUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', age: '', address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (loginUser(formData.email, formData.password)) navigate('/');
    } else {
      if (registerUser(formData)) navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border dark:border-gray-700"
      >
        <div className="flex border-b dark:border-gray-700">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-5 font-black uppercase text-xs tracking-widest ${isLogin ? 'text-primary border-b-4 border-primary' : 'text-gray-400'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-5 font-black uppercase text-xs tracking-widest ${!isLogin ? 'text-primary border-b-4 border-primary' : 'text-gray-400'}`}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {!isLogin && (
                <>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                    <input name="fullName" type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
                  </div>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-4 text-gray-400" />
                    <input name="phone" type="tel" placeholder="Phone Number" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
                  </div>
                </>
              )}

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                <input name="email" type="email" placeholder="Email" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-gray-400" />
                <input name="password" type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
              </div>

              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <FaBirthdayCake className="absolute left-4 top-4 text-gray-400" />
                    <input name="age" type="number" placeholder="Age" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
                  </div>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                    <input name="address" type="text" placeholder="City" required className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white outline-none" onChange={handleChange} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg transform active:scale-95 transition-all">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}