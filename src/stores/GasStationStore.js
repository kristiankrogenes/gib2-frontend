import { types } from 'mobx-state-tree';
import axiosInstance from '../utils/axios';

export const GasStationModel = types.model({
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
    async fetchGasStations() {
      const response = await axiosInstance.get('gasstations/');
      console.log(response.data);
      const newGasStations = response.data.features.map((gasStation) => ({
        name: gasStation.properties.name,
        price: gasStation.properties.price,
        point: gasStation.geometry.coordinates,
      }));
      console.log(newGasStations);
      store.setGasStations(newGasStations);
    },
    addGasStation(gasStation) {
      store.setGasStations([...store.gasStations, gasStation]);
    },
  }));
let _gasStationStore;
export const useGasStations = () => {
  if (!_gasStationStore) {
    _gasStationStore = GasStationStore.create({
      gasStations: [],
    });
  }
  return _gasStationStore;
};
