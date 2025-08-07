import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const TableRow = ({ item, columns, onDelete }) => {
  const navigate = useNavigate()

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-gray-50 transition-colors duration-150"
    >
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {column.render ? column.render(item[column.key], item) : item[column.key]}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/contacts/${item.Id}`)}
            className="text-primary hover:text-primary"
          >
            <ApperIcon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(item.Id)}
            className="text-error hover:text-error"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

export default TableRow