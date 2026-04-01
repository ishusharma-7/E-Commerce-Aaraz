import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { generateInvoice } from '../utils/generateInvoice';

export default function Account() {
  const { user, orders } = useContext(AppContext);
  const currentUser = user || { name: "Guest", email: "guest@example.com" };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold dark:text-white border-b pb-4">My Account</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
        <h3 className="text-xl dark:text-white">{currentUser.name}</h3>
        <p className="text-gray-500">{currentUser.email}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
        <h3 className="text-2xl font-bold mb-6 dark:text-white">Order History</h3>
        {orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded-md flex justify-between items-center dark:border-gray-700 dark:text-white">
            <div>
              <p className="font-bold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.status}</p>
            </div>
            <button onClick={() => generateInvoice(order)} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-sm">Download Invoice</button>
          </div>
        ))}
      </div>
    </div>
  );
}