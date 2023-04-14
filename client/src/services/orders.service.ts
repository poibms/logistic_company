import { OrderStatus, AssignOrderToDriver, OrderCreds } from './../types/types';
import { $authHost, $host } from './intex';


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

  getAuthUserOrders: async () => {
    const {data} = await $authHost.get('/orders/userorders');
    return data
  }, 
  getOrderByTrackCode: async (track_code: string) => {
    const {data} = await $host.get(`/orders/bytrack/${track_code}`);
    return data;
  },
  cancelOrder: async (id: number) => {
    const { data } = await $authHost.put(`/orders/cancel/${id}`)
    return data
  },
}

export default ordersService;