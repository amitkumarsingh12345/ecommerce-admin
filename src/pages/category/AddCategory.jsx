// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ArrowLeft, Save, Upload, X } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { createCategory, getRootCategories } from '../../services/categoryApi'

// const AddCategory = () => {
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [parentCategories, setParentCategories] = useState([])
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     parent_id: '',
//     status: 'Active'
//   })

//   // ✅ Fetch parent categories
//   useEffect(() => {
//     const fetchParents = async () => {
//       try {
//         const response = await getRootCategories()
//         setParentCategories(response.data || [])
//       } catch (error) {
//         console.error('Error fetching parent categories:', error)
//       }
//     }
//     fetchParents()
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
    
//     // Auto-generate slug from name
//     if (name === 'name') {
//       const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
//       setFormData(prev => ({ ...prev, slug }))
//     }
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

//       await createCategory(formDataToSend)
//       toast.success('Category created successfully!')
//       navigate('/categories')
//     } catch (error) {
//       console.error('Create error:', error)
//       toast.error(error.response?.data?.message || 'Failed to create category')
//     } finally {
//       setLoading(false)
//     }
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
//           <h1 className="text-2xl font-bold dark:text-white">Add Category</h1>
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
//               placeholder="Enter category name"
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
//               placeholder="auto-generated"
//             />
//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Auto-generated from name</p>
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
//               {parentCategories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
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
//               placeholder="Enter category description"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Category Image
//             </label>
//             <div className="flex items-center gap-4">
//               <label className="cursor-pointer">
//                 <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
//                   <Upload size={20} />
//                   <span className="text-sm">Upload Image</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//               {imagePreview && (
//                 <div className="relative">
//                   <img 
//                     src={imagePreview} 
//                     alt="Preview" 
//                     className="w-16 h-16 rounded-lg object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}
//             </div>
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
//               {loading ? 'Creating...' : 'Create Category'}
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

// export default AddCategory



//----------------------------------------





import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { createCategory, getRootCategories } from '../../services/categoryApi'

const AddCategory = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [parentCategories, setParentCategories] = useState([])
  const [fetchingParents, setFetchingParents] = useState(true)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    status: 'Active'
  })

  // ✅ Fetch parent categories (Root categories)
  useEffect(() => {
    const fetchParents = async () => {
      try {
        setFetchingParents(true)
        const response = await getRootCategories()
        console.log('📥 Parent categories:', response.data)
        setParentCategories(response.data || [])
      } catch (error) {
        console.error('Error fetching parent categories:', error)
        toast.error('Failed to load parent categories')
      } finally {
        setFetchingParents(false)
      }
    }
    fetchParents()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // ✅ Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      setFormData(prev => ({ ...prev, slug }))
    }
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
      
      // ✅ Parent category ID send karo (agar select kiya hai)
      if (formData.parent_id) {
        formDataToSend.append('parent_id', formData.parent_id)
      }
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      console.log('📤 Sending category data:', Object.fromEntries(formDataToSend))
      
      await createCategory(formDataToSend)
      toast.success('Category created successfully!')
      navigate('/categories')
    } catch (error) {
      console.error('Create error:', error)
      toast.error(error.response?.data?.message || 'Failed to create category')
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Add Category</h1>
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
              placeholder="Enter category name"
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
              placeholder="auto-generated"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Auto-generated from name</p>
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
                parentCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            {parentCategories.length === 0 && !fetchingParents && (
              <p className="mt-1 text-sm text-yellow-500">
                No parent categories available. Create root categories first.
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
              placeholder="Enter category description"
            />
          </div>

          {/* ✅ Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Image
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="cursor-pointer">
                <div className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2">
                  <Upload size={20} />
                  <span className="text-sm">Upload Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
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
              {loading ? 'Creating...' : 'Create Category'}
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

export default AddCategory