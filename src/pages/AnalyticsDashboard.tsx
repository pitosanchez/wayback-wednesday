import React, { useState, useEffect, useCallback } from "react";
import MetricCard from "../components/Analytics/MetricCard";
import Chart from "../components/Analytics/Chart";
import analyticsService from "../services/analyticsService";
// Note: This page is protected by AdminRoute, so no additional auth context needed
import type {
  SalesMetrics,
  ProductAnalytics,
  TimePeriod,
} from "../types/analytics";
import type { AnalyticsTab } from "../types/navigation";

type TimePeriodOption = "7d" | "30d" | "90d";

const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");
  const [timePeriod, setTimePeriod] = useState<TimePeriodOption>("30d");
  const [salesMetrics, setSalesMetrics] = useState<SalesMetrics | null>(null);
  const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const period = getTimePeriod(timePeriod);

      const [sales, products] = await Promise.all([
        analyticsService.getSalesMetrics(period),
        analyticsService.getProductAnalytics(period),
      ]);

      setSalesMetrics(sales);
      setProductAnalytics(products);
    } catch (error) {
      console.error("Failed to load analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [timePeriod]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  const getTimePeriod = (period: string): TimePeriod => {
    const end = new Date();
    const start = new Date();

    switch (period) {
      case "7d":
        start.setDate(end.getDate() - 7);
        return { start, end, granularity: "day" };
      case "30d":
        start.setDate(end.getDate() - 30);
        return { start, end, granularity: "day" };
      case "90d":
        start.setDate(end.getDate() - 90);
        return { start, end, granularity: "week" };
      default:
        start.setDate(end.getDate() - 30);
        return { start, end, granularity: "day" };
    }
  };

  const tabs: Array<{ id: AnalyticsTab; label: string; icon: string }> = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "sales", label: "Sales", icon: "💰" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "predictions", label: "Predictions", icon: "🔮" },
  ];

  const timePeriods = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
  ];

  // This page is protected by AdminRoute, so we don't need to check for user authentication

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive business intelligence and performance metrics
              </p>
            </div>

            {/* Time Period Selector */}
            <div className="flex items-center space-x-4">
              <select
                value={timePeriod}
                onChange={(e) =>
                  setTimePeriod(e.target.value as TimePeriodOption)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                {timePeriods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>

              <button
                onClick={loadAnalyticsData}
                className="bg-denim-blue text-white px-4 py-2 rounded-lg hover:bg-denim-blue/90 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-denim-blue text-denim-blue"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-denim-blue"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && salesMetrics && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    title="Total Revenue"
                    value={salesMetrics.totalRevenue}
                    format="currency"
                    change={salesMetrics.previousPeriodComparison.revenueChange}
                    color="green"
                    icon={
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    }
                  />

                  <MetricCard
                    title="Total Orders"
                    value={salesMetrics.totalOrders}
                    change={salesMetrics.previousPeriodComparison.ordersChange}
                    color="blue"
                    icon={
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                      </svg>
                    }
                  />

                  <MetricCard
                    title="Avg Order Value"
                    value={salesMetrics.averageOrderValue}
                    format="currency"
                    change={salesMetrics.previousPeriodComparison.aovChange}
                    color="yellow"
                    icon={
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                      </svg>
                    }
                  />

                  <MetricCard
                    title="Conversion Rate"
                    value={salesMetrics.conversionRate}
                    format="percentage"
                    change={
                      salesMetrics.previousPeriodComparison.conversionChange
                    }
                    color="red"
                    icon={
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                      </svg>
                    }
                  />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Chart
                    title="Revenue Trend"
                    type="line"
                    data={[
                      { label: "Week 1", value: 12000 },
                      { label: "Week 2", value: 15000 },
                      { label: "Week 3", value: 18000 },
                      { label: "Week 4", value: 16000 },
                    ]}
                    color="#10B981"
                  />

                  <Chart
                    title="Top Product Categories"
                    type="pie"
                    data={[
                      { label: "Apparel", value: 45, color: "#3D5AFE" },
                      { label: "Accessories", value: 25, color: "#E64027" },
                      { label: "Music", value: 20, color: "#FFD292" },
                      { label: "Other", value: 10, color: "#10B981" },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Product Performance
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Views
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sales
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Conversion
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {productAnalytics.map((product) => (
                          <tr
                            key={product.productId}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.productName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.views.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {product.purchases}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${product.revenue.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  product.conversionRate > 5
                                    ? "bg-green-100 text-green-800"
                                    : product.conversionRate > 2
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.conversionRate.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ⭐ {product.averageRating.toFixed(1)} (
                              {product.reviewCount})
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Predictions Tab */}
            {activeTab === "predictions" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Sales Forecast
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Next 30 Days
                        </span>
                        <span className="text-lg font-semibold text-green-600">
                          $45,000
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Confidence
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          78%
                        </span>
                      </div>
                      <div className="pt-4">
                        <div className="text-sm text-gray-600 mb-2">
                          Scenarios:
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">
                              Optimistic
                            </span>
                            <span className="text-xs font-medium">$52,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">
                              Realistic
                            </span>
                            <span className="text-xs font-medium">$45,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">
                              Pessimistic
                            </span>
                            <span className="text-xs font-medium">$38,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Inventory Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <div className="text-sm font-medium text-gray-900">
                          WB Clemente Tee
                        </div>
                        <div className="text-xs text-gray-600">
                          Predicted demand: 85 units
                        </div>
                        <div className="text-xs text-gray-600">
                          Current stock: 120 units
                        </div>
                        <div className="text-xs text-green-600">
                          ✓ Well stocked
                        </div>
                      </div>

                      <div className="border-l-4 border-red-400 pl-4">
                        <div className="text-sm font-medium text-gray-900">
                          WAYBACK Hoodie
                        </div>
                        <div className="text-xs text-gray-600">
                          Predicted demand: 45 units
                        </div>
                        <div className="text-xs text-gray-600">
                          Current stock: 60 units
                        </div>
                        <div className="text-xs text-red-600">
                          ⚠ Consider restocking
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
