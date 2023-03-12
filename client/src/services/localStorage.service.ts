import jwt_decode from 'jwt-decode';
import { UserType } from '../types/types';
class LocalStorageService {

  setToken = (token: string): void => {
    localStorage.setItem('accessToken', token)
  }

  removeToken = (): void => {
    localStorage.removeItem('accessToken')
  }

  getToken = (): string => {
    return localStorage.getItem('accessToken') || '';
  }

  getUserData = (): UserType => {
    const token = this.getToken();
    return jwt_decode(token)
  }

  refreshToken = (token: string): void => {
    this.removeToken();
    this.setToken(token);
  }
}

export default new LocalStorageService();