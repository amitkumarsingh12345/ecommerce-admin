// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { createProduct } from '../../services/productApi'
// import { getCategories } from '../../services/categoryApi'
// import { getBrands } from '../../services/brandApi'

// const AddProduct = () => {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [categories, setCategories] = useState([])
//   const [brands, setBrands] = useState([])
//   const [images, setImages] = useState([])
//   const [imagePreviews, setImagePreviews] = useState([])
//   const [specs, setSpecs] = useState([{ key: '', value: '' }])
//   const [formData, setFormData] = useState({
//     name: '',
//     sku: '',
//     description: '',
//     price: '',
//     discount_price: '',
//     stock: '',
//     category_id: '',
//     brand_id: '',
//     status: 'Active',
//     featured: false
//   })

//   // ✅ Fetch categories and brands
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoriesRes, brandsRes] = await Promise.all([
//           getCategories(),
//           getBrands()
//         ])
//         setCategories(categoriesRes.data.data || categoriesRes.data || [])
//         setBrands(brandsRes.data.data || brandsRes.data || [])
//       } catch (error) {
//         console.error('Error fetching data:', error)
//         toast.error('Failed to load categories and brands')
//       }
//     }
//     fetchData()
//   }, [])

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     setImages(prev => [...prev, ...files])

//     const previews = files.map(file => URL.createObjectURL(file))
//     setImagePreviews(prev => [...prev, ...previews])
//   }

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index))
//     setImagePreviews(prev => prev.filter((_, i) => i !== index))
//   }

//   const handleSpecChange = (index, field, value) => {
//     const newSpecs = [...specs]
//     newSpecs[index][field] = value
//     setSpecs(newSpecs)
//   }

//   const addSpec = () => {
//     setSpecs([...specs, { key: '', value: '' }])
//   }

//   const removeSpec = (index) => {
//     setSpecs(specs.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const formDataToSend = new FormData()

//       // ✅ Basic fields
//       formDataToSend.append('name', formData.name)
//       formDataToSend.append('sku', formData.sku)
//       formDataToSend.append('description', formData.description)
//       formDataToSend.append('price', formData.price)
//       formDataToSend.append('discount_price', formData.discount_price || '')
//       formDataToSend.append('stock', formData.stock)
//       formDataToSend.append('category_id', formData.category_id)
//       formDataToSend.append('brand_id', formData.brand_id)
//       formDataToSend.append('status', formData.status)
//       formDataToSend.append('featured', formData.featured ? '1' : '0')

//       // ✅ Images
//       images.forEach((file, index) => {
//         formDataToSend.append('images', file)
//       })

//       // ✅ Specifications
//       specs.forEach((spec, index) => {
//         if (spec.key && spec.value) {
//           formDataToSend.append(`specs[${index}][key]`, spec.key)
//           formDataToSend.append(`specs[${index}][value]`, spec.value)
//         }
//       })

//       console.log('📤 Sending product data...')

//       await createProduct(formDataToSend)
//       toast.success('Product created successfully!')
//       navigate('/products')
//     } catch (error) {
//       console.error('Create error:', error)
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.')
//         setTimeout(() => {
//           localStorage.removeItem('user')
//           navigate('/login', { replace: true })
//         }, 2000)
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to create product')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <button
//             onClick={() => navigate('/products')}
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
//           >
//             <ArrowLeft size={20} />
//             Back to Products
//           </button>
//           <h1 className="text-2xl font-bold dark:text-white">Add Product</h1>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 required
//               />
//             </div>

//             {/* SKU */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 SKU *
//               </label>
//               <input
//                 type="text"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 required
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Category *
//               </label>
//               <select
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Brand
//               </label>
//               <select
//                 name="brand_id"
//                 value={formData.brand_id}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="">Select Brand</option>
//                 {brands.map((brand) => (
//                   <option key={brand.id} value={brand.id}>
//                     {brand.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Price ($) *
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 required
//               />
//             </div>

//             {/* Discount Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Discount Price ($)
//               </label>
//               <input
//                 type="number"
//                 name="discount_price"
//                 value={formData.discount_price}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//               />
//             </div>

//             {/* Stock */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Stock *
//               </label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 required
//               />
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//             />
//           </div>

//           {/* Featured */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//               <input
//                 type="checkbox"
//                 name="featured"
//                 checked={formData.featured}
//                 onChange={handleChange}
//                 className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//               />
//               Featured Product
//             </label>
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Product Images
//             </label>
//             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 id="image-upload"
//               />
//               <label
//                 htmlFor="image-upload"
//                 className="cursor-pointer flex flex-col items-center gap-2"
//               >
//                 <Upload size={40} className="text-gray-400" />
//                 <span className="text-gray-600 dark:text-gray-400">
//                   Click to upload images
//                 </span>
//                 <span className="text-sm text-gray-500 dark:text-gray-500">
//                   PNG, JPG, WEBP (Max 5MB)
//                 </span>
//               </label>
//             </div>
//             {imagePreviews.length > 0 && (
//               <div className="mt-4 grid grid-cols-4 gap-4">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={preview}
//                       alt={`Product ${index + 1}`}
//                       className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Specifications */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Specifications
//               </label>
//               <button
//                 type="button"
//                 onClick={addSpec}
//                 className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
//               >
//                 <Plus size={16} />
//                 Add Specification
//               </button>
//             </div>
//             {specs.map((spec, index) => (
//               <div key={index} className="flex gap-3 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Key (e.g., Brand, Color)"
//                   value={spec.key}
//                   onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Value (e.g., Apple, Black)"
//                   value={spec.value}
//                   onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                 />
//                 {specs.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeSpec(index)}
//                     className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
//             >
//               <Save size={20} />
//               {loading ? 'Creating...' : 'Create Product'}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate('/products')}
//               className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddProduct





///----------------------------------------------------



import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { createProduct } from '../../services/productApi'
import { getCategories } from '../../services/categoryApi'
import { getBrands } from '../../services/brandApi'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [specs, setSpecs] = useState([{ key: '', value: '' }])
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    discount_price: '',
    stock: '',
    category_id: '',
    brand_id: '',
    status: 'Active',
    featured: false
  })

  // ✅ Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          getCategories(),
          getBrands()
        ])
        setCategories(categoriesRes.data.data || categoriesRes.data || [])
        setBrands(brandsRes.data.data || brandsRes.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load categories and brands')
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages(prev => [...prev, ...files])

    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...previews])
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = value
    setSpecs(newSpecs)
  }

  const addSpec = () => {
    setSpecs([...specs, { key: '', value: '' }])
  }

  const removeSpec = (index) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()

      formDataToSend.append('name', formData.name)
      formDataToSend.append('sku', formData.sku)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('discount_price', formData.discount_price || '')
      formDataToSend.append('stock', formData.stock)
      formDataToSend.append('category_id', formData.category_id)
      formDataToSend.append('brand_id', formData.brand_id)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('featured', formData.featured ? '1' : '0')

      images.forEach((file) => {
        formDataToSend.append('images', file)
      })

      specs.forEach((spec, index) => {
        if (spec.key && spec.value) {
          formDataToSend.append(`specs[${index}][key]`, spec.key)
          formDataToSend.append(`specs[${index}][value]`, spec.value)
        }
      })

      console.log('📤 Sending product data...')

      await createProduct(formDataToSend)
      toast.success('Product created successfully!')
      navigate('/products')
    } catch (error) {
      console.error('Create error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => {
          localStorage.removeItem('user')
          navigate('/login', { replace: true })
        }, 2000)
      } else {
        toast.error(error.response?.data?.message || 'Failed to create product')
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
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1 className="text-2xl font-bold dark:text-white">Add Product</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand
              </label>
              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              Featured Product
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={40} className="text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Click to upload images
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  PNG, JPG, WEBP (Max 5MB)
                </span>
              </label>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Specifications
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
              >
                <Plus size={16} />
                Add Specification
              </button>
            </div>
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  type="text"
                  placeholder="Key (e.g., Brand, Color)"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., Apple, Black)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
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

export default AddProduct