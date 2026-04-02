import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaCreditCard, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

export default function Checkout() {
  const { cart, user, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [addressOption, setAddressOption] = useState('current'); 
  const [otherAddress, setOtherAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const finalAddress = addressOption === 'current' ? user.address : otherAddress;

    if (addressOption === 'other' && !otherAddress.trim()) {
      alert("Please enter the delivery address!");
      return;
    }

    placeOrder(finalAddress);
    setIsOrdered(true);
    
    setTimeout(() => {
      navigate('/account');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          className="text-green-500 text-9xl mb-6"
        >
          <FaCheckCircle />
        </motion.div>
        <h2 className="text-5xl font-black dark:text-white uppercase tracking-tighter">Success!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Your order has been placed. Fetching your account details...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <FaShoppingBag className="text-gray-200 text-9xl mb-4" />
        <h2 className="text-2xl font-black dark:text-white uppercase">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-bold">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-4">
          <FaTruck className="text-primary" /> Checkout
        </h1>
        <p className="text-gray-500 font-medium">Finalize your order and choose your delivery destination.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase mb-8 flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" /> Shipping Destination
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Profile Address */}
              <div 
                onClick={() => setAddressOption('current')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${addressOption === 'current' ? 'border-primary bg-pink-50/50 dark:bg-primary/10' : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${addressOption === 'current' ? 'border-primary' : 'border-gray-300'}`}>
                      {addressOption === 'current' && <div className="w-3 h-3 bg-primary rounded-full" />}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white uppercase text-sm">Profile Address</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{user?.address || "No address saved"}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Home</span>
                </div>
              </div>

              {/* Other Address */}
              <div 
                onClick={() => setAddressOption('other')}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${addressOption === 'other' ? 'border-primary bg-pink-50/50 dark:bg-primary/10' : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'}`}
              >
                <div className="flex gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${addressOption === 'other' ? 'border-primary' : 'border-gray-300'}`}>
                    {addressOption === 'other' && <div className="w-3 h-3 bg-primary rounded-full" />}
                  </div>
                  <div className="flex-grow">
                    <p className="font-black text-gray-900 dark:text-white uppercase text-sm">Ship to a New Address</p>
                    <AnimatePresence>
                      {addressOption === 'other' && (
                        <motion.textarea
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          placeholder="Enter your detailed delivery address here..."
                          value={otherAddress}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setOtherAddress(e.target.value)}
                          className="w-full mt-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary text-sm"
                          rows="3"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase mb-4 flex items-center gap-3">
              <FaCreditCard className="text-primary" /> Payment
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border-l-4 border-green-500">
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Cash on Delivery (COD) Selected</p>
              <p className="text-[10px] text-gray-400 uppercase mt-1">Pay only when you receive your package.</p>
            </div>
          </section>
        </div>

        {/* RIGHT: Order Summary (Fixed Light/Dark Theme) */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 sticky top-24">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-6 tracking-tighter">Order Summary</h3>
            
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="font-black text-gray-900 dark:text-white">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t dark:border-gray-700 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>SUBTOTAL</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-green-500">
                <span>SHIPPING</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="font-black text-gray-900 dark:text-white uppercase">Total</span>
                <span className="text-3xl font-black text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}