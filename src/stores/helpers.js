export const getGasStationFromAPI = (gasStation) => ({
  id: gasStation.id.toString(),
  name: gasStation.properties.name,
  price: gasStation.properties.latest_price,
  point: gasStation.geometry.coordinates,
});

export const getGasStationPOST = (marker, name, price) => ({
  name: name,
  geom: {
    type: 'Point',
    coordinates: [marker.coordinates.lng, marker.coordinates.lat],
  },
  latest_price: parseFloat(price),
});
