import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { stripePromise } from "../config/stripe";
import StripePaymentForm from "../components/Stripe/StripePaymentForm";
import { emailService } from "../services/emailService";
import type { PaymentResult } from "../types/stripe";

const Checkout: React.FC = () => {
  const { cart, processPurchase } = useCart();
  const { authState } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );

  const handlePaymentSuccess = async (result: PaymentResult) => {
    setPaymentResult(result);
    setPaymentStatus("success");

    // Process purchase and update inventory
    const orderId = result.paymentIntent?.id || `order_${Date.now()}`;
    const purchaseSuccess = processPurchase(orderId);

    if (!purchaseSuccess) {
      console.error("Failed to process purchase in inventory system");
      return;
    }

    // Send order confirmation email if user is logged in
    if (authState.user && emailService.isConfigured()) {
      try {
        const orderData = {
          orderNumber: orderId,
          items: cart.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price * item.quantity,
          })),
          total: cart.total * 1.08, // Include tax
          shippingAddress: "123 Main St\nAnytown, ST 12345\nUnited States", // This would come from a shipping form in a real app
        };

        await emailService.sendOrderConfirmationEmail(
          authState.user.email,
          orderData
        );
        console.log("✅ Order confirmation email sent successfully");
      } catch (error) {
        console.warn("⚠️ Failed to send order confirmation email:", error);
      }
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

  // Success state - Beautiful thank you message with visual hierarchy
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          {/* Success Animation Container */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Visual Indicator - Large success icon */}
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Size Hierarchy - Primary message */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-alt-gothic text-rich-black mb-4 sm:mb-6 leading-tight">
              Thank You!
            </h1>

            {/* Secondary message with emphasis */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-3 sm:mb-4 font-medium">
              Your order has been confirmed
            </p>

            {/* Body text with proper whitespace */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We appreciate your support! Your order is being processed and
              you'll receive a confirmation email shortly.
            </p>
          </div>

          {/* Order Details Card - Glass morphism on white */}
          {paymentResult?.paymentIntent && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-alt-gothic text-rich-black">
                  Order Details
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-300">
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    Order ID:
                  </span>
                  <span className="text-sm sm:text-base font-mono text-gray-900 bg-white px-3 py-1 rounded-lg">
                    {paymentResult.paymentIntent.id.slice(-12)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-300">
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    Amount Paid:
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-600">
                    ${(paymentResult.paymentIntent.amount / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    Payment Status:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-sm sm:text-base capitalize text-emerald-600 font-semibold">
                      {paymentResult.paymentIntent.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10">
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What happens next?
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-blue-800">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  You'll receive a confirmation email with your order details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Your order will be prepared and shipped within 2-3 business
                  days
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  You'll get tracking information once your package ships
                </span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons - High contrast and proper spacing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#/shop"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-fire-red hover:bg-red-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition-all group"
            >
              <span>Continue Shopping</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="#/"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 text-base sm:text-lg font-semibold rounded-xl hover:scale-105 transition-all"
            >
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Header Section with White Title */}
      <div className="bg-rich-black py-12 sm:py-16 lg:py-20 mb-12 sm:mb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            {/* White title on dark background */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-alt-gothic text-white mb-4 sm:mb-6 leading-tight">
              Checkout
            </h1>
            
            {/* Visual Cue - Accent line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-1 w-20 bg-fire-red"></div>
              <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">Secure Payment</span>
              <div className="h-1 w-20 bg-fire-red"></div>
            </div>
            
            <p className="text-base sm:text-lg text-white/80">
              Complete your order securely
            </p>
          </header>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 p-6 sm:p-8 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-2xl sm:text-3xl font-alt-gothic text-rich-black mb-6">
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
                      <h3 className="font-semibold text-rich-black">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      {(item.size || item.color) && (
                        <div className="flex gap-2 text-sm text-gray-500">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-700">Qty: {item.quantity}</span>
                        <span className="font-bold text-fire-red">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-300 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Shipping:</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Tax:</span>
                  <span className="font-semibold">${(cart.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-xl sm:text-2xl font-bold">
                  <span className="text-rich-black">Total:</span>
                  <span className="text-fire-red">
                    ${(cart.total * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            {paymentStatus === "error" && (
              <div className="mb-6 p-4 sm:p-5 bg-red-50 border-2 border-red-300 rounded-xl">
                <div className="flex items-center gap-3 text-red-800 mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-bold text-base sm:text-lg">Payment Error</span>
                </div>
                <p className="text-sm sm:text-base text-red-700 font-medium">{paymentError}</p>
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
