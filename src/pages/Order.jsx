import React, { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Navigation, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import images from '../assets/images';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants/routes';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from '../components/common/LoginModal';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Order = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ORDER'); // ORDER or LOCATIONS
  const [orderType, setOrderType] = useState('DELIVERY'); // DELIVERY or PICKUP
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([39.889, 4.263]); // Default Mahón
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStoreInfo, setShowStoreInfo] = useState(false);
  const [selectedStore, setSelectedStore] = useState({
    name: 'Paput Delivery',
    address: 'Avinguda Josep Anselm Clave',
    hours: 'Mon-Sun: 19:30 - 23:00',
    location: [39.889, 4.263],
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `${NOMINATIM_BASE_URL}/search?format=json&q=${query}&limit=5&addressdetails=1`,
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery !== address) {
        fetchSuggestions(searchQuery);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions, address]);

  // Clear search context when switching tabs or order types
  useEffect(() => {
    setSearchQuery('');
    setSuggestions([]);
  }, [activeTab, orderType]);

  const handleSelectLocation = (loc) => {
    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);
    setSelectedLocation([lat, lon]);
    setAddress(loc.display_name);
    setSearchQuery(loc.display_name);
    setSuggestions([]);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation([latitude, longitude]);
        try {
          const response = await fetch(
            `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          setAddress(data.display_name);
          setSearchQuery(data.display_name);
        } catch (error) {
          console.error('Error reverse geocoding:', error);
        } finally {
          setLoading(false);
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f3e6] font-['Roc_Grotesk'] text-[#0a4635] pt-[72px]">
      {/* Header - Matching Image 1 exactly */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-white z-[5000] px-4 md:px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center">
          <img
            src={images.orderFav}
            alt="Logo"
            data-cursor
            onClick={() => navigate(ROUTES.LANDING)}
          />
        </div>

        <div className="flex gap-8 items-center">
          <button
            data-cursor
            onClick={() => setActiveTab('ORDER')}
            className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
              activeTab === 'ORDER'
                ? 'text-[#0a4635]'
                : 'text-[#0a4635]/50 hover:text-[#0a4635]'
            }`}
          >
            Order
            {activeTab === 'ORDER' && (
              <motion.div
                layoutId="headerTab"
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
              />
            )}
          </button>
          <button
            data-cursor
            onClick={() => setActiveTab('LOCATIONS')}
            className={`text-sm font-bold uppercase tracking-tight relative py-2 transition-all ${
              activeTab === 'LOCATIONS'
                ? 'text-[#0a4635]'
                : 'text-[#0a4635]/50 hover:text-[#0a4635]'
            }`}
          >
            Locations
            {activeTab === 'LOCATIONS' && (
              <motion.div
                layoutId="headerTab"
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#0a4635]"
              />
            )}
          </button>
        </div>

        <button
          data-cursor
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-[#0a4635] text-white px-6 py-2 rounded-lg font-bold text-sm uppercase hover:bg-opacity-90 transition-all"
        >
          Login
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {activeTab === 'ORDER' ? (
          <div className="flex flex-1">
            {/* Sidebar Columns - Dual Panel Layout */}
            <div className="flex h-full bg-white border-r border-gray-100 z-10">
              {/* Panel 1: Main Sidebar (Search & List) */}
              <div className="w-[30vw] p-5 flex flex-col gap-6 overflow-y-auto border-r border-gray-50">
                <div className="flex gap-1 p-1 bg-[#ffc62d] rounded-xl h-14">
                  <button
                    data-cursor
                    onClick={() => setOrderType('DELIVERY')}
                    className={`flex-1 rounded-lg uppercase text-[14px] font-bold transition-all ${
                      orderType === 'DELIVERY'
                        ? 'bg-[#0a4635] text-[#f4f3e6] shadow-lg hover:bg-red-500'
                        : 'text-[#0a4635] hover:text-red-500'
                    }`}
                  >
                    Entrega
                  </button>
                  <button
                    data-cursor
                    onClick={() => setOrderType('PICKUP')}
                    className={`flex-1 rounded-lg uppercase text-[14px] font-bold transition-all ${
                      orderType === 'PICKUP'
                        ? 'bg-[#0a4635] text-[#f4f3e6] shadow-lg hover:bg-red-500'
                        : 'text-[#0a4635] hover:text-red-500'
                    }`}
                  >
                    Recoger
                  </button>
                </div>

                {orderType === 'DELIVERY' ? (
                  <>
                    <div className="flex flex-col gap-4 mt-2">
                      <h2 className="text-[18px] font-bold  uppercase tracking-tight text-[#2c2b2b]">
                        Nueva dirección
                      </h2>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2">
                          <Search
                            size={20}
                            className="text-gray-400 group-focus-within:text-[#0a4635] transition-colors"
                          />
                        </div>
                        <input
                          data-cursor
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Escribe tu dirección"
                          className="w-full h-14 pl-12 pr-12 rounded-[20px] border border-gray-400 bg-white focus:border-[#0a4635]/40 outline-none transition-all text-[14px] font-bold placeholder:text-gray-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setSuggestions([]);
                            }}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a4635] transition-colors"
                          >
                            <X size={18} />
                          </button>
                        )}
                        {suggestions.length > 0 && (
                          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-[2000] overflow-hidden p-2">
                            {suggestions.map((loc, idx) => (
                              <button
                                key={idx}
                                data-cursor
                                onClick={() => handleSelectLocation(loc)}
                                className="w-full p-3 text-left hover:bg-[#f4f3e6] rounded-xl flex items-start gap-3 transition-colors"
                              >
                                <span className="text-[14px] font-bold text-[#0a4635] line-clamp-2 leading-tight">
                                  {loc.display_name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        data-cursor
                        onClick={handleCurrentLocation}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 text-[14px] hover:opacity-65 cursor-pointer transition-all uppercase tracking-tight text-[#2c2b2b]"
                      >
                        <Navigation size={16} className="fill-[#0a4635]" />
                        {loading
                          ? 'Obteniendo ubicación...'
                          : 'Ubicación actual'}
                      </button>
                    </div>

                    <div className="flex flex-col gap-5 mt-4">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[18px] font-bold  uppercase tracking-tight text-[#2c2b2b]">
                          Tus direcciones
                        </h2>
                        <p className="text-gray-400 text-[16px]">
                          Aún no has creado ninguna dirección.
                        </p>
                      </div>
                      <button
                        data-cursor
                        onClick={() => setIsLoginModalOpen(true)}
                        className="w-full h-12 rounded-[10px] bg-[#ffc62d] text-[#0a4635] text-[16px] font-bold uppercase shadow-sm hover:translate-y-[-2px] transition-all"
                      >
                        Iniciar sesión para direcciones guardadas
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-[18px] font-bold uppercase tracking-tight text-[#2c2b2b]">
                        Pickup from
                      </h2>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2">
                          <Search
                            size={20}
                            className="text-gray-400 group-focus-within:text-[#0a4635] transition-colors"
                          />
                        </div>
                        <input
                          data-cursor
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search"
                          className="w-full h-14 pl-12 pr-12 rounded-[20px] border border-gray-400 bg-white focus:border-[#0a4635]/40 outline-none transition-all text-[14px] font-bold placeholder:text-gray-400"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setSuggestions([]);
                            }}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a4635] transition-colors"
                          >
                            <X size={18} />
                          </button>
                        )}
                        {suggestions.length > 0 && (
                          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-[2000] overflow-hidden p-2">
                            {suggestions.map((loc, idx) => (
                              <button
                                key={idx}
                                data-cursor
                                onClick={() => handleSelectLocation(loc)}
                                className="w-full p-3 text-left hover:bg-[#f4f3e6] rounded-xl flex items-start gap-3 transition-colors"
                              >
                                <span className="text-[14px] font-bold text-[#0a4635] line-clamp-2 leading-tight">
                                  {loc.display_name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-[18px] font-bold uppercase text-[#2c2b2b] mb-1">
                              {selectedStore.name}
                            </h3>
                            <p className="text-gray-400 text-[16px]">
                              {selectedStore.address}
                            </p>
                            <p className="text-[#0a4635] text-[14px] mt-1 uppercase">
                              Abrimos pronto
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              data-cursor
                              onClick={() => setShowStoreInfo(true)}
                              className="bg-[#ffc62d] text-white px-4 py-2 rounded-[10px] font-bold tracking-wider text-[14px] uppercase shadow-sm hover:translate-y-[-1.5px] transition-all"
                            >
                              Info
                            </button>
                            <button
                              data-cursor
                              onClick={() => setIsLoginModalOpen(true)}
                              className="bg-[#0a4635] text-white px-4 py-2 rounded-[10px] font-bold tracking-wider text-[14px] uppercase shadow-sm hover:translate-y-[-1.5px] transition-all"
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel 2: Store Details (Beside Panel 1) */}
              <AnimatePresence>
                {orderType === 'PICKUP' && showStoreInfo && (
                  <motion.div
                    initial={{ x: -20, opacity: 0, width: 0 }}
                    animate={{ x: 0, opacity: 1, width: 380 }}
                    exit={{ x: -20, opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-white p-5 border-r border-gray-100 overflow-y-auto flex flex-col gap-6"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-[20px] font-bold uppercase tracking-tight text-[#2c2b2b]">
                        {selectedStore.name}
                      </h2>
                      <button
                        data-cursor
                        onClick={() => setShowStoreInfo(false)}
                        className="p-2 hover:bg-[#f4f3e6] rounded-full transition-colors"
                      >
                        <img
                          src={images.close}
                          alt="Close"
                          className="w-4 h-4 opacity-40 hover:opacity-100"
                        />
                      </button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p className="text-[16px] font-bold text-[#0a4635] uppercase">
                        Order for later
                      </p>
                      <p className="text-gray-400 text-[15px] ">
                        {selectedStore.address}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                      <h3 className="text-[16px] font-bold uppercase text-[#2c2b2b]">
                        Store hours
                      </h3>
                      <p className="text-[15px] text-gray-400">
                        {selectedStore.hours}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                      <button
                        data-cursor
                        onClick={() => window.open('skype:+34666666666?call')}
                        className="w-full h-12 font-bold tracking-wider rounded-[10px] bg-[#ffc62d] text-white text-[16px] uppercase shadow-sm hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
                      >
                        Call store
                      </button>
                      <button
                        data-cursor
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                              selectedStore.address + ', Mahon, Menorca',
                            )}`,
                          )
                        }
                        className="w-full h-12 font-bold tracking-wider rounded-[10px] bg-[#ffc62d] text-white text-[16px] uppercase shadow-sm hover:translate-y-[-1px] active:translate-y-[0px] transition-all"
                      >
                        Get directions
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map Right - Matching Image 1 */}
            <div className="hidden lg:block flex-1 bg-[#d0d7de] relative z-0">
              <MapContainer
                center={selectedLocation}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* Always show selected location marker if address is set */}
                {address && <Marker position={selectedLocation} />}

                {/* Show store marker only in PICKUP mode */}
                {orderType === 'PICKUP' && (
                  <Marker position={selectedStore.location}>
                    <Popup permanent className="custom-popup">
                      <div className="flex flex-col items-center p-1">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm mb-2 text-center">
                          <p className="text-[12px] font-black uppercase text-[#2c2b2b] leading-tight">
                            {selectedStore.name}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 leading-tight">
                            {selectedStore.address}
                          </p>
                        </div>
                        <button
                          data-cursor
                          className="bg-[#0a4635] text-[#f4f3e6] px-4 py-2 rounded-lg font-black text-[12px] uppercase shadow-lg whitespace-nowrap"
                        >
                          Programar recogida
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )}

                <ChangeView
                  center={
                    address
                      ? selectedLocation
                      : orderType === 'DELIVERY'
                        ? selectedLocation
                        : selectedStore.location
                  }
                  zoom={15}
                />
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[#f4f3e6] overflow-y-auto px-4 pb-20 pt-16 items-center">
            {/* All Locations Card - Matching Image 2 */}
            <div className="w-full max-w-[740px] bg-white p-10 rounded-[22px] shadow-sm flex flex-col gap-10">
              <h1 className="text-[20px] font-bold uppercase text-[#2c2b2b]">
                All locations
              </h1>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <Search size={22} className="text-gray-300" />
                </div>
                <input
                  data-cursor
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by address"
                  className="w-full h-15 pl-14 pr-12 rounded-[20px] border border-gray-300 bg-[#fbfbfb] focus:border-[#0a4635]/40 outline-none transition-all text-base  placeholder:text-gray-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a4635] transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
                {suggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-[2000] overflow-hidden p-2">
                    {suggestions.map((loc, idx) => (
                      <button
                        key={idx}
                        data-cursor
                        onClick={() => handleSelectLocation(loc)}
                        className="w-full p-3 text-left hover:bg-[#f4f3e6] rounded-xl flex items-start gap-3 transition-colors"
                      >
                        <span className="text-[14px] font-bold text-[#0a4635] line-clamp-2 leading-tight">
                          {loc.display_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div
                  data-cursor
                  className="border border-gray-100 rounded-2xl p-6 hover:bg-[#fbfbfb] cursor-pointer transition-all"
                >
                  <h3 className="text-lg font-bold uppercase mb-1 text-[#2c2b2b]">
                    Paput Delivery
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Avinguda Josep Anselm Clave
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Footer - Replicating Image 2 exactly */}
            <footer className="mt-auto pt-32 pb-10 flex flex-col items-center gap-6">
              <div className="relative">
                <img
                  src={images.orderPng}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-contain"
                />
              </div>
              <a
                data-cursor
                href="https://instagram.com"
                className="rounded-full hover:scale-110 transition-transform shadow-sm"
              >
                <img
                  src={images.instaFooter}
                  alt=""
                  className="w-10 rounded-[80px]"
                />
              </a>
              <div className="flex flex-col items-center gap-2 text-[10px] font-bold text-[#0a4635]/30 uppercase tracking-[0.2em] mt-2">
                <p>©2026 Paput. All Rights Reserved.</p>
              </div>
            </footer>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Order;
