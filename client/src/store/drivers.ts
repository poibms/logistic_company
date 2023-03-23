import { DriverCreds } from './../types/types';
import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import driversService from "../services/drivers.service";
import { DriverType } from "../types/types";

const driversSlice = createSlice({
  name: 'orders',
  initialState: {
    isLoading: true as boolean,
    drivers: [] as DriverType[],
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
    driverCreated: (state, action) => {
      state.drivers.push(action.payload);
    },
    driversRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: driversReducer } = driversSlice;

const { driversRequested, driversReceived, driversRequestFailed, driverCreated } = actions;
const reviewCreateRequested = createAction('drivers/driversCreateRequested');
const reviewCreateRequestedFailed = createAction('drivers/driversCreateRequestedFailed');

export const createDriver = (payload: any): any => async (dispatch: any) => {
  dispatch(reviewCreateRequested());
  try {
    console.log(payload)
    const driver = await driversService.createDriver(payload);
    dispatch(driverCreated(driver));
  } catch (error: any) {
    const { message } = error.response.data;
    dispatch(reviewCreateRequestedFailed(message));
  }
};

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

export const getAllDrivers = () => (state: RootState) => state.drivers.drivers;


export default driversReducer;