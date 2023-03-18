import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import driversService from "../services/drivers.service";
import { DriversType } from "../types/types";

const driversSlice = createSlice({
  name: 'orders',
  initialState: {
    isLoading: true as boolean,
    drivers: [] as DriversType[],
    error: null as string | null,
  },
  reducers: {
    driversRequested: state => {
      state.isLoading = true;
    },
    driversReceived: (state, action) => {
      state.drivers = action.payload;
      state.isLoading = false;
    },
    driversRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: driversReducer } = driversSlice;

const { driversRequested, driversReceived, driversRequestFailed } = actions;

export const loadDrivers = (): any => async (dispatch: any) => {
  dispatch(driversRequested());
  try {
    const drivers = await driversService.loadDrivers()
    dispatch(driversReceived(drivers));
  } catch (error: any) {
    const { message } = error.response.data;
    dispatch(driversRequestFailed(message));
  }
};

export const getOrdersLoadingStatus = () => (state: RootState) => state.orders.isLoading;

export const getAllOrders = () => (state: RootState) => state.orders.orders;


export default driversReducer;