import { AssignOrderToDriver } from './../types/types';
import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from ".";
import ordersService from "../services/orders.service";
import { OrderType } from "../types/types";

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    isLoading: true as boolean,
    userOrders: [] as OrderType[],
    orders: [] as OrderType[],
    error: null as string | null,
  },
  reducers: {
    ordersRequested: state => {
      state.isLoading = true;
    },
    ordersReceived: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    userOrders: (state, action) => {
      state.userOrders = action.payload;
      state.isLoading = false;
    },
    orderCreated: (state, action) => {
      state.orders.push(action.payload);
    },
    ordersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    orderUpdated: (state, action) => {
      const driverIndex = state.orders.findIndex(order => order.id === action.payload.id);
      state.orders[driverIndex] = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: ordersReducer } = ordersSlice;

const { ordersRequested, ordersReceived, ordersRequestFailed, orderUpdated, orderCreated, userOrders } = actions;

export const createOrder = (payload: any): AppThunk => async (dispatch: any) => {
  dispatch(ordersRequested());
  try {
    const driver = await ordersService.createOrder(payload);
    dispatch(orderCreated(driver));
  } catch (error: any) {
    dispatch(ordersRequestFailed(error.response.data.message));

  }
};


export const loadOrders = (): any => async (dispatch: any) => {
  dispatch(ordersRequested());
  try {
    const { data } = await ordersService.loadOrders()
    console.log(data);
    dispatch(ordersReceived(data));
  } catch (error: any) {
    dispatch(ordersRequestFailed(error));
  }
};

export const getUserOrders = (): any => async (dispatch: any) => {
  dispatch(ordersRequested());
  try {
    const data = await ordersService.getAuthUserOrders()
    dispatch(userOrders(data));
  } catch (error: any) {
    dispatch(ordersRequestFailed(error));
  }
};

export const setOrderToDriver = (payload: AssignOrderToDriver, callback: any): any => async (dispatch: any) => {
  dispatch(ordersRequested());
  try {
    const drivers = await ordersService.assignOrderToDriver(payload)
    dispatch(orderUpdated(drivers));
    callback();
  } catch (error: any) {
    dispatch(ordersRequestFailed(error.response.data.message));
  }
};

export const getOrdersLoadingStatus = () => (state: RootState) => state.orders.isLoading;

export const getAllOrders = () => (state: RootState) => state.orders.orders;

export const getAuthOrders = () => (state: RootState) => state.orders.userOrders;

export const getOrderrById = (orderId: number) => (state: RootState) =>{
  if (state.orders.orders.length > 0) {
    return state.orders.orders.find((order: OrderType) => order.id === orderId);
  }
}

export const getOrdersByUserId = (userId: string) => (state: RootState) => {
  if(state.orders.orders.length > 0) {
    return state.orders.orders.filter((order: OrderType) => order.ownerId.id === userId)
  }
}

export const getOrdersErrors = () => (state: RootState) => state.orders.error;

export default ordersReducer;