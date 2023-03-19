import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
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
    trucksRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: trucksReducer } = trucksSlice;

const { trucksRequested, trucksReceived, trucksRequestFailed } = actions;

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

export const getAlltrucks = () => (state: RootState) => state.trucks.trucks;


export default trucksReducer;