import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"

const Activities = () => {
  const activityTypes = [
    { name: "Calls", icon: "Phone", count: 23, color: "text-blue-600" },
    { name: "Emails", icon: "Mail", count: 45, color: "text-green-600" },
    { name: "Meetings", icon: "Calendar", count: 12, color: "text-purple-600" },
    { name: "Tasks", icon: "CheckSquare", count: 18, color: "text-orange-600" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
          <p className="mt-1 text-gray-600">
            Track all your customer interactions and communications
          </p>
        </div>
        <Button variant="primary" className="inline-flex items-center space-x-2">
          <ApperIcon name="Plus" size={16} />
          <span>Log Activity</span>
        </Button>
      </div>

      {/* Activity Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {activityTypes.map((type, index) => (
          <motion.div
            key={type.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <ApperIcon name={type.icon} size={32} className={`mx-auto mb-3 ${type.color}`} />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{type.name}</h3>
              <p className="text-2xl font-bold text-gray-600">{type.count}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Timeline Placeholder */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Activity" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Activity Timeline Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            A comprehensive timeline of all customer interactions will be displayed here. 
            Track calls, emails, meetings, and tasks in chronological order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary">
              Log First Activity
            </Button>
            <Button variant="secondary">
              Import Activities
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Activities Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { type: "Call", contact: "John Smith (Acme Corp)", time: "2 hours ago", icon: "Phone", color: "text-blue-600" },
              { type: "Email", contact: "Sarah Johnson (Tech Solutions)", time: "5 hours ago", icon: "Mail", color: "text-green-600" },
              { type: "Meeting", contact: "Mike Brown (Innovate Inc)", time: "Yesterday", icon: "Calendar", color: "text-purple-600" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                  <ApperIcon name={activity.icon} size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.contact}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <span className="font-medium text-gray-900">Daily Average</span>
              <span className="text-xl font-bold text-primary">12 activities</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <span className="font-medium text-gray-900">Response Rate</span>
              <span className="text-xl font-bold text-success">85%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <span className="font-medium text-gray-900">Follow-up Rate</span>
              <span className="text-xl font-bold text-warning">72%</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Activities