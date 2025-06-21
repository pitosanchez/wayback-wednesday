import React, { useState, useEffect } from "react";
import inventoryService from "../../services/inventoryService";
import type { InventoryStats, InventoryAlert } from "../../types/inventory";

const InventoryStatus: React.FC = () => {
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const updateStats = () => {
    setStats(inventoryService.getInventoryStats());
    setAlerts(inventoryService.getActiveAlerts());
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return "🚨";
      case "high":
        return "⚠️";
      case "medium":
        return "⚡";
      case "low":
        return "ℹ️";
      default:
        return "📋";
    }
  };

  if (!stats) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--rich-black)" }}
        >
          Inventory Status
        </h2>
        {alerts.length > 0 && (
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              alerts.some((a) => a.severity === "critical")
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            } transition-colors duration-200`}
          >
            <span>
              {alerts.length} Alert{alerts.length !== 1 ? "s" : ""}
            </span>
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${
                showAlerts ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Inventory Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--denim-blue)" }}
          >
            {stats.totalProducts}
          </div>
          <div className="text-sm text-gray-600">Products</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--denim-blue)" }}
          >
            {stats.totalVariants}
          </div>
          <div className="text-sm text-gray-600">Variants</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--denim-blue)" }}
          >
            {stats.totalStock}
          </div>
          <div className="text-sm text-gray-600">Total Stock</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--denim-blue)" }}
          >
            {stats.totalStock - stats.outOfStockItems}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
      </div>

      {/* Stock Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">In Stock</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            {stats.totalVariants - stats.lowStockItems - stats.outOfStockItems}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-800">
              Low Stock
            </span>
          </div>
          <span className="text-lg font-bold text-yellow-600">
            {stats.lowStockItems}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-800">
              Out of Stock
            </span>
          </div>
          <span className="text-lg font-bold text-red-600">
            {stats.outOfStockItems}
          </span>
        </div>
      </div>

      {/* Alerts Section */}
      {showAlerts && alerts.length > 0 && (
        <div className="space-y-3">
          <h3
            className="font-semibold text-lg"
            style={{ color: "var(--rich-black)" }}
          >
            Active Alerts
          </h3>
          {alerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getSeverityColor(
                alert.severity
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <span className="text-lg">
                    {getSeverityIcon(alert.severity)}
                  </span>
                  <div>
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {alert.createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-xs uppercase font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
          {alerts.length > 5 && (
            <div className="text-center text-sm text-gray-500">
              ... and {alerts.length - 5} more alerts
            </div>
          )}
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default InventoryStatus;
