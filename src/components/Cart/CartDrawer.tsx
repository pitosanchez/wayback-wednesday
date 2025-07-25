import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={toggleCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md md:max-w-lg bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--rich-black)" }}
            >
              Shopping Cart ({cart.itemCount})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--rich-black)" }}
                >
                  Your cart is empty
                </h3>
                <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
                  Add some items to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.size}-${item.color}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span style={{ color: "var(--rich-black)" }}>Total:</span>
                <span style={{ color: "var(--fire-red)" }}>
                  ${cart.total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="#/checkout"
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </a>
                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-50"
                  style={{ color: "var(--rich-black)" }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
