import axios from 'axios'

import { getToken, logout } from './auth'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout()
    }
    return Promise.reject(error)
  },
)

export default apiClient
