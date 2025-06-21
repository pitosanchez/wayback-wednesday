import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { stripePromise } from "../config/stripe";
import StripePaymentForm from "../components/Stripe/StripePaymentForm";
import type { PaymentResult } from "../types/stripe";

const Checkout: React.FC = () => {
  const { cart, processPurchase } = useCart();
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentResult(result);
    setPaymentStatus("success");

    // Process purchase and update inventory
    const orderId = result.paymentIntent?.id || `order_${Date.now()}`;
    const purchaseSuccess = processPurchase(orderId);

    if (!purchaseSuccess) {
      console.error("Failed to process purchase in inventory system");
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentStatus("error");
  };

  // If cart is empty, show empty state
  if (cart.items.length === 0 && paymentStatus !== "success") {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="text-6xl mb-6">🛒</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Your cart is empty
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(10, 10, 10, 0.7)" }}
          >
            Add some items to your cart before proceeding to checkout.
          </p>
          <a href="#/shop" className="btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // Success state
  if (paymentStatus === "success") {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="text-6xl mb-6">✅</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Payment Successful!
          </h1>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(10, 10, 10, 0.7)" }}
          >
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>

          {paymentResult?.paymentIntent && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <h3
                className="font-semibold mb-4"
                style={{ color: "var(--denim-blue)" }}
              >
                Order Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payment ID:</span>
                  <span className="font-mono">
                    {paymentResult.paymentIntent.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>
                    ${(paymentResult.paymentIntent.amount / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="capitalize text-green-600">
                    {paymentResult.paymentIntent.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <a href="#/shop" className="btn-primary">
              Continue Shopping
            </a>
            <a
              href="#/"
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-50"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <div className="page-header text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Checkout
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--rich-black)" }}
              >
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      {(item.size || item.color) && (
                        <div className="flex gap-2 text-sm text-gray-500">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--fire-red)" }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(cart.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold">
                  <span style={{ color: "var(--rich-black)" }}>Total:</span>
                  <span style={{ color: "var(--fire-red)" }}>
                    ${(cart.total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            {paymentStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="font-semibold">Payment Error</span>
                </div>
                <p className="mt-2 text-red-700">{paymentError}</p>
              </div>
            )}

            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={cart.total * 1.08} // Include tax
                currency="usd"
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                loading={paymentStatus === "processing"}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
