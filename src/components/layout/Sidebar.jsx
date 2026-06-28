
import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    User,
    Tag,
    ChevronLeft,
    Award,
    ChevronRight,
} from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/categories', icon: Tag, label: 'Categories' },
        { path: '/brands', icon: Award, label: 'Brands' },
        { path: '/products', icon: Package, label: 'Products' },
        { path: '/orders', icon: ShoppingCart, label: 'Orders' },
        { path: '/customers', icon: Users, label: 'Customers' },
        { path: '/profile', icon: User, label: 'Profile' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    {isOpen && (
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            NVW Ecommerce
                        </span>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'active' : ''} ${isOpen ? 'justify-start' : 'justify-center'
                                }`
                            }
                            title={!isOpen ? item.label : ''}
                        >
                            <item.icon size={20} />
                            {isOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t dark:border-gray-700">
                    <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                            A
                        </div>
                        {isOpen && (
                            <div className="ml-3">
                                <p className="text-sm font-medium dark:text-white">Admin</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar