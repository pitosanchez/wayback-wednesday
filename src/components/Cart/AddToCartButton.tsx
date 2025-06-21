import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/cart";

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">;
  className?: string;
  children?: React.ReactNode;
  showQuantity?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = "btn-primary",
  children = "Add to Cart",
  showQuantity = false,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);

    // Brief loading state for user feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="space-y-3">
      {showQuantity && (
        <div className="flex items-center gap-3">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--rich-black)" }}
          >
            Quantity:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 min-w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`${className} ${
          isAdding ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isAdding ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
            Adding...
          </span>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
