import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"

const Leads = () => {
  const leadSources = [
    { name: "Website", count: 45, color: "text-blue-600", percentage: 35 },
    { name: "Referrals", count: 23, color: "text-green-600", percentage: 28 },
    { name: "Social Media", count: 18, color: "text-purple-600", percentage: 22 },
    { name: "Cold Outreach", count: 12, color: "text-orange-600", percentage: 15 }
  ]

  const leadStages = [
    { name: "New", count: 34, color: "bg-blue-100 text-blue-800" },
    { name: "Contacted", count: 28, color: "bg-yellow-100 text-yellow-800" },
    { name: "Qualified", count: 19, color: "bg-green-100 text-green-800" },
    { name: "Converted", count: 17, color: "bg-purple-100 text-purple-800" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="mt-1 text-gray-600">
            Qualify and convert prospects into valuable customers
          </p>
        </div>
        <Button variant="primary" className="inline-flex items-center space-x-2">
          <ApperIcon name="Plus" size={16} />
          <span>Add Lead</span>
        </Button>
      </div>

      {/* Lead Sources */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leadSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-3xl font-bold mb-1 ${source.color}`}>{source.count}</div>
              <h4 className="font-medium text-gray-900 mb-2">{source.name}</h4>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    source.color === 'text-blue-600' ? 'bg-blue-600' :
                    source.color === 'text-green-600' ? 'bg-green-600' :
                    source.color === 'text-purple-600' ? 'bg-purple-600' : 'bg-orange-600'
                  }`}
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{source.percentage}%</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Lead Stages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Qualification Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {leadStages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg text-center"
            >
              <h4 className="font-medium text-gray-900 mb-2">{stage.name}</h4>
              <div className="text-2xl font-bold text-gray-900 mb-2">{stage.count}</div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${stage.color}`}>
                Leads
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Lead Management Interface */}
      <Card className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Target" size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Lead Qualification System Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            Advanced lead scoring, qualification workflows, and automated nurturing 
            campaigns will be available here to maximize conversion rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary">
              Import Leads
            </Button>
            <Button variant="secondary">
              Set up Scoring
            </Button>
          </div>
        </div>
      </Card>

      {/* Lead Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Leads</h3>
          <div className="space-y-3">
            {[
              { company: "TechStart Inc", score: 95, source: "Website", stage: "Qualified" },
              { company: "Growth Corp", score: 88, source: "Referral", stage: "Contacted" },
              { company: "Innovation Labs", score: 82, source: "Social Media", stage: "Qualified" }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{lead.company}</p>
                  <p className="text-sm text-gray-600">{lead.source} • {lead.stage}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{lead.score}</div>
                  <div className="text-xs text-gray-500">Lead Score</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <ApperIcon name="TrendingUp" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Conversion Rate</span>
              </div>
              <span className="text-xl font-bold text-success">24%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-info rounded-full flex items-center justify-center">
                  <ApperIcon name="Clock" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Avg. Qualification Time</span>
              </div>
              <span className="text-xl font-bold text-info">5.2 days</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                  <ApperIcon name="Star" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Avg. Lead Score</span>
              </div>
              <span className="text-xl font-bold text-warning">73</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Leads