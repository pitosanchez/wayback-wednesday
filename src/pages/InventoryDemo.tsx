import React, { useState, useEffect } from "react";
import InventoryStatus from "../components/Inventory/InventoryStatus";
import inventoryService from "../services/inventoryService";
import type { InventoryItem, StockMovement } from "../types/inventory";

const InventoryDemo: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  // Removed unused selectedVariant state

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = () => {
    setInventoryItems(inventoryService.getAllInventoryItems());
    setStockMovements(inventoryService.getStockMovements().slice(0, 10)); // Latest 10 movements
  };

  const simulatePurchase = (variantId: string, quantity: number) => {
    const mockCartItems = [
      {
        id: variantId,
        name: "Demo Purchase",
        price: 50,
        image: "",
        quantity,
        category: "Demo",
      },
    ];

    const orderId = `demo_order_${Date.now()}`;
    const success = inventoryService.processPurchase(mockCartItems, orderId);

    if (success) {
      loadInventoryData();
      alert(`Successfully processed purchase of ${quantity} item(s)`);
    } else {
      alert("Purchase failed - insufficient stock");
    }
  };

  const getStockStatusColor = (item: InventoryItem) => {
    if (item.currentStock === 0) return "text-red-600 bg-red-50";
    if (item.currentStock <= item.lowStockThreshold)
      return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getStockStatusText = (item: InventoryItem) => {
    if (item.currentStock === 0) return "Out of Stock";
    if (item.currentStock <= item.lowStockThreshold) return "Low Stock";
    return "In Stock";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <div className="page-header text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Inventory Tracking Demo
          </h1>
          <div className="accent-line mx-auto mb-6"></div>
          <p className="text-lg" style={{ color: "rgba(10, 10, 10, 0.7)" }}>
            Real-time inventory management with stock tracking, alerts, and
            purchase processing.
          </p>
        </div>

        {/* Inventory Status Overview */}
        <div className="mb-12">
          <InventoryStatus />
        </div>

        {/* Demo Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-3">📊</div>
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              Real-time Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Live inventory updates with every purchase
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-3">🚨</div>
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              Smart Alerts
            </h3>
            <p className="text-sm text-gray-600">
              Automatic low stock and out-of-stock notifications
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-3">📈</div>
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              Movement History
            </h3>
            <p className="text-sm text-gray-600">
              Complete audit trail of all stock changes
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inventory Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "var(--rich-black)" }}
            >
              Current Inventory
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {inventoryItems.map((item) => (
                <div
                  key={item.variantId}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{item.sku}</div>
                      <div className="text-sm text-gray-600">
                        Product ID: {item.productId}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(
                        item
                      )}`}
                    >
                      {getStockStatusText(item)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-600">Current Stock</div>
                      <div className="font-semibold">{item.currentStock}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Available</div>
                      <div className="font-semibold">{item.availableStock}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Low Stock Alert</div>
                      <div className="font-semibold">
                        {item.lowStockThreshold}
                      </div>
                    </div>
                  </div>

                  {/* Demo Purchase Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => simulatePurchase(item.variantId, 1)}
                      disabled={item.currentStock < 1}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Buy 1
                    </button>
                    <button
                      onClick={() => simulatePurchase(item.variantId, 3)}
                      disabled={item.currentStock < 3}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Buy 3
                    </button>
                    <button
                      onClick={() => simulatePurchase(item.variantId, 5)}
                      disabled={item.currentStock < 5}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Buy 5
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Movements */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2
              className="text-xl font-bold mb-6"
              style={{ color: "var(--rich-black)" }}
            >
              Recent Stock Movements
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stockMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          movement.type === "sale"
                            ? "bg-red-500"
                            : movement.type === "restock"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      <span className="font-medium capitalize">
                        {movement.type}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatDate(movement.timestamp)}
                    </span>
                  </div>

                  <div className="text-sm space-y-1">
                    <div>Variant: {movement.variantId}</div>
                    <div>Quantity: {movement.quantity}</div>
                    <div>
                      Stock: {movement.previousStock} → {movement.newStock}
                    </div>
                    {movement.reason && <div>Reason: {movement.reason}</div>}
                    {movement.orderId && <div>Order: {movement.orderId}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3
            className="font-semibold mb-3"
            style={{ color: "var(--denim-blue)" }}
          >
            How to Test Inventory System
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Interactive Features:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Click "Buy" buttons to simulate purchases</li>
                <li>• Watch stock levels decrease in real-time</li>
                <li>• See alerts appear for low/out of stock items</li>
                <li>• View movement history in right panel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">System Features:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Automatic low stock threshold calculation</li>
                <li>• Complete audit trail of all changes</li>
                <li>• Real-time inventory statistics</li>
                <li>• Integration with cart and checkout</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Technical Implementation
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4
                className="font-semibold mb-2"
                style={{ color: "var(--denim-blue)" }}
              >
                Data Persistence
              </h4>
              <ul className="space-y-1">
                <li>• localStorage for client-side persistence</li>
                <li>• Automatic save/restore on page reload</li>
                <li>• Maintains movement history and alerts</li>
                <li>• Handles date serialization properly</li>
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold mb-2"
                style={{ color: "var(--denim-blue)" }}
              >
                Integration Points
              </h4>
              <ul className="space-y-1">
                <li>• Cart system integration</li>
                <li>• Stripe checkout processing</li>
                <li>• Product variant system</li>
                <li>• Real-time UI updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDemo;
