import { AssignTruckType, DriverType } from './../types/types';
import { $authHost } from './intex';


const driversService = {
  createDriver: async(payload: any): Promise<DriverType> => {
    const { data } = await $authHost.post('/drivers', payload);
    return data;
  },
  
  loadDrivers: async (): Promise<DriverType[]> => {
    const { data } = await $authHost.get('/drivers')
    return data;
  },

  setDriver: async(payload: AssignTruckType) => {
    const { data } = await $authHost.put('/drivers', payload)
    return data
  }
}

export default driversService;