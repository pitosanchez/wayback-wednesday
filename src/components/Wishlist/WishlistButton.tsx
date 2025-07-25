import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import wishlistService from "../../services/wishlistService";

interface WishlistButtonProps {
  productId: string;
  size?: string;
  color?: string;
  variant?: "icon" | "button";
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  size,
  color,
  variant = "icon",
  className = "",
}) => {
  const { authState } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWishlistStatus = useCallback(async () => {
    if (!authState.user) return;

    try {
      const inWishlist = await wishlistService.isInWishlist(
        authState.user.uid,
        productId,
        size,
        color
      );
      setIsInWishlist(inWishlist);
    } catch (error) {
      console.error("Failed to check wishlist status:", error);
    }
  }, [authState.user, productId, size, color]);

  useEffect(() => {
    if (authState.user) {
      checkWishlistStatus();
    }
  }, [authState.user, checkWishlistStatus]);

  const handleToggleWishlist = async () => {
    if (!authState.user) {
      // Could show login modal here
      alert("Please log in to add items to your wishlist");
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        // Find and remove the item
        const wishlists = await wishlistService.getUserWishlists(
          authState.user.uid
        );
        const defaultWishlist = wishlists.find(
          (w) => w.name === "My Favorites"
        );
        if (defaultWishlist) {
          const item = defaultWishlist.items.find(
            (item) =>
              item.productId === productId &&
              item.size === size &&
              item.color === color
          );
          if (item) {
            await wishlistService.removeFromWishlist(
              authState.user.uid,
              item.id
            );
            setIsInWishlist(false);
          }
        }
      } else {
        // Add to wishlist
        await wishlistService.addToWishlist(authState.user.uid, {
          productId,
          size,
          color,
          priority: "medium",
        });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      if (
        error instanceof Error &&
        error.message === "Item already in wishlist"
      ) {
        setIsInWishlist(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleToggleWishlist}
        disabled={isLoading}
        className={`
          flex items-center justify-center gap-2 px-4 py-2 border rounded-lg font-medium transition-all duration-200
          ${
            isInWishlist
              ? "border-fire-red bg-fire-red text-white hover:bg-fire-red/90"
              : "border-gray-300 text-gray-700 hover:border-fire-red hover:text-fire-red"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
      >
        <svg
          className="w-5 h-5"
          fill={isInWishlist ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`
        p-2 rounded-full transition-all duration-200 group
        ${
          isInWishlist
            ? "text-fire-red hover:bg-red-50"
            : "text-gray-400 hover:text-fire-red hover:bg-red-50"
        }
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
        fill={isInWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
