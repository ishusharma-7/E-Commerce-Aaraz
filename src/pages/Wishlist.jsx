import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useContext(AppContext);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 dark:text-white border-b pb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
            <button onClick={() => toggleWishlist(item)} className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full"><FaTimes /></button>
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <h3 className="dark:text-white">{item.name}</h3>
              <p className="text-primary font-bold">${item.price}</p>
              <button onClick={() => addToCart(item)} className="mt-4 w-full bg-blue-500 text-white py-2 rounded flex justify-center items-center gap-2"><FaShoppingCart /> Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}