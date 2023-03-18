import { $authHost } from './intex';


const driversService = {
  loadDrivers: async () => {
    const { data } = await $authHost.get('/drivers')
    return data;
  }
}

export default driversService;