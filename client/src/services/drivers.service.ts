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

  setDriver: async(payload: AssignTruckType): Promise<DriverType> => {
    const { data } = await $authHost.put('/drivers', payload)
    return data
  },
  unSetDriverToTruck: async(payload: AssignTruckType): Promise<DriverType> => {
    const { data } = await $authHost.put('/drivers/unset', payload)
    return data
  },
  deleteDriver: async(id: number) => {
    await $authHost.delete(`/drivers/${id}`);
  },
  getDriverById: async(id: string) => {
    const {data} = await $authHost.get(`/drivers/byid/${id}`);
    return data
  },
  updateDriver: async(payload: any) => {
    const { data } = await $authHost.put('/drivers/driver', payload)
    return data
  },
}

export default driversService;