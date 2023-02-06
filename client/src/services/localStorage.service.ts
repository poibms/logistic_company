class LocalStorageService {

  setToken = (token: string) => {
    localStorage.setItem('accessToken', token)
  }

  removeToken = () => {
    localStorage.removeItem('accessToken')
  }

  getToken = () => {
    return localStorage.getItem('accessToken');
  }
}

export default new LocalStorageService();