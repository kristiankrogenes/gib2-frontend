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
      '#51a0d6',
      30,
      '#f28cb1',
      300,
      '#51a0d6',
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 50, 30, 300, 40],
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
    'circle-color': '#ff04da',
    'circle-radius': 8,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
};
