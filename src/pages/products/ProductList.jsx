// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import {
//   Plus,
//   Search,
//   Edit,
//   Trash2,
//   Eye,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { getProducts, deleteProduct } from '../../services/productApi'
// import { imageBasePath } from '../../utils/path'

// const ProductList = () => {
//   const [search, setSearch] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [total, setTotal] = useState(0)
//   const [filters, setFilters] = useState({
//     category_id: '',
//     brand_id: '',
//     status: ''
//   })

//   // ✅ Helper function to get stock value
//   const getStockValue = (stock) => {
//     if (!stock) return 0
//     if (typeof stock === 'number') return stock
//     if (typeof stock === 'object') {
//       return stock.available_stock || stock.available || 0
//     }
//     return parseInt(stock) || 0
//   }

//   // ✅ Helper function to get image URL - ONLY imageBasePath use karo
//   const getProductImageUrl = (path) => {
//     if (!path) return null
//     if (path.startsWith('http://') || path.startsWith('https://')) {
//       return path
//     }
//     // ✅ Direct imageBasePath ke saath join karo
//     return `${imageBasePath}/${path}`
//   }

//   // ✅ Fetch products
//   const fetchProducts = async () => {
//     setLoading(true)
//     try {
//       const response = await getProducts({
//         page: currentPage,
//         limit: 10,
//         search: search,
//         ...filters
//       })
//       console.log('📥 Products response:', response.data)
      
//       const productData = response.data.data || response.data || []
//       setProducts(productData)
//       setTotal(response.data.total || productData.length || 0)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       toast.error('Failed to load products')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [currentPage, search, filters])

//   // ✅ Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return

//     try {
//       await deleteProduct(id)
//       toast.success('Product deleted successfully')
//       fetchProducts()
//     } catch (error) {
//       console.error('Delete error:', error)
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.')
//         setTimeout(() => {
//           localStorage.removeItem('user')
//           window.location.href = '/login'
//         }, 2000)
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to delete product')
//       }
//     }
//   }

//   const getStatusBadge = (status) => {
//     const activeStatuses = ['Active', 'published', 1, true]
//     return activeStatuses.includes(status)
//       ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//       : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold dark:text-white">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
//         </div>
//         <Link
//           to="/products/add"
//           className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//         >
//           <Plus size={20} />
//           Add Product
//         </Link>
//       </div>

//       {/* Search & Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             />
//           </div>
//           <select
//             value={filters.status}
//             onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
//           >
//             <option value="">All Status</option>
//             <option value="published">Published</option>
//             <option value="draft">Draft</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 dark:bg-gray-700/50">
//                 <tr>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Image</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
//                   <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                 {products.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="py-8 text-center text-gray-500 dark:text-gray-400">
//                       No products found
//                     </td>
//                   </tr>
//                 ) : (
//                   products.map((product) => {
//                     // ✅ Image URL - Direct imageBasePath use
//                     let imageUrl = null
//                     if (product.thumbnail_url) {
//                       imageUrl = `${imageBasePath}/${product.thumbnail_url}`
//                     } else if (product.images && product.images.length > 0) {
//                       imageUrl = `${imageBasePath}/${product.images[0].image_url}`
//                     }

//                     const stockValue = product.selected_variant 
//                       ? getStockValue(product.selected_variant.stock)
//                       : getStockValue(product.stock || product.quantity)
                    
//                     const displayPrice = product.final_price || product.sale_price || product.base_price || product.price || 0
//                     const displaySku = product.selected_variant?.sku || product.sku || '-'
                    
//                     return (
//                       <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                         <td className="py-3 px-4 text-sm dark:text-white">#{product.id}</td>
//                         <td className="py-3 px-4">
//                           {imageUrl ? (
//                             <img
//                               src={imageUrl}
//                               alt={product.name}
//                               className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
//                               onError={(e) => {
//                                 e.target.onerror = null
//                                 e.target.src = 'https://via.placeholder.com/40?text=No+Image'
//                               }}
//                             />
//                           ) : (
//                             <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
//                               No Image
//                             </div>
//                           )}
//                         </td>
//                         <td className="py-3 px-4 text-sm font-medium dark:text-white">{product.name}</td>
//                         <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{displaySku}</td>
//                         <td className="py-3 px-4 text-sm font-semibold dark:text-white">${displayPrice}</td>
//                         <td className="py-3 px-4 text-sm dark:text-white">{stockValue}</td>
//                         <td className="py-3 px-4">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
//                             {product.status || 'Active'}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="flex items-center gap-2">
//                             <Link
//                               to={`/products/${product.id}`}
//                               className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors"
//                             >
//                               <Eye size={18} />
//                             </Link>
//                             <Link
//                               to={`/products/edit/${product.id}`}
//                               className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
//                             >
//                               <Edit size={18} />
//                             </Link>
//                             <button
//                               onClick={() => handleDelete(product.id)}
//                               className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Showing {products.length} of {total} products
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
//             >
//               <ChevronLeft size={18} />
//             </button>
//             <span className="px-3 py-1 text-sm dark:text-white">{currentPage}</span>
//             <button
//               onClick={() => setCurrentPage(prev => prev + 1)}
//               className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductList




//-----------------------------------------------------



import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getProducts, deleteProduct } from '../../services/productApi'
import { imageBasePath } from '../../utils/path'

const ProductList = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({
    category_id: '',
    brand_id: '',
    status: ''
  })

  // ✅ Helper function to get stock value
  const getStockValue = (stock) => {
    if (!stock) return 0
    if (typeof stock === 'number') return stock
    if (typeof stock === 'object') {
      return stock.available_stock || stock.available || 0
    }
    return parseInt(stock) || 0
  }

  // ✅ Fetch products
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts({
        page: currentPage,
        limit: 10,
        search: search,
        ...filters
      })
      console.log('📥 Products response:', response.data)
      
      const productData = response.data.data || response.data || []
      setProducts(productData)
      setTotal(response.data.total || productData.length || 0)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage, search, filters])

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteProduct(id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      console.error('Delete error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }, 2000)
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete product')
      }
    }
  }

  const getStatusBadge = (status) => {
    const activeStatuses = ['Active', 'published', 1, true]
    return activeStatuses.includes(status)
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <Link
          to="/products/add"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Image</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 dark:text-gray-400">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    // ✅ Image URL
                    let imageUrl = null
                    if (product.thumbnail_url) {
                      imageUrl = `${imageBasePath}/${product.thumbnail_url}`
                    } else if (product.images && product.images.length > 0) {
                      imageUrl = `${imageBasePath}/${product.images[0].image_url}`
                    }

                    const stockValue = product.selected_variant 
                      ? getStockValue(product.selected_variant.stock)
                      : getStockValue(product.stock || product.quantity)
                    
                    const displayPrice = product.final_price || product.sale_price || product.base_price || product.price || 0
                    const displaySku = product.selected_variant?.sku || product.sku || '-'
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-3 px-4 text-sm dark:text-white">#{product.id}</td>
                        <td className="py-3 px-4">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = 'https://via.placeholder.com/40?text=No+Image'
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium dark:text-white">{product.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{displaySku}</td>
                        <td className="py-3 px-4 text-sm font-semibold dark:text-white">${displayPrice}</td>
                        <td className="py-3 px-4 text-sm dark:text-white">{stockValue}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
                            {product.status || 'Active'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/products/${product.id}`}
                              className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 transition-colors"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link
                              to={`/products/edit/${product.id}`}
                              className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {products.length} of {total} products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-3 py-1 text-sm dark:text-white">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList