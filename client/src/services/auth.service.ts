import { SignUpDataType, SignInDataType } from './../types/types';
import { $host } from './intex';
import localStorageService from './localStorage.service';


const authService = {
  signUp: async (payload: SignUpDataType) => {
    const { data } = await $host.post(`/auth/signup`, payload);
    return data;
  },
  signIn: async (payload: SignInDataType) => {
    const { data } = await $host.post(`/auth/signin`, payload);
    localStorageService.setToken(data.accessToken);
    return data;
  },
  // refresh: async () => {
  //   const { data } = await httpAuth.post('token', {
  //     grant_type: 'refresh_token',
  //     refresh_token: localStorageService.getRefreshToken(),
  //   });
  //   return data;
  // },
};

export default authService;


