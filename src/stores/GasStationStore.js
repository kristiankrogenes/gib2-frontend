import { types, flow, getRoot } from 'mobx-state-tree';
import axiosInstance from '../utils/axios';
import { getGasStationFromAPI, getGasStationPOST } from './helpers';
import { lerka } from '../components/MapComponent/constants';

export const GasStationModel = types
  .model({
    id: types.identifier,
    name: types.optional(types.string, 'No name'),
    point: types.optional(types.array(types.number), [0, 0]),
  })
  .views((store) => ({
    get latestPrice() {
      return getRoot(store).getLatestPriceById(store.id);
    },
  }));

export const GasStationStore = types
  .model('GasStationStore', {
    gasStations: types.array(GasStationModel),
    gasStationsInsideRadius: types.array(types.string),
    selectedGasStation: types.maybeNull(types.reference(GasStationModel)),
  })
  .actions((store) => ({
    setGasStations(newGasStations) {
      store.gasStations = newGasStations;
    },
    setGasStationsInsideRadius(newGasStations) {
      store.gasStationsInsideRadius = newGasStations;
    },
    setSelectedGasStation(gasStation) {
      store.selectedGasStation = gasStation;
    },
    fetchGasStations: flow(function* () {
      try {
        const response = yield axiosInstance.get('/api/gasstations/');
        const newGasStations = response.data.features.map((gasStation) => ({
          id: gasStation.id.toString(),
          name: gasStation.properties.name,
          point: gasStation.geometry.coordinates,
        }));
        store.setGasStations(newGasStations);
        const response2 = yield axiosInstance.get(
          '/api/stations-inside-radius/',
          { params: { lon: lerka.lng, lat: lerka.lat } }
        );
        const nearGasStations = response2.data.features.map((gasStation) =>
          gasStation.id.toString()
        );
        store.setGasStationsInsideRadius(nearGasStations);
      } catch (e) {
        console.log(e.stack);
      }
    }),
    addGasStation: flow(function* (marker, name) {
      try {
        const data = getGasStationPOST(marker, name);
        const response = yield axiosInstance.post('/api/gasstations/', data);
        const gasStation = getGasStationFromAPI(response.data);
        store.setGasStations([...store.gasStations, gasStation]);
        return gasStation.id;
      } catch (e) {
        console.log(e.message);
      }
    }),
  }))
  .views((store) => ({
    getGasStationById(id) {
      return store.gasStations.find((gasStation) => gasStation.id === id);
    },
    getGasStationsInsideRadius() {
      return store.gasStations.filter((gasStation) =>
        store.gasStationsInsideRadius.includes(gasStation.id)
      );
    },
  }));
