import { RootState } from ".";
import { SignInDataType, UserType, JwtType } from "./../types/types";
import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import { SignUpDataType } from "../types/types";
import authService from "../services/auth.service";
import { AppThunk } from ".";
import Cookies from 'js-cookie'

type UserInitialState = {
  isLoading: boolean;
  error: string | null;
  auth: JwtType | null;
  isLoggedIn: boolean;
};

const initialState: UserInitialState = localStorageService.getToken()
  ? {
      isLoading: true,
      error: null,
      auth: { ...localStorageService.getUserData() },
      isLoggedIn: true,
    }
  : {
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state) => {
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    setAuthUser: (state) => {
      state.auth = localStorageService.getUserData();
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});

const { actions, reducer: usersReducer } = userSlice;

const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  setAuthUser,
  userLoggedOut,
} = actions;

export const signUp =
  (payload: SignUpDataType, callback: any): AppThunk =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.signUp(payload);
      localStorageService.setToken(data.access_token);
      dispatch(authRequestSuccess());
      dispatch(setAuthUser());
      callback();
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(authRequestFailed(message));
    }
  };

export const signIn =
  (payload: SignInDataType, callback: any): AppThunk =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.signIn(payload);
      localStorageService.setToken(data.access_token);
      dispatch(authRequestSuccess());
      dispatch(setAuthUser());
      // const user = await authService.getCurrentUser();
      // console.log(user);
      callback();
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(authRequestFailed(message));
    }
  };

export const signDriver =
  (payload: SignInDataType, callback: any): AppThunk =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.signInDriver(payload);

      localStorageService.setToken(data.access_token);
      dispatch(authRequestSuccess());
      dispatch(setAuthUser());
      // const user = await authService.getCurrentUser();
      // console.log(user);
      callback();
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(authRequestFailed(message));
    }
  };

export const userLogout =
  (callback: any): AppThunk =>
  async (dispatch) => {
    await authService.logout();
    localStorageService.removeToken();
    Cookies.remove('refresh_token')
    // document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(userLoggedOut());
    callback();
  };

export const getIsLoggedIn = () => (state: RootState) => state.user.isLoggedIn;

export const getAuthUser =
  () =>
  (state: RootState): JwtType | null =>
    state.user.auth;

export const getRole =
  () =>
  (state: RootState): string => {
    if (state.user.auth?.role === "admin") {
      return "admin";
    } else if (state.user.auth?.role === "driver") {
      return 'driver';
    } else {
      return 'user';
    }
  };

  export const isAdmin =
  () =>
  (state: RootState): boolean => {
    if (state.user.auth?.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

export const getAuthErrors = () => (state: RootState) => state.user.error;

export default usersReducer;
