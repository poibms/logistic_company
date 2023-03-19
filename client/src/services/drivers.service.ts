import { DriverType } from './../types/types';
import { $authHost } from './intex';


const driversService = {
  loadDrivers: async (): Promise<DriverType[]> => {
    const { data } = await $authHost.get('/drivers')
    return data;
  }
}

export default driversService;