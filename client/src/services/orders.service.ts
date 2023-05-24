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
    const res = await $host.get(`/orders/bytrack/${track_code}`);
  
    return res;
  },
  cancelOrder: async (id: number, err_message: string) => {
    const { data } = await $authHost.put(`/orders/cancel/${id}`, {err_message})
    return data
  },

  getOrderByDriver: async () => {
    const {data} = await $authHost.get('orders/ordersbydriver');
    return data
  },

  completeOder: async (payload: any) => {
    const {data} = await $authHost.put(`orders/complete/${payload.id}`, payload);
    return data
  }
}

export default ordersService;