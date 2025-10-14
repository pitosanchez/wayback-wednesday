import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { emailService } from "../services/emailService";
import type { OrderConfirmationEmailData } from "../services/emailService";

// Types for domain management display (local-only; data now handled by backend)
type DomainStatus = "verified" | "pending" | "unverified" | string;
interface DNSRecord {
  type: string;
  name: string;
  value: string;
}
interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  created_at: string;
  region?: string;
  records?: DNSRecord[];
}

const EmailDemo: React.FC = () => {
  const { authState } = useAuth();
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [domainAction, setDomainAction] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [newDomainName, setNewDomainName] = useState("gbothepro.com");
  const [emailResults, setEmailResults] = useState<
    Array<{
      type: string;
      success: boolean;
      message: string;
      timestamp: Date;
    }>
  >([]);

  const addResult = useCallback(
    (type: string, success: boolean, message: string) => {
      setEmailResults((prev) => [
        { type, success, message, timestamp: new Date() },
        ...prev.slice(0, 9), // Keep only last 10 results
      ]);
    },
    []
  );

  const sendWelcomeEmail = async () => {
    if (!authState.user) {
      addResult("Welcome Email", false, "User not logged in");
      return;
    }

    setSendingEmail("welcome");
    try {
      const success = await emailService.sendWelcomeEmail(authState.user);
      addResult(
        "Welcome Email",
        success,
        success ? "Email sent successfully!" : "Email service not configured"
      );
    } catch (error) {
      addResult(
        "Welcome Email",
        false,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setSendingEmail(null);
    }
  };

  const sendTestOrderConfirmation = async () => {
    if (!authState.user) {
      addResult("Order Confirmation", false, "User not logged in");
      return;
    }

    setSendingEmail("order");
    try {
      const mockOrderData: OrderConfirmationEmailData = {
        orderNumber: `WW${Date.now()}`,
        items: [
          {
            name: "Vintage Vinyl Record - The Beatles",
            quantity: 1,
            price: 24.99,
          },
          { name: "Retro Sunglasses", quantity: 2, price: 15.5 },
          { name: "Classic Band T-Shirt", quantity: 1, price: 19.99 },
        ],
        total: 75.98,
        shippingAddress:
          "123 Nostalgia Lane\nVintage City, VC 12345\nUnited States",
      };

      const success = await emailService.sendOrderConfirmationEmail(
        authState.user.email,
        mockOrderData
      );
      addResult(
        "Order Confirmation",
        success,
        success ? "Email sent successfully!" : "Email service not configured"
      );
    } catch (error) {
      addResult(
        "Order Confirmation",
        false,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setSendingEmail(null);
    }
  };

  const sendCustomEmail = async () => {
    if (!authState.user) {
      addResult("Custom Email", false, "User not logged in");
      return;
    }

    setSendingEmail("custom");
    try {
      const html = `
        <h2>🎵 Test Email from Wayback Wednesday</h2>
        <p>Hi ${authState.user.profile?.firstName || "there"}!</p>
        <p>This is a test email to verify that Resend integration is working correctly.</p>
        <p>Current time: ${new Date().toLocaleString()}</p>
        <hr>
        <p><em>Sent from Wayback Wednesday Email Demo</em></p>
      `;

      const success = await emailService.sendEmail(
        authState.user.email,
        "🧪 Test Email from Wayback Wednesday",
        html
      );

      addResult(
        "Custom Email",
        success,
        success ? "Email sent successfully!" : "Email service not configured"
      );
    } catch (error) {
      addResult(
        "Custom Email",
        false,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setSendingEmail(null);
    }
  };

  // Domain management functions
  const loadDomains = useCallback(async () => {
    setDomainAction("loading");
    try {
      const result = await emailService.listDomains();
      if (result.success) {
        setDomains([]);
        addResult(
          "Load Domains",
          true,
          "Domain management moved to backend admin panel"
        );
      } else {
        addResult(
          "Load Domains",
          false,
          result.error || "Use backend admin panel for domain management"
        );
      }
    } catch (error) {
      addResult(
        "Load Domains",
        false,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setDomainAction(null);
    }
  }, [addResult]);

  const createDomain = async () => {
    if (!newDomainName.trim()) {
      addResult("Create Domain", false, "Domain name is required");
      return;
    }

    setDomainAction("creating");
    try {
      const result = await emailService.createDomain(newDomainName.trim());
      if (result.success) {
        addResult(
          "Create Domain",
          true,
          `Domain '${newDomainName}' created successfully!`
        );
        await loadDomains(); // Refresh the list
      } else {
        addResult(
          "Create Domain",
          false,
          result.error || "Failed to create domain"
        );
      }
    } catch (error) {
      addResult(
        "Create Domain",
        false,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setDomainAction(null);
    }
  };

  // Load domains on component mount
  useEffect(() => {
    if (emailService.isConfigured()) {
      loadDomains();
    }
  }, [loadDomains]);

  const isConfigured = emailService.isConfigured();

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="page-header text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            📧 Email Service Demo
          </h1>
          <div className="accent-line mx-auto mb-6"></div>
          <p className="text-lg" style={{ color: "rgba(10, 10, 10, 0.7)" }}>
            Test Resend email integration and functionality
          </p>
        </div>

        {/* Configuration Status */}
        <div
          className={`p-6 rounded-lg mb-8 ${
            isConfigured
              ? "bg-green-50 border border-green-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isConfigured ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></div>
            <h3 className="text-lg font-semibold">
              Email Service Status:{" "}
              {isConfigured ? "Configured" : "Not Configured"}
            </h3>
          </div>

          {isConfigured ? (
            <p className="text-green-700">
              ✅ Resend API key is configured and ready to send emails.
            </p>
          ) : (
            <div className="text-yellow-700">
              <p className="mb-2">
                ⚠️ Resend API key not found. To enable email functionality:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>
                  Sign up for a Resend account at{" "}
                  <a
                    href="https://resend.com"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    resend.com
                  </a>
                </li>
                <li>Get your API key from the Resend dashboard</li>
                <li>
                  Add{" "}
                  <code className="bg-yellow-100 px-1 rounded">
                    VITE_RESEND_API_KEY=your_api_key
                  </code>{" "}
                  to your .env file
                </li>
                <li>Restart your development server</li>
              </ol>
            </div>
          )}
        </div>

        {/* Authentication Status */}
        <div
          className={`p-6 rounded-lg mb-8 ${
            authState.user
              ? "bg-blue-50 border border-blue-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <h3 className="text-lg font-semibold mb-3">Authentication Status</h3>
          {authState.user ? (
            <div className="text-blue-700">
              <p>
                ✅ Logged in as: <strong>{authState.user.email}</strong>
              </p>
              {authState.user.profile?.firstName && (
                <p>
                  👋 Name: {authState.user.profile.firstName}{" "}
                  {authState.user.profile.lastName}
                </p>
              )}
            </div>
          ) : (
            <p className="text-red-700">
              ❌ Not logged in. Please{" "}
              <a href="#/login" className="underline">
                log in
              </a>{" "}
              to test email functionality.
            </p>
          )}
        </div>

        {/* Email Testing Buttons */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--denim-blue)" }}
            >
              Welcome Email
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Test the branded welcome email sent to new users after
              registration.
            </p>
            <button
              onClick={sendWelcomeEmail}
              disabled={!authState.user || sendingEmail === "welcome"}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail === "welcome" ? "Sending..." : "Send Welcome Email"}
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--denim-blue)" }}
            >
              Order Confirmation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Test the order confirmation email with sample order data.
            </p>
            <button
              onClick={sendTestOrderConfirmation}
              disabled={!authState.user || sendingEmail === "order"}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail === "order" ? "Sending..." : "Send Order Email"}
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--denim-blue)" }}
            >
              Custom Email
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Send a simple test email to verify basic functionality.
            </p>
            <button
              onClick={sendCustomEmail}
              disabled={!authState.user || sendingEmail === "custom"}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingEmail === "custom" ? "Sending..." : "Send Test Email"}
            </button>
          </div>
        </div>

        {/* Domain Management Section */}
        {isConfigured && (
          <div className="mb-8">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--rich-black)" }}
            >
              🌐 Domain Management
            </h2>

            {/* Create Domain */}
            <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--denim-blue)" }}
              >
                Add Domain
              </h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={newDomainName}
                    onChange={(e) => setNewDomainName(e.target.value)}
                    placeholder="yourdomain.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={createDomain}
                  disabled={
                    domainAction === "creating" || !newDomainName.trim()
                  }
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {domainAction === "creating"
                    ? "Creating..."
                    : "Create Domain"}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add your domain to Resend to send emails from your own domain
              </p>
            </div>

            {/* Domains List */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 border-b flex justify-between items-center">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--rich-black)" }}
                >
                  Your Domains
                </h3>
                <button
                  onClick={loadDomains}
                  disabled={domainAction === "loading"}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  {domainAction === "loading" ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="p-6">
                {domains.length > 0 ? (
                  <div className="space-y-4">
                    {domains.map((domain) => (
                      <div
                        key={domain.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {domain.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  domain.status === "verified"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {domain.status}
                              </span>
                              <span className="text-sm text-gray-500">
                                Created:{" "}
                                {new Date(
                                  domain.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              ID: {domain.id}
                            </div>
                            {domain.region && (
                              <div className="text-sm text-gray-500">
                                Region: {domain.region}
                              </div>
                            )}
                          </div>
                        </div>

                        {domain.status !== "verified" && domain.records && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm font-medium text-yellow-800 mb-2">
                              DNS Records Required:
                            </p>
                            <div className="space-y-2 text-xs">
                              {domain.records.map(
                                (record: DNSRecord, index: number) => (
                                  <div
                                    key={index}
                                    className="font-mono bg-white p-2 rounded"
                                  >
                                    <div>
                                      <strong>Type:</strong> {record.type}
                                    </div>
                                    <div>
                                      <strong>Name:</strong> {record.name}
                                    </div>
                                    <div>
                                      <strong>Value:</strong> {record.value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">🌐</div>
                    <p>No domains configured yet</p>
                    <p className="text-sm">Add a domain above to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Email Results Log */}
        {emailResults.length > 0 && (
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--rich-black)" }}
              >
                📋 Email Send Results
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {emailResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.success
                        ? "bg-green-50 border-green-400"
                        : "bg-red-50 border-red-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm">
                        {result.success ? "✅" : "❌"} {result.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        result.success ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {result.message}
                    </p>
                  </div>
                ))}
              </div>

              {emailResults.length > 0 && (
                <button
                  onClick={() => setEmailResults([])}
                  className="mt-4 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Clear Results
                </button>
              )}
            </div>
          </div>
        )}

        {/* Documentation */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            📚 Integration Details
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Email Service:</strong> Implemented using Resend API
            </div>
            <div>
              <strong>Templates:</strong> HTML & text versions with branded
              styling
            </div>
            <div>
              <strong>Integration Points:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>User registration (welcome email)</li>
                <li>Order completion (confirmation email)</li>
                <li>
                  Custom email sending (for notifications, marketing, etc.)
                </li>
              </ul>
            </div>
            <div>
              <strong>Configuration:</strong> Environment variables in .env file
            </div>
            <div>
              <strong>Fallback:</strong> Graceful degradation when API key not
              configured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDemo;
