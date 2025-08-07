import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
        }`
      }
    >
      <ApperIcon 
        name={icon} 
        size={20} 
        className="group-hover:scale-110 transition-transform duration-200" 
      />
      <span className="font-medium">{label}</span>
    </NavLink>
  )
}

export default NavItem