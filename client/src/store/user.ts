import { createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';

type UserInitialState = {
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: UserInitialState = localStorageService.getToken()
  ? {
      isLoading: true,
      error: null,
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      isLoggedIn: false,
    };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (state) => {
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  }
})

const { actions, reducer: usersReducer } = userSlice;


export default usersReducer;