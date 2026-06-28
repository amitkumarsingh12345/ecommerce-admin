// import { useState } from 'react'
// import { Save, Upload } from 'lucide-react'
// import toast from 'react-hot-toast'

// const Settings = () => {
//   const [loading, setLoading] = useState(false)
//   const [settings, setSettings] = useState({
//     storeName: 'My E-Commerce Store',
//     storeEmail: 'info@mystore.com',
//     storePhone: '+1 234 567 890',
//     storeAddress: '123 Main Street, New York, NY 10001',
//     currency: 'USD',
//     taxRate: '10',
//     shippingRate: '5',
//     orderPrefix: 'ORD',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setSettings(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setLoading(true)
    
//     setTimeout(() => {
//       toast.success('Settings updated successfully!')
//       setLoading(false)
//     }, 1000)
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your store settings</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Store Name
//                   </label>
//                   <input
//                     type="text"
//                     name="storeName"
//                     value={settings.storeName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Store Email
//                   </label>
//                   <input
//                     type="email"
//                     name="storeEmail"
//                     value={settings.storeEmail}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Store Phone
//                   </label>
//                   <input
//                     type="text"
//                     name="storePhone"
//                     value={settings.storePhone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Currency
//                   </label>
//                   <select
//                     name="currency"
//                     value={settings.currency}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   >
//                     <option value="USD">USD - US Dollar</option>
//                     <option value="EUR">EUR - Euro</option>
//                     <option value="GBP">GBP - British Pound</option>
//                     <option value="INR">INR - Indian Rupee</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Tax Rate (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="taxRate"
//                     value={settings.taxRate}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Shipping Rate ($)
//                   </label>
//                   <input
//                     type="number"
//                     name="shippingRate"
//                     value={settings.shippingRate}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Order Prefix
//                   </label>
//                   <input
//                     type="text"
//                     name="orderPrefix"
//                     value={settings.orderPrefix}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Store Address
//                   </label>
//                   <textarea
//                     name="storeAddress"
//                     value={settings.storeAddress}
//                     onChange={handleChange}
//                     rows="3"
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
//               >
//                 <Save size={20} />
//                 {loading ? 'Saving...' : 'Save Settings'}
//               </button>
//             </form>
//           </div>
//         </div>

//         <div>
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//             <h3 className="text-lg font-semibold dark:text-white mb-4">Store Logo</h3>
//             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
//               <Upload size={40} className="mx-auto text-gray-400 mb-2" />
//               <p className="text-sm text-gray-600 dark:text-gray-400">Upload logo</p>
//               <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG (Max 2MB)</p>
//               <button className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors">
//                 Choose Image
//               </button>
//             </div>
//           </div>

//           <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//             <h3 className="text-lg font-semibold dark:text-white mb-4">Store Information</h3>
//             <div className="space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-500 dark:text-gray-400">Store Name</span>
//                 <span className="dark:text-white font-medium">{settings.storeName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500 dark:text-gray-400">Email</span>
//                 <span className="dark:text-white">{settings.storeEmail}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500 dark:text-gray-400">Currency</span>
//                 <span className="dark:text-white">{settings.currency}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500 dark:text-gray-400">Tax Rate</span>
//                 <span className="dark:text-white">{settings.taxRate}%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Settings






//--------------------------------------------





import { useState } from 'react'
import { Save, Upload, IndianRupee } from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'NVW ECommerce',
    storeEmail: 'info@nvwecommerce.com',
    storePhone: '+91 8565 082 333',
    storeAddress: 'Prayagraj, Uttar Pradesh, India',
    currency: 'INR',
    taxRate: '18',
    shippingRate: '50',
    orderPrefix: 'NVW',
    storeTagline: 'Your Trusted Online Shopping Partner',
    gstNumber: '22ABCDE1234F1Z5',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      toast.success('Settings updated successfully!')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your store settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Store Tagline
                  </label>
                  <input
                    type="text"
                    name="storeTagline"
                    value={settings.storeTagline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                    placeholder="Your store tagline"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Store Email
                  </label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={settings.storeEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Store Phone
                  </label>
                  <input
                    type="text"
                    name="storePhone"
                    value={settings.storePhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Store Address
                  </label>
                  <textarea
                    name="storeAddress"
                    value={settings.storeAddress}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={settings.gstNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                    placeholder="22ABCDE1234F1Z5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="INR">₹ INR - Indian Rupee</option>
                    <option value="USD">$ USD - US Dollar</option>
                    <option value="EUR">€ EUR - Euro</option>
                    <option value="GBP">£ GBP - British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shipping Rate (₹)
                  </label>
                  <input
                    type="number"
                    name="shippingRate"
                    value={settings.shippingRate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order Prefix
                  </label>
                  <input
                    type="text"
                    name="orderPrefix"
                    value={settings.orderPrefix}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white mb-4">Store Logo</h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload size={40} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload logo</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG (Max 2MB)</p>
              <button className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors">
                Choose Image
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white mb-4">Store Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Store Name</span>
                <span className="dark:text-white font-medium">{settings.storeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tagline</span>
                <span className="dark:text-white">{settings.storeTagline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Email</span>
                <span className="dark:text-white">{settings.storeEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Phone</span>
                <span className="dark:text-white">{settings.storePhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Location</span>
                <span className="dark:text-white text-right">{settings.storeAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">GST</span>
                <span className="dark:text-white">{settings.gstNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Currency</span>
                <span className="dark:text-white">₹ {settings.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tax Rate</span>
                <span className="dark:text-white">{settings.taxRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Order Prefix</span>
                <span className="dark:text-white">{settings.orderPrefix}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings