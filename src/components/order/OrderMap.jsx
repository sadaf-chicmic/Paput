import React from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { API_ENDPOINTS } from '../../constants/api';
import { APP_CONFIG } from '../../constants/config';
import { ORDER_TEXTS } from '../../constants/texts';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: API_ENDPOINTS.LEAFLET.MARKER_ICON_2X,
  iconUrl: API_ENDPOINTS.LEAFLET.MARKER_ICON,
  shadowUrl: API_ENDPOINTS.LEAFLET.MARKER_SHADOW,
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const OrderMap = ({ selectedLocation, address, orderType, selectedStore }) => {
  return (
    <div className="hidden lg:block flex-1 bg-[#d0d7de] relative z-0">
      <MapContainer
        center={selectedLocation}
        zoom={APP_CONFIG.MAP_ZOOM}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={APP_CONFIG.MAP_ATTRIBUTION}
          url={API_ENDPOINTS.LEAFLET.TILE_URL}
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
                  {ORDER_TEXTS.MAP.SCHEDULE_PICKUP}
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
          zoom={APP_CONFIG.MAP_ZOOM_DETAIL}
        />
      </MapContainer>
    </div>
  );
};

export default OrderMap;
