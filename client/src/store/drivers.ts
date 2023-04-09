import { AppThunk } from './index';
import { AssignTruckType, DriverUpdateType } from './../types/types';
import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import driversService from "../services/drivers.service";
import { DriverType } from "../types/types";

const driversSlice = createSlice({
  name: 'drivers',
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
      state.isLoading = false;
    },
    driverDelete: (state, action) => {
      state.drivers = state.drivers.filter((driver) => driver.id !== action.payload);
      state.isLoading = false;
    },
    driversRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    driverUpdated: (state, action) => {
      const driverIndex = state.drivers.findIndex(room => room.id === action.payload.id);
      state.drivers[driverIndex] = action.payload;
      state.isLoading=false;
    },
  },
});

const { actions, reducer: driversReducer } = driversSlice;

const { driversRequested, driversReceived, driversRequestFailed, driverCreated, driverUpdated, driverDelete } = actions;
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

export const updateDriver = (payload: any, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(driverCreateRequested());
  try {
    const driver = await driversService.updateDriver(payload);
    dispatch(driverUpdated(driver));
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
    dispatch(driversRequestFailed(error.response.data.message));
  }
};

export const setDriverToTruck = (payload: AssignTruckType, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(driversRequested());
  try {
    const drivers = await driversService.setDriver(payload)
    dispatch(driverUpdated(drivers));
    callback();
  } catch (error: any) {
    console.log(error)
    dispatch(driversRequestFailed(error.response.data.message));
  }
};

export const deleteDriverById = (id: number, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(driversRequested());
  try {
    await driversService.deleteDriver(id)
    dispatch(driverDelete(id));
    callback();
  } catch (error: any) {
    console.log(error)
    dispatch(driversRequestFailed(error.response.data.message));
  }
};

export const clearDriverErrors = (): AppThunk => async (dispatch: any) => {
  dispatch(driversRequestFailed(null))
}

export const getAllDrivers = () => (state: RootState) => state.drivers.drivers;

export const getDriverErrors = () => (state: RootState) => state.drivers.error;

export const getDriverById = (driverId: number) => (state: RootState) =>{
  if (state.drivers.drivers.length > 0) {
    return state.drivers.drivers.find((driver: DriverType) => driver.id === driverId);
  }
}

export const getDriversLoadingStatus = () => (state: RootState) => state.drivers.isLoading;

export default driversReducer;