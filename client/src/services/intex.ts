import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import localStorageService from "./localStorage.service";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3007/api",
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3007/api",
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${localStorageService.getToken()}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {data} = await axios.post(
          "http://localhost:3007/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        // console.log(access_token) // Получаем новый токен
        // $authHost.defaults.headers.common.Authorization = `Bearer ${access_token}`; // Обновляем заголовок авторизации
        // originalRequest.headers.Authorization = `Bearer ${access_token}`; // Обновляем заголовок авторизации в исходном запросе
        localStorageService.refreshToken(data.access_token)
        return $authHost(originalRequest); // Повторяем исходный запрос
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export { $host, $authHost };
