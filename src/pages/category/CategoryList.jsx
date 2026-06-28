import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  FolderTree,
  Image
} from 'lucide-react'
import toast from 'react-hot-toast'
import { imageBasePath } from '../../utils/path'
import { 
  getCategories, 
  deleteCategory,
  getCategoryTree 
} from '../../services/categoryApi'

const CategoryList = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [viewMode, setViewMode] = useState('list') // 'list' | 'tree'

  // ✅ Fetch categories
  const fetchCategories = async () => {
    setLoading(true)
    try {
      const response = await getCategories({
        page: currentPage,
        limit: 10,
        search: search
      })
      setCategories(response.data.data || response.data || [])
      setTotal(response.data.total || response.data.length || 0)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Fetch category tree
  const fetchCategoryTree = async () => {
    setLoading(true)
    try {
      const response = await getCategoryTree()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching category tree:', error)
      toast.error('Failed to load category tree')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (viewMode === 'tree') {
      fetchCategoryTree()
    } else {
      fetchCategories()
    }
  }, [currentPage, search, viewMode])

  // ✅ Delete category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return
    
    try {
      await deleteCategory(id)
      toast.success('Category deleted successfully')
      fetchCategories()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error.response?.data?.message || 'Failed to delete category')
    }
  }

  const getStatusBadge = (status) => {
    return status === 'Active' || status === 1 || status === true
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  // ✅ Render category tree recursively
  const renderCategoryTree = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <td className="py-3 px-4 text-sm dark:text-white">#{item.id}</td>
          <td className="py-3 px-4 text-sm font-medium dark:text-white">
            <div className="flex items-center gap-2">
              {level > 0 && (
                <span className="text-gray-400">{"— ".repeat(level)}</span>
              )}
              {item.image_url && (
                <img 
                  src={`${imageBasePath}/${item.image_url}`} 
                  alt={item.name}
                  className="w-8 h-8 rounded object-cover"
                />
              )}
              {item.name}
            </div>
          </td>
          <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
            {item.slug || '-'}
          </td>
          <td className="py-3 px-4 text-sm dark:text-white">
            {item.product_count || item._count?.products || 0}
          </td>
          <td className="py-3 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
              {item.status || 'Active'}
            </span>
          </td>
          <td className="py-3 px-4">
            <div className="flex items-center gap-2">
              <Link
                to={`/categories/edit/${item.id}`}
                className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
              >
                <Edit size={18} />
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
        {item.children && item.children.length > 0 && (
          renderCategoryTree(item.children, level + 1)
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product categories</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'tree' : 'list')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 dark:text-white"
          >
            <FolderTree size={18} />
            {viewMode === 'list' ? 'Tree View' : 'List View'}
          </button>
          <Link
            to="/categories/add"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Category
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Slug</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Products</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
                      No categories found
                    </td>
                  </tr>
                ) : viewMode === 'tree' ? (
                  renderCategoryTree(categories)
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 text-sm dark:text-white">#{category.id}</td>
                      <td className="py-3 px-4 text-sm font-medium dark:text-white">
                        <div className="flex items-center gap-2">
                          {category.image_url && (
                            <img 
                              src={`${imageBasePath}/${category.image_url}`} 
                              alt={category.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          {category.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {category.slug || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm dark:text-white">
                        {category.product_count || category._count?.products || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(category.status)}`}>
                          {category.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/categories/edit/${category.id}`}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {viewMode === 'list' && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {categories.length} of {total} categories
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
        )}
      </div>
    </div>
  )
}

export default CategoryList