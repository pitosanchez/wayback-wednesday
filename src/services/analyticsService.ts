import type {
  AnalyticsEvent,
  AnalyticsEventType,
  SalesMetrics,
  ProductAnalytics,
  TimePeriod,
} from "../types/analytics";
import { logger } from "../utils/logger";

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeMockData();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private initializeMockData() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 2000; i++) {
      const eventDate = new Date(
        thirtyDaysAgo.getTime() +
          Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
      );

      const eventTypes: AnalyticsEventType[] = [
        "page_view",
        "product_view",
        "add_to_cart",
        "search",
        "purchase",
      ];

      const randomEventType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      this.events.push({
        id: `event_${i}`,
        type: randomEventType,
        userId:
          Math.random() > 0.3
            ? `user_${Math.floor(Math.random() * 500)}`
            : undefined,
        sessionId: `session_${Math.floor(Math.random() * 200)}`,
        timestamp: eventDate,
        data: this.generateMockEventData(randomEventType),
        source: Math.random() > 0.7 ? "mobile" : "web",
      });
    }
  }

  private generateMockEventData(
    eventType: AnalyticsEventType
  ): Record<string, unknown> {
    const products = [
      "wb-clemente-tee",
      "wayback-hoodie",
      "vintage-tee",
      "logo-cap",
    ];
    const pages = ["/shop", "/about", "/history", "/music"];

    switch (eventType) {
      case "page_view":
        return { page: pages[Math.floor(Math.random() * pages.length)] };
      case "product_view":
        return {
          productId: products[Math.floor(Math.random() * products.length)],
        };
      case "add_to_cart":
        return {
          productId: products[Math.floor(Math.random() * products.length)],
          quantity: Math.floor(Math.random() * 3) + 1,
          price: Math.floor(Math.random() * 100) + 20,
        };
      case "search":
        return {
          query: ["hoodie", "black", "vintage"][Math.floor(Math.random() * 3)],
        };
      case "purchase":
        return {
          orderId: `order_${Math.floor(Math.random() * 10000)}`,
          total: Math.floor(Math.random() * 200) + 25,
        };
      default:
        return {};
    }
  }

  trackEvent(type: AnalyticsEventType, data: Record<string, unknown> = {}): void {
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      type,
      userId: this.getCurrentUserId(),
      sessionId: this.sessionId,
      timestamp: new Date(),
      data,
      source: "web",
    };

    this.events.push(event);
    logger.debug("Analytics Event Tracked", { eventId: event.id, type: event.type, userId: event.userId });
  }

  async getSalesMetrics(period: TimePeriod): Promise<SalesMetrics> {
    const purchaseEvents = this.getEventsInPeriod("purchase", period);
    const totalRevenue = purchaseEvents.reduce(
      (sum, event) => sum + ((event.data.total as number) || 0),
      0
    );
    const totalOrders = purchaseEvents.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const uniqueVisitors = new Set(
      this.getEventsInPeriod("page_view", period)
        .filter((e) => e.userId)
        .map((e) => e.userId)
    ).size;
    const conversionRate =
      uniqueVisitors > 0 ? (totalOrders / uniqueVisitors) * 100 : 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      conversionRate,
      customerLifetimeValue: 156.78,
      returnCustomerRate: 24.5,
      cartAbandonmentRate: 68.2,
      refundRate: 2.1,
      period,
      previousPeriodComparison: {
        revenueChange: 12.3,
        ordersChange: 8.7,
        aovChange: 3.2,
        conversionChange: 5.1,
      },
    };
  }

  async getProductAnalytics(period: TimePeriod): Promise<ProductAnalytics[]> {
    const productIds = [
      "wb-clemente-tee",
      "wayback-hoodie",
      "vintage-tee",
      "logo-cap",
    ];

    return productIds.map((productId) => {
      const views = this.getEventsInPeriod("product_view", period).filter(
        (e) => e.data.productId === productId
      ).length;

      const purchases = this.getEventsInPeriod("purchase", period).length;
      const revenue = Math.floor(Math.random() * 5000) + 500;

      return {
        productId,
        productName: this.getProductName(productId),
        views,
        purchases: Math.floor(purchases * 0.1),
        revenue,
        conversionRate: views > 0 ? (purchases / views) * 100 : 0,
        averageRating: 4.2 + Math.random() * 0.6,
        reviewCount: Math.floor(Math.random() * 50) + 5,
        wishlistAdds: Math.floor(Math.random() * 20) + 5,
        cartAdds: Math.floor(Math.random() * 30) + 10,
        cartAbandonments: Math.floor(Math.random() * 15) + 3,
        searchRank: Math.floor(Math.random() * 10) + 1,
        categoryRank: Math.floor(Math.random() * 5) + 1,
        profitMargin: 35 + Math.random() * 20,
        stockTurnover: 2.1 + Math.random() * 1.5,
      };
    });
  }

  private getEventsInPeriod(
    type: AnalyticsEventType,
    period: TimePeriod
  ): AnalyticsEvent[] {
    return this.events.filter(
      (event) =>
        event.type === type &&
        event.timestamp >= period.start &&
        event.timestamp <= period.end
    );
  }

  private getCurrentUserId(): string | undefined {
    return localStorage.getItem("currentUserId") || undefined;
  }

  private getProductName(productId: string): string {
    const productNames: Record<string, string> = {
      "wb-clemente-tee": "WB Clemente Black Tee",
      "wayback-hoodie": "WAYBACK Hoodie",
      "vintage-tee": "Vintage Tee",
      "logo-cap": "Logo Cap",
    };
    return productNames[productId] || productId;
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
