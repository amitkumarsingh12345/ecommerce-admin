import { useState, useEffect } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Filter
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getUsers, updateUserStatus, deleteUser } from '../../services/userApi'

const Customers = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)

  // ✅ Fetch customers
  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const response = await getUsers({
        page: currentPage,
        limit: 10,
        search: search,
        status: filterStatus
      })
      console.log('📥 Customers response:', response.data)

      const userData = response.data.data || response.data || []
      setCustomers(userData)
      setTotal(response.data.total || userData.length || 0)
    } catch (error) {
      console.error('Error fetching customers:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setTimeout(() => {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }, 2000)
      } else {
        toast.error('Failed to load customers')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [currentPage, search, filterStatus])

  // ✅ Update user status
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    try {
      await updateUserStatus(id, newStatus)
      toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`)
      fetchCustomers()
    } catch (error) {
      console.error('Status update error:', error)
      toast.error('Failed to update user status')
    }
  }

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await deleteUser(id)
      toast.success('User deleted successfully')
      fetchCustomers()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error.response?.data?.message || 'Failed to delete user')
    }
  }

  // ✅ View user details
  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const getStatusBadge = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getStatusIcon = (status) => {
    return status === 'active'
      ? <CheckCircle size={14} className="text-green-500" />
      : <XCircle size={14} className="text-gray-400" />
  }

  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // ✅ User Modal Component
  const UserModal = ({ user, onClose }) => {
    if (!user) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-xl font-semibold dark:text-white">User Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XCircle size={20} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-400">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="text-lg font-semibold dark:text-white">{user.name || 'N/A'}</h4>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                  {getStatusIcon(user.status)}
                  {user.status || 'Inactive'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <Mail size={18} className="text-gray-400" />
                <span className="dark:text-white">{user.email || '-'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <Phone size={18} className="text-gray-400" />
                <span className="dark:text-white">{user.mobile || '-'}</span>
              </div>
              {user.gender && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <User size={18} className="text-gray-400" />
                  <span className="dark:text-white capitalize">{user.gender}</span>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <Calendar size={18} className="text-gray-400" />
                <span className="dark:text-white">Joined: {formatDate(user.created_at)}</span>
              </div>
              {user.last_login && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="dark:text-white">Last Login: {formatDate(user.last_login)}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <button
                onClick={() => handleStatusToggle(user.id, user.status)}
                className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${user.status === 'active'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-500 hover:bg-green-600'
                  }`}
              >
                {user.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => {
                  handleDelete(user.id)
                  onClose()
                }}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your customer base</p>
        </div>
        <button
          onClick={fetchCustomers}
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
              placeholder="Search customers by name, email or mobile..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Customers</span>
            <span className="text-xl font-bold dark:text-white">{total}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active</span>
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              {customers.filter(c => c.status === 'active').length}
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Inactive</span>
            <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
              {customers.filter(c => c.status !== 'active').length}
            </span>
          </div>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Mobile</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Gender</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-500 dark:text-gray-400">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-3 px-4 text-sm dark:text-white">#{customer.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-sm font-medium text-primary-600 dark:text-primary-400">
                            {customer.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <span className="font-medium dark:text-white">
                            {customer.name || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {customer.email || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm dark:text-white">
                        {customer.mobile || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm dark:text-white capitalize">
                        {customer.gender || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(customer.status)}`}>
                          {getStatusIcon(customer.status)}
                          {customer.status || 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(customer.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewUser(customer)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusToggle(customer.id, customer.status)}
                            className={`p-1.5 rounded-lg transition-colors ${customer.status === 'active'
                                ? 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                                : 'hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400'
                              }`}
                            title={customer.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {customer.status === 'active' ? <XCircle size={18} /> : <CheckCircle size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
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
            Showing {customers.length} of {total} customers
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

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}

export default Customers