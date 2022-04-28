export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const mapStyle = 'mapbox://styles/mapbox/streets-v11';
export const lerka = {
  lng: 10.406852960586548,
  lat: 63.4147798358434,
};
export const initialViewState = {
  longitude: lerka.lng,
  latitude: lerka.lat,
  zoom: 4,
  width: '100%',
  height: 600,
};
export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'test',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      // '#51a0d6',
      '#038f96',
      30,
      '#038f96',
      // '#cc6062',
      300,
      '#038f96',
      // '#397fad',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 50, 30, 300, 45],
  },
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'test',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'test',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#ff5349',
    'circle-radius': 6,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
};
