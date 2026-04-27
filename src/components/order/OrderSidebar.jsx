import React from 'react';
import { AnimatePresence } from 'framer-motion';
import DeliveryPanel from './DeliveryPanel';
import PickupPanel from './PickupPanel';
import StoreInfoPanel from './StoreInfoPanel';

const OrderSidebar = ({
  orderType,
  setOrderType,
  searchQuery,
  setSearchQuery,
  suggestions,
  setSuggestions,
  handleSelectLocation,
  handleCurrentLocation,
  loading,
  setIsLoginModalOpen,
  selectedStore,
  showStoreInfo,
  setShowStoreInfo,
}) => {
  return (
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
          <DeliveryPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            handleSelectLocation={handleSelectLocation}
            handleCurrentLocation={handleCurrentLocation}
            loading={loading}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        ) : (
          <PickupPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            handleSelectLocation={handleSelectLocation}
            selectedStore={selectedStore}
            setShowStoreInfo={setShowStoreInfo}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        )}
      </div>

      {/* Panel 2: Store Details (Beside Panel 1) */}
      <AnimatePresence>
        {orderType === 'PICKUP' && showStoreInfo && (
          <StoreInfoPanel
            selectedStore={selectedStore}
            setShowStoreInfo={setShowStoreInfo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderSidebar;
