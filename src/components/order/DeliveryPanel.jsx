import React, { useState } from 'react';
import { Search, Navigation, X } from 'lucide-react';
import { ORDER_TEXTS } from '../../constants/texts';
const { DELIVERY_PANEL: T } = ORDER_TEXTS;

const DeliveryPanel = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  setSuggestions,
  handleSelectLocation,
  handleCurrentLocation,
  loading,
  setIsLoginModalOpen,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-4 mt-2">
        <h2 className="text-[18px] font-bold  uppercase tracking-tight text-[#2c2b2b]">
          {T.NEW_ADDRESS}
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
            placeholder={T.PLACEHOLDER}
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
        <button
          data-cursor
          onClick={handleCurrentLocation}
          disabled={loading}
          className="flex items-center justify-center gap-2 text-[14px] hover:opacity-65 cursor-pointer transition-all uppercase tracking-tight text-[#2c2b2b]"
        >
          <Navigation size={16} className="fill-[#0a4635]" />
          {loading ? T.GETTING_LOCATION : T.CURRENT_LOCATION}
        </button>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[18px] font-bold  uppercase tracking-tight text-[#2c2b2b]">
            {T.YOUR_ADDRESSES}
          </h2>
          <p className="text-gray-400 text-[16px]">{T.NO_ADDRESSES}</p>
        </div>
        <button
          data-cursor
          onClick={() => setIsLoginModalOpen(true)}
          className="w-full h-12 rounded-[10px] bg-[#ffc62d] text-[#0a4635] text-[16px] font-bold uppercase shadow-sm hover:translate-y-[-2px] transition-all"
        >
          {T.LOGIN_TO_SAVE}
        </button>
      </div>
    </>
  );
};

export default DeliveryPanel;
