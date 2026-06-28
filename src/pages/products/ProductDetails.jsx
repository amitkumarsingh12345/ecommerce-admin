// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import {
//     ArrowLeft,
//     Edit,
//     Package,
//     Tag,
//     DollarSign,
//     ShoppingBag,
//     Star,
//     Clock,
//     Award,
//     Info,
//     List
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { getProduct, getVariantsByProduct, getSpecsByProduct } from '../../services/productApi'
// import { imageBasePath } from '../../utils/path'

// const ProductDetails = () => {
//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(true)
//     const [product, setProduct] = useState(null)
//     const [variants, setVariants] = useState([])
//     const [specs, setSpecs] = useState([])
//     const [selectedImage, setSelectedImage] = useState(0)

//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 setLoading(true)

//                 // ✅ Fetch product details
//                 const productRes = await getProduct(id)
//                 console.log('📥 Product:', productRes.data)
//                 setProduct(productRes.data)

//                 // ✅ Fetch variants
//                 try {
//                     const variantsRes = await getVariantsByProduct(id)
//                     console.log('📥 Variants:', variantsRes.data)
//                     setVariants(variantsRes.data || [])
//                 } catch (err) {
//                     console.log('No variants found')
//                 }

//                 // ✅ Fetch specifications
//                 try {
//                     const specsRes = await getSpecsByProduct(id)
//                     console.log('📥 Specs:', specsRes.data)
//                     setSpecs(specsRes.data || [])
//                 } catch (err) {
//                     console.log('No specifications found')
//                 }

//             } catch (error) {
//                 console.error('Error fetching product:', error)
//                 if (error.response?.status === 401) {
//                     toast.error('Session expired. Please login again.')
//                     setTimeout(() => {
//                         localStorage.removeItem('user')
//                         navigate('/login', { replace: true })
//                     }, 2000)
//                 } else {
//                     toast.error('Failed to load product details')
//                     navigate('/products')
//                 }
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchProductData()
//     }, [id, navigate])

//     const getStatusBadge = (status) => {
//         return status === 'Active' || status === 1 || status === true
//             ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//             : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//     }

//     // ✅ Helper function to get stock value
//     const getStockValue = (stock) => {
//         if (!stock) return 0
//         if (typeof stock === 'number') return stock
//         if (typeof stock === 'object') {
//             // ✅ If stock is {available_stock, reserved_stock}
//             return stock.available_stock || stock.available || 0
//         }
//         return parseInt(stock) || 0
//     }

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center py-12">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
//             </div>
//         )
//     }

//     if (!product) {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-gray-500 dark:text-gray-400">Product not found</p>
//                 <button
//                     onClick={() => navigate('/products')}
//                     className="mt-4 text-primary-600 hover:text-primary-700"
//                 >
//                     Back to Products
//                 </button>
//             </div>
//         )
//     }

//     const images = product.images || []
//     const mainImage = images.length > 0 ? images[selectedImage] : null

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                     <button
//                         onClick={() => navigate('/products')}
//                         className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
//                     >
//                         <ArrowLeft size={20} />
//                         Back to Products
//                     </button>
//                     <h1 className="text-2xl font-bold dark:text-white">{product.name}</h1>
//                     <p className="text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
//                 </div>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => navigate(`/products/edit/${product.id}`)}
//                         className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//                     >
//                         <Edit size={18} />
//                         Edit Product
//                     </button>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Images - Left Column */}
//                 <div className="lg:col-span-2 space-y-4">
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//                         {mainImage ? (
//                             <img
//                                 src={`${imageBasePath}/${mainImage.image_url}`}
//                                 alt={product.name}
//                                 className="w-full h-96 object-cover"
//                                 onError={(e) => {
//                                     e.target.onerror = null
//                                     e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'
//                                 }}
//                             />
//                         ) : (
//                             <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
//                                 <Package size={64} className="text-gray-400" />
//                             </div>
//                         )}
//                     </div>

//                     {/* Thumbnails */}
//                     {images.length > 1 && (
//                         <div className="grid grid-cols-6 gap-2">
//                             {images.map((img, index) => (
//                                 <button
//                                     key={img.id}
//                                     onClick={() => setSelectedImage(index)}
//                                     className={`border-2 rounded-lg overflow-hidden transition-all ${selectedImage === index
//                                             ? 'border-primary-500'
//                                             : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
//                                         }`}
//                                 >
//                                     <img
//                                         src={`${imageBasePath}/img.image_url`}
//                                         alt={`Thumbnail ${index + 1}`}
//                                         className="w-full h-16 object-cover"
//                                         onError={(e) => {
//                                             e.target.onerror = null
//                                             e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
//                                         }}
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Details - Right Column */}
//                 <div className="space-y-4">
//                     {/* Basic Info Card */}
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//                         <h3 className="text-lg font-semibold dark:text-white mb-4">Product Details</h3>
//                         <div className="space-y-3">
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500 dark:text-gray-400">Status</span>
//                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
//                                     {product.status || 'Active'}
//                                 </span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500 dark:text-gray-400">Price</span>
//                                 <span className="font-semibold dark:text-white">${product.price}</span>
//                             </div>
//                             {product.discount_price && (
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500 dark:text-gray-400">Discount Price</span>
//                                     <span className="font-semibold text-green-600 dark:text-green-400">${product.discount_price}</span>
//                                 </div>
//                             )}
//                             <div className="flex justify-between">
//                                 <span className="text-gray-500 dark:text-gray-400">Stock</span>
//                                 <span className="font-semibold dark:text-white">{getStockValue(product.stock)}</span>
//                             </div>
//                             {product.featured && (
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-500 dark:text-gray-400">Featured</span>
//                                     <span className="text-yellow-500">★ Featured</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Category & Brand */}
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//                         <div className="space-y-2">
//                             {product.category && (
//                                 <div className="flex items-center gap-2">
//                                     <Tag size={18} className="text-gray-400" />
//                                     <span className="text-gray-500 dark:text-gray-400">Category:</span>
//                                     <span className="font-medium dark:text-white">{product.category.name}</span>
//                                 </div>
//                             )}
//                             {product.brand && (
//                                 <div className="flex items-center gap-2">
//                                     <Award size={18} className="text-gray-400" />
//                                     <span className="text-gray-500 dark:text-gray-400">Brand:</span>
//                                     <span className="font-medium dark:text-white">{product.brand.name}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
//                         <div className="grid grid-cols-2 gap-2">
//                             <button
//                                 onClick={() => navigate(`/products/edit/${product.id}`)}
//                                 className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
//                             >
//                                 Edit Product
//                             </button>
//                             <button
//                                 onClick={() => navigate(`/products/variants/${product.id}`)}
//                                 className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm"
//                             >
//                                 Manage Variants
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Description */}
//             {product.description && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
//                         <Info size={20} />
//                         Description
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
//                         {product.description}
//                     </p>
//                 </div>
//             )}

//             {/* Specifications */}
//             {specs.length > 0 && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
//                         <List size={20} />
//                         Specifications
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {specs.map((spec) => (
//                             <div key={spec.id} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
//                                 <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">
//                                     {spec.spec_key || spec.key}:
//                                 </span>
//                                 <span className="text-gray-600 dark:text-gray-400">
//                                     {spec.spec_value || spec.value}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Variants */}
//             {variants.length > 0 && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//                     <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
//                         <ShoppingBag size={20} />
//                         Variants ({variants.length})
//                     </h3>
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 dark:bg-gray-700/50">
//                                 <tr>
//                                     <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
//                                     <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
//                                     <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
//                                     <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Attributes</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                                 {variants.map((variant) => (
//                                     <tr key={variant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                                         <td className="py-2 px-3 text-sm dark:text-white">{variant.sku}</td>
//                                         <td className="py-2 px-3 text-sm font-semibold dark:text-white">${variant.price}</td>
//                                         <td className="py-2 px-3 text-sm dark:text-white">{getStockValue(variant.stock)}</td>
//                                         <td className="py-2 px-3 text-sm">
//                                             {variant.attributes && variant.attributes.length > 0 ? (
//                                                 <div className="flex flex-wrap gap-1">
//                                                     {variant.attributes.map((attr) => (
//                                                         <span key={attr.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
//                                                             {attr.key || attr.attribute_key}: {attr.value || attr.attribute_value}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <span className="text-gray-400 text-xs">No attributes</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ProductDetails





//-------------------------------------------------





import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Edit,
    Package,
    Tag,
    ShoppingBag,
    Award,
    Info,
    List
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getProduct, getVariantsByProduct, getSpecsByProduct } from '../../services/productApi'
import { imageBasePath } from '../../utils/path'

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [variants, setVariants] = useState([])
    const [specs, setSpecs] = useState([])
    const [selectedImage, setSelectedImage] = useState(0)

    // ✅ Helper function to get stock value
    const getStockValue = (stock) => {
        if (!stock) return 0
        if (typeof stock === 'number') return stock
        if (typeof stock === 'object') {
            return stock.available_stock || stock.available || 0
        }
        return parseInt(stock) || 0
    }

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true)

                // ✅ Fetch product details
                const productRes = await getProduct(id)
                console.log('📥 Product:', productRes.data)
                setProduct(productRes.data)

                // ✅ Fetch variants - API already returns variants in product
                const productData = productRes.data
                if (productData.variants && productData.variants.length > 0) {
                    setVariants(productData.variants)
                } else {
                    // ✅ Try to fetch variants separately
                    try {
                        const variantsRes = await getVariantsByProduct(id)
                        console.log('📥 Variants:', variantsRes.data)
                        setVariants(variantsRes.data || [])
                    } catch (err) {
                        console.log('No variants found')
                    }
                }

                // ✅ Fetch specifications
                try {
                    const specsRes = await getSpecsByProduct(id)
                    console.log('📥 Specs:', specsRes.data)
                    setSpecs(specsRes.data || [])
                } catch (err) {
                    console.log('No specifications found')
                }

            } catch (error) {
                console.error('Error fetching product:', error)
                if (error.response?.status === 401) {
                    toast.error('Session expired. Please login again.')
                    setTimeout(() => {
                        localStorage.removeItem('user')
                        navigate('/login', { replace: true })
                    }, 2000)
                } else {
                    toast.error('Failed to load product details')
                    navigate('/products')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProductData()
    }, [id, navigate])

    const getStatusBadge = (status) => {
        const activeStatuses = ['Active', 'published', 1, true]
        return activeStatuses.includes(status)
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Product not found</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 text-primary-600 hover:text-primary-700"
                >
                    Back to Products
                </button>
            </div>
        )
    }

    // ✅ Get images from product_images, gallery, or variants
    const getImages = () => {
        if (product.product_images && product.product_images.length > 0) {
            return product.product_images
        }
        if (product.gallery && product.gallery.length > 0) {
            return product.gallery
        }
        // ✅ If no images, try to get from first variant
        if (product.variants && product.variants.length > 0 && product.variants[0].images) {
            return product.variants[0].images
        }
        return []
    }

    const images = getImages()
    const mainImage = images.length > 0 ? images[selectedImage] : null

    // ✅ Get display values
    const displayPrice = product.final_price || product.sale_price || product.base_price || product.price || 0
    const displaySku = product.selected_variant?.sku || product.sku || '-'
    const stockValue = product.selected_variant 
        ? getStockValue(product.selected_variant.stock)
        : getStockValue(product.stock || product.quantity)
    const categoryName = product.category?.name || product.category || '-'
    const brandName = product.brand?.name || product.brand || '-'

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Products
                    </button>
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-white">{product.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">SKU: {displaySku}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Edit size={18} />
                        Edit Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Images - Left Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {mainImage ? (
                            <img
                                src={`${imageBasePath}/${mainImage.image_url}`}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'
                                }}
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Package size={64} className="text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-6 gap-2">
                            {images.map((img, index) => (
                                <button
                                    key={img.id || index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                                        selectedImage === index
                                            ? 'border-primary-500'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <img
                                        src={`${imageBasePath}/${img.image_url}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-16 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details - Right Column */}
                <div className="space-y-4">
                    {/* Basic Info Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold dark:text-white mb-4">Product Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Status</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(product.status)}`}>
                                    {product.status || 'Active'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Price</span>
                                <span className="font-semibold dark:text-white">₹{displayPrice}</span>
                            </div>
                            {product.discount_price && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Discount Price</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">${product.discount_price}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Stock</span>
                                <span className="font-semibold dark:text-white">{stockValue}</span>
                            </div>
                            {product.featured && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Featured</span>
                                    <span className="text-yellow-500">★ Featured</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category & Brand */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                        <div className="space-y-2">
                            {categoryName && categoryName !== '-' && (
                                <div className="flex items-center gap-2">
                                    <Tag size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                    <span className="font-medium dark:text-white">{categoryName}</span>
                                </div>
                            )}
                            {brandName && brandName !== '-' && (
                                <div className="flex items-center gap-2">
                                    <Award size={18} className="text-gray-400" />
                                    <span className="text-gray-500 dark:text-gray-400">Brand:</span>
                                    <span className="font-medium dark:text-white">{brandName}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => navigate(`/products/edit/${product.id}`)}
                                className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
                            >
                                Edit Product
                            </button>
                            <button
                                onClick={() => navigate(`/products/variants/${product.id}`)}
                                className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm"
                            >
                                Manage Variants
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            {product.description && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                        <Info size={20} />
                        Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                        {product.description}
                    </p>
                </div>
            )}

            {/* Specifications */}
            {specs.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                        <List size={20} />
                        Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specs.map((spec) => (
                            <div key={spec.id} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">
                                    {spec.spec_key || spec.key}:
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    {spec.spec_value || spec.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Variants */}
            {variants.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Variants ({variants.length})
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">Attributes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {variants.map((variant) => {
                                    // ✅ Handle attributes - could be array or object
                                    let attributesArray = []
                                    if (Array.isArray(variant.attributes)) {
                                        attributesArray = variant.attributes
                                    } else if (typeof variant.attributes === 'object' && variant.attributes !== null) {
                                        attributesArray = Object.keys(variant.attributes).map(key => ({
                                            key: key,
                                            value: variant.attributes[key]
                                        }))
                                    }

                                    return (
                                        <tr key={variant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="py-2 px-3 text-sm dark:text-white">{variant.sku}</td>
                                            <td className="py-2 px-3 text-sm font-semibold dark:text-white">₹{variant.final_price || variant.price}</td>
                                            <td className="py-2 px-3 text-sm dark:text-white">{getStockValue(variant.stock)}</td>
                                            <td className="py-2 px-3 text-sm">
                                                {attributesArray.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {attributesArray.map((attr, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                                                {attr.key || attr.attribute_name}: {attr.value || attr.attribute_value}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">No attributes</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails