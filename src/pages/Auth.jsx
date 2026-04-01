import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: "Demo User", email: "user@demo.com" });
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">Login / Register</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold">Login</button>
      </form>
    </div>
  );
}