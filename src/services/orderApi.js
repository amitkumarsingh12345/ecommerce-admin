import api from './api'

// ================= ORDER CRUD =================

// ✅ Place order
export const placeOrder = (data) => {
  return api.post('/order', data)
}

// ✅ Get order by ID
export const getOrder = (id) => {
  return api.get(`/order/${id}`)
}

// ✅ Get all orders by user
export const getUserOrders = () => {
  return api.get('/order')
}

// ✅ Get all orders by admin
export const getAllOrders = (params = {}) => {
  return api.get('/order/admin', { params })
}

// ✅ Cancel order
export const cancelOrder = (id) => {
  return api.put(`/order/${id}/cancel`)
}

// ================= ORDER ITEMS =================

// ✅ Get order items
export const getOrderItems = (orderId) => {
  return api.get(`/order/items/${orderId}`)
}

// ================= ORDER TRACKING =================

// ✅ Add tracking
export const addTracking = (data) => {
  return api.post('/order/tracking', data)
}

// ✅ Get tracking by order
export const getTracking = (orderId) => {
  return api.get(`/order/${orderId}/tracking`)
}

// ================= ORDER RETURNS =================

// ✅ Create return
export const createReturn = (data) => {
  return api.post('/order/returns', data)
}

// ✅ Update return
export const updateReturn = (id, data) => {
  return api.put(`/order/returns/${id}`, data)
}