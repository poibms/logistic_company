import { OrderStatus, AssignOrderToDriver, OrderCreds } from './../types/types';
import { $authHost } from './intex';


const ordersService = {
  loadOrders: async (status?: OrderStatus) => {
    let response;
    if (status) {
      response = await $authHost.get(`/orders?status=${status}`);
    } else {
      response = await $authHost.get('/orders')
    }
    return response;
  },

  assignOrderToDriver: async (payload: AssignOrderToDriver) => {
    const { data } = await $authHost.put('/orders', payload)
    return data
  }, 

  createOrder: async (payload: OrderCreds) => {
    const { data } = await $authHost.post('/orders', payload)
    return data
  }, 
}

export default ordersService;