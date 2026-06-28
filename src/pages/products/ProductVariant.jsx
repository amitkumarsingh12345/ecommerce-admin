// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { ArrowLeft, Plus, Trash2, Edit, Save, X } from 'lucide-react'
// import toast from 'react-hot-toast'
// import {
//   getVariantsByProduct,
//   createVariant,
//   updateVariant,
//   deleteVariant,
//   getVariantAttributes,
//   addVariantAttribute,
//   deleteVariantAttribute
// } from '../../services/productApi'

// const ProductVariant = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [fetching, setFetching] = useState(true)
//   const [variants, setVariants] = useState([])
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [editingVariant, setEditingVariant] = useState(null)
//   const [formData, setFormData] = useState({
//     sku: '',
//     price: '',
//     stock: '',
//     attributes: [{ key: '', value: '' }]
//   })
//   const [attributes, setAttributes] = useState([])

//   // ✅ Helper function to get stock value
//   const getStockValue = (stock) => {
//     if (!stock) return 0
//     if (typeof stock === 'number') return stock
//     if (typeof stock === 'object') {
//       return stock.available_stock || stock.available || 0
//     }
//     return parseInt(stock) || 0
//   }

//   // ✅ Fetch variants
//   useEffect(() => {
//     const fetchVariants = async () => {
//       try {
//         const response = await getVariantsByProduct(id)
//         console.log('📥 Variants:', response.data)
//         setVariants(response.data || [])
//       } catch (error) {
//         console.error('Error fetching variants:', error)
//         toast.error('Failed to load variants')
//       } finally {
//         setFetching(false)
//       }
//     }
//     fetchVariants()
//   }, [id])

//   // ✅ Fetch variant attributes
//   const fetchAttributes = async (variantId) => {
//     try {
//       const response = await getVariantAttributes(variantId)
//       setAttributes(response.data || [])
//     } catch (error) {
//       console.error('Error fetching attributes:', error)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleAttributeChange = (index, field, value) => {
//     const newAttributes = [...formData.attributes]
//     newAttributes[index][field] = value
//     setFormData(prev => ({ ...prev, attributes: newAttributes }))
//   }

//   const addAttributeField = () => {
//     setFormData(prev => ({
//       ...prev,
//       attributes: [...prev.attributes, { key: '', value: '' }]
//     }))
//   }

//   const removeAttributeField = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       attributes: prev.attributes.filter((_, i) => i !== index)
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const data = {
//         product_id: id,
//         sku: formData.sku,
//         price: parseFloat(formData.price),
//         stock: parseInt(formData.stock)
//       }

//       const response = await createVariant(data)
//       const variantId = response.data.id || response.data.variant?.id

//       // ✅ Add attributes
//       for (const attr of formData.attributes) {
//         if (attr.key && attr.value) {
//           await addVariantAttribute({
//             variant_id: variantId,
//             key: attr.key,
//             value: attr.value
//           })
//         }
//       }

//       toast.success('Variant created successfully!')
//       setShowAddForm(false)
//       setFormData({ sku: '', price: '', stock: '', attributes: [{ key: '', value: '' }] })

//       // Refresh variants
//       const updated = await getVariantsByProduct(id)
//       setVariants(updated.data || [])
//     } catch (error) {
//       console.error('Create variant error:', error)
//       toast.error(error.response?.data?.message || 'Failed to create variant')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (variantId) => {
//     if (!window.confirm('Are you sure you want to delete this variant?')) return

//     try {
//       await deleteVariant(variantId)
//       toast.success('Variant deleted')
//       setVariants(variants.filter(v => v.id !== variantId))
//     } catch (error) {
//       console.error('Delete error:', error)
//       toast.error('Failed to delete variant')
//     }
//   }

//   const handleDeleteAttribute = async (attrId) => {
//     try {
//       await deleteVariantAttribute(attrId)
//       toast.success('Attribute deleted')
//       setAttributes(attributes.filter(a => a.id !== attrId))
//     } catch (error) {
//       console.error('Delete attribute error:', error)
//       toast.error('Failed to delete attribute')
//     }
//   }

//   if (fetching) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
//       </div>
//     )
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
//           <h1 className="text-2xl font-bold dark:text-white">Product Variants</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Manage variants for product #{id}</p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(!showAddForm)}
//           className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//         >
//           <Plus size={20} />
//           Add Variant
//         </button>
//       </div>

//       {/* Add Variant Form */}
//       {showAddForm && (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//           <h3 className="text-lg font-semibold dark:text-white mb-4">Create New Variant</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   SKU *
//                 </label>
//                 <input
//                   type="text"
//                   name="sku"
//                   value={formData.sku}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Price *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Stock *
//                 </label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Attributes */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Attributes
//                 </label>
//                 <button
//                   type="button"
//                   onClick={addAttributeField}
//                   className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
//                 >
//                   <Plus size={16} />
//                   Add Attribute
//                 </button>
//               </div>
//               {formData.attributes.map((attr, index) => (
//                 <div key={index} className="flex gap-3 mb-2">
//                   <input
//                     type="text"
//                     placeholder="Key (e.g., Color)"
//                     value={attr.key}
//                     onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
//                     className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Value (e.g., Black)"
//                     value={attr.value}
//                     onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
//                     className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                   {formData.attributes.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeAttributeField(index)}
//                       className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
//                     >
//                       <X size={18} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
//               >
//                 <Save size={20} />
//                 {loading ? 'Creating...' : 'Create Variant'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowAddForm(false)
//                   setFormData({ sku: '', price: '', stock: '', attributes: [{ key: '', value: '' }] })
//                 }}
//                 className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Variants List */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700/50">
//               <tr>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">#</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Attributes</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//               {variants.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
//                     No variants found
//                   </td>
//                 </tr>
//               ) : (
//                 variants.map((variant, index) => (
//                   <tr key={variant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                     <td className="py-3 px-4 text-sm dark:text-white">{index + 1}</td>
//                     <td className="py-3 px-4 text-sm dark:text-white">{variant.sku}</td>
//                     <td className="py-3 px-4 text-sm font-semibold dark:text-white">${variant.price}</td>
//                     <td className="py-3 px-4 text-sm dark:text-white">
//                       {getStockValue(variant.stock)}  {/* ✅ FIXED */}
//                     </td>
//                     <td className="py-3 px-4 text-sm">
//                       {variant.attributes && variant.attributes.length > 0 ? (
//                         <div className="flex flex-wrap gap-1">
//                           {variant.attributes.map((attr) => (
//                             <span key={attr.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
//                               {attr.key || attr.attribute_key}: {attr.value || attr.attribute_value}
//                             </span>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400 text-xs">No attributes</span>
//                       )}
//                     </td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => {
//                             setEditingVariant(variant)
//                             setFormData({
//                               sku: variant.sku,
//                               price: variant.price,
//                               stock: getStockValue(variant.stock),  // ✅ FIXED
//                               attributes: variant.attributes?.map(a => ({
//                                 key: a.key || a.attribute_key,
//                                 value: a.value || a.attribute_value
//                               })) || [{ key: '', value: '' }]
//                             })
//                           }}
//                           className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
//                         >
//                           <Edit size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(variant.id)}
//                           className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductVariant



//---------------------------------------



import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Edit, Save, X } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getVariantsByProduct,
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantAttributes,
  addVariantAttribute,
  deleteVariantAttribute
} from '../../services/productApi'

const ProductVariant = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [variants, setVariants] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVariant, setEditingVariant] = useState(null)
  const [formData, setFormData] = useState({
    sku: '',
    price: '',
    stock: '',
    attributes: [{ key: '', value: '' }]
  })
  const [attributes, setAttributes] = useState([])

  // ✅ Helper function to get stock value
  const getStockValue = (stock) => {
    if (!stock) return 0
    if (typeof stock === 'number') return stock
    if (typeof stock === 'object') {
      return stock.available_stock || stock.available || 0
    }
    return parseInt(stock) || 0
  }

  // ✅ Fetch variants
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await getVariantsByProduct(id)
        console.log('📥 Variants:', response.data)
        setVariants(response.data || [])
      } catch (error) {
        console.error('Error fetching variants:', error)
        toast.error('Failed to load variants')
      } finally {
        setFetching(false)
      }
    }
    fetchVariants()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...formData.attributes]
    newAttributes[index][field] = value
    setFormData(prev => ({ ...prev, attributes: newAttributes }))
  }

  const addAttributeField = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { key: '', value: '' }]
    }))
  }

  const removeAttributeField = (index) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        product_id: id,
        sku: formData.sku,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      }

      const response = await createVariant(data)
      const variantId = response.data.id || response.data.variant?.id

      // ✅ Add attributes
      for (const attr of formData.attributes) {
        if (attr.key && attr.value) {
          await addVariantAttribute({
            variant_id: variantId,
            key: attr.key,
            value: attr.value
          })
        }
      }

      toast.success('Variant created successfully!')
      setShowAddForm(false)
      setFormData({ sku: '', price: '', stock: '', attributes: [{ key: '', value: '' }] })

      // Refresh variants
      const updated = await getVariantsByProduct(id)
      setVariants(updated.data || [])
    } catch (error) {
      console.error('Create variant error:', error)
      toast.error(error.response?.data?.message || 'Failed to create variant')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (variantId) => {
    if (!window.confirm('Are you sure you want to delete this variant?')) return

    try {
      await deleteVariant(variantId)
      toast.success('Variant deleted')
      setVariants(variants.filter(v => v.id !== variantId))
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete variant')
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
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Product Variants</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage variants for product #{id}</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Variant
        </button>
      </div>

      {/* Add Variant Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Create New Variant</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price *
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            </div>

            {/* Attributes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Attributes
                </label>
                <button
                  type="button"
                  onClick={addAttributeField}
                  className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Attribute
                </button>
              </div>
              {formData.attributes.map((attr, index) => (
                <div key={index} className="flex gap-3 mb-2">
                  <input
                    type="text"
                    placeholder="Key (e.g., Color)"
                    value={attr.key}
                    onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., Black)"
                    value={attr.value}
                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                  {formData.attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttributeField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <X size={18} />
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
                {loading ? 'Creating...' : 'Create Variant'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setFormData({ sku: '', price: '', stock: '', attributes: [{ key: '', value: '' }] })
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Variants List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Attributes</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {variants.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No variants found
                  </td>
                </tr>
              ) : (
                variants.map((variant, index) => {
                  // ✅ Handle attributes - could be array or object
                  let attributesArray = []
                  if (Array.isArray(variant.attributes)) {
                    attributesArray = variant.attributes
                  } else if (typeof variant.attributes === 'object' && variant.attributes !== null) {
                    attributesArray = Object.keys(variant.attributes).map(key => ({
                      id: key,
                      key: key,
                      value: variant.attributes[key]
                    }))
                  }

                  return (
                    <tr key={variant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 text-sm dark:text-white">{index + 1}</td>
                      <td className="py-3 px-4 text-sm dark:text-white">{variant.sku}</td>
                      <td className="py-3 px-4 text-sm font-semibold dark:text-white">${variant.price}</td>
                      <td className="py-3 px-4 text-sm dark:text-white">
                        {getStockValue(variant.stock)}
                      </td>
                      <td className="py-3 px-4 text-sm">
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
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingVariant(variant)
                              setFormData({
                                sku: variant.sku,
                                price: variant.price,
                                stock: getStockValue(variant.stock),
                                attributes: attributesArray.map(a => ({
                                  key: a.key || a.attribute_name,
                                  value: a.value || a.attribute_value
                                })) || [{ key: '', value: '' }]
                              })
                            }}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(variant.id)}
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
      </div>
    </div>
  )
}

export default ProductVariant