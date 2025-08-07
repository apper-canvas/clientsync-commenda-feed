import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"

const Reports = () => {
  const reportTypes = [
    { name: "Sales Performance", icon: "TrendingUp", description: "Track revenue, deals closed, and team performance" },
    { name: "Contact Analytics", icon: "Users", description: "Analyze contact engagement and relationship health" },
    { name: "Activity Reports", icon: "Activity", description: "Monitor communication frequency and response rates" },
    { name: "Pipeline Analysis", icon: "Briefcase", description: "Examine deal flow and conversion metrics" }
  ]

  const quickStats = [
    { label: "Total Revenue", value: "$1.2M", change: "+12%", positive: true },
    { label: "Deals Closed", value: "84", change: "+8%", positive: true },
    { label: "Conversion Rate", value: "24%", change: "-2%", positive: false },
    { label: "Avg. Deal Size", value: "$14,300", change: "+15%", positive: true }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-gray-600">
            Gain insights into your sales performance and customer relationships
          </p>
        </div>
        <Button variant="primary" className="inline-flex items-center space-x-2">
          <ApperIcon name="Download" size={16} />
          <span>Export Report</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className={`flex items-center text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ApperIcon 
                    name={stat.positive ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                    className="mr-1" 
                  />
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Report Types */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report, index) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name={report.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{report.name}</h4>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
              <ApperIcon name="ChevronRight" size={20} className="text-gray-400" />
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Analytics Dashboard */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="PieChart" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Advanced Analytics Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            Comprehensive dashboards with interactive charts, custom filters, 
            and automated report generation will be available here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary">
              Create Custom Report
            </Button>
            <Button variant="secondary">
              Schedule Reports
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {[
              { name: "Q4 Sales Summary", type: "Performance", date: "Dec 15, 2023", status: "Ready" },
              { name: "Contact Engagement", type: "Analytics", date: "Dec 12, 2023", status: "Processing" },
              { name: "Pipeline Review", type: "Analysis", date: "Dec 10, 2023", status: "Ready" }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'Ready' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                  {report.status === 'Ready' && (
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Download" size={14} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="TrendingUp" size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Revenue Growth</p>
                  <p className="text-sm text-gray-600">Up 15% compared to last quarter</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Users" size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Contact Quality</p>
                  <p className="text-sm text-gray-600">Higher engagement rates this month</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Clock" size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Response Time</p>
                  <p className="text-sm text-gray-600">Improved by 25% this quarter</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Reports