export const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export const API_ENDPOINTS = {
  GEOCODING: {
    SEARCH: `${NOMINATIM_BASE_URL}/search`,
    REVERSE: `${NOMINATIM_BASE_URL}/reverse`,
  },
  LEAFLET: {
    MARKER_ICON_2X:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    MARKER_ICON:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    MARKER_SHADOW:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    TILE_URL: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
  },
};
