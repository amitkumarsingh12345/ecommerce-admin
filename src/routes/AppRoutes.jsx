// import { Routes, Route, Navigate } from 'react-router-dom'
// import ProtectedRoute from './ProtectedRoute'
// import Login from '../pages/auth/Login'
// import Dashboard from '../pages/dashboard/Dashboard'
// import Layout from '../components/layout/Layout'
// import CategoryList from '../pages/category/CategoryList'
// import AddCategory from '../pages/category/AddCategory'
// import EditCategory from '../pages/category/EditCategory'
// import ProductList from '../pages/products/ProductList'
// import AddProduct from '../pages/products/AddProduct'
// import EditProduct from '../pages/products/EditProduct'
// import Orders from '../pages/orders/Orders'
// import OrderDetails from '../pages/orders/OrderDetails'
// import Customers from '../pages/customers/Customers'
// import Settings from '../pages/settings/Settings'
// import Profile from '../pages/profile/Profile'

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<ProtectedRoute />}>
//         <Route element={<Layout />}>
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="categories" element={<CategoryList />} />
//           <Route path="categories/add" element={<AddCategory />} />
//           <Route path="categories/edit/:id" element={<EditCategory />} />
//           <Route path="products" element={<ProductList />} />
//           <Route path="products/add" element={<AddProduct />} />
//           <Route path="products/edit/:id" element={<EditProduct />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="orders/:id" element={<OrderDetails />} />
//           <Route path="customers" element={<Customers />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="profile" element={<Profile />} />
//         </Route>
//       </Route>
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   )
// }

// export default AppRoutes




//--------------------




import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Layout from '../components/layout/Layout'

// ✅ Category imports
import CategoryList from '../pages/category/CategoryList'
import AddCategory from '../pages/category/AddCategory'
import EditCategory from '../pages/category/EditCategory'

// ✅ Brand imports
import BrandList from '../pages/brand/BrandList'
import AddBrand from '../pages/brand/AddBrand'
import EditBrand from '../pages/brand/EditBrand'

// ✅ Other imports
import ProductList from '../pages/products/ProductList'
import AddProduct from '../pages/products/AddProduct'
import EditProduct from '../pages/products/EditProduct'
import Orders from '../pages/orders/Orders'
import OrderDetails from '../pages/orders/OrderDetails'
import Customers from '../pages/customers/Customers'
import Settings from '../pages/settings/Settings'
import Profile from '../pages/profile/Profile'
import ProductVariant from '../pages/products/ProductVariant'
import ProductDetails from '../pages/products/ProductDetails'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Category Routes */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />

          {/* Brand Routes */}
          <Route path="brands" element={<BrandList />} />
          <Route path="brands/add" element={<AddBrand />} />
          <Route path="brands/edit/:id" element={<EditBrand />} />

          {/* Product Routes */}
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="products/variants/:id" element={<ProductVariant />} />

          {/* Order Routes */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />

          {/* Other Routes */}
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes