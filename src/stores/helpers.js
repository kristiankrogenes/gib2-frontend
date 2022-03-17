export const getGasStationFromAPI = (gasStation) => ({
  id: gasStation.id.toString(),
  name: gasStation.properties.name,
  point: gasStation.geometry.coordinates,
});

export const getGasStationPOST = (marker, name) => ({
  name: name,
  geom: {
    type: 'Point',
    coordinates: [marker.coordinates.lng, marker.coordinates.lat],
  },
});
