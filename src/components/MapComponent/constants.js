export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const mapStyle = 'mapbox://styles/mapbox/streets-v11';

// coordinates for lerkendalsbygget
export const lerka = {
  longitude: 10.406852960586548,
  latitude: 63.4147798358434,
};

export const layerStyle = {
  id: 'polygon',
  type: 'fill',
  paint: { 'fill-color': '#007cbf', 'fill-opacity': 0.5 },
};
export const pointLayerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 20,
    'circle-color': '#007cbf',
  },
};
export const initialViewState = {
  longitude: lerka.longitude,
  latitude: lerka.latitude,
  zoom: 14,
  width: '100%',
  height: 600,
};
