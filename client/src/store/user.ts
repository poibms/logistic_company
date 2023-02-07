import { SignInDataType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import { SignUpDataType } from '../types/types';
import authService from '../services/auth.service';
import { AppThunk } from '.';

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

const { authRequested, authRequestSuccess, authRequestFailed } = actions


export const signUp = 
  (payload: SignUpDataType, callback: any): AppThunk =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.signUp(payload);
      localStorageService.setToken(data.accessToken);
      dispatch(authRequestSuccess())
      callback();
    } catch (e) {
      dispatch(authRequestFailed(e));
    }
}

export const signIn = 
  (payload: SignInDataType, callback: any): AppThunk =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.signIn(payload);
      localStorageService.setToken(data.accessToken);
      dispatch(authRequestSuccess())
      callback();
    } catch (e) {
      dispatch(authRequestFailed(e));
    }
}


export default usersReducer;