import metricsData from "@/services/mockData/metrics.json"

// Dashboard service continues to use mock data as no metrics table was provided in the database schema
export const getMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...metricsData]
}