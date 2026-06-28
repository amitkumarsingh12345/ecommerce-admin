import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Plus,
    Search,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getBrands, deleteBrand } from '../../services/brandApi'
import { imageBasePath } from '../../utils/path'

const BrandList = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    // ✅ Fetch brands
    const fetchBrands = async () => {
        setLoading(true)
        try {
            const response = await getBrands({
                page: currentPage,
                limit: 10,
                search: search
            })
            console.log('📥 Brands response:', response.data)
            setBrands(response.data.data || response.data || [])
            setTotal(response.data.total || response.data.length || 0)
        } catch (error) {
            console.error('Error fetching brands:', error)
            toast.error('Failed to load brands')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBrands()
    }, [currentPage, search])

    // ✅ Delete brand
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this brand?')) return

        try {
            await deleteBrand(id)
            toast.success('Brand deleted successfully')
            fetchBrands()
        } catch (error) {
            console.error('Delete error:', error)
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.')
                setTimeout(() => {
                    localStorage.removeItem('user')
                    window.location.href = '/login'
                }, 2000)
            } else {
                toast.error(error.response?.data?.message || 'Failed to delete brand')
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Brands</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your product brands</p>
                </div>
                <Link
                    to="/brands/add"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add Brand
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search brands..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
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
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Logo</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Slug</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Products</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {brands.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            No brands found
                                        </td>
                                    </tr>
                                ) : (
                                    brands.map((brand) => (
                                        <tr key={brand.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="py-3 px-4 text-sm dark:text-white">#{brand.id}</td>
                                            <td className="py-3 px-4">
                                                {brand.logo_url ? (
                                                    <img
                                                        src={`${imageBasePath}/${brand.logo_url}`}
                                                        alt={brand.name}
                                                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                                                        onError={(e) => {
                                                            e.target.onerror = null
                                                            e.target.src = 'https://via.placeholder.com/40?text=No+Logo'
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                                                        No Logo
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium dark:text-white">{brand.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{brand.slug}</td>
                                            <td className="py-3 px-4 text-sm dark:text-white">
                                                {brand._count?.products || brand.product_count || 0}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/brands/edit/${brand.id}`}
                                                        className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(brand.id)}
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
                <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {brands.length} of {total} brands
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

export default BrandList