import { types, flow, getParent } from 'mobx-state-tree';
import axiosInstance from '../utils/axios';
import { GasStationModel } from './GasStationStore';

export const PriceModel = types.model({
  id: types.number,
  gasStation: types.reference(GasStationModel),
  createdAt: types.Date,
  diesel: types.optional(types.number, 0),
  unleaded: types.optional(types.number, 0),
  electric: types.optional(types.number, 0),
});

export const PriceStore = types
  .model('PriceStore', {
    prices: types.array(PriceModel),
  })
  .actions((store) => ({
    setPrices(newPrices) {
      store.prices = newPrices;
    },
    fetchPrices: flow(function* () {
      try {
        const response = yield axiosInstance.get('/api/prices/');
        const newPrices = response.data.map((price) => ({
          id: price.id,
          gasStation: getParent(store).getGasStationById(
            price.gas_station.toString()
          ),
          createdAt: new Date(price.createdAt),
          diesel: price.diesel,
          unleaded: price.unleaded,
          electric: price.electric,
        }));
        store.setPrices(newPrices);
      } catch (e) {
        console.log(e.stack);
      }
    }),
    addPrice(price) {
      store.setPrices([...store.prices, price]);
    },
  }))
  .views((store) => ({
    getLatestPriceById(id) {
      return store.prices.find((price) => price.gasStation.id === id);
    },
  }));
