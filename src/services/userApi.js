import api from './api'

// ================= USERS =================

// ✅ Get all users
export const getUsers = (params = {}) => {
    return api.get('/users/users', { params })
}

// ✅ Get user by ID
export const getUser = (id) => {
    return api.get(`/users/profile/${id}`)
}

// ✅ Update user
export const updateUser = (id, data) => {
    return api.put(`/users/profile/${id}`, data)
}

// ✅ Delete user
export const deleteUser = (id) => {
    return api.delete(`/users/profile/${id}`)
}

// ✅ Update user status
export const updateUserStatus = (id, status) => {
    return api.patch(`/users/profile/${id}/status`, { status })
}