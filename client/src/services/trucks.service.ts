import { TruckType } from './../types/types';
import { $authHost } from './intex';


const trucksService = {
  createTruck: async(payload: any): Promise<TruckType> => {
    const { data } = await $authHost.post('/trucks', payload);
    return data;
  },

  loadTrucks: async (): Promise<TruckType[]> => {
    const { data } = await $authHost.get('/trucks')
    return data;
  }
}

export default trucksService;