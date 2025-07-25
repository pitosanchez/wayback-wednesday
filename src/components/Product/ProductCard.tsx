import React, { useState, useEffect } from "react";
import type { Product, SelectedVariant } from "../../types/product";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "../Cart/AddToCartButton";
import WBClementeImage from "../../assets/images/WBClemente.webp?url";
import { getColorValue } from "../../utils/colorUtils";
import StarRating from "../Reviews/StarRating";
import WishlistButton from "../Wishlist/WishlistButton";
import reviewService from "../../services/reviewService";
import type { ReviewSummary } from "../../types/reviews";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
  showQuickView = true,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({
    productId: product.id,
    size: undefined,
    color: undefined,
    variant: undefined,
  });

  const [showVariants, setShowVariants] = useState(false);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(
    null
  );

  useEffect(() => {
    const loadReviewSummary = async () => {
      try {
        const summary = await reviewService.getReviewSummary(product.id);
        setReviewSummary(summary);
      } catch (error) {
        console.error("Failed to load review summary:", error);
      }
    };

    loadReviewSummary();
  }, [product.id]);

  // Get the current variant or use base product info
  const currentVariant = selectedVariant.variant;
  const currentPrice = currentVariant?.price || product.basePrice;
  const isInStock = currentVariant
    ? currentVariant.stock > 0
    : product.variants.some((v) => v.stock > 0);
  const hasVariants =
    product.variants.length > 0 &&
    (product.variants.some((v) => v.size) ||
      product.variants.some((v) => v.color));

  // Get the current image - use variant image if available, otherwise use base product image
  const currentImage = currentVariant?.image || product.image;

  // For cart integration, we need a complete variant selection for products with variants
  const canAddToCart = !hasVariants || (selectedVariant.variant && isInStock);

  const handleVariantChange = (variant: SelectedVariant) => {
    setSelectedVariant(variant);
  };

  const getCartProduct = () => {
    return {
      id: currentVariant ? `${product.id}-${currentVariant.id}` : product.id,
      name: product.name,
      price: currentPrice,
      image: currentImage, // Use the current image (variant or base)
      category: product.category,
      size: selectedVariant.size,
      color: selectedVariant.color,
    };
  };

  return (
    <div className={`product-card group ${compact ? "compact" : ""}`}>
      {/* Product Image */}
      <div className="product-image relative">
        <img
          src={currentImage} // Use currentImage instead of product.image
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* WB Design Overlay */}
        {product.hasWBDesign && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingTop: "4%" }}
          >
            <div className="relative">
              <img
                src={WBClementeImage}
                alt="WB Clemente Design"
                className="w-32 h-28 sm:w-36 sm:h-32 md:w-40 md:h-36 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
              />
            </div>
          </div>
        )}

        {/* Stock Badge */}
        {!isInStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Out of Stock
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2">
          <WishlistButton
            productId={product.id}
            size={selectedVariant.size}
            color={selectedVariant.color}
          />
        </div>

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowVariants(!showVariants)}
              className="px-6 py-2 rounded-full font-semibold"
              style={{
                backgroundColor: "var(--warm-white)",
                color: "var(--rich-black)",
              }}
            >
              {hasVariants ? "Select Options" : "Quick View"}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <span
          className="text-sm uppercase tracking-wider font-bold"
          style={{ color: "var(--denim-blue)" }}
        >
          {product.category}
        </span>

        <h3
          className={`font-bold mt-2 ${compact ? "text-lg" : "text-xl"}`}
          style={{ color: "var(--rich-black)" }}
        >
          {product.name}
          {selectedVariant.color && (
            <span className="text-sm font-normal text-gray-600 ml-2">
              - {selectedVariant.color}
            </span>
          )}
        </h3>

        {/* Product Description */}
        {product.description && !compact && (
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(10, 10, 10, 0.7)" }}
          >
            {product.description}
          </p>
        )}

        {/* Reviews */}
        {reviewSummary && reviewSummary.totalReviews > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={reviewSummary.averageRating} size="sm" />
            <span className="text-sm text-gray-600">
              {reviewSummary.averageRating.toFixed(1)} (
              {reviewSummary.totalReviews} reviews)
            </span>
          </div>
        )}

        {/* Variant Selection */}
        {hasVariants && (showVariants || compact) ? (
          <div className="mt-4">
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
              compact={compact}
            />
          </div>
        ) : (
          // Simple price display when variants are hidden
          <div className="mt-2">
            <div
              className={`${compact ? "text-lg" : "text-xl"} font-bold`}
              style={{ color: "var(--fire-red)" }}
            >
              ${product.basePrice.toFixed(2)}
              {hasVariants && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  + options
                </span>
              )}
            </div>

            {/* Color preview when variants are hidden */}
            {hasVariants && !compact && (
              <div className="mt-2">
                {/* Available colors preview */}
                {Array.from(
                  new Set(
                    product.variants.filter((v) => v.color).map((v) => v.color!)
                  )
                ).length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Colors:</span>
                    <div className="flex gap-1">
                      {Array.from(
                        new Set(
                          product.variants
                            .filter((v) => v.color)
                            .map((v) => v.color!)
                        )
                      )
                        .slice(0, 4)
                        .map((color) => {
                          return (
                            <div
                              key={color}
                              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: getColorValue(color),
                                borderColor:
                                  color.toLowerCase() === "white"
                                    ? "#e0e0e0"
                                    : "transparent",
                              }}
                              title={color}
                            />
                          );
                        })}
                      {Array.from(
                        new Set(
                          product.variants
                            .filter((v) => v.color)
                            .map((v) => v.color!)
                        )
                      ).length > 4 && (
                        <span className="text-xs text-gray-500">
                          +
                          {Array.from(
                            new Set(
                              product.variants
                                .filter((v) => v.color)
                                .map((v) => v.color!)
                            )
                          ).length - 4}{" "}
                          more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-4">
          {canAddToCart ? (
            <AddToCartButton
              product={getCartProduct()}
              className="btn-primary w-full"
            />
          ) : (
            <button
              onClick={() => setShowVariants(true)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-50"
              style={{ color: "var(--rich-black)" }}
            >
              {hasVariants ? "Select Options" : "View Details"}
            </button>
          )}
        </div>

        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
