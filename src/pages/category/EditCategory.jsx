// import { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { ArrowLeft, Save, Upload, X } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { imageBasePath } from '../../utils/path'
// import { getCategory, updateCategory, getRootCategories } from '../../services/categoryApi'

// const EditCategory = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [fetching, setFetching] = useState(true)
//   const [parentCategories, setParentCategories] = useState([])
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [existingImage, setExistingImage] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     parent_id: '',
//     status: 'Active'
//   })

//   // ✅ Fetch category data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [categoryRes, parentsRes] = await Promise.all([
//           getCategory(id),
//           getRootCategories()
//         ])

//         const category = categoryRes.data
//         setFormData({
//           name: category.name || '',
//           slug: category.slug || '',
//           description: category.description || '',
//           parent_id: category.parent_id || '',
//           status: category.status || 'Active'
//         })
//         setExistingImage(category.image_url || null)
//         setParentCategories(parentsRes.data || [])
//       } catch (error) {
//         console.error('Error fetching category:', error)
//         toast.error('Failed to load category')
//         navigate('/categories')
//       } finally {
//         setFetching(false)
//       }
//     }
//     fetchData()
//   }, [id, navigate])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImagePreview(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const removeImage = () => {
//     setImageFile(null)
//     setImagePreview(null)
//     setExistingImage(null)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const formDataToSend = new FormData()
//       formDataToSend.append('name', formData.name)
//       formDataToSend.append('slug', formData.slug)
//       formDataToSend.append('description', formData.description)
//       formDataToSend.append('status', formData.status)

//       if (formData.parent_id) {
//         formDataToSend.append('parent_id', formData.parent_id)
//       }

//       if (imageFile) {
//         formDataToSend.append('image', imageFile)
//       }

//       await updateCategory(id, formDataToSend)
//       toast.success('Category updated successfully!')
//       navigate('/categories')
//     } catch (error) {
//       console.error('Update error:', error)
//       toast.error(error.response?.data?.message || 'Failed to update category')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (fetching) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
//       </div>
//     )
//   }

//   // ✅ Helper function to get image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath
//     }
//     return `${imageBasePath}${imagePath}`
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <button
//             onClick={() => navigate('/categories')}
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
//           >
//             <ArrowLeft size={20} />
//             Back to Categories
//           </button>
//           <h1 className="text-2xl font-bold dark:text-white">Edit Category #{id}</h1>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//         <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category Name *
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Slug
//             </label>
//             <input
//               type="text"
//               name="slug"
//               value={formData.slug}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Parent Category
//             </label>
//             <select
//               name="parent_id"
//               value={formData.parent_id}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="">None (Root Category)</option>
//               {parentCategories
//                 .filter(cat => cat.id !== parseInt(id))
//                 .map((cat) => (
//                   <option key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category Image
//             </label>
//             <div className="flex items-center gap-4 flex-wrap">
//               <label className="cursor-pointer">
//                 <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
//                   <Upload size={20} />
//                   <span className="text-sm">Change Image</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>

//               {/* ✅ CORRECTED: Image rendering with proper condition */}
//               {(imagePreview || existingImage) && (
//                 <div className="relative">
//                   <img
//                     src={imagePreview || getImageUrl(existingImage)}
//                     alt="Category"
//                     className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
//                     onError={(e) => {
//                       e.target.onerror = null
//                       e.target.src = 'https://via.placeholder.com/64?text=No+Image'
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}
//             </div>
//             {!imagePreview && !existingImage && (
//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No image uploaded</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
//             >
//               <Save size={20} />
//               {loading ? 'Updating...' : 'Update Category'}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate('/categories')}
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

// export default EditCategory



//-----------------------


import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { imageBasePath } from '../../utils/path'
import { getCategory, updateCategory, getRootCategories } from '../../services/categoryApi'

const EditCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [parentCategories, setParentCategories] = useState([])
  const [fetchingParents, setFetchingParents] = useState(true)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [existingImage, setExistingImage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    status: 'Active'
  })

  // ✅ Fetch category data and parent categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, parentsRes] = await Promise.all([
          getCategory(id),
          getRootCategories()
        ])
        
        const category = categoryRes.data
        console.log('📥 Category data:', category)
        console.log('📥 Parent categories:', parentsRes.data)
        
        setFormData({
          name: category.name || '',
          slug: category.slug || '',
          description: category.description || '',
          parent_id: category.parent_id || '',
          status: category.status || 'Active'
        })
        setExistingImage(category.image_url || null)
        setParentCategories(parentsRes.data || [])
      } catch (error) {
        console.error('Error fetching category:', error)
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          setTimeout(() => {
            localStorage.removeItem('user')
            navigate('/login', { replace: true })
          }, 2000)
        } else {
          toast.error('Failed to load category')
          navigate('/categories')
        }
      } finally {
        setFetching(false)
        setFetchingParents(false)
      }
    }
    fetchData()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setExistingImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('slug', formData.slug)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('status', formData.status)
      
      // ✅ Parent category ID send karo (select kiya hai toh)
      if (formData.parent_id) {
        formDataToSend.append('parent_id', formData.parent_id)
      }
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      console.log('📤 Updating category:', Object.fromEntries(formDataToSend))
      
      await updateCategory(id, formDataToSend)
      toast.success('Category updated successfully!')
      navigate('/categories')
    } catch (error) {
      console.error('Update error:', error)
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => {
          localStorage.removeItem('user')
          navigate('/login', { replace: true })
        }, 2000)
      } else {
        toast.error(error.response?.data?.message || 'Failed to update category')
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
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            Back to Categories
          </button>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Edit Category #{id}</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          {/* ✅ Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name *
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

          {/* ✅ Slug */}
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

          {/* ✅ Parent Category - IMPORTANT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Parent Category
            </label>
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={fetchingParents}
            >
              <option value="">None (Root Category)</option>
              {fetchingParents ? (
                <option disabled>Loading parents...</option>
              ) : (
                parentCategories
                  .filter(cat => cat.id !== parseInt(id)) // ✅ Current category ko filter karo
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
              )}
            </select>
            {parentCategories.length === 0 && !fetchingParents && (
              <p className="mt-1 text-sm text-yellow-500">
                No parent categories available.
              </p>
            )}
          </div>

          {/* ✅ Description */}
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

          {/* ✅ Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Image
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="cursor-pointer">
                <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
                  <Upload size={20} />
                  <span className="text-sm">Change Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              
              {(imagePreview || existingImage) && (
                <div className="relative">
                  <img 
                    src={`$imagePreview} || ${imageBasePath}/${existingImage}`}
                    alt="Category" 
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/64?text=No+Image'
                    }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
            {!imagePreview && !existingImage && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No image uploaded</p>
            )}
          </div>

          {/* ✅ Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* ✅ Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Updating...' : 'Update Category'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/categories')}
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

export default EditCategory