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

  // Safety Check: If no user is logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <FaUserCircle className="text-gray-300 text-8xl mb-4" />
        <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Profile Locked</h2>
        <p className="text-gray-500 mb-6">Please log in to view your orders and personal details.</p>
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
    <div className="max-w-6xl mx-auto space-y-12 py-6 px-4">
      
      {/* --- SECTION 1: PROFILE HEADER --- */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl overflow-hidden border dark:border-gray-700"
      >
        <div className="bg-gradient-to-r from-primary to-pink-500 h-32 w-full" />
        <div className="px-8 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-end -mt-12 mb-8 gap-6">
            <div className="flex items-end gap-6">
              <div className="h-32 w-32 rounded-full border-8 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-5xl font-black text-primary shadow-xl">
                {user.fullName?.charAt(0) || "U"}
              </div>
              <div className="pb-2">
                <h1 className="text-4xl font-black dark:text-white uppercase tracking-tighter">{user.fullName}</h1>
                <p className="text-primary font-bold tracking-widest text-[10px] uppercase">Aaraz Official Member</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setEditData({...user}); setIsEditing(true); }}
                className="bg-gray-900 dark:bg-primary text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
              >
                Edit Profile
              </button>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t dark:border-gray-700 pt-8">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border dark:border-gray-800">
              <FaEnvelope className="text-primary" />
              <div><p className="text-[10px] text-gray-400 uppercase font-black">Email</p><p className="font-bold dark:text-white text-sm truncate max-w-[150px]">{user.email}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border dark:border-gray-800">
              <FaPhone className="text-blue-500" />
              <div><p className="text-[10px] text-gray-400 uppercase font-black">Phone</p><p className="font-bold dark:text-white text-sm">{user.phone || "Not Set"}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border dark:border-gray-800">
              <FaCalendarAlt className="text-green-500" />
              <div><p className="text-[10px] text-gray-400 uppercase font-black">Age</p><p className="font-bold dark:text-white text-sm">{user.age || "0"} Years</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border dark:border-gray-800">
              <FaMapMarkerAlt className="text-orange-500" />
              <div><p className="text-[10px] text-gray-400 uppercase font-black">City</p><p className="font-bold dark:text-white text-sm">{user.address || "No Address"}</p></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SECTION 2: ORDER HISTORY --- */}
      <section className="space-y-8">
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter flex items-center gap-4">
          <FaBoxOpen className="text-primary" /> Order History
        </h2>

        {(!orders || orders.length === 0) ? (
          <div className="bg-white dark:bg-gray-800 p-16 rounded-[3rem] text-center border dark:border-gray-700 shadow-xl">
             <p className="text-gray-500 font-bold italic uppercase tracking-widest">No order history found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {orders.map((order) => {
              const totalAmount = order.items?.reduce((sum, item) => sum + item.price, 0) || 0;
              
              return (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden border dark:border-gray-700"
                >
                  {/* Order Header Info */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-6 border-b dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                        Order #{order.id}
                      </span>
                      <p className="text-xs text-gray-400 font-bold uppercase">{new Date(order.date).toDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500 font-black uppercase text-xs">
                      <FaCheckCircle /> {order.status}
                    </div>
                  </div>

                  {/* Product List Section (Image & Name Side by Side) */}
                  <div className="p-8">
                    <div className="space-y-6">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Purchased Items</p>
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-6 group">
                          <div className="flex items-center gap-6">
                            {/* Product Image */}
                            <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-md border dark:border-gray-700 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Product" }}
                              />
                            </div>
                            {/* Product Name */}
                            <div>
                              <h4 className="font-black text-gray-800 dark:text-white uppercase text-sm tracking-tight leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-primary font-bold uppercase mt-1">Category: {item.category || "General"}</p>
                            </div>
                          </div>
                          {/* Product Price */}
                          <div className="text-right">
                            <p className="font-black text-gray-900 dark:text-white">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Summary & Download */}
                    <div className="mt-10 pt-8 border-t-2 border-dashed dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Paid</p>
                          <p className="text-3xl font-black text-primary">₹{totalAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-700" />
                        <div className="hidden md:block">
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Shipping To</p>
                          {/* Updated to show specific delivery address */}
                          <p className="text-xs font-bold dark:text-white">{order.address || user.address}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => generateInvoice(order)}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl active:scale-95"
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
              className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-[3rem] shadow-2xl p-10 space-y-6 relative border dark:border-gray-700"
            >
              <button type="button" onClick={() => setIsEditing(false)} className="absolute top-8 right-8 text-gray-400 hover:text-red-500"><FaTimes size={24}/></button>
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Update Profile</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Full Name</label>
                    <input type="text" value={editData.fullName} onChange={(e)=>setEditData({...editData, fullName: e.target.value})} className="w-full p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Phone</label>
                    <input type="text" value={editData.phone} onChange={(e)=>setEditData({...editData, phone: e.target.value})} className="w-full p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Age</label>
                    <input type="number" value={editData.age} onChange={(e)=>setEditData({...editData, age: e.target.value})} className="w-full p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2">City Address</label>
                    <input type="text" value={editData.address} onChange={(e)=>setEditData({...editData, address: e.target.value})} className="w-full p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg transform active:scale-95 transition-all">Save Changes</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}