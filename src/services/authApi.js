import api from './api'

export const loginUser = (mobile, password) => {
  return api.post('/admin/login', { mobile, password })
}

export const getProfile = () => {
  return api.get('/admin/me')
}

export const logoutUser = () => {
  return api.post('/admin/logout')
}

export const registerAdmin = (data) => {
  return api.post('/admin/register', data)
}