// Navigation and tab type definitions
export type AdminTabId = "orders" | "products" | "users" | "analytics";
export type OrderFilterType =
  | "all"
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";
export type TimePeriod = "day" | "week" | "month" | "year";
export type ProductFeatureTab = "search" | "reviews" | "wishlist";
export type AnalyticsTab = "overview" | "sales" | "products" | "predictions";
