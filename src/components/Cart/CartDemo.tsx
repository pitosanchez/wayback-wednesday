import React from "react";
import { useCart } from "../../context/CartContext";
import AddToCartButton from "./AddToCartButton";

const CartDemo: React.FC = () => {
  const { cart, clearCart } = useCart();

  const sampleProducts = [
    {
      id: "demo-tee",
      name: "Demo T-Shirt",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Demo",
    },
    {
      id: "demo-hoodie",
      name: "Demo Hoodie",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      category: "Demo",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: "var(--rich-black)" }}
      >
        Shopping Cart Demo
      </h2>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--denim-blue)" }}
        >
          Cart Summary
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--fire-red)" }}
            >
              {cart.itemCount}
            </div>
            <div className="text-sm text-gray-600">Items</div>
          </div>
          <div>
            <div
              className="text-2xl font-bold"
              style={{ color: "var(--fire-red)" }}
            >
              ${cart.total.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              disabled={cart.itemCount === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {/* Sample Products */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {sampleProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--rich-black)" }}
            >
              {product.name}
            </h3>
            <p
              className="text-lg font-bold mb-4"
              style={{ color: "var(--fire-red)" }}
            >
              ${product.price}
            </p>
            <AddToCartButton
              product={product}
              showQuantity={true}
              className="btn-primary w-full"
            />
          </div>
        ))}
      </div>

      {/* Cart Items */}
      {cart.items.length > 0 && (
        <div>
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--denim-blue)" }}
          >
            Items in Cart
          </h3>
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex justify-between items-center bg-white p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="font-bold" style={{ color: "var(--fire-red)" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDemo;
