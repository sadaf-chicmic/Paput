import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { ORDER_TEXTS, SHARED_TEXTS } from '../../constants/texts';
const { PICKUP_PANEL: T } = ORDER_TEXTS;

const PickupPanel = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  setSuggestions,
  handleSelectLocation,
  selectedStore,
  setShowStoreInfo,
  setIsLoginModalOpen,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-[18px] font-bold uppercase tracking-tight text-[#2c2b2b]">
          {T.PICKUP_FROM}
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={T.SEARCH}
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
          {isFocused && searchQuery.trim() !== '' && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-[2000] overflow-hidden p-2">
              {suggestions.length > 0 ? (
                suggestions.map((loc, idx) => (
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
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 text-[14px] font-bold uppercase">
                  {T.NO_SUGGESTIONS}
                </div>
              )}
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
                {T.OPENS_SOON}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                data-cursor
                onClick={() => setShowStoreInfo(true)}
                className="bg-[#ffc62d] text-white px-4 py-2 rounded-[10px] font-bold tracking-wider text-[14px] uppercase shadow-sm hover:translate-y-[-1.5px] transition-all"
              >
                {SHARED_TEXTS.INFO}
              </button>
              <button
                data-cursor
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#0a4635] text-white px-4 py-2 rounded-[10px] font-bold tracking-wider text-[14px] uppercase shadow-sm hover:translate-y-[-1.5px] transition-all"
              >
                {SHARED_TEXTS.ORDER}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupPanel;
