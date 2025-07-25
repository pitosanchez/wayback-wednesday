import React from "react";
import { Link } from "react-router-dom";

interface DemoCard {
  title: string;
  description: string;
  path: string;
  icon: string;
  category: "core" | "ecommerce" | "admin";
  tags: string[];
}

const DemoHub: React.FC = () => {
  const demos: DemoCard[] = [
    {
      title: "Authentication System",
      description:
        "Firebase authentication with protected routes and user management",
      path: "/auth-demo",
      icon: "🔐",
      category: "core",
      tags: ["Firebase", "Auth", "Users"],
    },
    {
      title: "Shopping Cart",
      description:
        "Full-featured cart with persistent storage and real-time updates",
      path: "/cart-demo",
      icon: "🛒",
      category: "ecommerce",
      tags: ["Cart", "LocalStorage", "Context"],
    },
    {
      title: "Payment Integration",
      description: "Stripe payment processing with secure card handling",
      path: "/stripe-demo",
      icon: "💳",
      category: "ecommerce",
      tags: ["Stripe", "Payments", "Checkout"],
    },
    {
      title: "Product Variants",
      description:
        "Size and color variants with dynamic pricing and stock management",
      path: "/variants-demo",
      icon: "👕",
      category: "ecommerce",
      tags: ["Products", "Variants", "Inventory"],
    },
    {
      title: "Inventory Management",
      description:
        "Real-time stock tracking with alerts and purchase processing",
      path: "/inventory-demo",
      icon: "📦",
      category: "ecommerce",
      tags: ["Stock", "Alerts", "Management"],
    },
    {
      title: "Admin Panel",
      description:
        "Comprehensive admin dashboard with order and user management",
      path: "/admin-demo",
      icon: "⚙️",
      category: "admin",
      tags: ["Admin", "Dashboard", "Management"],
    },
    {
      title: "Advanced Features",
      description: "Search, reviews, ratings, and wishlist functionality",
      path: "/product-features-demo",
      icon: "⭐",
      category: "ecommerce",
      tags: ["Search", "Reviews", "Wishlist"],
    },
  ];

  const categories = {
    core: {
      label: "Core Features",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    ecommerce: {
      label: "E-Commerce",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    admin: {
      label: "Administration",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
  };

  const getDemosByCategory = (category: keyof typeof categories) => {
    return demos.filter((demo) => demo.category === category);
  };

  return (
    <div className="min-h-screen bg-warm-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-rich-black mb-6">Demo Hub</h1>
          <div className="accent-line mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all the features of Wayback Wednesday in a safe demo
            environment. Test functionality, view code patterns, and understand
            the architecture.
          </p>
        </div>

        {/* Environment Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                Development Environment Only
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  These demos are only visible in development mode. All data is
                  temporary and stored locally. Feel free to test all features
                  without affecting production data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Categories */}
        {Object.entries(categories).map(([key, { label, color }]) => {
          const categoryDemos = getDemosByCategory(
            key as keyof typeof categories
          );

          return (
            <div key={key} className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
                <span
                  className={`ml-4 px-3 py-1 rounded-full text-sm font-medium border ${color}`}
                >
                  {categoryDemos.length} demos
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDemos.map((demo) => (
                  <Link
                    key={demo.path}
                    to={demo.path}
                    className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{demo.icon}</div>
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${color}`}
                        >
                          {demo.category}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {demo.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4">
                        {demo.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {demo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-denim-blue font-medium">
                        <span>Open Demo</span>
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Tips */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Demo Testing Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Getting Started
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    All demos use local storage - data persists until cleared
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    Authentication demo uses Firebase test configuration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Stripe demo uses test mode - no real charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    Admin features require admin role (use demo login)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Test Credentials
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    <strong>Admin:</strong> admin@wayback.com / demo123
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    <strong>User:</strong> user@wayback.com / demo123
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    <strong>Stripe:</strong> 4242 4242 4242 4242
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    <strong>CVV:</strong> Any 3 digits, Future date
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoHub;
