import axios from 'axios'
import { apiBasePath } from '../utils/path'

console.log("==================");
console.log(apiBasePath);

const api = axios.create({
  baseURL: apiBasePath,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000,
})

// ✅ Response interceptor - Prevent infinite redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Only redirect on 401 if not already on login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api