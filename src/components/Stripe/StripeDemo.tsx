import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../config/stripe";
import StripePaymentForm from "./StripePaymentForm";
import type { PaymentResult } from "../../types/stripe";

const StripeDemo: React.FC = () => {
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );
  const [paymentError, setPaymentError] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result);
    setPaymentError("");
    setShowForm(false);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentResult(null);
  };

  const resetDemo = () => {
    setPaymentResult(null);
    setPaymentError("");
    setShowForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--rich-black)" }}
        >
          Stripe Payment Integration Demo
        </h2>
        <p className="text-lg" style={{ color: "rgba(10, 10, 10, 0.7)" }}>
          This demo showcases secure credit card processing with Stripe Elements
        </p>
      </div>

      {/* Demo Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="text-4xl mb-4">🔒</div>
          <h3
            className="font-semibold mb-2"
            style={{ color: "var(--denim-blue)" }}
          >
            Secure Processing
          </h3>
          <p className="text-sm text-gray-600">
            PCI DSS compliant payment processing with Stripe
          </p>
        </div>

        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="text-4xl mb-4">💳</div>
          <h3
            className="font-semibold mb-2"
            style={{ color: "var(--denim-blue)" }}
          >
            Multiple Cards
          </h3>
          <p className="text-sm text-gray-600">
            Supports all major credit and debit cards
          </p>
        </div>

        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <div className="text-4xl mb-4">⚡</div>
          <h3
            className="font-semibold mb-2"
            style={{ color: "var(--denim-blue)" }}
          >
            Real-time Validation
          </h3>
          <p className="text-sm text-gray-600">
            Instant card validation and error handling
          </p>
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3
          className="font-semibold mb-3"
          style={{ color: "var(--denim-blue)" }}
        >
          Demo Instructions
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            • This is a demo using Stripe test mode - no real charges will be
            made
          </p>
          <p>
            • Use test card number:{" "}
            <code className="bg-white px-2 py-1 rounded">
              4242 4242 4242 4242
            </code>
          </p>
          <p>• Use any future expiry date (e.g., 12/25) and any 3-digit CVC</p>
          <p>• Fill in any name and email for billing information</p>
        </div>
      </div>

      {/* Payment Results */}
      {paymentResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 text-green-800 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="font-semibold">Payment Successful!</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Payment ID:</span>
              <span className="font-mono">
                {paymentResult.paymentIntent?.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span>
                ${(paymentResult.paymentIntent?.amount || 0 / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="capitalize font-semibold">
                {paymentResult.paymentIntent?.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 text-red-800 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="font-semibold">Payment Error</span>
          </div>
          <p className="text-red-700">{paymentError}</p>
        </div>
      )}

      {/* Demo Controls */}
      <div className="text-center mb-8">
        {!showForm ? (
          <div className="space-y-4">
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Start Payment Demo
            </button>
            {(paymentResult || paymentError) && (
              <button
                onClick={resetDemo}
                className="block mx-auto px-6 py-2 border border-gray-300 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-50"
              >
                Reset Demo
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowForm(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-50"
          >
            Hide Payment Form
          </button>
        )}
      </div>

      {/* Payment Form */}
      {showForm && (
        <div className="max-w-2xl mx-auto">
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              amount={29.99}
              currency="usd"
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </Elements>
        </div>
      )}

      {/* Integration Guide */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--rich-black)" }}
        >
          Integration Guide
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              1. Install Dependencies
            </h4>
            <code className="block bg-white p-3 rounded border">
              npm install @stripe/stripe-js @stripe/react-stripe-js
            </code>
          </div>

          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              2. Set up Environment Variables
            </h4>
            <code className="block bg-white p-3 rounded border">
              VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
            </code>
          </div>

          <div>
            <h4
              className="font-semibold mb-2"
              style={{ color: "var(--denim-blue)" }}
            >
              3. Backend Setup Required
            </h4>
            <p>For production, you'll need a backend API to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Create payment intents securely</li>
              <li>Handle webhooks for payment confirmation</li>
              <li>Store order information</li>
              <li>Manage customer data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeDemo;
