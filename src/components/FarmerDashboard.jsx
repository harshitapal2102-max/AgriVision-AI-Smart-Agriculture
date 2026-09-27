import React, { useState, useEffect } from 'react';
import {
  User,
  CloudSun,
  Bug,
  Brain,
  Store,
  Landmark,
  Menu,
  X,
  LogOut,
  Sprout,
  Save,
  Plus,
  Trash2,
  ChevronRight,
  TrendingUp,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  CircleCheck,
  Tractor,
  BarChart3,
} from 'lucide-react';

import DiseaseDetector from './DiseaseDetector';
import GovernmentSchemes from './GovernmentSchemes';


/* =========================
   TOAST
========================= */

const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-toastIn">
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold"
        style={{
          background:
            'linear-gradient(135deg, #14532d 0%, #15803d 100%)',
        }}
      >
        <CircleCheck className="w-5 h-5 text-green-300" />
        {message}
      </div>
    </div>
  );
};


/* =========================
   MAIN DASHBOARD
========================= */

export default function FarmerDashboard({
  user,
  onLogout,
  products,
  onAddProduct,
  onDeleteProduct,
  userProfile,
  onUpdateProfile,
}) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const navItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      desc: 'Your farm information',
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: Store,
      desc: 'Manage your produce',
    },
    {
      id: 'weather',
      label: 'Weather Telemetry',
      icon: CloudSun,
      desc: 'Field monitoring',
    },
    {
      id: 'disease',
      label: 'Disease Detector',
      icon: Bug,
      desc: 'AI crop analysis',
    },
    {
      id: 'advisory',
      label: 'AI Advisory',
      icon: Brain,
      desc: 'Smart recommendations',
    },
    {
      id: 'schemes',
      label: 'Govt Schemes',
      icon: Landmark,
      desc: 'Agricultural schemes',
    },
  ];

  const activeNavItem = navItems.find(
    (item) => item.id === activeTab
  );

  const ActiveIcon = activeNavItem?.icon || User;

  return (
    <div className="min-h-screen bg-[#f4f8f3] flex flex-col md:flex-row">

      {/* =========================
          MOBILE HEADER
      ========================= */}

      <div
        className="md:hidden text-white px-5 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg"
        style={{
          background:
            'linear-gradient(135deg, #052e16, #14532d, #166534)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, #22c55e, #16a34a)',
            }}
          >
            <Sprout className="w-5 h-5 text-white" />
          </div>

          <div>
            <p className="font-bold text-lg leading-none">
              AgriVision AI
            </p>
            <p className="text-[10px] text-green-300 mt-1">
              Smart Agriculture
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          ${isMobileMenuOpen ? 'block' : 'hidden'}
          md:flex md:flex-col
          w-full md:w-[280px]
          md:min-h-screen
          sticky top-0 z-40
          shadow-2xl
        `}
        style={{
          background:
            'linear-gradient(180deg, #052e16 0%, #14532d 55%, #166534 100%)',
        }}
      >

        {/* BRAND */}

        <div className="hidden md:flex items-center gap-3 px-6 pt-7 pb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background:
                'linear-gradient(135deg, #4ade80, #16a34a)',
            }}
          >
            <Sprout className="w-6 h-6 text-white" />
          </div>

          <div>
            <p className="font-bold text-xl text-white leading-none">
              AgriVision
            </p>

            <p className="text-xs text-green-300 mt-1">
              AI Smart Agriculture
            </p>
          </div>
        </div>


        {/* USER CARD */}

        <div className="mx-4 mb-5">
          <div
            className="p-4 rounded-2xl border"
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          >
            <div className="flex items-center gap-3">

              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #f59e0b, #d97706)',
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'F'}
              </div>

              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">
                  {user?.name || 'Farmer'}
                </p>

                <p className="text-green-300/80 text-xs flex items-center gap-1 mt-1">
                  <Leaf className="w-3 h-3" />
                  Farmer Account
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full
                  flex items-center gap-3
                  px-4 py-3.5
                  rounded-2xl
                  text-left
                  transition-all duration-200
                  group
                  ${isActive
                    ? 'bg-white/10 shadow-lg'
                    : 'hover:bg-white/[0.06]'
                  }
                `}
              >

                <div
                  className={`
                    w-9 h-9
                    rounded-xl
                    flex items-center justify-center
                    flex-shrink-0
                    transition-all
                    ${isActive
                      ? 'bg-green-400/20'
                      : 'bg-white/[0.05]'
                    }
                  `}
                >
                  <Icon
                    className={`
                      w-4 h-4
                      ${isActive
                        ? 'text-green-300'
                        : 'text-white/50 group-hover:text-white/80'
                      }
                    `}
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p
                    className={`
                      text-sm font-semibold
                      ${isActive
                        ? 'text-white'
                        : 'text-white/60 group-hover:text-white/90'
                      }
                    `}
                  >
                    {item.label}
                  </p>

                  <p
                    className={`
                      text-[10px] mt-0.5
                      ${isActive
                        ? 'text-green-300/70'
                        : 'text-white/30'
                      }
                    `}
                  >
                    {item.desc}
                  </p>

                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-green-300" />
                )}

              </button>
            );
          })}

        </nav>


        {/* SIDEBAR FOOTER */}

        <div className="p-4 mt-4 border-t border-white/10">

          <div className="mb-3 px-3 py-3 rounded-xl bg-green-400/10 border border-green-300/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-300" />

              <div>
                <p className="text-[11px] text-green-200 font-semibold">
                  AgriVision Protected
                </p>

                <p className="text-[9px] text-green-300/50">
                  Smart farming platform
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-500/10 border border-red-400/10"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold">
              Sign Out
            </span>
          </button>

        </div>
      </aside>


      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="flex-1 min-w-0">

        {/* TOP HEADER */}

        <header
          className="sticky top-0 z-30 px-6 md:px-10 py-4 border-b backdrop-blur-xl"
          style={{
            background: 'rgba(244,248,243,0.90)',
            borderColor: 'rgba(148,163,184,0.18)',
          }}
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                }}
              >
                <ActiveIcon className="w-5 h-5 text-green-700" />
              </div>

              <div>

                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  {activeNavItem?.label}
                </h2>

                <p className="text-xs text-gray-400">
                  {activeNavItem?.desc}
                </p>

              </div>

            </div>


            <div className="hidden sm:flex items-center gap-2">

              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

              <span className="text-xs font-semibold text-gray-500">
                System Online
              </span>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="p-5 md:p-8 lg:p-10">

          {/* PROFILE */}

          {activeTab === 'profile' && (
            <ProfileForm
              userProfile={userProfile}
              onUpdateProfile={onUpdateProfile}
              showToast={showToast}
            />
          )}


          {/* MARKETPLACE */}

          {activeTab === 'marketplace' && (
            <FarmerMarketplace
              user={user}
              products={products}
              onAddProduct={onAddProduct}
              onDeleteProduct={onDeleteProduct}
              showToast={showToast}
            />
          )}


          {/* DISEASE */}

          {activeTab === 'disease' && (
            <DiseaseDetector />
          )}


          {/* GOVERNMENT SCHEMES */}

          {activeTab === 'schemes' && (
            <GovernmentSchemes />
          )}


          {/* AI ADVISORY */}

          {activeTab === 'advisory' && (
            <NormalFeature
              title="AI Advisory"
              description="Get intelligent farming guidance, crop insights and practical recommendations."
              icon={Brain}
            />
          )}


          {/* WEATHER */}

          {activeTab === 'weather' && (
            <NormalFeature
              title="Weather Telemetry"
              description="AI-powered weather telemetry features are coming soon. We're building something powerful for Indian farmers."
              icon={CloudSun}
            />
          )}

        </div>

      </main>


      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
      />

    </div>
  );
}


/* =========================================================
   PROFILE
========================================================= */

function ProfileForm({
  userProfile,
  onUpdateProfile,
  showToast,
}) {

  const [profile, setProfile] = useState(userProfile || {});

  useEffect(() => {
    setProfile(userProfile || {});
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateProfile(profile);

    showToast('Farm profile saved successfully!');
  };

  const fieldClass =
    'w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm outline-none bg-white transition-all focus:ring-4 focus:ring-green-100 focus:border-green-500';

  return (
    <div className="max-w-5xl mx-auto">

      {/* HERO */}

      <div
        className="relative overflow-hidden rounded-[28px] p-7 md:p-10 mb-7 text-white shadow-xl"
        style={{
          background:
            'linear-gradient(135deg, #064e3b 0%, #166534 55%, #15803d 100%)',
        }}
      >

        <div className="relative z-10">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-green-200" />
            </div>

            <div>
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wider">
                Farmer Dashboard
              </p>

              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome, {userProfile?.name || 'Farmer'} 👋
              </h1>
            </div>

          </div>

          <p className="text-green-100/75 max-w-xl text-sm leading-relaxed">
            Complete your farm profile to help AgriVision provide
            better agricultural insights and recommendations.
          </p>

        </div>

        <div className="absolute -right-10 -bottom-16 opacity-10">
          <Sprout className="w-72 h-72" />
        </div>

      </div>


      {/* FORM */}

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 md:p-8">

        <div className="flex items-center gap-3 mb-8">

          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            }}
          >
            <User className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-lg">
              Farm Profile
            </h3>

            <p className="text-xs text-gray-400">
              Tell us about your farm
            </p>
          </div>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="field-label">
                Land Size (Acres)
              </label>

              <input
                type="number"
                required
                value={profile.landSize || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    landSize: e.target.value,
                  })
                }
                className={fieldClass}
                placeholder="e.g. 5"
              />
            </div>


            <div>
              <label className="field-label">
                Soil Type
              </label>

              <select
                required
                value={profile.soilType || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    soilType: e.target.value,
                  })
                }
                className={fieldClass}
              >
                <option value="">
                  Select Soil Type
                </option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="black">Black Cotton</option>
              </select>
            </div>


            <div>
              <label className="field-label">
                Irrigation Method
              </label>

              <select
                required
                value={profile.irrigation || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    irrigation: e.target.value,
                  })
                }
                className={fieldClass}
              >
                <option value="">
                  Select Method
                </option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler</option>
                <option value="flood">Flood</option>
                <option value="rainfed">Rainfed</option>
              </select>
            </div>


            <div>
              <label className="field-label">
                Farm Location
              </label>

              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    location: e.target.value,
                  })
                }
                className={fieldClass}
                placeholder="e.g. Pune, Maharashtra"
              />
            </div>

          </div>


          <div>

            <label className="field-label">
              Farm Address
            </label>

            <textarea
              required
              rows={4}
              value={profile.address || ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: e.target.value,
                })
              }
              className={fieldClass}
              placeholder="Village, Tehsil, District, State"
            />

          </div>


          <button
            type="submit"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              background:
                'linear-gradient(135deg, #16a34a, #15803d)',
            }}
          >
            <Save className="w-4 h-4" />
            Save Farm Profile
          </button>

        </form>

      </div>

    </div>
  );
}


/* =========================================================
   MARKETPLACE
========================================================= */

function FarmerMarketplace({
  user,
  products,
  onAddProduct,
  onDeleteProduct,
  showToast,
}) {

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const myProducts = products.filter(
    (p) => p.farmerMobile === user.mobile
  );

  const otherProducts = products.filter(
    (p) => p.farmerMobile !== user.mobile
  );

  const handleSubmit = (e) => {

    e.preventDefault();

    onAddProduct({
      ...newProduct,
      image:
        newProduct.image ||
        'https://images.unsplash.com/photo-1595856728342-a8435d883b27?auto=format&fit=crop&q=80&w=600',
    });

    setNewProduct({
      name: '',
      price: '',
      description: '',
      image: '',
    });

    showToast('Product listed successfully!');
  };


  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct({
        ...newProduct,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };


  const fieldClass =
    'w-full p-3.5 border border-gray-200 rounded-2xl text-sm outline-none bg-white focus:ring-4 focus:ring-green-100 focus:border-green-500';


  return (
    <div className="max-w-7xl mx-auto space-y-9">

      {/* HEADER */}

      <div>
        <p className="text-green-600 font-semibold text-sm mb-1">
          Farmer Marketplace
        </p>

        <h1 className="text-3xl font-bold text-gray-800">
          Sell your produce directly
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Create listings and let buyers discover your farm products.
        </p>
      </div>


      {/* ADD PRODUCT */}

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 md:p-8">

        <div className="flex items-center gap-3 mb-7">

          <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
            <Plus className="w-5 h-5 text-amber-600" />
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-lg">
              List New Produce
            </h3>

            <p className="text-xs text-gray-400">
              Add your agricultural products
            </p>
          </div>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="field-label">
                Product Name
              </label>

              <input
                required
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
                className={fieldClass}
                placeholder="Organic Tomatoes"
              />
            </div>


            <div>
              <label className="field-label">
                Price per kg
              </label>

              <input
                required
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
                className={fieldClass}
                placeholder="₹"
              />
            </div>

          </div>


          <div>
            <label className="field-label">
              Description
            </label>

            <textarea
              required
              rows={3}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              className={fieldClass}
              placeholder="Freshly harvested..."
            />
          </div>


          <div>

            <label className="field-label">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500"
            />

            {newProduct.image?.startsWith('data:') && (
              <img
                src={newProduct.image}
                alt="Product preview"
                className="mt-4 h-28 w-40 rounded-2xl object-cover shadow"
              />
            )}

          </div>


          <button
            type="submit"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{
              background:
                'linear-gradient(135deg, #f59e0b, #d97706)',
            }}
          >
            <Plus className="w-4 h-4" />
            List Product
          </button>

        </form>

      </div>


      {/* MY PRODUCTS */}

      <ProductSection
        title="Your Active Listings"
        count={myProducts.length}
        products={myProducts}
        emptyMessage="You haven't listed any products yet."
        own
        onDeleteProduct={onDeleteProduct}
        showToast={showToast}
      />


      {/* OTHER FARMERS */}

      <ProductSection
        title="Products by Other Farmers"
        count={otherProducts.length}
        products={otherProducts}
        emptyMessage="No products listed by other farmers yet."
      />

    </div>
  );
}


/* =========================================================
   PRODUCT SECTION
========================================================= */

function ProductSection({
  title,
  count,
  products,
  emptyMessage,
  own,
  onDeleteProduct,
  showToast,
}) {

  return (
    <section>

      <div className="flex items-center gap-3 mb-5">

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
          {count}
        </span>

      </div>


      {products.length === 0 ? (

        <div className="bg-white rounded-3xl border border-gray-100 p-14 text-center">

          <Store className="w-10 h-10 text-gray-300 mx-auto mb-3" />

          <p className="text-gray-400 text-sm">
            {emptyMessage}
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              <div className="h-48 overflow-hidden relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <p className="absolute bottom-4 left-4 text-white font-bold text-lg">
                  {product.name}
                </p>

              </div>


              <div className="p-5">

                <p className="text-green-600 font-bold text-xl">
                  ₹{product.price}
                  <span className="text-xs text-gray-400 font-normal">
                    {' '}/ kg
                  </span>
                </p>

                <p className="text-sm text-gray-500 mt-2 mb-5">
                  {product.description}
                </p>


                {own && (
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteProduct(product.id);
                      showToast('Product removed');
                    }}
                    className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Listing
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}


/* =========================================================
   NORMAL FEATURE PAGE
========================================================= */

function NormalFeature({
  title,
  description,
  icon: Icon,
}) {

  return (
    <div className="max-w-5xl mx-auto">

      <div
        className="relative overflow-hidden rounded-[32px] p-8 md:p-12 shadow-xl text-white"
        style={{
          background:
            'linear-gradient(135deg, #064e3b, #166534, #15803d)',
        }}
      >

        <div className="relative z-10 max-w-2xl">

          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-green-200" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-300" />

            <span className="text-xs font-bold uppercase tracking-wider text-green-200">
              AgriVision AI
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>

          <p className="text-green-100/75 leading-relaxed text-sm md:text-base">
            {description}
          </p>


          <div className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/10">
            <TrendingUp className="w-4 h-4 text-green-300" />

            <span className="text-sm font-semibold">
              Coming Soon
            </span>
          </div>

        </div>


        <div className="absolute -right-20 -bottom-20 opacity-[0.07]">
          <Icon className="w-96 h-96" />
        </div>

      </div>


      {/* FEATURE CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

        <MiniCard
          icon={BarChart3}
          title="Smart Insights"
          text="Agricultural data analysis"
        />

        <MiniCard
          icon={Tractor}
          title="Farm Support"
          text="Tools designed for farmers"
        />

        <MiniCard
          icon={Leaf}
          title="Crop Focused"
          text="Built for Indian agriculture"
        />

      </div>

    </div>
  );
}


/* =========================================================
   MINI CARD
========================================================= */

function MiniCard({
  icon: Icon,
  title,
  text,
}) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all">

      <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-green-600" />
      </div>

      <h3 className="font-bold text-gray-800">
        {title}
      </h3>

      <p className="text-xs text-gray-400 mt-1">
        {text}
      </p>

    </div>
  );
}