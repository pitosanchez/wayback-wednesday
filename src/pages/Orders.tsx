import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import type { OrderHistory } from "../types/auth";
import { STATUS_COLORS } from "../utils/constants";

type OrderStatusFilter =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const Orders: React.FC = () => {
  const { authState } = useAuth();
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatusFilter>("all");

  const user = authState.user;

  // Mock order data for demo purposes
  useEffect(() => {
    if (!user) return;
    const mockOrders: OrderHistory[] = [
      {
        id: "ORD-2024-001",
        userId: user.uid,
        orderDate: new Date("2024-01-15"),
        status: "delivered",
        items: [
          {
            productId: "wb-clemente-tee",
            variantId: "wb-clemente-m-black",
            name: "WB Clemente Black Tee",
            image: "/src/assets/images/blackTee.webp",
            quantity: 1,
            price: 55.0,
            size: "M",
            color: "Black",
          },
          {
            productId: "wayback-hoodie",
            variantId: "hoodie-l-black",
            name: "WAYBACK Hoodie",
            image: "/api/placeholder/300/300",
            quantity: 1,
            price: 85.0,
            size: "L",
            color: "Black",
          },
        ],
        total: 140.0,
        shippingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        billingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        paymentMethod: "**** **** **** 4242",
        trackingNumber: "TRK123456789",
      },
      {
        id: "ORD-2024-002",
        userId: user.uid,
        orderDate: new Date("2024-01-20"),
        status: "shipped",
        items: [
          {
            productId: "vintage-tee",
            variantId: "vintage-s-gray",
            name: "Vintage Tee",
            image: "/api/placeholder/300/300",
            quantity: 2,
            price: 45.0,
            size: "S",
            color: "Gray",
          },
        ],
        total: 90.0,
        shippingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        billingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        paymentMethod: "**** **** **** 4242",
        trackingNumber: "TRK987654321",
      },
      {
        id: "ORD-2024-003",
        userId: user.uid,
        orderDate: new Date("2024-01-25"),
        status: "processing",
        items: [
          {
            productId: "logo-cap",
            variantId: "cap-os-navy",
            name: "Logo Cap",
            image: "/api/placeholder/300/300",
            quantity: 1,
            price: 35.0,
            color: "Navy",
          },
        ],
        total: 35.0,
        shippingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        billingAddress: {
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        paymentMethod: "**** **** **** 4242",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, [user]);

  if (!user) return null;

  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  const getStatusColor = (status: string) => {
    return (
      STATUS_COLORS[status as keyof typeof STATUS_COLORS] ||
      STATUS_COLORS.default
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "processing":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "shipped":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" />
          </svg>
        );
      case "delivered":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "cancelled":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-1">
          <div className="flex flex-wrap gap-1">
            {(
              [
                { key: "all", label: "All Orders" },
                { key: "pending", label: "Pending" },
                { key: "processing", label: "Processing" },
                { key: "shipped", label: "Shipped" },
                { key: "delivered", label: "Delivered" },
                { key: "cancelled", label: "Cancelled" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `No ${filter} orders found.`}
            </p>
            <a
              href="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {order.orderDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " • "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              ${(item.price * item.quantity).toFixed(2)} total
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {order.trackingNumber && (
                        <span>
                          Tracking:{" "}
                          <span className="font-mono">
                            {order.trackingNumber}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() =>
                          alert("Order details functionality coming soon!")
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                      {order.status === "delivered" && (
                        <button
                          onClick={() =>
                            alert("Reorder functionality coming soon!")
                          }
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Reorder
                        </button>
                      )}
                      {order.trackingNumber && (
                        <button
                          onClick={() =>
                            alert("Tracking functionality coming soon!")
                          }
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-8">
          <a
            href="/dashboard"
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default Orders;
