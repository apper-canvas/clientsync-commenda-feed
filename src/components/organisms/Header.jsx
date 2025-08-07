import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import SearchBar from "@/components/molecules/SearchBar"

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const toggleMobileSidebar = () => {
    const overlay = document.getElementById("mobile-sidebar-overlay")
    const sidebar = document.getElementById("mobile-sidebar")
    
    if (overlay && sidebar) {
      overlay.classList.remove("hidden")
      setTimeout(() => {
        sidebar.classList.remove("-translate-x-full")
      }, 10)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="Menu" size={20} />
        </button>
        <SearchBar
          placeholder="Search contacts, deals, or activities..."
          className="hidden md:block w-80"
          onSearch={(term) => console.log("Search:", term)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar
          placeholder="Search..."
          className="md:hidden w-48"
          onSearch={(term) => console.log("Search:", term)}
        />
        
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ApperIcon name="Bell" size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-error to-red-600 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
            <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Sales Manager</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile Settings
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Notifications
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Help & Support
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header