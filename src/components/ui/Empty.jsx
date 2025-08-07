import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const Empty = ({ 
  title = "No data found", 
  message = "Get started by adding your first item",
  actionLabel = "Add Item",
  actionPath = null,
  onAction = null,
  icon = "Database"
}) => {
  const navigate = useNavigate()

  const handleAction = () => {
    if (onAction) {
      onAction()
    } else if (actionPath) {
      navigate(actionPath)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <Card className="max-w-md w-full text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} size={32} className="text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {(actionPath || onAction) && (
          <Button
            onClick={handleAction}
            variant="primary"
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span>{actionLabel}</span>
          </Button>
        )}
      </Card>
    </motion.div>
  )
}

export default Empty