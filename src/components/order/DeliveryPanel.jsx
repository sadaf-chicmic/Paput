import React, { useState } from 'react';
import {
  Search,
  Navigation,
  X,
  Bookmark,
  BookmarkPlus,
  Loader2,
  MapPin,
  Trash2,
} from 'lucide-react';
import { ORDER_TEXTS } from '../../constants/texts';
import { useAuth } from '../../context/AuthContext';

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
  // New props
  savedAddresses,
  handleSaveAddress,
  handleDeleteAddress,
  isSaving,
  address,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useAuth();

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
              data-cursor
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

        <div className="flex items-center justify-between px-1">
          <button
            data-cursor
            onClick={handleCurrentLocation}
            disabled={loading}
            className="flex items-center gap-2 text-[13px] font-bold hover:opacity-65 cursor-pointer transition-all uppercase tracking-tight text-[#2c2b2b]"
          >
            <Navigation size={14} className="fill-[#0a4635]" />
            {loading ? T.GETTING_LOCATION : T.CURRENT_LOCATION}
          </button>

          {user && address && (
            <button
              data-cursor
              onClick={handleSaveAddress}
              disabled={isSaving}
              className="flex items-center gap-2 text-[13px] font-bold hover:opacity-65 cursor-pointer transition-all uppercase tracking-tight text-[#0a4635]"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BookmarkPlus size={14} />
              )}
              {isSaving ? 'Guardando...' : 'Guardar dirección'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-[18px] font-bold  uppercase tracking-tight text-[#2c2b2b]">
            {T.YOUR_ADDRESSES}
          </h2>

          {!user ? (
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-[16px]">{T.NO_ADDRESSES}</p>
              <button
                data-cursor
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full h-12 rounded-[10px] bg-[#ffc62d] text-[#0a4635] text-[16px] font-bold uppercase shadow-sm hover:translate-y-[-2px] transition-all"
              >
                {T.LOGIN_TO_SAVE}
              </button>
            </div>
          ) : savedAddresses.length > 0 ? (
            <div className="flex flex-col gap-3">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex items-center gap-2 group/card"
                >
                  <button
                    data-cursor
                    onClick={() =>
                      handleSelectLocation({
                        lat: addr.lat,
                        lon: addr.lon,
                        display_name: addr.full_address,
                      })
                    }
                    className={`flex-1 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm flex items-start gap-4 hover:border-[#0a4635]/20 transition-all ${
                      address === addr.full_address
                        ? 'ring-2 ring-[#0a4635]'
                        : ''
                    }`}
                  >
                    <div className="p-2 bg-[#f4f3e6] rounded-xl text-[#0a4635]">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <h3 className="text-[15px] font-bold uppercase text-[#2c2b2b] truncate w-full">
                        {addr.name}
                      </h3>
                      <p className="text-gray-400 text-[13px] line-clamp-1">
                        {addr.full_address}
                      </p>
                    </div>
                  </button>
                  <button
                    data-cursor
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(addr.id);
                    }}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover/card:opacity-100"
                    title="Delete address"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-[16px]">{T.NO_ADDRESSES}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliveryPanel;
