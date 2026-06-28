import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getAllOrders, cancelOrder } from '../../services/orderApi'

const Orders = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [filterStatus, setFilterStatus] = useState('')

  // ✅ Fetch orders
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await getAllOrders({
        page: currentPage,
        limit: 10,
        search: search,
        status: filterStatus
      })
      console.log('📥 Orders response:', response.data)

      const orderData = response.data.data || response.data || []
      setOrders(orderData)
      setTotal(response.data.total || orderData.length || 0)
    } catch (error) {
      console.error('Error fetching orders:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }, 2000)
      } else {
        toast.error('Failed to load orders')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, search, filterStatus])

  // ✅ Cancel order
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return

    try {
      await cancelOrder(id)
      toast.success('Order cancelled successfully')
      fetchOrders()
    } catch (error) {
      console.error('Cancel error:', error)
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock size={14} />,
      'Processing': <RefreshCw size={14} />,
      'Shipped': <Truck size={14} />,
      'Delivered': <CheckCircle size={14} />,
      'Completed': <CheckCircle size={14} />,
      'Cancelled': <XCircle size={14} />,
    }
    return icons[status] || <Package size={14} />
  }

  const canCancel = (status) => {
    return ['Pending', 'Processing'].includes(status)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders by ID, customer, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 dark:text-gray-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium dark:text-white">
                        #{order.order_id || order.id}
                      </td>
                      <td className="py-3 px-4 text-sm dark:text-white">
                        {order.customer_name || order.customer?.name || 'Guest'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {order.customer_email || order.customer?.email || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold dark:text-white">
                        ₹{parseFloat(order.total_amount || order.amount || 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm dark:text-white">
                        {order.items_count || order.items?.length || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/orders/${order.id}`}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                            title="View Order"
                          >
                            <Eye size={18} />
                          </Link>
                          {canCancel(order.status) && (
                            <button
                              onClick={() => handleCancel(order.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                              title="Cancel Order"
                            >
                              <XCircle size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {orders.length} of {total} orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-3 py-1 text-sm dark:text-white">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders