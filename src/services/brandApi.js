import api from './api'

//Get all brands
export const getBrands = (params = {}) => {
    return api.get('/brand', { params })
}

//Get brand by ID
export const getBrand = (id) => {
    return api.get(`/brand/${id}`)
}

//Create brand
export const createBrand = (data) => {
    return api.post('/brand', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

//Update brand
export const updateBrand = (id, data) => {
    return api.put(`/brand/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

//Delete brand
export const deleteBrand = (id) => {
    return api.delete(`/brand/${id}`)
}