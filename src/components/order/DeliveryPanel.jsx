import React from 'react';
import { Search, Navigation, X } from 'lucide-react';

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
  return (
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
          {loading ? 'Obteniendo ubicación...' : 'Ubicación actual'}
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
  );
};

export default DeliveryPanel;
