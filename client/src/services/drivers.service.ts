import { DriverType, DriverCreds } from './../types/types';
import { $authHost } from './intex';


const driversService = {
  createDriver: async(payload: any): Promise<DriverType> => {
    const { data } = await $authHost.post('/drivers', payload);
    return data;
  },
  
  loadDrivers: async (): Promise<DriverType[]> => {
    const { data } = await $authHost.get('/drivers')
    return data;
  }
}

export default driversService;