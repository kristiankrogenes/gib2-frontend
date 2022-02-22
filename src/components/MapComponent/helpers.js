export const createPointGeojson = (point) => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [point.coordinates.lng, point.coordinates.lat],
      },
    },
  ],
});

export const getGasStationPOST = (marker, name, price) => ({
  name: name,
  geom: {
    type: 'Point',
    coordinates: [marker.coordinates.lng, marker.coordinates.lat],
  },
  price: price,
});
