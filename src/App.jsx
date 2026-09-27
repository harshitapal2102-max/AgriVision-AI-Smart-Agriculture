import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';

// Helper to safely read from localStorage
function readLS(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  // Global state — initialized from localStorage so data survives refresh/restart
  const [user, setUser] = useState(() => readLS('agv_user', null));
  const [registeredUsers, setRegisteredUsers] = useState(() => readLS('agv_registeredUsers', []));
  const [userProfiles, setUserProfiles] = useState(() => readLS('agv_userProfiles', {}));
  const [products, setProducts] = useState(() => readLS('agv_products', []));
  const [carts, setCarts] = useState(() => readLS('agv_carts', {}));

  // Persist every piece of state to localStorage whenever it changes
  useEffect(() => { localStorage.setItem('agv_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('agv_registeredUsers', JSON.stringify(registeredUsers)); }, [registeredUsers]);
  useEffect(() => { localStorage.setItem('agv_userProfiles', JSON.stringify(userProfiles)); }, [userProfiles]);
  useEffect(() => { localStorage.setItem('agv_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('agv_carts', JSON.stringify(carts)); }, [carts]);

  // Register handler
  const handleRegister = (userData) => {
    const exists = registeredUsers.find(u => u.mobile === userData.mobile);
    if (exists) {
      return { success: false, message: 'An account with this mobile number already exists. Please log in.' };
    }
    setRegisteredUsers([...registeredUsers, userData]);
    setUser(userData);
    return { success: true };
  };

  // Login handler
  const handleLogin = (credentials) => {
    const foundUser = registeredUsers.find(
      u => u.mobile === credentials.mobile && 
           u.password === credentials.password
    );
    if (foundUser) {
      // Proceed with the role chosen during login, keeping their original name/details
      setUser({ ...foundUser, role: credentials.role });
      return { success: true };
    }
    return { success: false, message: 'Invalid mobile number or password.' };
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
  };

  // Farmer profile handler
  const handleUpdateProfile = (profileData) => {
    setUserProfiles({ ...userProfiles, [user.mobile]: profileData });
  };

  // Farmer adding product
  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now(), farmerName: user.name, farmerMobile: user.mobile }]);
  };

  // Farmer deleting product
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Helper to get current user's cart
  const userCart = user ? (carts[user.mobile] || []) : [];

  // Buyer adding to cart
  const handleAddToCart = (product) => {
    const existing = userCart.find(item => item.product.id === product.id);
    let newCart;
    if (existing) {
      newCart = userCart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      newCart = [...userCart, { product, quantity: 1 }];
    }
    setCarts({ ...carts, [user.mobile]: newCart });
  };

  // Buyer removing from cart
  const handleRemoveFromCart = (productId) => {
    const newCart = userCart.filter(item => item.product.id !== productId);
    setCarts({ ...carts, [user.mobile]: newCart });
  };

  // Buyer updating cart quantity
  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    const newCart = userCart.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item);
    setCarts({ ...carts, [user.mobile]: newCart });
  };

  if (!user) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (user.role === 'farmer') {
    return (
      <FarmerDashboard 
        user={user} 
        onLogout={handleLogout} 
        products={products} 
        onAddProduct={handleAddProduct} 
        onDeleteProduct={handleDeleteProduct}
        userProfile={userProfiles[user.mobile] || { landSize: '', soilType: '', irrigation: '', address: '' }}
        onUpdateProfile={handleUpdateProfile}
      />
    );
  }

  if (user.role === 'buyer') {
    return (
      <BuyerDashboard 
        user={user} 
        onLogout={handleLogout} 
        products={products} 
        cart={userCart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
      />
    );
  }

  return <div>Unknown role</div>;
}

export default App;
