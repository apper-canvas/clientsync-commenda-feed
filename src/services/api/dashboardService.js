import metricsData from "@/services/mockData/metrics.json"

export const getMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...metricsData]
}