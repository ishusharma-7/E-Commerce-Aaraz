import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { generateInvoice } from '../utils/generateInvoice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaCalendarAlt, FaDownload, FaBoxOpen, FaTimes, FaCheckCircle, FaFileInvoice 
} from 'react-icons/fa';

export default function Account() {
  const { user, orders, updateUserInfo, logout } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user ? { ...user } : {});

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <FaUserCircle className="text-gray-300 text-7xl md:text-8xl mb-4" />
        <h2 className="text-xl md:text-2xl font-black dark:text-white uppercase tracking-tighter">Profile Locked</h2>
        <p className="text-gray-500 mb-6 text-sm md:text-base">Please log in to view your orders and personal details.</p>
        <a href="/auth" className="bg-primary text-white px-10 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">Login to Aaraz</a>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserInfo(editData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 py-4 md:py-6 px-4">
      
      {/* --- SECTION 1: PROFILE HEADER --- */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border dark:border-gray-700"
      >
        <div className="bg-gradient-to-r from-primary to-pink-500 h-24 md:h-32 w-full" />
        <div className="px-4 md:px-8 pb-8 md:pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end -mt-10 md:-mt-12 mb-6 md:mb-8 gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 md:border-8 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-3xl md:text-5xl font-black text-primary shadow-xl">
                {user.fullName?.charAt(0) || "U"}
              </div>
              <div className="pb-0 md:pb-2">
                <h1 className="text-2xl md:text-4xl font-black dark:text-white uppercase tracking-tighter leading-tight">{user.fullName}</h1>
                <p className="text-primary font-bold tracking-widest text-[9px] md:text-[10px] uppercase">Aaraz Official Member</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => { setEditData({...user}); setIsEditing(true); }}
                className="flex-1 md:flex-none bg-gray-900 dark:bg-primary text-white px-4 md:px-6 py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg"
              >
                Edit Profile
              </button>
              <button 
                onClick={logout}
                className="flex-1 md:flex-none bg-red-500 text-white px-4 md:px-6 py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* User Details Grid - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 border-t dark:border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl md:rounded-2xl border dark:border-gray-800 text-center sm:text-left">
              <FaEnvelope className="text-primary text-sm md:text-base" />
              <div className="overflow-hidden w-full">
                <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black">Email</p>
                <p className="font-bold dark:text-white text-[10px] md:text-sm truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl md:rounded-2xl border dark:border-gray-800 text-center sm:text-left">
              <FaPhone className="text-blue-500 text-sm md:text-base" />
              <div className="w-full">
                <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black">Phone</p>
                <p className="font-bold dark:text-white text-[10px] md:text-sm">{user.phone || "Not Set"}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl md:rounded-2xl border dark:border-gray-800 text-center sm:text-left">
              <FaCalendarAlt className="text-green-500 text-sm md:text-base" />
              <div className="w-full">
                <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black">Age</p>
                <p className="font-bold dark:text-white text-[10px] md:text-sm">{user.age || "0"} Years</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl md:rounded-2xl border dark:border-gray-800 text-center sm:text-left">
              <FaMapMarkerAlt className="text-orange-500 text-sm md:text-base" />
              <div className="w-full">
                <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-black">City</p>
                <p className="font-bold dark:text-white text-[10px] md:text-sm truncate">{user.address || "No Address"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SECTION 2: ORDER HISTORY --- */}
      <section className="space-y-6 md:space-y-8">
        <h2 className="text-2xl md:text-3xl font-black dark:text-white uppercase tracking-tighter flex items-center gap-3 md:gap-4">
          <FaBoxOpen className="text-primary" /> Order History
        </h2>

        {(!orders || orders.length === 0) ? (
          <div className="bg-white dark:bg-gray-800 p-12 md:p-16 rounded-[2rem] md:rounded-[3rem] text-center border dark:border-gray-700 shadow-xl">
             <p className="text-gray-500 font-bold italic uppercase tracking-widest text-xs md:text-sm">No order history found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {orders.map((order) => {
              const totalAmount = order.items?.reduce((sum, item) => sum + item.price, 0) || 0;
              
              return (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl overflow-hidden border dark:border-gray-700"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 px-4 md:px-8 py-4 md:py-6 border-b dark:border-gray-700 flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 md:gap-4">
                      <span className="bg-primary text-white text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-widest">
                        #{order.id}
                      </span>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500 font-black uppercase text-[10px]">
                      <FaCheckCircle className="text-xs" /> <span className="hidden sm:inline">{order.status}</span>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="p-4 md:p-8">
                    <div className="space-y-4 md:space-y-6">
                      <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] md:tracking-[0.2em] mb-2">Purchased Items</p>
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 md:gap-6 group">
                          <div className="flex items-center gap-3 md:gap-6 min-w-0">
                            <div className="h-14 w-14 md:h-20 md:w-20 rounded-xl md:rounded-2xl overflow-hidden shadow-md border dark:border-gray-700 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Product" }}
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-black text-gray-800 dark:text-white uppercase text-[11px] md:text-sm tracking-tight truncate leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[8px] md:text-[10px] text-primary font-bold uppercase mt-0.5">₹{item.price}</p>
                            </div>
                          </div>
                          <div className="text-right hidden sm:block">
                            <p className="font-black text-gray-900 dark:text-white text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Summary & Download */}
                    <div className="mt-6 md:mt-10 pt-6 md:pt-8 border-t-2 border-dashed dark:border-gray-700 flex flex-col gap-6">
                      <div className="flex justify-between items-center md:justify-start md:gap-12">
                        <div>
                          <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Paid</p>
                          <p className="text-xl md:text-3xl font-black text-primary leading-none">₹{totalAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700" />
                        <div className="text-right md:text-left">
                          <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Shipping To</p>
                          <p className="text-[10px] md:text-xs font-bold dark:text-white max-w-[120px] md:max-w-none truncate">{order.address || user.address}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => generateInvoice(order)}
                        className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl active:scale-95"
                      >
                        <FaDownload /> Download Invoice
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- SECTION 3: EDIT PROFILE MODAL --- */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onSubmit={handleUpdate}
              className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-10 space-y-4 md:space-y-6 relative border dark:border-gray-700 max-h-[90vh] overflow-y-auto"
            >
              <button type="button" onClick={() => setIsEditing(false)} className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-400 hover:text-red-500"><FaTimes size={20}/></button>
              <h2 className="text-xl md:text-3xl font-black dark:text-white uppercase tracking-tighter">Update Profile</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
                    <input type="text" value={editData.fullName} onChange={(e)=>setEditData({...editData, fullName: e.target.value})} className="w-full p-3 md:p-4 bg-gray-100 dark:bg-gray-900 rounded-xl md:rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Phone</label>
                    <input type="text" value={editData.phone} onChange={(e)=>setEditData({...editData, phone: e.target.value})} className="w-full p-3 md:p-4 bg-gray-100 dark:bg-gray-900 rounded-xl md:rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">Age</label>
                    <input type="number" value={editData.age} onChange={(e)=>setEditData({...editData, age: e.target.value})} className="w-full p-3 md:p-4 bg-gray-100 dark:bg-gray-900 rounded-xl md:rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 ml-1">City</label>
                    <input type="text" value={editData.address} onChange={(e)=>setEditData({...editData, address: e.target.value})} className="w-full p-3 md:p-4 bg-gray-100 dark:bg-gray-900 rounded-xl md:rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary text-sm" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest shadow-lg transform active:scale-95 transition-all text-xs md:text-sm">Save Changes</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}