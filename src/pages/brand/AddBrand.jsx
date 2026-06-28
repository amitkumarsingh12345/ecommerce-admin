import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { createBrand } from '../../services/brandApi'

const AddBrand = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [logoPreview, setLogoPreview] = useState(null)
    const [logoFile, setLogoFile] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        sort_order: 0
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))

        // ✅ Auto-generate slug from name
        if (name === 'name') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            setFormData(prev => ({ ...prev, slug }))
        }
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

            console.log('📤 Sending brand data:', Object.fromEntries(formDataToSend))

            await createBrand(formDataToSend)
            toast.success('Brand created successfully!')
            navigate('/brands')
        } catch (error) {
            console.error('Create error:', error)
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.')
                setTimeout(() => {
                    localStorage.removeItem('user')
                    navigate('/login', { replace: true })
                }, 2000)
            } else {
                toast.error(error.response?.data?.message || 'Failed to create brand')
            }
        } finally {
            setLoading(false)
        }
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
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Add Brand</h1>
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
                            placeholder="Enter brand name"
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
                            placeholder="auto-generated"
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Auto-generated from name</p>
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
                            placeholder="Enter brand description"
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
                            placeholder="0"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Brand Logo
                        </label>
                        <div className="flex items-center gap-4 flex-wrap">
                            <label className="cursor-pointer">
                                <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
                                    <Upload size={20} />
                                    <span className="text-sm">Upload Logo</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                            {logoPreview && (
                                <div className="relative">
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
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
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <Save size={20} />
                            {loading ? 'Creating...' : 'Create Brand'}
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

export default AddBrand