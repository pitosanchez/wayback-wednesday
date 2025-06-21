import React from "react";
import ProductCard from "../components/Product/ProductCard";
import type { Product } from "../types/product";
import blackTeeImage from "../assets/images/blackTee.webp?url";

const ProductVariantsDemo: React.FC = () => {
  // Sample product with comprehensive variants
  const sampleProduct: Product = {
    id: "demo-variant-tee",
    name: "Demo Variant T-Shirt",
    basePrice: 49.99,
    category: "Apparel",
    image: blackTeeImage,
    description:
      "Demonstration of product variants functionality with multiple sizes, colors, and pricing options.",
    featured: true,
    tags: ["demo", "variants", "testing"],
    variants: [
      // Small sizes
      {
        id: "demo-s-red",
        size: "S",
        color: "Red",
        stock: 5,
        sku: "DEMO-S-RED",
      },
      {
        id: "demo-s-blue",
        size: "S",
        color: "Blue",
        stock: 8,
        sku: "DEMO-S-BLU",
      },
      {
        id: "demo-s-black",
        size: "S",
        color: "Black",
        stock: 12,
        sku: "DEMO-S-BLK",
      },
      {
        id: "demo-s-white",
        size: "S",
        color: "White",
        stock: 0,
        sku: "DEMO-S-WHT",
      }, // Out of stock

      // Medium sizes
      {
        id: "demo-m-red",
        size: "M",
        color: "Red",
        stock: 10,
        sku: "DEMO-M-RED",
      },
      {
        id: "demo-m-blue",
        size: "M",
        color: "Blue",
        stock: 15,
        sku: "DEMO-M-BLU",
      },
      {
        id: "demo-m-black",
        size: "M",
        color: "Black",
        stock: 20,
        sku: "DEMO-M-BLK",
      },
      {
        id: "demo-m-white",
        size: "M",
        color: "White",
        stock: 7,
        price: 54.99,
        sku: "DEMO-M-WHT",
      }, // Premium pricing

      // Large sizes
      {
        id: "demo-l-red",
        size: "L",
        color: "Red",
        stock: 8,
        sku: "DEMO-L-RED",
      },
      {
        id: "demo-l-blue",
        size: "L",
        color: "Blue",
        stock: 12,
        sku: "DEMO-L-BLU",
      },
      {
        id: "demo-l-black",
        size: "L",
        color: "Black",
        stock: 18,
        sku: "DEMO-L-BLK",
      },
      {
        id: "demo-l-white",
        size: "L",
        color: "White",
        stock: 3,
        price: 54.99,
        sku: "DEMO-L-WHT",
      },

      // XL sizes
      {
        id: "demo-xl-red",
        size: "XL",
        color: "Red",
        stock: 4,
        sku: "DEMO-XL-RED",
      },
      {
        id: "demo-xl-blue",
        size: "XL",
        color: "Blue",
        stock: 6,
        sku: "DEMO-XL-BLU",
      },
      {
        id: "demo-xl-black",
        size: "XL",
        color: "Black",
        stock: 10,
        sku: "DEMO-XL-BLK",
      },
      {
        id: "demo-xl-white",
        size: "XL",
        color: "White",
        stock: 2,
        price: 54.99,
        sku: "DEMO-XL-WHT",
      },
    ],
  };

  // Removed unused product definitions to fix TypeScript errors

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="page-header text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--rich-black)" }}
          >
            Product Variants Demo
          </h1>
          <div className="accent-line mx-auto mb-6"></div>
          <p className="text-lg" style={{ color: "rgba(10, 10, 10, 0.7)" }}>
            Test our comprehensive product variant system with sizes, colors,
            and dynamic pricing.
          </p>
        </div>

        {/* Demo Product */}
        <div className="max-w-md mx-auto mb-12">
          <ProductCard product={sampleProduct} />
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--denim-blue)" }}
            >
              Features Demonstrated
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Size options: S, M, L, XL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Color variants: Red, Blue, Black, White</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Premium pricing for White (+$5.00)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Out of stock: Small White</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Real-time stock tracking</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--denim-blue)" }}
            >
              How to Test
            </h3>
            <ul className="space-y-2 text-sm">
              <li>1. Select different size options</li>
              <li>2. Choose various colors</li>
              <li>3. Notice price changes for White variants</li>
              <li>4. Try selecting out-of-stock combinations</li>
              <li>5. Add variants to cart and check details</li>
              <li>6. View stock levels for each selection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantsDemo;
