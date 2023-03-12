import axios, {InternalAxiosRequestConfig } from 'axios';
import authService from './auth.service';
import localStorageService from './localStorage.service';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3007/api'
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3007/api'
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
}

// $authHost.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await authService.refreshToken();
//           const { access_token } = rs.data;
//           localStorageService.refreshToken(access_token)

//           return $authHost(originalConfig);
//         } catch (_error: any) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }

//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

$authHost.interceptors.request.use(authInterceptor);


export {
  $host,
  $authHost
}