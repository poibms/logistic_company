import axios, {InternalAxiosRequestConfig } from 'axios';
import localStorageService from './localStorage.service';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3007/api'
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3007/api'
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorageService.getToken()}`
  return config;
}

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await axios
        .post("http://localhost:3007/api/auth/refresh", {}, {
          withCredentials: true,
        })
        .then((res) => localStorageService.refreshToken(res.data.access_token))
        .catch((err) => {
          return Promise.reject(err);
        });
      console.log(error.config);
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);


export {
  $host,
  $authHost
}