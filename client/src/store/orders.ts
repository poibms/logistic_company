import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import ordersService from "../services/orders.service";
import { OrderType } from "../types/types";

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    isLoading: true as boolean,
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
    ordersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: ordersReducer } = ordersSlice;

const { ordersRequested, ordersReceived, ordersRequestFailed } = actions;

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

export const getOrdersLoadingStatus = () => (state: RootState) => state.orders.isLoading;

export const getAllOrders = () => (state: RootState) => state.orders.orders;


export default ordersReducer;