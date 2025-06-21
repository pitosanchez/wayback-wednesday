import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import type { BillingDetails, PaymentResult } from "../../types/stripe";

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  onPaymentSuccess: (result: PaymentResult) => void;
  onPaymentError: (error: string) => void;
  loading?: boolean;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
  currency = "usd",
  onPaymentSuccess,
  onPaymentError,
  loading = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentError("Card element not found");
      setProcessing(false);
      return;
    }

    try {
      // For demo purposes, we'll simulate a successful payment
      // In a real application, you would create a payment intent on your backend
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingDetails.name,
          email: billingDetails.email,
          address: billingDetails.address,
        },
      });

      if (error) {
        onPaymentError(error.message || "Payment failed");
        setProcessing(false);
        return;
      }

      // Simulate successful payment for demo
      const mockPaymentResult: PaymentResult = {
        success: true,
        paymentIntent: {
          id: `pi_demo_${Date.now()}`,
          client_secret: `pi_demo_${Date.now()}_secret`,
          amount: Math.round(amount * 100),
          currency,
          status: "succeeded",
        },
      };

      onPaymentSuccess(mockPaymentResult);
    } catch (err) {
      onPaymentError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (field: keyof BillingDetails, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      address: {
        ...prev.address!,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--rich-black)" }}
        >
          Billing Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              Full Name *
            </label>
            <input
              type="text"
              required
              value={billingDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              Email *
            </label>
            <input
              type="email"
              required
              value={billingDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--rich-black)" }}
          >
            Address
          </label>
          <input
            type="text"
            value={billingDetails.address?.line1 || ""}
            onChange={(e) => handleAddressChange("line1", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              City
            </label>
            <input
              type="text"
              value={billingDetails.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New York"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              State
            </label>
            <input
              type="text"
              value={billingDetails.address?.state || ""}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="NY"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              ZIP Code
            </label>
            <input
              type="text"
              value={billingDetails.address?.postal_code || ""}
              onChange={(e) =>
                handleAddressChange("postal_code", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--rich-black)" }}
        >
          Payment Information
        </h3>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--rich-black)" }}
          >
            Card Details *
          </label>
          <div className="p-3 border border-gray-300 rounded-lg">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span style={{ color: "var(--rich-black)" }}>Total:</span>
          <span style={{ color: "var(--fire-red)" }}>
            ${amount.toFixed(2)} {currency.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing || loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
          processing || loading || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "btn-primary hover:scale-105"
        }`}
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="32"
                strokeDashoffset="32"
              />
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>

      {/* Security Notice */}
      <div
        className="text-center text-sm"
        style={{ color: "rgba(10, 10, 10, 0.7)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
          </svg>
          Secured by Stripe
        </div>
        <p>Your payment information is encrypted and secure.</p>
      </div>
    </form>
  );
};

export default StripePaymentForm;
