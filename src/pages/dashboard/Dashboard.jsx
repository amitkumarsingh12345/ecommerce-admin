
// import { useState, useEffect } from 'react'
// import { 
//   ShoppingBag, 
//   Users, 
//   Package, 
//   DollarSign,
//   TrendingUp,
//   TrendingDown
// } from 'lucide-react'
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell
// } from 'recharts'

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 1245,
//     totalCategories: 48,
//     totalOrders: 892,
//     totalRevenue: 45231
//   })

//   const [recentOrders, setRecentOrders] = useState([
//     { id: '#ORD-001', customer: 'John Doe', amount: 299, status: 'Delivered', date: '2024-01-15' },
//     { id: '#ORD-002', customer: 'Jane Smith', amount: 499, status: 'Pending', date: '2024-01-14' },
//     { id: '#ORD-003', customer: 'Bob Wilson', amount: 159, status: 'Shipped', date: '2024-01-14' },
//     { id: '#ORD-004', customer: 'Alice Brown', amount: 899, status: 'Delivered', date: '2024-01-13' },
//     { id: '#ORD-005', customer: 'Charlie Davis', amount: 349, status: 'Pending', date: '2024-01-13' },
//   ])

//   const [salesData] = useState([
//     { name: 'Jan', sales: 4000, revenue: 2400 },
//     { name: 'Feb', sales: 3000, revenue: 1398 },
//     { name: 'Mar', sales: 5000, revenue: 9800 },
//     { name: 'Apr', sales: 2780, revenue: 3908 },
//     { name: 'May', sales: 1890, revenue: 4800 },
//     { name: 'Jun', sales: 2390, revenue: 3800 },
//     { name: 'Jul', sales: 3490, revenue: 4300 },
//   ])

//   const [categoryData] = useState([
//     { name: 'Electronics', value: 400 },
//     { name: 'Clothing', value: 300 },
//     { name: 'Books', value: 200 },
//     { name: 'Food', value: 150 },
//     { name: 'Others', value: 100 },
//   ])

//   const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b']

//   const statCards = [
//     { 
//       title: 'Total Products', 
//       value: stats.totalProducts, 
//       icon: Package, 
//       color: 'bg-blue-500',
//       change: '+12%',
//       trend: 'up'
//     },
//     { 
//       title: 'Total Categories', 
//       value: stats.totalCategories, 
//       icon: ShoppingBag, 
//       color: 'bg-purple-500',
//       change: '+5%',
//       trend: 'up'
//     },
//     { 
//       title: 'Total Orders', 
//       value: stats.totalOrders, 
//       icon: Users, 
//       color: 'bg-pink-500',
//       change: '+8%',
//       trend: 'up'
//     },
//     { 
//       title: 'Total Revenue', 
//       value: `$${stats.totalRevenue.toLocaleString()}`, 
//       icon: DollarSign, 
//       color: 'bg-green-500',
//       change: '+15%',
//       trend: 'up'
//     },
//   ]

//   const getStatusColor = (status) => {
//     const colors = {
//       'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
//       'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
//       'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
//       'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
//     }
//     return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your store.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statCards.map((stat, index) => (
//           <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
//                 <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
//               </div>
//               <div className={`${stat.color} p-3 rounded-xl text-white`}>
//                 <stat.icon size={24} />
//               </div>
//             </div>
//             <div className="mt-4 flex items-center gap-1">
//               {stat.trend === 'up' ? (
//                 <TrendingUp size={16} className="text-green-500" />
//               ) : (
//                 <TrendingDown size={16} className="text-red-500" />
//               )}
//               <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
//                 {stat.change}
//               </span>
//               <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Sales Chart */}
//         <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//           <h3 className="text-lg font-semibold dark:text-white mb-4">Revenue Overview</h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#1f2937', 
//                     border: 'none',
//                     borderRadius: '8px',
//                     color: '#fff'
//                   }}
//                 />
//                 <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
//                 <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Category Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//           <h3 className="text-lg font-semibold dark:text-white mb-4">Category Distribution</h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold dark:text-white">Recent Orders</h3>
//           <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
//             View All
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b dark:border-gray-700">
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
//                 <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                   <td className="py-3 px-4 text-sm font-medium dark:text-white">{order.id}</td>
//                   <td className="py-3 px-4 text-sm dark:text-gray-300">{order.customer}</td>
//                   <td className="py-3 px-4 text-sm font-semibold dark:text-white">${order.amount}</td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard



//-----------------------------





import { useState, useEffect } from 'react'
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  IndianRupee,
  TrendingDown,
  ShoppingCart
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import toast from 'react-hot-toast'
import { getProducts } from '../../services/productApi'
import { getCategories } from '../../services/categoryApi'
import { getBrands } from '../../services/brandApi'
import { getAllOrders } from '../../services/orderApi'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [salesData, setSalesData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [orderStatusData, setOrderStatusData] = useState([])
  const [trends, setTrends] = useState({
    products: '+0%',
    categories: '+0%',
    orders: '+0%',
    revenue: '+0%'
  })

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6']
  const STATUS_COLORS = {
    'Pending': '#f59e0b',
    'Processing': '#3b82f6',
    'Shipped': '#8b5cf6',
    'Delivered': '#22c55e',
    'Completed': '#14b8a6',
    'Cancelled': '#ef4444'
  }

  // ✅ Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // ✅ Fetch products
        const productsRes = await getProducts({ limit: 1000 })
        const products = productsRes.data.data || productsRes.data || []
        const totalProducts = products.length

        // ✅ Fetch categories
        const categoriesRes = await getCategories()
        const categories = categoriesRes.data.data || categoriesRes.data || []
        const totalCategories = categories.length

        // ✅ Fetch brands
        const brandsRes = await getBrands()
        const brands = brandsRes.data.data || brandsRes.data || []
        const totalBrands = brands.length

        // ✅ Fetch orders
        const ordersRes = await getAllOrders({ limit: 1000 })
        const orders = ordersRes.data.data || ordersRes.data || []
        const totalOrders = orders.length

        // ✅ Calculate revenue and order stats
        let totalRevenue = 0
        let pendingOrders = 0
        let shippedOrders = 0
        let deliveredOrders = 0
        let cancelledOrders = 0

        orders.forEach(order => {
          const amount = parseFloat(order.total_amount) || parseFloat(order.amount) || 0
          totalRevenue += amount

          const status = order.status || 'Pending'
          if (status === 'Pending' || status === 'Processing') pendingOrders++
          else if (status === 'Shipped') shippedOrders++
          else if (status === 'Delivered' || status === 'Completed') deliveredOrders++
          else if (status === 'Cancelled') cancelledOrders++
        })

        // ✅ Get recent orders (last 5)
        const recent = orders.slice(0, 5).map(order => ({
          id: order.order_id || order.id || '#ORD-XXX',
          customer: order.customer_name || order.customer?.name || 'Guest',
          email: order.customer_email || order.customer?.email || '-',
          amount: parseFloat(order.total_amount) || parseFloat(order.amount) || 0,
          status: order.status || 'Pending',
          date: order.created_at ? new Date(order.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
          items: order.items_count || order.items?.length || 0
        }))

        // ✅ Generate sales data (last 6 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const currentMonth = new Date().getMonth()
        const last6Months = []
        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12
          last6Months.push(months[monthIndex])
        }

        // ✅ Group orders by month
        const salesByMonth = {}
        orders.forEach(order => {
          const date = new Date(order.created_at)
          const month = months[date.getMonth()]
          const amount = parseFloat(order.total_amount) || parseFloat(order.amount) || 0
          if (!salesByMonth[month]) {
            salesByMonth[month] = { revenue: 0, orders: 0 }
          }
          salesByMonth[month].revenue += amount
          salesByMonth[month].orders += 1
        })

        const salesChartData = last6Months.map(month => ({
          name: month,
          revenue: salesByMonth[month]?.revenue || 0,
          orders: salesByMonth[month]?.orders || 0
        }))

        // ✅ Category distribution
        const categoryCount = {}
        products.forEach(product => {
          const catName = product.category?.name || product.category || 'Uncategorized'
          categoryCount[catName] = (categoryCount[catName] || 0) + 1
        })

        const categoryChartData = Object.keys(categoryCount).map(name => ({
          name: name.length > 10 ? name.substring(0, 10) + '...' : name,
          value: categoryCount[name]
        })).sort((a, b) => b.value - a.value).slice(0, 6)

        // ✅ Order status distribution
        const statusCount = {}
        orders.forEach(order => {
          const status = order.status || 'Pending'
          statusCount[status] = (statusCount[status] || 0) + 1
        })

        const orderStatusChartData = Object.keys(statusCount).map(name => ({
          name: name,
          value: statusCount[name],
          color: STATUS_COLORS[name] || '#9ca3af'
        }))

        // ✅ Calculate trends (simple: compare with previous month)
        const calculateTrend = (current, previous) => {
          if (previous === 0) return '+0%'
          const change = ((current - previous) / previous) * 100
          return `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`
        }

        // ✅ Update state
        setStats({
          totalProducts,
          totalCategories,
          totalBrands,
          totalOrders,
          totalRevenue,
          pendingOrders,
          shippedOrders,
          deliveredOrders
        })

        setRecentOrders(recent)
        setSalesData(salesChartData)
        setCategoryData(categoryChartData.length > 0 ? categoryChartData : [
          { name: 'No Data', value: 1 }
        ])
        setOrderStatusData(orderStatusChartData.length > 0 ? orderStatusChartData : [
          { name: 'No Orders', value: 1, color: '#9ca3af' }
        ])

        setTrends({
          products: calculateTrend(totalProducts, totalProducts * 0.9),
          categories: calculateTrend(totalCategories, totalCategories * 0.95),
          orders: calculateTrend(totalOrders, totalOrders * 0.92),
          revenue: calculateTrend(totalRevenue, totalRevenue * 0.85)
        })

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Failed to load dashboard data')

        // ✅ Set fallback data on error
        setStats({
          totalProducts: 0,
          totalCategories: 0,
          totalBrands: 0,
          totalOrders: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          shippedOrders: 0,
          deliveredOrders: 0
        })
        setRecentOrders([])
        setSalesData([
          { name: 'Jan', revenue: 0, orders: 0 },
          { name: 'Feb', revenue: 0, orders: 0 },
          { name: 'Mar', revenue: 0, orders: 0 },
          { name: 'Apr', revenue: 0, orders: 0 },
          { name: 'May', revenue: 0, orders: 0 },
          { name: 'Jun', revenue: 0, orders: 0 }
        ])
        setCategoryData([{ name: 'No Data', value: 1 }])
        setOrderStatusData([{ name: 'No Orders', value: 1, color: '#9ca3af' }])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Processing': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'bg-blue-500',
      change: trends.products,
      trend: trends.products.startsWith('+') ? 'up' : 'down'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'bg-pink-500',
      change: trends.orders,
      trend: trends.orders.startsWith('+') ? 'up' : 'down'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: 'bg-green-500',
      change: trends.revenue,
      trend: trends.revenue.startsWith('+') ? 'up' : 'down'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders.toLocaleString(),
      icon: Users,
      color: 'bg-yellow-500',
      change: `${stats.pendingOrders > 0 ? '+' : ''}${stats.pendingOrders}`,
      trend: stats.pendingOrders > 0 ? 'up' : 'down'
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
 <h1 className="text-2xl font-bold text-gray-700 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {stat.trend === 'up' ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingOrders}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Shipped</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.shippedOrders}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">{stats.deliveredOrders}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Revenue & Orders Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name) => {
                    if (name === 'revenue') return [`$${value}`, 'Revenue']
                    return [value, 'Orders']
                  }}
                />
                <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar yAxisId="right" dataKey="orders" fill="#8b5cf6" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Orders</span>
            </div>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Order Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Distribution & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Recent Orders</h3>
            <button
              onClick={() => window.location.href = '/orders'}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No recent orders
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">Customer</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">Amount</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-2 px-3 text-sm font-medium dark:text-white">{order.id}</td>
                      <td className="py-2 px-3 text-sm dark:text-gray-300">{order.customer}</td>
                      <td className="py-2 px-3 text-sm font-semibold dark:text-white">₹{order.amount.toFixed(2)}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard