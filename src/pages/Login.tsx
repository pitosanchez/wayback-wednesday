import React, { useState } from "react";
import { LoginForm, RegisterForm } from "../components/Auth";

type AuthMode = "login" | "register" | "reset";

const Login: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleAuthSuccess = () => {
    // Redirect to home or previous page
    window.location.href = "/";
  };

  const renderAuthForm = () => {
    switch (authMode) {
      case "login":
        return (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setAuthMode("register")}
            onSwitchToReset={() => setAuthMode("reset")}
          />
        );
      case "register":
        return (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        );
      case "reset":
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Reset Password
                </h2>
                <p className="text-gray-600">
                  Enter your email to receive reset instructions
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send Reset Instructions
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">WAYBACK</h1>
          <p className="text-gray-600">Hip Hop Culture in East Harlem</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {renderAuthForm()}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default Login;
