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
          createdAt: new Date(price.created_at),
          diesel: price.diesel,
          unleaded: price.unleaded,
          electric: price.electric,
        }));
        store.setPrices(newPrices);
      } catch (e) {
        console.log(e.stack);
      }
    }),
    addPrice: flow(function* (price, gasStationId) {
      try {
        const data = {
          diesel: price.diesel,
          unleaded: price.unleaded,
          electric: price.electric,
          gas_station: gasStationId,
        };
        const response = yield axiosInstance.post('/api/prices/', data);
        const newPrice = {
          id: response.data.id,
          diesel: response.data.diesel,
          unleaded: response.data.unleaded,
          electric: response.data.electric,
          createdAt: new Date(response.data.created_at),
          gasStation: getParent(store).getGasStationById(
            response.data.gas_station.toString()
          ),
        };
        store.setPrices([...store.prices, newPrice]);
      } catch (e) {
        console.log(e.message);
      }
    }),
  }))
  .views((store) => ({
    getLatestPriceById(id) {
      return store.prices.find((price) => price.gasStation.id === id);
    },
  }));
