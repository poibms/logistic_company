import { createSlice } from "@reduxjs/toolkit";
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


export default ordersReducer;