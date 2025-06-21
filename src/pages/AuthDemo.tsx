import React from "react";
import { useAuth } from "../context/AuthContext";
import { UserMenu } from "../components/Auth";

const AuthDemo: React.FC = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentication Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test Firebase Authentication features
          </p>
        </div>

        {/* Authentication Status */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Authentication Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Current Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      authState.isAuthenticated ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {authState.isAuthenticated
                      ? "Authenticated"
                      : "Not Authenticated"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      authState.loading ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {authState.loading ? "Loading" : "Ready"}
                  </span>
                </div>
                {authState.error && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium text-red-600">
                      Error: {authState.error}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {authState.user && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  User Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>UID:</strong> {authState.user.uid}
                  </div>
                  <div>
                    <strong>Email:</strong> {authState.user.email}
                  </div>
                  <div>
                    <strong>Display Name:</strong>{" "}
                    {authState.user.displayName || "Not set"}
                  </div>
                  <div>
                    <strong>Email Verified:</strong>{" "}
                    {authState.user.emailVerified ? "Yes" : "No"}
                  </div>
                  <div>
                    <strong>Created:</strong>{" "}
                    {authState.user.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Menu Demo */}
        {authState.isAuthenticated && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              User Menu Demo
            </h2>
            <div className="flex justify-center">
              <UserMenu onSettingsClick={() => alert("Settings clicked!")} />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!authState.isAuthenticated ? (
              <>
                <a
                  href="/login"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  Go to Login Page
                </a>
                <button
                  onClick={() => window.open("/login", "_blank")}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Open Login in New Tab
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => alert("Profile management coming soon!")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Manage Profile
                </button>
                <button
                  onClick={() => alert("Order history coming soon!")}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  View Orders
                </button>
                <button
                  onClick={() => alert("Settings coming soon!")}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Account Settings
                </button>
              </>
            )}
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Demo Instructions
          </h2>
          <div className="space-y-4 text-blue-800">
            <div>
              <h3 className="font-semibold">🔐 Testing Authentication:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>
                  Click "Go to Login Page" to test the login/register forms
                </li>
                <li>Create a test account with any email (demo mode)</li>
                <li>Try logging in and out to see state changes</li>
                <li>Test the user menu when authenticated</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">⚠️ Demo Mode:</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>This is using Firebase demo configuration</li>
                <li>No real emails will be sent</li>
                <li>All data is temporary and for testing only</li>
                <li>In production, proper Firebase config would be used</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <a href="/" className="text-gray-500 hover:text-gray-700 font-medium">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
