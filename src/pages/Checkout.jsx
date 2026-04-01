import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { generateInvoice } from '../utils/generateInvoice';

export default function Checkout() {
  const { cart, placeOrder } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleConfirmOrder = () => {
    if (!address) return alert("Enter address");
    const newOrder = placeOrder(address);
    alert("Order Confirmed! Downloading Invoice...");
    generateInvoice(newOrder);
    navigate('/account');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 dark:text-white border-b pb-4">Checkout</h2>
      <div className="mb-6 dark:text-white">
        <h3 className="text-lg font-semibold mb-2">Order Total: ${total.toFixed(2)}</h3>
      </div>
      <textarea className="w-full p-3 border rounded-md mb-6 dark:bg-gray-700 dark:text-white" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping Address"></textarea>
      <button onClick={handleConfirmOrder} className="w-full bg-primary text-white py-3 rounded-md font-bold">Confirm Order (COD)</button>
    </div>
  );
}