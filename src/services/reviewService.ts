import type {
  ProductReview,
  ReviewSummary,
  ReviewFilters,
  CreateReviewData,
  ReviewResponse,
} from "../types/reviews";

class ReviewService {
  private reviews: ProductReview[] = [];
  private summaries: Map<string, ReviewSummary> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock reviews for WB Clemente Tee
    this.reviews = [
      {
        id: "review-001",
        productId: "wb-clemente-tee",
        userId: "user-001",
        userName: "Marcus J.",
        userEmail: "marcus@example.com",
        rating: 5,
        title: "Perfect fit and great quality!",
        comment:
          "Love this tee! The WB Clemente design is fire and the quality is top notch. Fits perfectly and the material is super comfortable. Definitely recommend!",
        verified: true,
        helpful: 12,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        size: "L",
        color: "Black",
      },
      {
        id: "review-002",
        productId: "wb-clemente-tee",
        userId: "user-002",
        userName: "Sarah M.",
        userEmail: "sarah@example.com",
        rating: 4,
        title: "Great design, runs a bit small",
        comment:
          "The design is amazing and really represents the culture well. Only issue is it runs a bit small - I ordered M but should have gotten L. Still love it though!",
        verified: true,
        helpful: 8,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
        size: "M",
        color: "Black",
      },
      {
        id: "review-003",
        productId: "wayback-hoodie",
        userId: "user-003",
        userName: "Carlos R.",
        userEmail: "carlos@example.com",
        rating: 5,
        title: "Best hoodie I own",
        comment:
          "This hoodie is incredible! Heavy weight, warm, and the embroidered logo looks premium. Worth every penny. Already ordered another one in navy.",
        verified: true,
        helpful: 15,
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12"),
        size: "XL",
        color: "Black",
      },
      {
        id: "review-004",
        productId: "logo-cap",
        userId: "user-004",
        userName: "Destiny L.",
        userEmail: "destiny@example.com",
        rating: 4,
        title: "Nice cap, good quality",
        comment:
          "Really nice snapback with clean embroidery. Fits well and looks good. Only wish there were more color options.",
        verified: false,
        helpful: 3,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-08"),
        color: "Black",
      },
    ];

    // Generate summaries
    this.generateSummaries();
  }

  private generateSummaries() {
    const productGroups = this.reviews.reduce((acc, review) => {
      if (!acc[review.productId]) {
        acc[review.productId] = [];
      }
      acc[review.productId].push(review);
      return acc;
    }, {} as Record<string, ProductReview[]>);

    Object.entries(productGroups).forEach(([productId, reviews]) => {
      const totalReviews = reviews.length;
      const averageRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
      const verifiedCount = reviews.filter((r) => r.verified).length;

      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach((r) => {
        distribution[r.rating as keyof typeof distribution]++;
      });

      const recommendationPercentage =
        (reviews.filter((r) => r.rating >= 4).length / totalReviews) * 100;

      this.summaries.set(productId, {
        productId,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews,
        ratingDistribution: distribution,
        verifiedPurchaseCount: verifiedCount,
        recommendationPercentage: Math.round(recommendationPercentage),
      });
    });
  }

  async getReviews(
    productId: string,
    page: number = 1,
    limit: number = 10,
    filters?: ReviewFilters
  ): Promise<ReviewResponse> {
    let filteredReviews = this.reviews.filter((r) => r.productId === productId);

    // Apply filters
    if (filters) {
      if (filters.rating) {
        filteredReviews = filteredReviews.filter(
          (r) => r.rating === filters.rating
        );
      }
      if (filters.verified !== undefined) {
        filteredReviews = filteredReviews.filter(
          (r) => r.verified === filters.verified
        );
      }
      if (filters.size) {
        filteredReviews = filteredReviews.filter(
          (r) => r.size === filters.size
        );
      }
      if (filters.color) {
        filteredReviews = filteredReviews.filter(
          (r) => r.color === filters.color
        );
      }

      // Sort
      switch (filters.sortBy) {
        case "newest":
          filteredReviews.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          );
          break;
        case "oldest":
          filteredReviews.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
          );
          break;
        case "highest":
          filteredReviews.sort((a, b) => b.rating - a.rating);
          break;
        case "lowest":
          filteredReviews.sort((a, b) => a.rating - b.rating);
          break;
        case "helpful":
          filteredReviews.sort((a, b) => b.helpful - a.helpful);
          break;
      }
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedReviews = filteredReviews.slice(
      startIndex,
      startIndex + limit
    );

    return {
      reviews: paginatedReviews,
      summary: this.summaries.get(productId) || this.getEmptySummary(productId),
      hasMore: startIndex + limit < filteredReviews.length,
      total: filteredReviews.length,
    };
  }

  async createReview(
    reviewData: CreateReviewData,
    userId: string
  ): Promise<ProductReview> {
    const newReview: ProductReview = {
      id: `review-${Date.now()}`,
      productId: reviewData.productId,
      userId,
      userName: "Current User", // In real app, get from user profile
      userEmail: "user@example.com", // In real app, get from user profile
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      verified: true, // In real app, check if user purchased the product
      helpful: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      size: reviewData.size,
      color: reviewData.color,
    };

    this.reviews.push(newReview);
    this.generateSummaries(); // Regenerate summaries

    return newReview;
  }

  async markHelpful(reviewId: string): Promise<void> {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (review) {
      review.helpful++;
    }
  }

  async getReviewSummary(productId: string): Promise<ReviewSummary> {
    return this.summaries.get(productId) || this.getEmptySummary(productId);
  }

  private getEmptySummary(productId: string): ReviewSummary {
    return {
      productId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verifiedPurchaseCount: 0,
      recommendationPercentage: 0,
    };
  }

  // Get reviews for multiple products (for recommendations)
  async getBulkReviewSummaries(
    productIds: string[]
  ): Promise<Map<string, ReviewSummary>> {
    const result = new Map<string, ReviewSummary>();
    productIds.forEach((id) => {
      result.set(id, this.summaries.get(id) || this.getEmptySummary(id));
    });
    return result;
  }
}

export const reviewService = new ReviewService();
export default reviewService;
