import { types } from 'mobx-state-tree';
import { GasStationStore } from './GasStationStore';
import { PriceStore } from './PriceStore';
import { UserStore } from './UserStore';

export const RootStore = types
  .model('RootStore', {
    gasStationStore: types.optional(GasStationStore, { gasStations: [] }),
    priceStore: types.optional(PriceStore, { prices: [] }),
    userStore: types.optional(UserStore, { users: [] }),
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
      UserStore: { users: [], currentUser: null },
    });
  }
  return _rootStore;
};
