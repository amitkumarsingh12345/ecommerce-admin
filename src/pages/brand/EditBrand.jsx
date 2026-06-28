import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { imageBasePath } from '../../utils/path'
import { getBrand, updateBrand } from '../../services/brandApi'

const EditBrand = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [logoPreview, setLogoPreview] = useState(null)
    const [logoFile, setLogoFile] = useState(null)
    const [existingLogo, setExistingLogo] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        sort_order: 0
    })

    // ✅ Fetch brand data
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await getBrand(id)
                console.log('📥 Brand data:', response.data)

                const brand = response.data
                setFormData({
                    name: brand.name || '',
                    slug: brand.slug || '',
                    description: brand.description || '',
                    sort_order: brand.sort_order || 0
                })
                setExistingLogo(brand.logo_url || null)
            } catch (error) {
                console.error('Error fetching brand:', error)
                if (error.response?.status === 401) {
                    toast.error('Session expired. Please login again.')
                    setTimeout(() => {
                        localStorage.removeItem('user')
                        navigate('/login', { replace: true })
                    }, 2000)
                } else {
                    toast.error('Failed to load brand')
                    navigate('/brands')
                }
            } finally {
                setFetching(false)
            }
        }
        fetchBrand()
    }, [id, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogoPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeLogo = () => {
        setLogoFile(null)
        setLogoPreview(null)
        setExistingLogo(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('slug', formData.slug)
            formDataToSend.append('description', formData.description)
            formDataToSend.append('sort_order', formData.sort_order)

            if (logoFile) {
                formDataToSend.append('logo', logoFile)
            }

            console.log('📤 Updating brand:', Object.fromEntries(formDataToSend))

            await updateBrand(id, formDataToSend)
            toast.success('Brand updated successfully!')
            navigate('/brands')
        } catch (error) {
            console.error('Update error:', error)

            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.')
                setTimeout(() => {
                    localStorage.removeItem('user')
                    navigate('/login', { replace: true })
                }, 2000)
            } else {
                toast.error(error.response?.data?.message || 'Failed to update brand')
            }
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/brands')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Brands
                    </button>
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Edit Brand #{id}</h1>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Brand Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-600"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sort Order
                        </label>
                        <input
                            type="number"
                            name="sort_order"
                            value={formData.sort_order}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Logo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Brand Logo
                        </label>
                        <div className="flex items-center gap-4 flex-wrap">
                            <label className="cursor-pointer">
                                <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
                                    <Upload size={20} />
                                    <span className="text-sm">Change Logo</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>

                            {(logoPreview || existingLogo) && (
                                <div className="relative">
                                    <img
                                        src={`${logoPreview} || ${imageBasePath}/${existingLogo}`}
                                        alt="Brand Logo"
                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = 'https://via.placeholder.com/64?text=No+Logo'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeLogo}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                        {!logoPreview && !existingLogo && (
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No logo uploaded</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <Save size={20} />
                            {loading ? 'Updating...' : 'Update Brand'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/brands')}
                            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBrand