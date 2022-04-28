import { getGrayColor } from '../../utils/formatColor';

export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const mapStyle = 'mapbox://styles/mapbox/streets-v11';
export const municipalityURL =
  'https://ws.geonorge.no/kommuneinfo/v1/kommuner/illustrasjonskart?utkoordsys=4326';
export const county = 'county';
export const municipality = 'municipality';
export const total = 'total';
export const average = 'average';
export const diesel = 'diesel';
export const octane95 = 'octane_95';
export const electric = 'electric';

// coordinates for lerkendalsbygget
export const lerka = {
  lng: 10.406852960586548,
  lat: 63.4147798358434,
};

const percentile = 1 / 5;

export const layerStyle = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'percentile',
      stops: [
        // [0, '#3288bd'],
        // [1, '#66c2a5'],
        // [2, '#abdda4'],
        // [3, '#e6f598'],
        // [4, '#ffffbf'],
        // [5, '#fee08b'],
        // [6, '#fdae61'],
        // [7, '#f46d43'],
        // [8, '#d53e4f'],
        // [9, '#ff0000'],
        [0, getGrayColor(4 * percentile)],
        [1, getGrayColor(3 * percentile)],
        [2, getGrayColor(2 * percentile)],
        [3, getGrayColor(1 * percentile)],
        [4, getGrayColor(0 * percentile)],
        // [5, getGrayColor(0.5 * percentile)],
        // [6, getGrayColor(0 * percentile)],
        // [7, getGrayColor(1.5 * percentile)],
        // [8, getGrayColor(1 * percentile)],
        // [9, getGrayColor(0.5 * percentile)],
        // [10, getGrayColor(0 * percentile)],
      ],
    },
    'fill-opacity': 0.9,
  },
};

export const initialViewState = {
  longitude: lerka.lng,
  latitude: lerka.lat,
  zoom: 4,
  width: '100%',
  height: 600,
};

export const emptyInsight = {
  total: 0,
  prices: {
    diesel: {
      max: 0,
      min: 0,
      average: 0,
      sum: 0,
    },
    octane_95: {
      max: 0,
      min: 0,
      average: 0,
      sum: 0,
    },
    electric: {
      max: 0,
      min: 0,
      average: 0,
      sum: 0,
    },
  },
};
