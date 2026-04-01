import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
  const { cart, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 dark:text-white border-b pb-4">Shopping Cart</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        {cart.map((item) => (
          <div key={item.cartId} className="flex justify-between items-center py-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              <h3 className="dark:text-white">{item.name}</h3>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-bold dark:text-white">${item.price}</span>
              <button onClick={() => removeFromCart(item.cartId)} className="text-red-500"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-xl dark:text-white">Total: <span className="text-primary font-bold">${total.toFixed(2)}</span></div>
        <button onClick={() => navigate('/checkout')} className="bg-green-500 text-white px-8 py-3 rounded-md font-bold">Checkout</button>
      </div>
    </div>
  );
}