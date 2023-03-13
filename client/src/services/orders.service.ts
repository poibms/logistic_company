import { OrderStatus } from './../types/types';
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
  }
}

export default ordersService;