import { DriversType } from './../types/types';
import { $authHost } from './intex';


const driversService = {
  loadDrivers: async (): Promise<DriversType[]> => {
    const { data } = await $authHost.get('/drivers')
    return data;
  }
}

export default driversService;