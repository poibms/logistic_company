import { AppThunk } from './index';
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
    error: null,
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
    },
  },
});

const { actions, reducer: driversReducer } = driversSlice;

const { driversRequested, driversReceived, driversRequestFailed, driverCreated } = actions;
const driverCreateRequested = createAction('drivers/driversCreateRequested');

export const createDriver = (payload: any, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(driverCreateRequested());
  try {
    const driver = await driversService.createDriver(payload);
    dispatch(driverCreated(driver));
    callback()
  } catch (error: any) {
    dispatch(driversRequestFailed(error.response.data.message));

  }
};

export const loadDrivers = (): any => async (dispatch: any) => {
  dispatch(driversRequested());
  try {
    const drivers = await driversService.loadDrivers()
    dispatch(driversReceived(drivers));
  } catch (error: any) {
    dispatch(driversRequestFailed(error.messag));
  }
};

export const clearDriverErrors = (): AppThunk => async (dispatch: any) => {
  dispatch(driversRequestFailed(null))
}

export const getAllDrivers = () => (state: RootState) => state.drivers.drivers;

export const getDriverErrors = () => (state: RootState) => state.drivers.error;


export default driversReducer;