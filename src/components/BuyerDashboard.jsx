import React, { useState } from 'react';
import { ShoppingCart, LogOut, Sprout, Store, Plus, ArrowLeft, Minus, Trash2, Package, Search } from 'lucide-react';

const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-toastIn">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold"
        style={{ background: 'linear-gradient(135deg, #14532d, #166534)' }}>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        {message}
      </div>
    </div>
  );
};

export default function BuyerDashboard({ user, onLogout, products, onAddToCart, cart, onRemoveFromCart, onUpdateCartQuantity }) {
  const [toastMessage, setToastMessage] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.farmerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f6f8f4' }}>

      {/* Header */}
      <header className="sticky top-0 z-20 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #0f2e18, #14532d)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>AgriVision</span>
                <span className="text-green-300/60 text-xs font-medium block leading-none">Marketplace</span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden sm:block text-sm text-green-200/80">
                Welcome, <span className="font-bold text-white">{user.name}</span>
              </div>

              <button onClick={() => setShowCart(!showCart)} className="relative group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scaleIn"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    {cartCount}
                  </span>
                )}
              </button>

              <button onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all duration-200 hover:bg-white/10">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {showCart ? (
          /* ===== CART VIEW ===== */
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setShowCart(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Your Cart</h1>
                <p className="text-sm text-gray-400">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center max-w-lg mx-auto animate-scaleIn">
                <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center animate-float"
                  style={{ background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }}>
                  <ShoppingCart className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Cart is empty</h3>
                <p className="text-gray-400 text-sm mb-6">Browse the marketplace and add fresh produce.</p>
                <button onClick={() => setShowCart(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white btn-shimmer"
                  style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items */}
                <div className="lg:col-span-2 space-y-3 stagger">
                  {cart.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 animate-fadeInUp card-lift">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.product.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">From {item.product.farmerName}</p>
                        <p className="text-forest-600 font-bold text-sm mt-1">₹{item.product.price} / kg</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                          <button onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-800 text-sm">₹{item.product.price * item.quantity}</span>
                          <button onClick={() => onRemoveFromCart(item.product.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all duration-200">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="animate-slideRight">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                    <h3 className="font-bold text-gray-800 mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>Order Summary</h3>
                    <div className="space-y-3 text-sm">
                      {cart.map((item, i) => (
                        <div key={i} className="flex justify-between text-gray-600">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-gray-800 text-base">Total</span>
                        <span className="text-2xl font-bold text-forest-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{cartTotal}</span>
                      </div>
                    </div>
                    <button className="btn-shimmer w-full mt-5 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                      style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ===== MARKETPLACE VIEW ===== */
          <div className="animate-fadeInUp">
            {/* Hero bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Fresh <span className="text-gradient">Marketplace</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">{products.length} product{products.length !== 1 ? 's' : ''} available from local farmers</p>
              </div>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search products or farmers..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-forest-500 transition-all duration-200" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center max-w-lg mx-auto animate-scaleIn">
                <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center animate-float"
                  style={{ background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }}>
                  <Store className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {search ? 'No results found' : 'No products yet'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {search ? `No products match "${search}".` : "Farmers haven't listed any produce yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
                {filtered.map((product) => {
                  const cartItem = cart.find(item => item.product.id === product.id);
                  return (
                    <div key={product.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm card-lift overflow-hidden flex flex-col group animate-fadeInUp">
                      <div className="h-48 overflow-hidden relative">
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-forest-800 flex items-center gap-1">
                          <Sprout className="w-3 h-3" /> {product.farmerName}
                        </div>
                        {cartItem && (
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white animate-scaleIn"
                            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                            {cartItem.quantity} in cart
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{product.name}</h4>
                        <p className="text-2xl font-bold text-forest-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          ₹{product.price} <span className="text-xs text-gray-400 font-normal">/ kg</span>
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                        <button onClick={() => handleAddToCart(product)}
                          className="btn-shimmer w-full py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
                          style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                          <Plus className="w-4 h-4" />
                          {cartItem ? 'Add More' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      <Toast message={toastMessage} isVisible={!!toastMessage} />
    </div>
  );
}
