import { updateTruck } from './../store/trucks';
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
  },
  updateTruck: async(payload: any) => {
    const { data } = await $authHost.put('/trucks', payload)
    return data
  },
  deleteTruck: async(id: number) => {
    await $authHost.delete(`/trucks/${id}`);
  },
}

export default trucksService;