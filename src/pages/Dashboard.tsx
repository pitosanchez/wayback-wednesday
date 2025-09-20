import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SocialIcons } from "../components/Social";

const Dashboard: React.FC = () => {
  const { cart } = useCart();

  // For admin dashboard, we'll use a default admin user
  const displayName = "Admin";
  const cartItemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartTotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-rich-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-alt-gothic mb-4">
            Welcome back, {displayName}!
          </h1>
          <p className="text-xl text-white/60">
            Your Wayback Wednesday dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/60">Cart Items</p>
                <p className="text-2xl font-bold text-white">{cartItemCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/60">Cart Total</p>
                <p className="text-2xl font-bold text-white">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/60">
                  Account Status
                </p>
                <p className="text-lg font-bold text-green-400">
                  Authenticated
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Shop Connection */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Shop Collection</h3>
              <p className="text-white/60 mb-6">
                Discover exclusive merchandise, vinyl records, and limited
                edition items.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Browse Shop
              </Link>
            </div>
          </div>

          {/* Music Connection */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Music & Culture</h3>
              <p className="text-white/60 mb-6">
                Explore our music collection, artist features, and cultural
                content.
              </p>
              <Link
                to="/music"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Explore Music
              </Link>
            </div>
          </div>

          {/* Events Connection */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
              <p className="text-white/60 mb-6">
                Join us for live sessions, workshops, and community events.
              </p>
              <Link
                to="/events"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media & Account Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Social Media */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
            <p className="text-white/60 mb-6">
              Stay connected with the latest updates, music, and community news.
            </p>
            <SocialIcons
              size="lg"
              className="justify-center lg:justify-start"
            />
          </div>

          {/* Account Information */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Admin Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60">
                  Role
                </label>
                <p className="mt-1 text-white">Administrator</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60">
                  Access Level
                </label>
                <p className="mt-1 text-white">Full Access</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60">
                  Session
                </label>
                <p className="mt-1 text-white">Active</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60">
                  Status
                </label>
                <div className="mt-1 flex items-center">
                  <svg
                    className="w-5 h-5 text-green-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-400 font-medium">
                    Authenticated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/profile"
              className="flex items-center p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-8 h-8 text-blue-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div>
                <p className="font-medium text-white">Edit Profile</p>
                <p className="text-sm text-white/60">Update your information</p>
              </div>
            </Link>

            <Link
              to="/orders"
              className="flex items-center p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-8 h-8 text-blue-400 mr-3"
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
              <div>
                <p className="font-medium text-white">Order History</p>
                <p className="text-sm text-white/60">View past orders</p>
              </div>
            </Link>

            <Link
              to="/shop"
              className="flex items-center p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-8 h-8 text-blue-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <div>
                <p className="font-medium text-white">Continue Shopping</p>
                <p className="text-sm text-white/60">Browse our collection</p>
              </div>
            </Link>

            {cart.items.length > 0 && (
              <Link
                to="/checkout"
                className="flex items-center p-4 border border-white/10 rounded-lg hover:border-green-400/50 hover:bg-green-500/10 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-green-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-white">Checkout</p>
                  <p className="text-sm text-white/60">
                    Complete your purchase
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            to="/"
            className="text-white/60 hover:text-white font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
