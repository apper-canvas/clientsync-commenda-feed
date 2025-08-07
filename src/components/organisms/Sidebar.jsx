import ApperIcon from "@/components/ApperIcon"
import NavItem from "@/components/molecules/NavItem"

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", icon: "BarChart3", label: "Dashboard" },
    { to: "/contacts", icon: "Users", label: "Contacts" },
    { to: "/deals", icon: "Briefcase", label: "Deals" },
    { to: "/activities", icon: "Activity", label: "Activities" },
    { to: "/tasks", icon: "CheckSquare", label: "Tasks" },
    { to: "/leads", icon: "Target", label: "Leads" },
    { to: "/reports", icon: "PieChart", label: "Reports" }
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 shadow-sm h-full">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-blue-600 rounded-lg">
              <ApperIcon name="Users" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ClientSync Pro</h1>
              <p className="text-sm text-gray-500">Professional CRM</p>
            </div>
          </div>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 hidden" id="mobile-sidebar-overlay">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform -translate-x-full transition-transform duration-300" id="mobile-sidebar">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary to-blue-600 rounded-lg">
                  <ApperIcon name="Users" className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ClientSync Pro</h1>
                  <p className="text-sm text-gray-500">Professional CRM</p>
                </div>
              </div>
              <button id="close-sidebar" className="p-2 hover:bg-gray-100 rounded-lg">
                <ApperIcon name="X" size={20} />
              </button>
            </div>
          </div>
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Sidebar