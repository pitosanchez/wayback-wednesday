import React from "react";
import { useCart } from "../../context/CartContext";
import type { CartItem as CartItemType } from "../../types/cart";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-semibold text-lg truncate"
          style={{ color: "var(--rich-black)" }}
        >
          {item.name}
        </h3>
        <p className="text-sm" style={{ color: "var(--denim-blue)" }}>
          {item.category}
        </p>
        {(item.size || item.color) && (
          <div
            className="flex gap-2 text-sm mt-1"
            style={{ color: "rgba(10, 10, 10, 0.7)" }}
          >
            {item.size && <span>Size: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}

        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-1 min-w-12 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              title="Remove item"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="font-bold" style={{ color: "var(--fire-red)" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            {item.quantity > 1 && (
              <div
                className="text-sm"
                style={{ color: "rgba(10, 10, 10, 0.7)" }}
              >
                ${item.price.toFixed(2)} each
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
