import { createContext, useState, useEffect, useContext, useRef } from 'react'
import { loginUser, getProfile, logoutUser } from '../services/authApi'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const hasChecked = useRef(false) // ✅ Prevent multiple checks

  useEffect(() => {
    // ✅ Sirf ek baar check karo
    if (hasChecked.current) return
    hasChecked.current = true

    const checkAuth = async () => {
      try {
        // ✅ Pehle local storage check karo
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsAuthenticated(true)
          setLoading(false)
          return
        }

        // ✅ Agar cookie hai toh API call karo
        try {
          const response = await getProfile()
          if (response.data.success) {
            const adminData = response.data.admin
            setUser(adminData)
            setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(adminData))
          }
        } catch (apiError) {
          // ✅ Silent fail - user logged out
          console.log('Auth check: Not authenticated')
        }
      } catch (error) {
        console.error('Auth Error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, []) // ✅ Empty dependency array - sirf ek baar run hoga

  const login = async (mobile, password) => {
    try {
      const response = await loginUser(mobile, password)
      const { admin } = response.data
      
      localStorage.setItem('user', JSON.stringify(admin))
      setUser(admin)
      setIsAuthenticated(true)
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.log('Logout error:', error)
    } finally {
      localStorage.removeItem('user')
      setUser(null)
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}