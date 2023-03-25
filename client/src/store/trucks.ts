import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from ".";
import trucksService from "../services/trucks.service";
import { TruckType } from "../types/types";

const trucksSlice = createSlice({
  name: 'trucks',
  initialState: {
    isLoading: true as boolean,
    trucks: [] as TruckType[],
    error: null as string | null,
  },
  reducers: {
    trucksRequested: state => {
      state.isLoading = true;
    },
    trucksReceived: (state, action) => {
      state.trucks = action.payload;
      state.isLoading = false;
    },
    driverCreated: (state, action) => {
      state.trucks.push(action.payload);
    },
    trucksRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: trucksReducer } = trucksSlice;

const { trucksRequested, trucksReceived, trucksRequestFailed, driverCreated } = actions;

const truckCreateRequested = createAction('trucks/trucksCreateRequested');

export const createTruck = (payload: any, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(truckCreateRequested());
  try {
    const driver = await trucksService.createTruck(payload);
    dispatch(driverCreated(driver));
    callback()
  } catch (error: any) {
    dispatch(trucksRequestFailed(error.response.data.message));

  }
};

export const loadTrucks = (): any => async (dispatch: any) => {
  dispatch(trucksRequested());
  try {
    const trucks = await trucksService.loadTrucks()
    dispatch(trucksReceived(trucks));
  } catch (error: any) {
    const { message } = error.response.data;
    dispatch(trucksRequestFailed(message));
  }
};

export const getAllTrucks = () => (state: RootState) => state.trucks.trucks;

export const getTruckErrors = () => (state: RootState) => state.trucks.error;

export const clearTrucksErrors = (): AppThunk => async (dispatch: any) => {
  dispatch(trucksRequestFailed(null))
}


export default trucksReducer;