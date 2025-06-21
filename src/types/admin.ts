export interface AdminUser {
  id: string;
  uid: string;
  email: string;
  role: "admin" | "moderator" | "staff";
  permissions: AdminPermission[];
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  orderCount: number;
  totalSpent: number;
  status: "active" | "suspended" | "inactive";
}

export interface AdminPermission {
  resource:
    | "products"
    | "orders"
    | "users"
    | "inventory"
    | "analytics"
    | "settings";
  actions: ("create" | "read" | "update" | "delete")[];
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockItems: number;
  pendingOrders: number;
  recentOrders: OrderSummary[];
  topProducts: ProductSummary[];
}

export interface OrderSummary {
  id: string;
  customerEmail: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
  itemCount: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
  image: string;
  category: string;
}

export interface UserSummary {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role: "customer" | "admin" | "moderator";
  orderCount: number;
  totalSpent: number;
  lastOrderDate?: Date;
  joinDate: Date;
  createdAt: Date;
  isActive: boolean;
  status: "active" | "suspended" | "inactive";
}

export interface AdminOrderDetails {
  id: string;
  customer: {
    uid: string;
    email: string;
    displayName?: string;
  };
  customerEmail: string;
  items: AdminOrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "completed"
    | "cancelled"
    | "refunded";
  orderDate: Date;
  createdAt: Date;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  refundAmount?: number;
  refundReason?: string;
}

export interface AdminOrderItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  sku: string;
}

export interface ProductManagement {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  price: number;
  category: string;
  image: string;
  images?: string[];
  featured: boolean;
  active: boolean;
  status: "active" | "draft" | "archived";
  stock: number;
  tags: string[];
  variants: ProductVariantManagement[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  totalSold: number;
  revenue: number;
}

export interface ProductVariantManagement {
  id: string;
  size?: string;
  color?: string;
  price?: number;
  stock: number;
  sku: string;
  active: boolean;
  lowStockThreshold: number;
}

export interface InventoryAlert {
  id: string;
  type: "low_stock" | "out_of_stock" | "restock_needed" | "variant_inactive";
  productId: string;
  variantId?: string;
  productName: string;
  variantDetails?: string;
  message: string;
  currentStock: number;
  threshold: number;
  severity: "low" | "medium" | "high" | "critical";
  createdAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface AdminContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  permissions: AdminPermission[];
  hasPermission: (resource: string, action: string) => boolean;
  adminStats: AdminStats | null;
  loading: boolean;
  error: string | null;
}

export interface SalesAnalytics {
  period: "day" | "week" | "month" | "year";
  data: SalesDataPoint[];
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueByMonth: { month: string; revenue: number }[];
  topProducts: {
    productId: string;
    name: string;
    unitsSold: number;
    revenue: number;
  }[];
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface ProductAnalytics {
  productId: string;
  name: string;
  views: number;
  addToCart: number;
  purchases: number;
  conversionRate: number;
  revenue: number;
  averageRating?: number;
  reviewCount?: number;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerLifetimeValue: number;
  churnRate: number;
  topCustomers: UserSummary[];
}

// Export aliases for compatibility
export type Order = AdminOrderDetails;
export type Product = ProductManagement;
