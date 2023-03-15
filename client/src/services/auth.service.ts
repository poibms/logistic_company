import { SignUpDataType, SignInDataType } from './../types/types';
import { $authHost, $host } from './intex';

const authService = {
  signUp: async (payload: SignUpDataType) => {
    const { data } = await $host.post(`/auth/signup`, payload, {
      withCredentials: true,
    });
    return data;
  },
  signIn: async (payload: SignInDataType) => {
    const response = await $host.post(`/auth/signin`, payload, {
      withCredentials: true,
    });
    console.log(response)
    return response.data;
  },

  refreshToken: async () => {
    const { data } = await $authHost.post(`/auth/refresh`, {
      withCredentials: true,
    });
    return data;
  },
};

export default authService;


