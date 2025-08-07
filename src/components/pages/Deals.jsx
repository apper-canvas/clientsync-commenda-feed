import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"

const Deals = () => {
  const dealStages = [
    { name: "Prospecting", count: 12, color: "bg-gray-100 text-gray-800" },
    { name: "Qualification", count: 8, color: "bg-blue-100 text-blue-800" },
    { name: "Proposal", count: 5, color: "bg-yellow-100 text-yellow-800" },
    { name: "Negotiation", count: 3, color: "bg-orange-100 text-orange-800" },
    { name: "Closed Won", count: 2, color: "bg-green-100 text-green-800" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
          <p className="mt-1 text-gray-600">
            Track your sales opportunities through the pipeline
          </p>
        </div>
        <Button variant="primary" className="inline-flex items-center space-x-2">
          <ApperIcon name="Plus" size={16} />
          <span>Add Deal</span>
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dealStages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-sm font-medium text-gray-600 mb-2">{stage.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{stage.count}</div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${stage.color}`}>
                Active
              </span>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Kanban Board Placeholder */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Briefcase" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Deals Pipeline Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            Visual pipeline management with drag-and-drop functionality will be available here. 
            Track deals through different stages and monitor your sales performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary">
              Create First Deal
            </Button>
            <Button variant="secondary">
              Import Deals
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-success to-green-600 rounded-full flex items-center justify-center">
              <ApperIcon name="DollarSign" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">$324,500</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-warning to-orange-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Clock" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Deal Cycle</p>
              <p className="text-2xl font-bold text-gray-900">42 days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-info to-indigo-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Target" size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Deals