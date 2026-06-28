 
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export const ORDER_STATUS = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled']

export const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Food', 'Toys', 'Others']