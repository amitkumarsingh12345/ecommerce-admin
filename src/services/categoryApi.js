import api from './api'

// ✅ Get all categories
export const getCategories = (params = {}) => {
  return api.get('/category', { params })
}

// ✅ Get category by ID
export const getCategory = (id) => {
  return api.get(`/category/${id}`)
}

// ✅ Get category tree (nested)
export const getCategoryTree = () => {
  return api.get('/category/tree')
}

// ✅ Get root categories
export const getRootCategories = () => {
  return api.get('/category/root')
}

// ✅ Get category children
export const getCategoryChildren = (id) => {
  return api.get(`/category/${id}/children`)
}

// ✅ Create category (with image upload)
export const createCategory = (data) => {
  return api.post('/category', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Update category (with image upload)
export const updateCategory = (id, data) => {
  return api.put(`/category/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Delete category
export const deleteCategory = (id) => {
  return api.delete(`/category/${id}`)
}