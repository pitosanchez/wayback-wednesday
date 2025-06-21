import React from "react";
import StarRating from "./StarRating";
import type { ProductReview } from "../../types/reviews";

interface ReviewCardProps {
  review: ProductReview;
  onMarkHelpful?: (reviewId: string) => void;
  compact?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onMarkHelpful,
  compact = false,
}) => {
  const handleMarkHelpful = () => {
    if (onMarkHelpful) {
      onMarkHelpful(review.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${
        compact ? "p-4" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-denim-blue text-white rounded-full flex items-center justify-center font-semibold">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {review.userName}
              </span>
              {review.verified && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Purchase
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Variant Info */}
        {(review.size || review.color) && (
          <div className="text-sm text-gray-500">
            {review.size && <span>Size: {review.size}</span>}
            {review.size && review.color && <span className="mx-1">•</span>}
            {review.color && <span>Color: {review.color}</span>}
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.title && (
          <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
        )}
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleMarkHelpful}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-denim-blue transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Helpful ({review.helpful})
        </button>

        {review.updatedAt > review.createdAt && (
          <span className="text-xs text-gray-400">
            Edited {new Date(review.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
