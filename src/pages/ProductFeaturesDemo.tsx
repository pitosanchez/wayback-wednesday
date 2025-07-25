import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/Search/SearchBar";
import StarRating from "../components/Reviews/StarRating";
import ReviewCard from "../components/Reviews/ReviewCard";
import WishlistButton from "../components/Wishlist/WishlistButton";
import reviewService from "../services/reviewService";
import searchService from "../services/searchService";
import wishlistService from "../services/wishlistService";
import { useAuth } from "../context/AuthContext";
import type { ProductReview, CreateReviewData } from "../types/reviews";
import type { SearchResult } from "../types/search";
import type { WishlistWithProducts } from "../types/wishlist";
import type { ProductFeatureTab } from "../types/navigation";

const ProductFeaturesDemo: React.FC = () => {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState<ProductFeatureTab>("search");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [wishlist, setWishlist] = useState<WishlistWithProducts | null>(null);
  const [newReview, setNewReview] = useState<Partial<CreateReviewData>>({
    productId: "wb-clemente-tee",
    rating: 5,
    title: "",
    comment: "",
  });

  const loadInitialData = useCallback(async () => {
    try {
      switch (activeTab) {
        case "search": {
          // Load initial search results
          const searchResult = await searchService.search({
            sortBy: "relevance",
          });
          setSearchResults(searchResult);
          break;
        }
        case "reviews": {
          // Load reviews for demo product
          const reviewsData = await reviewService.getReviews("wb-clemente-tee");
          setReviews(reviewsData.reviews);
          break;
        }
        case "wishlist":
          if (authState.user) {
            const wishlists = await wishlistService.getUserWishlists(
              authState.user.uid
            );
            if (wishlists.length > 0) {
              const wishlistData =
                await wishlistService.getWishlistWithProducts(wishlists[0].id);
              setWishlist(wishlistData);
            }
          }
          break;
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }, [activeTab, authState.user]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSearch = async (query: string) => {
    try {
      const result = await searchService.search({ query, sortBy: "relevance" });
      setSearchResults(result);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleCreateReview = async () => {
    if (!authState.user) {
      alert("Please log in to write a review");
      return;
    }

    if (!newReview.title || !newReview.comment) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await reviewService.createReview(
        newReview as CreateReviewData,
        authState.user.uid
      );
      // Reload reviews
      const reviewsData = await reviewService.getReviews("wb-clemente-tee");
      setReviews(reviewsData.reviews);
      // Reset form
      setNewReview({
        productId: "wb-clemente-tee",
        rating: 5,
        title: "",
        comment: "",
      });
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to create review:", error);
      alert("Failed to submit review");
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await reviewService.markHelpful(reviewId);
      // Reload reviews to show updated helpful count
      const reviewsData = await reviewService.getReviews("wb-clemente-tee");
      setReviews(reviewsData.reviews);
    } catch (error) {
      console.error("Failed to mark review as helpful:", error);
    }
  };

  const tabs: Array<{ id: ProductFeatureTab; label: string; icon: string }> = [
    { id: "search", label: "Search & Discovery", icon: "🔍" },
    { id: "reviews", label: "Reviews & Ratings", icon: "⭐" },
    { id: "wishlist", label: "Wishlist & Favorites", icon: "💖" },
  ];

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Product Features Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the enhanced shopping features: intelligent search,
            customer reviews, and personalized wishlists that make Wayback
            Wednesday a modern e-commerce destination.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex justify-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 border-b-2 font-medium text-lg ${
                  activeTab === tab.id
                    ? "border-denim-blue text-denim-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Intelligent Product Search
              </h2>
              <SearchBar
                onSearch={handleSearch}
                placeholder="Try searching for 'hoodie', 'black', or 'vintage'..."
                className="w-full"
              />
            </div>

            {searchResults && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Search Results ({searchResults.total} items)
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>Relevance</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Customer Rating</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {product.name}
                          </h4>
                          <WishlistButton productId={product.id} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={product.rating} size="sm" />
                          <span className="text-sm text-gray-600">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-fire-red">
                            ${product.currentPrice.toFixed(2)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {product.colors.slice(0, 3).map((color) => (
                              <span
                                key={color}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Customer Reviews & Ratings
              </h2>
              <p className="text-gray-600">
                See what customers are saying about the WB Clemente Black Tee
              </p>
            </div>

            {/* Write Review Form */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write a Review
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <StarRating
                    rating={newReview.rating || 5}
                    interactive
                    onRatingChange={(rating) =>
                      setNewReview({ ...newReview, rating })
                    }
                    size="lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={newReview.title || ""}
                    onChange={(e) =>
                      setNewReview({ ...newReview, title: e.target.value })
                    }
                    placeholder="Summarize your experience..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-denim-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment || ""}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-denim-blue focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleCreateReview}
                  className="w-full bg-denim-blue text-white py-2 px-4 rounded-lg hover:bg-denim-blue/90 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Customer Reviews
              </h3>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onMarkHelpful={handleMarkHelpful}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to review this product!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Wishlist & Favorites
              </h2>
              <p className="text-gray-600">
                Save items you love and get notified about price drops
              </p>
            </div>

            {!authState.user ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-fire-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-fire-red"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Sign in to view your wishlist
                </h3>
                <p className="text-gray-600 mb-4">
                  Create an account to save your favorite items and get
                  personalized recommendations.
                </p>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-denim-blue text-white px-6 py-2 rounded-lg hover:bg-denim-blue/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            ) : wishlist && wishlist.itemsWithProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.itemsWithProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <WishlistButton
                          productId={item.productId}
                          size={item.size}
                          color={item.color}
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {item.product.name}
                      </h4>
                      {(item.size || item.color) && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " • "}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-fire-red">
                          ${item.product.currentPrice.toFixed(2)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-600 mb-3">
                          Note: {item.notes}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button className="flex-1 bg-denim-blue text-white py-2 px-4 rounded-lg hover:bg-denim-blue/90 transition-colors">
                          Add to Cart
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-600 mb-4">
                  Start adding items you love by clicking the heart icon on any
                  product.
                </p>
                <button
                  onClick={() => (window.location.href = "/shop")}
                  className="bg-denim-blue text-white px-6 py-2 rounded-lg hover:bg-denim-blue/90 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFeaturesDemo;
