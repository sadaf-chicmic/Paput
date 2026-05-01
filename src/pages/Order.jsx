import React, { useState, useEffect, useCallback } from 'react';
import OrderHeader from '../components/order/OrderHeader';
import OrderSidebar from '../components/order/OrderSidebar';
import OrderMap from '../components/order/OrderMap';
import LocationsTab from '../components/order/LocationsTab';
import OrderFooter from '../components/order/OrderFooter';

import { API_ENDPOINTS } from '../constants/api';
import { APP_CONFIG } from '../constants/config';
import { ORDER_TEXTS } from '../constants/texts';
import { useAuth } from '../context/AuthContext';
import { addressService } from '../services/addressService';

const Order = () => {
  const { user, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState(ORDER_TEXTS.TABS.ORDER); // ORDER or LOCATIONS
  const [orderType, setOrderType] = useState(ORDER_TEXTS.TYPES.DELIVERY); // DELIVERY or PICKUP
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    APP_CONFIG.DEFAULT_COORDINATES,
  ); // Default Mahón
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStoreInfo, setShowStoreInfo] = useState(false);
  const [selectedStore, setSelectedStore] = useState({
    name: ORDER_TEXTS.STORE.DEFAULT_NAME,
    address: ORDER_TEXTS.STORE.DEFAULT_ADDRESS,
    hours: ORDER_TEXTS.STORE.DEFAULT_HOURS,
    location: APP_CONFIG.DEFAULT_COORDINATES,
  });

  // Saved addresses state
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch saved addresses if user is logged in
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      if (user) {
        try {
          const data = await addressService.getAddresses(user.id);
          setSavedAddresses(data);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      } else {
        setSavedAddresses([]);
      }
    };
    fetchSavedAddresses();
  }, [user]);

  const handleSaveAddress = async () => {
    if (!user || !address) return;

    setIsSaving(true);
    try {
      const newAddress = {
        user_id: user.id,
        name: address.split(',')[0], // Use first part of address as name for now
        full_address: address,
        lat: selectedLocation[0],
        lon: selectedLocation[1],
      };
      const saved = await addressService.saveAddress(newAddress);
      setSavedAddresses([saved, ...savedAddresses]);
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await addressService.deleteAddress(addressId);
      setSavedAddresses(savedAddresses.filter((addr) => addr.id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GEOCODING.SEARCH}?format=json&q=${query}&limit=5&addressdetails=1`,
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(ORDER_TEXTS.ERRORS.FETCH_SUGGESTIONS, error);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      if (searchQuery !== address) {
        fetchSuggestions(searchQuery);
      }
    }, APP_CONFIG.SEARCH_TIMEOUT);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions, address]);

  // Clear search context when switching tabs or order types
  useEffect(() => {
    setSearchQuery('');
    setSuggestions([]);
    setAddress('');
    setSelectedLocation(APP_CONFIG.DEFAULT_COORDINATES);
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
            `${API_ENDPOINTS.GEOCODING.REVERSE}?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          setAddress(data.display_name);
          setSearchQuery(data.display_name);
        } catch (error) {
          console.error(ORDER_TEXTS.ERRORS.REVERSE_GEOCODING, error);
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
              isServiceable={
                !address || address.toLowerCase().includes('mohali')
              }
              // Added props for saved addresses
              savedAddresses={savedAddresses}
              handleSaveAddress={handleSaveAddress}
              handleDeleteAddress={handleDeleteAddress}
              isSaving={isSaving}
              address={address}
            />

            <OrderMap
              selectedLocation={selectedLocation}
              address={address}
              orderType={orderType}
              selectedStore={selectedStore}
              isDeliverable={
                !address || address.toLowerCase().includes('mohali')
              }
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
    </div>
  );
};

export default Order;
