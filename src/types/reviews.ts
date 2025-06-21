export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  verified: boolean; // verified purchase
  helpful: number; // helpful votes
  createdAt: Date;
  updatedAt: Date;
  images?: string[]; // review images
  size?: string; // size purchased
  color?: string; // color purchased
}

export interface ReviewSummary {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  verifiedPurchaseCount: number;
  recommendationPercentage: number;
}

export interface ReviewFilters {
  rating?: number;
  verified?: boolean;
  sortBy: "newest" | "oldest" | "highest" | "lowest" | "helpful";
  size?: string;
  color?: string;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  size?: string;
  color?: string;
  images?: File[];
}

export interface ReviewResponse {
  reviews: ProductReview[];
  summary: ReviewSummary;
  hasMore: boolean;
  total: number;
}
