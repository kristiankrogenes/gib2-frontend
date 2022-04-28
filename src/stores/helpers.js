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

export const logOut = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.replace(process.env.REACT_APP_WEB_URL);
};
