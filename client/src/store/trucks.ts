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
    truckDelete: (state, action) => {
      state.trucks = state.trucks.filter((truck) => truck.id !== action.payload);
      state.isLoading = false;
    },
    trucksRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    truckUpdated: (state, action) => {
      const driverIndex = state.trucks.findIndex(truck => truck.id === action.payload.id);
      state.trucks[driverIndex] = action.payload;
      state.isLoading=false;
    },
    trackUpdateDriver: (state, action) => {
      console.log(action)
      const driverIndex = state.trucks.findIndex(truck => truck.id === action.payload.truckId);
      state.trucks[driverIndex].driverId = action.payload.payload;
      state.isLoading=false;
    },
  },
});

const { actions, reducer: trucksReducer } = trucksSlice;

const { trucksRequested, trucksReceived, trucksRequestFailed, driverCreated, truckUpdated, truckDelete, trackUpdateDriver } = actions;

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

export const updateTruck = (payload: any, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(trucksRequested());
  try {
    const truck = await trucksService.updateTruck(payload);
    dispatch(truckUpdated(truck));
    callback()
  } catch (error: any) {
    dispatch(trucksRequestFailed(error.response.data.message));

  }
};

export const updateTruckDriver = (truckId: number, payload: any): AppThunk => async (dispatch: any) => {
  dispatch(trucksRequested());
  try {
    dispatch(trackUpdateDriver({truckId, payload}));
  } catch (error: any) {
    dispatch(trucksRequestFailed(error.response.data.message));

  }
};


export const deleteTruckById = (id: number, callback: any): AppThunk => async (dispatch: any) => {
  dispatch(trucksRequested());
  try {
    await trucksService.deleteTruck(id)
    dispatch(truckDelete(id));
    callback();
  } catch (error: any) {
    console.log(error)
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

export const getTrucksLoadingStatus = () => (state: RootState) => state.trucks.isLoading;

export const getTruckById = (truckId: number) => (state: RootState) =>{
  if (state.trucks.trucks.length > 0) {
    return state.trucks.trucks.find((truck: TruckType) => truck.id === truckId);
  }
}

export default trucksReducer;