import { types } from 'mobx-state-tree';
import { GasStationStore } from './GasStationStore';
import { PriceStore } from './PriceStore';

export const RootStore = types
  .model('RootStore', {
    gasStationStore: types.optional(GasStationStore, { gasStations: [] }),
    priceStore: types.optional(PriceStore, { prices: [] }),
  })
  .views((store) => ({
    getGasStationById(id) {
      return store.gasStationStore?.getGasStationById(id);
    },
    getLatestPriceById(id) {
      return store.priceStore?.getLatestPriceById(id);
    },
  }));

let _rootStore;
export const useStore = () => {
  if (!_rootStore) {
    _rootStore = RootStore.create({
      PriceStore,
      GasStationStore: { gasStations: [], selectedGasStation: null },
    });
  }
  return _rootStore;
};
