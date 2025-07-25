export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  data: Record<string, unknown>;
  source: "web" | "mobile" | "api";
  userAgent?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
}

export type AnalyticsEventType =
  | "page_view"
  | "product_view"
  | "add_to_cart"
  | "remove_from_cart"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "search"
  | "purchase"
  | "review_submit"
  | "user_register"
  | "user_login"
  | "email_signup"
  | "social_share"
  | "video_play"
  | "download"
  | "error"
  | "performance";

export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  customerLifetimeValue: number;
  returnCustomerRate: number;
  cartAbandonmentRate: number;
  refundRate: number;
  period: TimePeriod;
  previousPeriodComparison: {
    revenueChange: number;
    ordersChange: number;
    aovChange: number;
    conversionChange: number;
  };
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  views: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
  wishlistAdds: number;
  cartAdds: number;
  cartAbandonments: number;
  searchRank: number;
  categoryRank: number;
  profitMargin: number;
  stockTurnover: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  customerCount: number;
  averageOrderValue: number;
  totalRevenue: number;
  conversionRate: number;
  retentionRate: number;
  churnRate: number;
  lifetimeValue: number;
}

export interface SegmentCriteria {
  ageRange?: [number, number];
  location?: string[];
  totalSpent?: [number, number];
  orderCount?: [number, number];
  lastPurchase?: [Date, Date];
  categories?: string[];
  devices?: ("mobile" | "desktop" | "tablet")[];
  acquisitionChannel?: string[];
}

export interface TrafficAnalytics {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  newVisitorRate: number;
  topPages: PageMetric[];
  topReferrers: ReferrerMetric[];
  deviceBreakdown: DeviceMetric[];
  locationBreakdown: LocationMetric[];
  hourlyTraffic: HourlyMetric[];
}

export interface PageMetric {
  page: string;
  views: number;
  uniqueViews: number;
  averageTimeOnPage: number;
  exitRate: number;
  conversionRate: number;
}

export interface ReferrerMetric {
  source: string;
  visitors: number;
  conversionRate: number;
  revenue: number;
  type: "direct" | "organic" | "social" | "email" | "paid" | "referral";
}

export interface DeviceMetric {
  device: "mobile" | "desktop" | "tablet";
  visitors: number;
  percentage: number;
  conversionRate: number;
  averageOrderValue: number;
}

export interface LocationMetric {
  country: string;
  region?: string;
  city?: string;
  visitors: number;
  percentage: number;
  revenue: number;
}

export interface HourlyMetric {
  hour: number;
  visitors: number;
  conversions: number;
  revenue: number;
}

export interface SearchAnalytics {
  totalSearches: number;
  uniqueSearchTerms: number;
  averageResultsClicked: number;
  noResultsRate: number;
  topSearchTerms: SearchTermMetric[];
  searchConversionRate: number;
  searchToCartRate: number;
  searchToPurchaseRate: number;
  refinementRate: number;
}

export interface SearchTermMetric {
  term: string;
  searches: number;
  results: number;
  clicks: number;
  conversions: number;
  revenue: number;
  clickThroughRate: number;
  conversionRate: number;
}

export interface CampaignAnalytics {
  campaignId: string;
  name: string;
  type: "email" | "social" | "display" | "search" | "influencer" | "content";
  status: "active" | "paused" | "completed" | "draft";
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  clickThroughRate: number;
  conversionRate: number;
  returnOnAdSpend: number;
  costPerAcquisition: number;
  reachMetrics: {
    totalReach: number;
    uniqueReach: number;
    frequency: number;
  };
}

export interface PredictiveAnalytics {
  salesForecast: SalesForecast;
  customerChurnPrediction: ChurnPrediction[];
  inventoryDemandForecast: DemandForecast[];
  seasonalTrends: SeasonalTrend[];
  priceOptimization: PriceRecommendation[];
}

export interface SalesForecast {
  period: TimePeriod;
  predictedRevenue: number;
  predictedOrders: number;
  confidence: number;
  factors: ForecastFactor[];
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

export interface ChurnPrediction {
  customerId: string;
  churnProbability: number;
  riskLevel: "low" | "medium" | "high";
  factors: string[];
  recommendedActions: string[];
  estimatedValue: number;
}

export interface DemandForecast {
  productId: string;
  productName: string;
  predictedDemand: number;
  currentStock: number;
  recommendedStock: number;
  confidence: number;
  seasonalFactor: number;
  trendFactor: number;
}

export interface SeasonalTrend {
  category: string;
  month: number;
  demandMultiplier: number;
  revenueMultiplier: number;
  confidence: number;
  historicalData: number[];
}

export interface PriceRecommendation {
  productId: string;
  currentPrice: number;
  recommendedPrice: number;
  expectedImpact: {
    demandChange: number;
    revenueChange: number;
    profitChange: number;
  };
  confidence: number;
  factors: string[];
}

export interface ForecastFactor {
  name: string;
  impact: number;
  confidence: number;
  description: string;
}

export interface TimePeriod {
  start: Date;
  end: Date;
  granularity: "hour" | "day" | "week" | "month" | "quarter" | "year";
}

export interface AnalyticsDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  layout: WidgetLayout[];
  filters: DashboardFilter[];
  refreshInterval: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  dataSource: string;
  configuration: Record<string, unknown>;
  refreshRate: number;
  position: WidgetPosition;
  size: WidgetSize;
}

export type WidgetType =
  | "line_chart"
  | "bar_chart"
  | "pie_chart"
  | "area_chart"
  | "metric_card"
  | "table"
  | "heatmap"
  | "funnel"
  | "gauge"
  | "treemap"
  | "scatter_plot"
  | "histogram";

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface WidgetLayout {
  widgetId: string;
  position: WidgetPosition;
  size: WidgetSize;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: "date_range" | "select" | "multi_select" | "number_range" | "text";
  options?: FilterOption[];
  defaultValue?: unknown;
  appliesToWidgets: string[];
}

export interface FilterOption {
  label: string;
  value: unknown;
}

export interface AnalyticsReport {
  id: string;
  name: string;
  description: string;
  type: "sales" | "traffic" | "product" | "customer" | "marketing" | "custom";
  schedule: ReportSchedule;
  format: "pdf" | "excel" | "csv" | "json";
  recipients: string[];
  filters: Record<string, unknown>;
  lastGenerated?: Date;
  nextGeneration?: Date;
  isActive: boolean;
}

export interface ReportSchedule {
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
}

export interface AnalyticsAlert {
  id: string;
  name: string;
  description: string;
  metric: string;
  condition: AlertCondition;
  threshold: number;
  isActive: boolean;
  recipients: string[];
  lastTriggered?: Date;
  frequency: "immediate" | "hourly" | "daily";
}

export interface AlertCondition {
  operator:
    | "greater_than"
    | "less_than"
    | "equals"
    | "not_equals"
    | "percentage_change";
  comparisonPeriod?:
    | "previous_hour"
    | "previous_day"
    | "previous_week"
    | "previous_month";
  minimumSampleSize?: number;
}
