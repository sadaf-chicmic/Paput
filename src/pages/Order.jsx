import React, { useState, useEffect, useCallback } from 'react';
import OrderHeader from '../components/order/OrderHeader';
import OrderSidebar from '../components/order/OrderSidebar';
import OrderMap from '../components/order/OrderMap';
import LocationsTab from '../components/order/LocationsTab';
import OrderFooter from '../components/order/OrderFooter';
import LoginModal from '../components/common/LoginModal';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const Order = () => {
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
      <OrderHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {activeTab === 'ORDER' ? (
          <div className="flex flex-1">
            <OrderSidebar
              orderType={orderType}
              setOrderType={setOrderType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              handleSelectLocation={handleSelectLocation}
              handleCurrentLocation={handleCurrentLocation}
              loading={loading}
              setIsLoginModalOpen={setIsLoginModalOpen}
              selectedStore={selectedStore}
              showStoreInfo={showStoreInfo}
              setShowStoreInfo={setShowStoreInfo}
            />

            <OrderMap
              selectedLocation={selectedLocation}
              address={address}
              orderType={orderType}
              selectedStore={selectedStore}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[#f4f3e6] overflow-y-auto items-center">
            <LocationsTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              handleSelectLocation={handleSelectLocation}
            />
            <OrderFooter />
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
