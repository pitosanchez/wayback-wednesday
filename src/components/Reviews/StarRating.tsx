import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showValue = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isHalfFilled = starRating - 0.5 === rating;

        return (
          <button
            key={index}
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
            className={`
              ${
                interactive
                  ? "cursor-pointer hover:scale-110"
                  : "cursor-default"
              }
              transition-transform duration-150
              ${
                interactive
                  ? "focus:outline-none focus:ring-2 focus:ring-denim-blue focus:ring-opacity-50 rounded"
                  : ""
              }
            `}
            type="button"
          >
            <svg
              className={`${sizeClasses[size]} transition-colors duration-150`}
              fill={isFilled || isHalfFilled ? "#FFD700" : "#E5E7EB"}
              stroke={isFilled || isHalfFilled ? "#FFD700" : "#9CA3AF"}
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              {isHalfFilled ? (
                <>
                  <defs>
                    <linearGradient id={`half-${index}`}>
                      <stop offset="50%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#E5E7EB" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#half-${index})`}
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </>
              ) : (
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              )}
            </svg>
          </button>
        );
      })}

      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} out of {maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
