import { getGrayColor } from '../../utils/formatColor';

export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const mapStyle = 'mapbox://styles/mapbox/streets-v11';

// coordinates for lerkendalsbygget
export const lerka = {
  lng: 10.406852960586548,
  lat: 63.4147798358434,
};

const percentile = 1 / 9;

export const layerStyle = {
  id: 'polygon',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        [0, getGrayColor(1 * percentile)],
        [1, getGrayColor(2 * percentile)],
        [2, getGrayColor(3 * percentile)],
        [3, getGrayColor(4 * percentile)],
        [4, getGrayColor(5 * percentile)],
        [5, getGrayColor(6 * percentile)],
        [6, getGrayColor(7 * percentile)],
        [7, getGrayColor(8 * percentile)],
        [8, getGrayColor(9 * percentile)],
      ],
    },
    'fill-opacity': 0.8,
  },
};

export const initialViewState = {
  longitude: lerka.lng,
  latitude: lerka.lat,
  zoom: 14,
  width: '100%',
  height: 600,
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
