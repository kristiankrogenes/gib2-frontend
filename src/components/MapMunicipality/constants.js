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
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, '#3288bd'],
        [1, '#66c2a5'],
        [2, '#abdda4'],
        [3, '#e6f598'],
        [4, '#ffffbf'],
        [5, '#fee08b'],
        [6, '#fdae61'],
        [7, '#f46d43'],
        [8, '#d53e4f'],
      ],
    },
    'fill-opacity': 0.5,
  },
};

// export const layerStyle = {
//   id: 'polygon',
//   type: 'fill',
//   paint: {
//     'fill-color': [
//       'match',
//       ['get', 'kommunenummer2'],
//       54,
//       '#64bdbb',
//       50, // Kommunenummer med 50xx, er trøndelag
//       '#64bdbb', // if trøndelag give this color
//       46,
//       '#a83289',
//       '#888888',
//     ],
//     'fill-opacity': 0.5,
//   },
// };

export const lineLayerStyle = {
  id: 'route',
  type: 'line',
  source: 'test',
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
