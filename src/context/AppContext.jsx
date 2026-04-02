import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);

  useEffect(() => { localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const registerUser = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('all_users')) || [];
    if (existingUsers.find(u => u.email === userData.email)) {
      alert("User already exists!");
      return false;
    }
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    setUser(userData);
    return true;
  };

  const loginUser = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('all_users')) || [];
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    alert("Invalid credentials");
    return false;
  };

  const updateUserInfo = (updatedData) => {
    setUser(updatedData);
    const allUsers = JSON.parse(localStorage.getItem('all_users')) || [];
    const updatedUsers = allUsers.map(u => 
      u.email === updatedData.email ? updatedData : u
    );
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    alert("Profile Updated Successfully!");
  };

  const addToCart = (product) => setCart([...cart, { ...product, cartId: Date.now() }]);
  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));
  const clearCart = () => setCart([]);
  
  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const placeOrder = (address) => {
    const newOrder = { 
      id: Math.floor(Math.random() * 100000), 
      items: [...cart], 
      address, 
      status: 'Confirmed', 
      date: new Date().toISOString() 
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, user, loginUser, registerUser, logout, updateUserInfo,
      cart, addToCart, removeFromCart, clearCart,
      wishlist, toggleWishlist, orders, placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};