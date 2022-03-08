import { types, flow } from 'mobx-state-tree';
import axiosInstance from '../utils/axios';
import { getGasStationFromAPI, getGasStationPOST } from './helpers';

export const GasStationModel = types.model({
  id: types.identifier,
  name: types.optional(types.string, 'No name'),
  price: types.optional(types.number, 0),
  point: types.optional(types.array(types.number), [0, 0]),
});

export const GasStationStore = types
  .model('GasStationStore', {
    gasStations: types.array(GasStationModel),
  })
  .actions((store) => ({
    setGasStations(newGasStations) {
      store.gasStations = newGasStations;
    },
    fetchGasStations: flow(function* () {
      try {
        const response = yield axiosInstance.get('/api/gasstations/');
        const newGasStations = response.data.features.map((gasStation) => ({
          id: gasStation.id.toString(),
          name: gasStation.properties.name,
          price: gasStation.properties.latest_price,
          point: gasStation.geometry.coordinates,
        }));
        store.setGasStations(newGasStations);
      } catch (e) {
        console.log(e.stack);
      }
    }),
    addGasStation: flow(function* (marker, stationInfo) {
      try {
        const data = getGasStationPOST(
          marker,
          stationInfo.name,
          stationInfo.price
        );
        const response = yield axiosInstance.post('/api/gasstations/', data);
        const gasStation = getGasStationFromAPI(response.data);
        store.setGasStations([...store.gasStations, gasStation]);
      } catch (e) {
        console.log(e.message);
      }
    }),
  }))
  .views((store) => ({
    getGasStationById(id) {
      return store.gasStations.find((gasStation) => gasStation.id === id);
    },
  }));
