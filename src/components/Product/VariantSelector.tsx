import React from "react";
import type { Product, SelectedVariant } from "../../types/product";
import { getColorValue, getContrastColor } from "../../utils/colorUtils";

interface VariantSelectorProps {
  product: Product;
  selectedVariant: SelectedVariant;
  onVariantChange: (variant: SelectedVariant) => void;
  compact?: boolean;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedVariant,
  onVariantChange,
  compact = false,
}) => {
  // Get unique sizes and colors from variants
  const availableSizes = Array.from(
    new Set(product.variants.filter((v) => v.size).map((v) => v.size!))
  ).sort();

  const availableColors = Array.from(
    new Set(product.variants.filter((v) => v.color).map((v) => v.color!))
  ).sort();

  // Get current variant based on selection
  const getCurrentVariant = () => {
    return product.variants.find(
      (v) =>
        v.size === selectedVariant.size && v.color === selectedVariant.color
    );
  };

  // Check if a size/color combination is available
  const isVariantAvailable = (size?: string, color?: string) => {
    const variant = product.variants.find(
      (v) => v.size === size && v.color === color
    );
    return variant && variant.stock > 0;
  };

  // Handle size selection
  const handleSizeChange = (size: string) => {
    const newVariant: SelectedVariant = {
      ...selectedVariant,
      size,
      variant: product.variants.find(
        (v) => v.size === size && v.color === selectedVariant.color
      ),
    };
    onVariantChange(newVariant);
  };

  // Handle color selection
  const handleColorChange = (color: string) => {
    const newVariant: SelectedVariant = {
      ...selectedVariant,
      color,
      variant: product.variants.find(
        (v) => v.size === selectedVariant.size && v.color === color
      ),
    };
    onVariantChange(newVariant);
  };

  const currentVariant = getCurrentVariant();
  const currentPrice = currentVariant?.price || product.basePrice;
  const isInStock = currentVariant ? currentVariant.stock > 0 : false;
  const stockCount = currentVariant?.stock || 0;

  return (
    <div className={`space-y-4 ${compact ? "text-sm" : ""}`}>
      {/* Price Display */}
      <div className="flex items-center gap-2">
        <span
          className={`font-bold ${compact ? "text-lg" : "text-xl"}`}
          style={{ color: "var(--fire-red)" }}
        >
          ${currentPrice.toFixed(2)}
        </span>
        {currentVariant?.price &&
          currentVariant.price !== product.basePrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.basePrice.toFixed(2)}
            </span>
          )}
      </div>

      {/* Size Selector */}
      {availableSizes.length > 0 && (
        <div>
          <label
            className={`block font-medium mb-2 ${compact ? "text-sm" : ""}`}
            style={{ color: "var(--rich-black)" }}
          >
            Size:{" "}
            {selectedVariant.size && (
              <span className="font-normal">({selectedVariant.size})</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = selectedVariant.size === size;
              const isAvailable = selectedVariant.color
                ? isVariantAvailable(size, selectedVariant.color)
                : product.variants.some((v) => v.size === size && v.stock > 0);

              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  disabled={!isAvailable}
                  className={`
                    px-3 py-2 border rounded-lg font-medium transition-all duration-200
                    ${compact ? "text-xs px-2 py-1" : "text-sm"}
                    ${
                      isSelected
                        ? "border-denim-blue bg-blue-50 text-denim-blue"
                        : isAvailable
                        ? "border-gray-300 hover:border-denim-blue hover:bg-blue-50"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                  style={
                    isSelected
                      ? {
                          borderColor: "var(--denim-blue)",
                          backgroundColor: "rgba(61, 90, 254, 0.1)",
                          color: "var(--denim-blue)",
                        }
                      : {}
                  }
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {availableColors.length > 0 && (
        <div>
          <label
            className={`block font-medium mb-2 ${compact ? "text-sm" : ""}`}
            style={{ color: "var(--rich-black)" }}
          >
            Color:{" "}
            {selectedVariant.color && (
              <span className="font-normal">({selectedVariant.color})</span>
            )}
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => {
              const isSelected = selectedVariant.color === color;
              const isAvailable = selectedVariant.size
                ? isVariantAvailable(selectedVariant.size, color)
                : product.variants.some(
                    (v) => v.color === color && v.stock > 0
                  );

              const colorValue = getColorValue(color);
              const contrastColor = getContrastColor(colorValue);

              return (
                <div key={color} className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleColorChange(color)}
                    disabled={!isAvailable}
                    className={`
                      relative w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${compact ? "w-8 h-8" : "w-10 h-10"}
                      ${
                        isSelected
                          ? "border-denim-blue shadow-lg scale-110"
                          : isAvailable
                          ? "border-gray-300 hover:border-denim-blue hover:scale-105"
                          : "border-gray-200 opacity-50 cursor-not-allowed"
                      }
                    `}
                    style={{
                      backgroundColor: colorValue,
                      borderColor: isSelected
                        ? "var(--denim-blue)"
                        : color.toLowerCase() === "white"
                        ? "#e0e0e0"
                        : "transparent",
                      borderWidth: isSelected ? "3px" : "2px",
                    }}
                    title={color}
                  >
                    {/* Checkmark for selected color */}
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className={`${compact ? "w-3 h-3" : "w-4 h-4"}`}
                          fill="none"
                          stroke={contrastColor}
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Unavailable overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`${
                            compact ? "w-6 h-0.5" : "w-8 h-0.5"
                          } bg-red-500 rotate-45`}
                        />
                      </div>
                    )}
                  </button>

                  {/* Color name below swatch */}
                  <span
                    className={`${
                      compact ? "text-xs" : "text-sm"
                    } capitalize text-center ${
                      isSelected
                        ? "font-medium text-denim-blue"
                        : isAvailable
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                    style={isSelected ? { color: "var(--denim-blue)" } : {}}
                  >
                    {color}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Status */}
      <div className={`${compact ? "text-xs" : "text-sm"}`}>
        {currentVariant ? (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isInStock ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              style={{
                color: isInStock ? "var(--denim-blue)" : "var(--fire-red)",
              }}
            >
              {isInStock ? `${stockCount} in stock` : "Out of stock"}
            </span>
          </div>
        ) : (
          <span style={{ color: "rgba(10, 10, 10, 0.7)" }}>
            Select size and color to check availability
          </span>
        )}
      </div>

      {/* Variant Info */}
      {currentVariant?.sku && (
        <div className={`${compact ? "text-xs" : "text-sm"} text-gray-500`}>
          SKU: {currentVariant.sku}
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
