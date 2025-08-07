import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"

const Tasks = () => {
  const taskCategories = [
    { name: "Due Today", count: 5, color: "bg-red-100 text-red-800", urgent: true },
    { name: "This Week", count: 12, color: "bg-yellow-100 text-yellow-800", urgent: false },
    { name: "Overdue", count: 3, color: "bg-red-100 text-red-800", urgent: true },
    { name: "Completed", count: 28, color: "bg-green-100 text-green-800", urgent: false }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-1 text-gray-600">
            Manage your to-do list and stay on top of important activities
          </p>
        </div>
        <Button variant="primary" className="inline-flex items-center space-x-2">
          <ApperIcon name="Plus" size={16} />
          <span>Create Task</span>
        </Button>
      </div>

      {/* Task Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {taskCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">{category.count}</div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                {category.urgent ? 'Urgent' : 'Normal'}
              </span>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Task Management Interface */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="CheckSquare" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Task Management Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            A comprehensive task management system with priorities, due dates, 
            and assignment capabilities will be available here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary">
              Create First Task
            </Button>
            <Button variant="secondary">
              Import Tasks
            </Button>
          </div>
        </div>
      </Card>

      {/* Task Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Tasks</h3>
          <div className="space-y-3">
            {[
              { title: "Follow up with Acme Corp", priority: "High", due: "Today", status: "pending" },
              { title: "Prepare proposal for TechCorp", priority: "Medium", due: "Tomorrow", status: "in-progress" },
              { title: "Call Johnson Industries", priority: "High", due: "Overdue", status: "overdue" }
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'overdue' ? 'bg-red-500' : 
                    task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{task.priority} Priority</span>
                      <span>•</span>
                      <span className={task.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                        {task.due}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreVertical" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Analytics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <ApperIcon name="CheckCircle" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Completion Rate</span>
              </div>
              <span className="text-xl font-bold text-success">87%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-info rounded-full flex items-center justify-center">
                  <ApperIcon name="Clock" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Avg. Completion Time</span>
              </div>
              <span className="text-xl font-bold text-info">2.3 days</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <ApperIcon name="AlertTriangle" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Overdue Tasks</span>
              </div>
              <span className="text-xl font-bold text-warning">3</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Tasks