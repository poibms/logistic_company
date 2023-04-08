import { RootState } from ".";
import { SignInDataType, UserType, JwtType } from "./../types/types";
import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import { SignUpDataType } from "../types/types";
import authService from "../services/auth.service";
import { AppThunk } from ".";

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
    userLoggedOut: state => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});

const { actions, reducer: usersReducer } = userSlice;

const { authRequested, authRequestSuccess, authRequestFailed, setAuthUser, userLoggedOut } =
  actions;

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

export const userLogout = (callback: any): AppThunk => async (dispatch) => {
  await authService.logout();
  localStorageService.removeToken();
  dispatch(userLoggedOut());
  callback();
};

export const getIsLoggedIn = () => (state: RootState) => state.user.isLoggedIn;

export const getAuthUser =
  () =>
  (state: RootState): JwtType | null =>
    state.user.auth;

export const isAdmin =
  () =>
  (state: RootState): boolean => {
    if (state.user.auth?.role === "admin") {
      return true;
    }
    return false;
  };

export const getAuthErrors = () => (state: RootState) => state.user.error;

export default usersReducer;
