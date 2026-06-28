import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  RefreshCw,
  Printer,
  CreditCard,
  IndianRupee
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getOrder, cancelOrder } from '../../services/orderApi'
import { imageBasePath } from '../../utils/path'

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])

  // ✅ Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await getOrder(id)
        console.log('📥 Order details:', response.data)

        const orderData = response.data.data || response.data
        setOrder(orderData)
        setItems(orderData.items || [])
      } catch (error) {
        console.error('Error fetching order:', error)
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.')
          setTimeout(() => {
            localStorage.removeItem('user')
            navigate('/login', { replace: true })
          }, 2000)
        } else {
          toast.error('Failed to load order details')
          navigate('/orders')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id, navigate])

  // ✅ Cancel order
  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return

    try {
      await cancelOrder(id)
      toast.success('Order cancelled successfully')
      // Refresh order
      const response = await getOrder(id)
      setOrder(response.data.data || response.data)
      setItems(response.data.data?.items || [])
    } catch (error) {
      console.error('Cancel error:', error)
      toast.error(error.response?.data?.message || 'Failed to cancel order')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'processing': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'shipped': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
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
    const statusLower = status?.toLowerCase() || 'pending'
    const icons = {
      'pending': <Clock size={18} className="text-yellow-600" />,
      'processing': <RefreshCw size={18} className="text-blue-600" />,
      'shipped': <Truck size={18} className="text-purple-600" />,
      'delivered': <CheckCircle size={18} className="text-green-600" />,
      'completed': <CheckCircle size={18} className="text-green-600" />,
      'cancelled': <XCircle size={18} className="text-red-600" />,
    }
    return icons[statusLower] || <Package size={18} />
  }

  const getPaymentStatusColor = (status) => {
    const colors = {
      'paid': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'refunded': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const canCancel = (status) => {
    const statusLower = status?.toLowerCase() || ''
    return ['pending', 'processing'].includes(statusLower)
  }

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    }
    return symbols[currency] || '₹'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Order not found</p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Back to Orders
        </button>
      </div>
    )
  }

  const currencySymbol = getCurrencySymbol(order.currency)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          <h1 className="text-2xl text-gray-600 font-bold dark:text-white">
            Order #{order.order_number || order.id}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 dark:text-white"
          >
            <Printer size={18} />
            Print
          </button>
          {canCancel(order.status) && (
            <button
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <XCircle size={18} />
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-3">
          {getStatusIcon(order.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
            Payment:
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
              {order.payment_status?.charAt(0).toUpperCase() + order.payment_status?.slice(1) || 'Pending'}
            </span>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
            Delivery: {order.delivery_speed || 'Standard'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
              <Package size={20} />
              Order Items ({items.length})
            </h3>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {items.length === 0 ? (
                <p className="py-4 text-gray-500 dark:text-gray-400">No items in this order</p>
              ) : (
                items.map((item, index) => {
                  const imageUrl = item.image || item.variant_image || item.product_image

                  return (
                    <div key={index} className="py-4 flex gap-4">
                      <img
                        src={imageUrl ? `${imageBasePath}/${imageUrl}` : 'https://via.placeholder.com/80'}
                        alt={item.product_name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = 'https://via.placeholder.com/80?text=No+Image'
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-medium dark:text-white">{item.product_name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: {item.variant_sku || '-'}
                        </p>
                        {item.attributes && typeof item.attributes === 'object' && Object.keys(item.attributes).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.keys(item.attributes).map((key) => (
                              <span key={key} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                {key}: {item.attributes[key]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold dark:text-white">
                          {currencySymbol}{parseFloat(item.unit_price || 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity || 1}
                        </p>
                        <p className="text-sm font-semibold dark:text-white">
                          {currencySymbol}{parseFloat(item.total_price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Order Summary - Right Column */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
              <IndianRupee size={20} />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="dark:text-white">
                  {currencySymbol}{parseFloat(order.subtotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tax</span>
                <span className="dark:text-white">
                  {currencySymbol}{parseFloat(order.tax_amount || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Delivery Charge</span>
                <span className="dark:text-white">
                  {currencySymbol}{parseFloat(order.delivery_charge || 0).toFixed(2)}
                </span>
              </div>
              {parseFloat(order.discount_amount || 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Discount</span>
                  <span className="text-green-600">
                    -{currencySymbol}{parseFloat(order.discount_amount || 0).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="flex justify-between font-bold">
                  <span className="dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400 text-lg">
                    {currencySymbol}{parseFloat(order.total_amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Method</span>
                <span className="dark:text-white uppercase">{order.payment_method || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                  {order.payment_status?.charAt(0).toUpperCase() + order.payment_status?.slice(1) || 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Currency</span>
                <span className="dark:text-white">{order.currency || 'USD'}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
              <Truck size={20} />
              Delivery Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Speed</span>
                <span className="dark:text-white capitalize">{order.delivery_speed || 'Standard'}</span>
              </div>
              {order.notes && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Notes</span>
                  <span className="dark:text-white">{order.notes}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Order Date</span>
                <span className="dark:text-white">{formatDate(order.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails