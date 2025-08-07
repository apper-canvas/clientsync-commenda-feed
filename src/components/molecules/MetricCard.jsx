import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"

const MetricCard = ({ label, value, trend, icon, color = "primary" }) => {
  const colorClasses = {
    primary: "from-primary to-blue-600 text-white",
    success: "from-success to-green-600 text-white",
    warning: "from-warning to-orange-600 text-white",
    info: "from-info to-indigo-600 text-white"
  }

  const iconBgClasses = {
    primary: "bg-blue-100 text-primary",
    success: "bg-green-100 text-success",
    warning: "bg-orange-100 text-warning",
    info: "bg-indigo-100 text-info"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-6 bg-gradient-to-br ${colorClasses[color]} border-0 shadow-lg hover:shadow-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">{label}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold">{value.toLocaleString()}</h3>
              {trend !== undefined && (
                <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                  <ApperIcon 
                    name={trend >= 0 ? "TrendingUp" : "TrendingDown"} 
                    size={16} 
                    className="mr-1" 
                  />
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-full ${iconBgClasses[color]} bg-opacity-20`}>
            <ApperIcon name={icon} size={24} className="opacity-90" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MetricCard