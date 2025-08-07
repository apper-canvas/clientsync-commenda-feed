import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import MetricCard from "@/components/molecules/MetricCard"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { getMetrics } from "@/services/api/dashboardService"
import { getAllContacts } from "@/services/api/contactService"

const Dashboard = () => {
  const [metrics, setMetrics] = useState([])
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadDashboardData = async () => {
    setLoading(true)
    setError("")
    
    try {
      const [metricsData, contactsData] = await Promise.all([
        getMetrics(),
        getAllContacts()
      ])
      
      setMetrics(metricsData)
      // Show 5 most recent contacts
      const sortedContacts = contactsData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      setRecentContacts(sortedContacts)
    } catch (err) {
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDashboardData} />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your sales.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            {...metric}
            color={index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'warning' : 'info'}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Contacts</h3>
            <ApperIcon name="Users" size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <motion.div
                key={contact.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {contact.company.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.company}</p>
                    <p className="text-sm text-gray-600">{contact.contactPerson}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {format(new Date(contact.createdAt), "MMM dd")}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {recentContacts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="Users" size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent contacts</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
            <ApperIcon name="TrendingUp" size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <ApperIcon name="CheckCircle" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Conversion Rate</span>
              </div>
              <span className="text-xl font-bold text-success">24.5%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-info rounded-full flex items-center justify-center">
                  <ApperIcon name="Clock" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Avg. Response Time</span>
              </div>
              <span className="text-xl font-bold text-info">2.4h</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <ApperIcon name="Target" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Monthly Goal</span>
              </div>
              <span className="text-xl font-bold text-warning">78%</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Dashboard