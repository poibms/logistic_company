import { SignUpDataType, SignInDataType } from './../types/types';
import { $authHost, $host } from './intex';


const authService = {
  signUp: async (payload: SignUpDataType) => {
    const { data } = await $host.post(`/auth/signup`, payload);
    return data;
  },
  signIn: async (payload: SignInDataType) => {
    const { data } = await $host.post(`/auth/signin`, payload);
    return data;
  },

  refreshToken: async () => {
    const { data } = await $authHost.post(`/auth/refresh`);
    return data;
  },
};

export default authService;


