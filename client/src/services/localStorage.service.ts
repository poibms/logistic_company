class LocalStorageService {

  setToken = (token: string) => {
    localStorage.setItem('accessToken', token)
  }

  removeToken = () => {
    localStorage.removeItem('accessToken')
  }
}

export default new LocalStorageService();