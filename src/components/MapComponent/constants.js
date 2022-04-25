export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const mapStyle = 'mapbox://styles/mapbox/streets-v11';

// coordinates for lerkendalsbygget
export const lerka = {
  lng: 10.406852960586548,
  lat: 63.4147798358434,
};

export const heimdal = {
  lng: 10.348777770996094,
  lat: 63.35274520773996,
};

export const layerStyle = {
  id: 'polygon',
  type: 'fill',
  paint: { 'fill-color': '#007cbf', 'fill-opacity': 0.5 },
};

export const lineLayerStyle = {
  id: 'route',
  type: 'line',
  source: 'optimized-routes',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#0048BA',
    'line-opacity': 0.5,
    'line-width': 8,
    'line-blur': 0.9,
  },
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
  longitude: lerka.lng,
  latitude: lerka.lat,
  zoom: 14,
  width: '100%',
  height: 600,
};
