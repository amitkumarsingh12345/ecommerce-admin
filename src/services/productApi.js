// import api from './api'

// // ================= PRODUCT CRUD =================

// // ✅ Get all products with filters
// export const getProducts = (params = {}) => {
//   return api.get('/product', { params })
// }

// // ✅ Get product by ID
// export const getProduct = (id) => {
//   return api.get(`/product/${id}`)  // ✅ Fixed: /product/{id}
// }

// // ✅ Create product
// export const createProduct = (data) => {
//   return api.post('/product', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

// // ✅ Update product
// export const updateProduct = (id, data) => {
//   return api.put(`/product/${id}`, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

// // ✅ Delete product
// export const deleteProduct = (id) => {
//   return api.delete(`/product/${id}`)
// }

// // ================= SEARCH & FILTERS =================

// // ✅ Search products
// export const searchProducts = (query) => {
//   return api.get('/product/search', { params: { q: query } })
// }

// // ✅ Latest products
// export const getLatestProducts = () => {
//   return api.get('/product/latest')
// }

// // ✅ New arrivals
// export const getNewArrivals = (limit = 8) => {
//   return api.get('/product/new-arrivals', { params: { limit } })
// }

// // ✅ Products by category
// export const getProductsByCategory = (categoryId) => {
//   return api.get(`/product/category/${categoryId}`)
// }

// // ✅ Products by brand
// export const getProductsByBrand = (brandId) => {
//   return api.get(`/product/brand/${brandId}`)
// }

// // ================= PRODUCT IMAGES =================
// // ✅ Route: /api/product/variant/image

// // ✅ Get product images
// export const getProductImages = (productId) => {
//   return api.get(`/product/variant/image/product/${productId}`)
// }

// // ✅ Get variant images
// export const getVariantImages = (productId, variantId) => {
//   return api.get(`/product/variant/image/product/${productId}/variant/${variantId}`)
// }

// // ✅ Upload product images
// export const uploadProductImages = (data) => {
//   return api.post('/product/variant/image', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

// // ✅ Upload variant images
// export const uploadVariantImages = (data) => {
//   return api.post('/product/variant/image/upload', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

// // ✅ Delete product image
// export const deleteProductImage = (id) => {
//   return api.delete(`/product/variant/image/${id}`)
// }

// // ✅ Set primary image
// export const setPrimaryImage = (id) => {
//   return api.patch(`/product/variant/image/primary/${id}`)
// }

// // ================= PRODUCT VARIANTS =================
// // ✅ Route: /api/product/variant

// // ✅ Get variants by product
// export const getVariantsByProduct = (productId) => {
//   return api.get(`/product/variant/product/${productId}`)
// }

// // ✅ Create variant
// export const createVariant = (data) => {
//   return api.post('/product/variant', data)
// }

// // ✅ Update variant
// export const updateVariant = (id, data) => {
//   return api.put(`/product/variant/${id}`, data)
// }

// // ✅ Delete variant
// export const deleteVariant = (id) => {
//   return api.delete(`/product/variant/${id}`)
// }

// // ================= VARIANT ATTRIBUTES =================
// // ✅ Route: /api/product/variant/attributes

// // ✅ Get variant attributes
// export const getVariantAttributes = (variantId) => {
//   return api.get(`/product/variant/attributes/${variantId}`)
// }

// // ✅ Add variant attribute
// export const addVariantAttribute = (data) => {
//   return api.post('/product/variant/attributes', data)
// }

// // ✅ Delete variant attribute
// export const deleteVariantAttribute = (id) => {
//   return api.delete(`/product/variant/attributes/${id}`)
// }

// // ================= PRODUCT SPECIFICATIONS =================
// // ✅ Route: /api/product/specification

// // ✅ Get specs by product
// export const getSpecsByProduct = (productId) => {
//   return api.get(`/product/specification/product/${productId}`)
// }

// // ✅ Create spec
// export const createSpec = (data) => {
//   return api.post('/product/specification', data)
// }

// // ✅ Update spec
// export const updateSpec = (id, data) => {
//   return api.put(`/product/specification/${id}`, data)
// }

// // ✅ Delete spec
// export const deleteSpec = (id) => {
//   return api.delete(`/product/specification/${id}`)
// }

// // ================= PRODUCT PROMOTIONS =================
// // ✅ Route: /api/promotion (commented in your backend)

// // ✅ Get promotions
// export const getPromotions = () => {
//   return api.get('/promotion')
// }

// // ✅ Get product promotions
// export const getProductPromotions = (productId) => {
//   return api.get(`/promotion/product/${productId}`)
// }

// // ✅ Create promotion
// export const createPromotion = (data) => {
//   return api.post('/promotion', data)
// }

// // ================= INVENTORY =================
// // ✅ Route: /api/inventory

// // ✅ Get stock by variant
// export const getStockByVariant = (variantId) => {
//   return api.get(`/inventory/${variantId}`)
// }

// // ✅ Add stock
// export const addStock = (data) => {
//   return api.post('/inventory/add', data)
// }

// // ✅ Remove stock
// export const removeStock = (data) => {
//   return api.post('/inventory/remove', data)
// }




//-------------------------------------




import api from './api'

// ================= PRODUCT CRUD =================

// ✅ Get all products with filters
export const getProducts = (params = {}) => {
  return api.get('/product', { params })
}

// ✅ Get product by ID
export const getProduct = (id) => {
  return api.get(`/product/${id}`)
}

// ✅ Create product
export const createProduct = (data) => {
  return api.post('/product', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Update product
export const updateProduct = (id, data) => {
  return api.put(`/product/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Delete product
export const deleteProduct = (id) => {
  return api.delete(`/product/${id}`)
}

// ================= SEARCH & FILTERS =================

// ✅ Search products
export const searchProducts = (query) => {
  return api.get('/product/search', { params: { q: query } })
}

// ✅ Latest products
export const getLatestProducts = () => {
  return api.get('/product/latest')
}

// ✅ New arrivals
export const getNewArrivals = (limit = 8) => {
  return api.get('/product/new-arrivals', { params: { limit } })
}

// ✅ Products by category
export const getProductsByCategory = (categoryId) => {
  return api.get(`/product/category/${categoryId}`)
}

// ✅ Products by brand
export const getProductsByBrand = (brandId) => {
  return api.get(`/product/brand/${brandId}`)
}

// ================= PRODUCT IMAGES =================
// ✅ Route: /api/product/variant/image

// ✅ Get product images
export const getProductImages = (productId) => {
  return api.get(`/product/variant/image/product/${productId}`)
}

// ✅ Get variant images
export const getVariantImages = (productId, variantId) => {
  return api.get(`/product/variant/image/product/${productId}/variant/${variantId}`)
}

// ✅ Upload product images
export const uploadProductImages = (data) => {
  return api.post('/product/variant/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Upload variant images
export const uploadVariantImages = (data) => {
  return api.post('/product/variant/image/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// ✅ Delete product image
export const deleteProductImage = (id) => {
  return api.delete(`/product/variant/image/${id}`)
}

// ✅ Set primary image
export const setPrimaryImage = (id) => {
  return api.patch(`/product/variant/image/primary/${id}`)
}

// ================= PRODUCT VARIANTS =================
// ✅ Route: /api/product/variant

// ✅ Get variants by product
export const getVariantsByProduct = (productId) => {
  return api.get(`/product/variant/product/${productId}`)
}

// ✅ Create variant
export const createVariant = (data) => {
  return api.post('/product/variant', data)
}

// ✅ Update variant
export const updateVariant = (id, data) => {
  return api.put(`/product/variant/${id}`, data)
}

// ✅ Delete variant
export const deleteVariant = (id) => {
  return api.delete(`/product/variant/${id}`)
}

// ================= VARIANT ATTRIBUTES =================
// ✅ Route: /api/product/variant/attributes

// ✅ Get variant attributes
export const getVariantAttributes = (variantId) => {
  return api.get(`/product/variant/attributes/${variantId}`)
}

// ✅ Add variant attribute
export const addVariantAttribute = (data) => {
  return api.post('/product/variant/attributes', data)
}

// ✅ Delete variant attribute
export const deleteVariantAttribute = (id) => {
  return api.delete(`/product/variant/attributes/${id}`)
}

// ================= PRODUCT SPECIFICATIONS =================
// ✅ Route: /api/product/specification

// ✅ Get specs by product
export const getSpecsByProduct = (productId) => {
  return api.get(`/product/specification/product/${productId}`)
}

// ✅ Create spec
export const createSpec = (data) => {
  return api.post('/product/specification', data)
}

// ✅ Update spec
export const updateSpec = (id, data) => {
  return api.put(`/product/specification/${id}`, data)
}

// ✅ Delete spec
export const deleteSpec = (id) => {
  return api.delete(`/product/specification/${id}`)
}

// ================= PRODUCT PROMOTIONS =================
// ✅ Route: /api/promotion

// ✅ Get promotions
export const getPromotions = () => {
  return api.get('/promotion')
}

// ✅ Get product promotions
export const getProductPromotions = (productId) => {
  return api.get(`/promotion/product/${productId}`)
}

// ✅ Create promotion
export const createPromotion = (data) => {
  return api.post('/promotion', data)
}

// ================= INVENTORY =================
// ✅ Route: /api/inventory

// ✅ Get stock by variant
export const getStockByVariant = (variantId) => {
  return api.get(`/inventory/${variantId}`)
}

// ✅ Add stock
export const addStock = (data) => {
  return api.post('/inventory/add', data)
}

// ✅ Remove stock
export const removeStock = (data) => {
  return api.post('/inventory/remove', data)
}