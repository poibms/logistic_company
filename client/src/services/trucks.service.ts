import { TruckType } from './../types/types';
import { $authHost } from './intex';


const trucksService = {
  loadTrucks: async (): Promise<TruckType[]> => {
    const { data } = await $authHost.get('/trucks')
    return data;
  }
}

export default trucksService;