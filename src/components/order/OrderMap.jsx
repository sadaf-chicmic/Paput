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

const OrderMap = ({
  selectedLocation,
  address,
  orderType,
  selectedStore,
  isDeliverable,
}) => {
  const isSearchEmpty = !address || address.trim() === '';

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

        {/* Deliverability Popup - Standalone to ensure it opens automatically */}
        {address && orderType === 'DELIVERY' && !isDeliverable && (
          <Popup
            position={selectedLocation}
            autoClose={false}
            closeOnClick={false}
            offset={[0, -32]}
            className="not-delivering-popup"
          >
            <div className="flex flex-col items-center p-2 min-w-[180px] max-w-[220px]">
              <h3 className="text-[14px] font-black uppercase text-[#2c2b2b] mb-1 leading-tight">
                {ORDER_TEXTS.MAP.NOT_DELIVERING}
              </h3>
              <p className="text-[11px] font-bold text-gray-400 text-center leading-snug">
                {address}
              </p>
            </div>
          </Popup>
        )}

        {/* Show store marker */}
        {/* Show store marker and popup only when search is empty */}
        {isSearchEmpty && (
          <>
            <Marker position={selectedStore.location} />
            <Popup
              position={selectedStore.location}
              autoClose={false}
              closeOnClick={false}
              offset={[0, -32]}
              className="custom-popup"
            >
              <div className="flex flex-col items-center">
                <div className="bg-white px-2 py-1 text-center">
                  <p className="text-[12px] font-black uppercase text-[#2c2b2b] leading-tight">
                    {selectedStore.name}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 leading-tight">
                    {selectedStore.address}
                  </p>
                </div>
              </div>
            </Popup>
          </>
        )}

        <ChangeView
          center={address ? selectedLocation : selectedStore.location}
          zoom={APP_CONFIG.MAP_ZOOM_DETAIL}
        />
      </MapContainer>
    </div>
  );
};

export default OrderMap;
