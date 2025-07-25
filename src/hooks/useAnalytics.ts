import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import analyticsService from "../services/analyticsService";
import type { AnalyticsEventType } from "../types/analytics";

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views automatically
  useEffect(() => {
    analyticsService.trackEvent("page_view", {
      page: location.pathname,
      timestamp: Date.now(),
    });
  }, [location.pathname]);

  // Provide tracking functions
  const trackEvent = useCallback(
    (type: AnalyticsEventType, data?: Record<string, unknown>) => {
      analyticsService.trackEvent(type, data);
    },
    []
  );

  const trackProductView = useCallback(
    (productId: string, productName: string, price: number) => {
      analyticsService.trackEvent("product_view", {
        productId,
        productName,
        price,
        timestamp: Date.now(),
      });
    },
    []
  );

  const trackAddToCart = useCallback(
    (productId: string, quantity: number, price: number, variant?: Record<string, unknown>) => {
      analyticsService.trackEvent("add_to_cart", {
        productId,
        quantity,
        price,
        variant,
        timestamp: Date.now(),
      });
    },
    []
  );

  const trackPurchase = useCallback(
    (orderId: string, total: number, items: Record<string, unknown>[]) => {
      analyticsService.trackEvent("purchase", {
        orderId,
        total,
        items,
        itemCount: items.length,
        timestamp: Date.now(),
      });
    },
    []
  );

  const trackSearch = useCallback(
    (query: string, results: number, filters?: Record<string, unknown>) => {
      analyticsService.trackEvent("search", {
        query,
        results,
        filters,
        timestamp: Date.now(),
      });
    },
    []
  );

  const trackAddToWishlist = useCallback((productId: string, variant?: Record<string, unknown>) => {
    analyticsService.trackEvent("add_to_wishlist", {
      productId,
      variant,
      timestamp: Date.now(),
    });
  }, []);

  const trackReviewSubmit = useCallback((productId: string, rating: number) => {
    analyticsService.trackEvent("review_submit", {
      productId,
      rating,
      timestamp: Date.now(),
    });
  }, []);

  return {
    trackEvent,
    trackProductView,
    trackAddToCart,
    trackPurchase,
    trackSearch,
    trackAddToWishlist,
    trackReviewSubmit,
  };
};

export default useAnalytics;
