import React from 'react';
import { Search, X } from 'lucide-react';

const LocationsTab = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  handleSelectLocation,
  setSuggestions,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#f4f3e6] px-4 pb-20 pt-16 items-center">
      {/* All Locations Card - Matching Image 2 */}
      <div className="w-[50vw] bg-white p-10 rounded-[22px] shadow-sm flex flex-col gap-10">
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
            <p className="text-gray-400 text-sm">Avinguda Josep Anselm Clave</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsTab;
