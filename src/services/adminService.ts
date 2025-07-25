import type {
  AdminUser,
  AdminStats,
  AdminOrderDetails,
  ProductManagement,
  UserSummary,
  InventoryAlert,
  SalesAnalytics,
  ProductAnalytics,
  CustomerAnalytics,
} from "../types/admin";
import { logger } from "../utils/logger";

class AdminService {
  private adminUsers: AdminUser[] = [];
  private mockStats: AdminStats | null = null;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock admin users
    this.adminUsers = [
      {
        id: "admin-001",
        uid: "admin-001",
        email: "admin@wayback-wednesday.com",
        role: "admin",
        permissions: [
          {
            resource: "products",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "orders",
            actions: ["create", "read", "update", "delete"],
          },
          { resource: "users", actions: ["read", "update", "delete"] },
          {
            resource: "inventory",
            actions: ["create", "read", "update", "delete"],
          },
          { resource: "analytics", actions: ["read"] },
          { resource: "settings", actions: ["read", "update"] },
        ],
        createdAt: new Date("2024-01-01"),
        lastLogin: new Date(),
        isActive: true,
        orderCount: 0,
        totalSpent: 0,
        status: "active",
      },
    ];

    // Mock admin stats
    this.mockStats = {
      totalOrders: 156,
      totalRevenue: 12450.0,
      totalUsers: 89,
      totalCustomers: 89,
      totalProducts: 12,
      lowStockItems: 3,
      pendingOrders: 8,
      recentOrders: [
        {
          id: "ORD-2024-156",
          customerEmail: "customer@example.com",
          total: 95.0,
          status: "pending",
          orderDate: new Date(),
          itemCount: 2,
        },
        {
          id: "ORD-2024-155",
          customerEmail: "user@test.com",
          total: 140.0,
          status: "processing",
          orderDate: new Date(Date.now() - 86400000),
          itemCount: 3,
        },
      ],
      topProducts: [
        {
          id: "wb-clemente-tee",
          name: "WB Clemente Black Tee",
          totalSold: 45,
          revenue: 2475.0,
          image: "/src/assets/images/blackTee.webp",
          category: "Apparel",
        },
        {
          id: "wayback-hoodie",
          name: "WAYBACK Hoodie",
          totalSold: 32,
          revenue: 2720.0,
          image: "/api/placeholder/300/300",
          category: "Apparel",
        },
      ],
    };
  }

  // Admin authentication
  async checkAdminStatus(userEmail: string): Promise<AdminUser | null> {
    return (
      this.adminUsers.find(
        (admin) => admin.email === userEmail && admin.isActive
      ) || null
    );
  }

  // Dashboard stats
  async getAdminStats(): Promise<AdminStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.mockStats!;
  }

  async getStats(): Promise<AdminStats> {
    return this.getAdminStats();
  }

  // Order management
  async getOrders(
    page: number = 1,
    limit: number = 20,
    status?: string,
    search?: string
  ): Promise<{ orders: AdminOrderDetails[]; total: number; hasMore: boolean }> {
    // Mock orders data
    const mockOrders: AdminOrderDetails[] = [
      {
        id: "ORD-2024-156",
        customer: {
          uid: "user-001",
          email: "customer@example.com",
          displayName: "John Doe",
        },
        customerEmail: "customer@example.com",
        items: [
          {
            productId: "wb-clemente-tee",
            variantId: "wb-clemente-m-black",
            name: "WB Clemente Black Tee",
            image: "/src/assets/images/blackTee.webp",
            quantity: 1,
            price: 55.0,
            size: "M",
            color: "Black",
            sku: "WB-CLEM-M-BLK",
          },
          {
            productId: "wayback-hoodie",
            variantId: "hoodie-l-black",
            name: "WAYBACK Hoodie",
            image: "/api/placeholder/300/300",
            quantity: 1,
            price: 85.0,
            size: "L",
            color: "Black",
            sku: "WB-HOOD-L-BLK",
          },
        ],
        total: 150.9,
        subtotal: 140.0,
        tax: 10.9,
        shipping: 0.0,
        status: "pending",
        orderDate: new Date(),
        createdAt: new Date(),
        shippingAddress: {
          name: "John Doe",
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        billingAddress: {
          name: "John Doe",
          street: "123 Hip Hop Ave",
          city: "East Harlem",
          state: "NY",
          zipCode: "10029",
          country: "USA",
        },
        paymentMethod: "**** **** **** 4242",
      },
    ];

    // Filter by status if provided
    let filteredOrders = mockOrders;
    if (status && status !== "all") {
      filteredOrders = mockOrders.filter((order) => order.status === status);
    }

    // Filter by search if provided
    if (search) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.displayName
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      total: filteredOrders.length,
      hasMore: endIndex < filteredOrders.length,
    };
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
    trackingNumber?: string
  ): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    logger.info(`Order ${orderId} status updated to ${status}`, {
      orderId,
      status,
      trackingNumber,
    });
  }

  // Product management
  async getProducts(
    page: number = 1,
    limit: number = 20,
    category?: string,
    search?: string
  ): Promise<{
    products: ProductManagement[];
    total: number;
    hasMore: boolean;
  }> {
    // Mock products data
    const mockProducts: ProductManagement[] = [
      {
        id: "wb-clemente-tee",
        name: "WB Clemente Black Tee",
        description: "Premium black tee featuring WB Clemente design",
        basePrice: 55.0,
        price: 55.0,
        category: "Apparel",
        image: "/src/assets/images/blackTee.webp",
        featured: true,
        active: true,
        status: "active",
        stock: 23,
        tags: ["featured", "new", "clemente"],
        variants: [
          {
            id: "wb-clemente-s-black",
            size: "S",
            color: "Black",
            stock: 15,
            sku: "WB-CLEM-S-BLK",
            active: true,
            lowStockThreshold: 5,
          },
          {
            id: "wb-clemente-m-black",
            size: "M",
            color: "Black",
            stock: 8,
            sku: "WB-CLEM-M-BLK",
            active: true,
            lowStockThreshold: 5,
          },
        ],
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date(),
        createdBy: "admin-001",
        totalSold: 45,
        revenue: 2475.0,
      },
    ];

    // Apply filters
    let filteredProducts = mockProducts;
    if (category && category !== "all") {
      filteredProducts = mockProducts.filter(
        (product) => product.category === category
      );
    }
    if (search) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      hasMore: endIndex < filteredProducts.length,
    };
  }

  async updateProduct(
    productId: string,
    updates: Partial<ProductManagement>
  ): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    logger.info(`Product ${productId} updated`, { productId, updates });
  }

  // User management
  async getUsers(
    page: number = 1,
    limit: number = 20,
    search?: string
  ): Promise<{ users: UserSummary[]; total: number; hasMore: boolean }> {
    // Mock users data
    const mockUsers: UserSummary[] = [
      {
        id: "user-001",
        uid: "user-001",
        email: "customer@example.com",
        displayName: "John Doe",
        role: "customer",
        orderCount: 3,
        totalSpent: 285.0,
        lastOrderDate: new Date(),
        joinDate: new Date("2024-01-10"),
        createdAt: new Date("2024-01-10"),
        isActive: true,
        status: "active",
      },
      {
        id: "user-002",
        uid: "user-002",
        email: "user@test.com",
        displayName: "Jane Smith",
        role: "customer",
        orderCount: 1,
        totalSpent: 95.0,
        lastOrderDate: new Date(Date.now() - 86400000),
        joinDate: new Date("2024-01-20"),
        createdAt: new Date("2024-01-20"),
        isActive: true,
        status: "active",
      },
    ];

    // Apply search filter
    let filteredUsers = mockUsers;
    if (search) {
      filteredUsers = mockUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.displayName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      hasMore: endIndex < filteredUsers.length,
    };
  }

  // Inventory alerts
  async getInventoryAlerts(): Promise<InventoryAlert[]> {
    return [
      {
        id: "alert-001",
        type: "low_stock",
        productId: "wb-clemente-tee",
        variantId: "wb-clemente-m-black",
        productName: "WB Clemente Black Tee",
        variantDetails: "Size: M, Color: Black",
        message: "Low stock alert: Only 3 items remaining",
        currentStock: 3,
        threshold: 5,
        severity: "medium",
        createdAt: new Date(),
        acknowledged: false,
      },
      {
        id: "alert-002",
        type: "out_of_stock",
        productId: "vintage-tee",
        variantId: "vintage-s-white",
        productName: "Vintage Tee",
        variantDetails: "Size: S, Color: White",
        message: "Out of stock: Immediate restock needed",
        currentStock: 0,
        threshold: 5,
        severity: "high",
        createdAt: new Date(Date.now() - 3600000),
        acknowledged: false,
      },
    ];
  }

  async acknowledgeAlert(alertId: string, adminId: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    logger.info(`Alert ${alertId} acknowledged by ${adminId}`, {
      alertId,
      adminId,
    });
  }

  // Analytics
  async getSalesAnalytics(
    period: "day" | "week" | "month" | "year"
  ): Promise<SalesAnalytics> {
    // Mock analytics data
    return {
      period,
      data: [
        { date: "2024-01-01", revenue: 1250.0, orders: 8, customers: 6 },
        { date: "2024-01-02", revenue: 890.0, orders: 5, customers: 4 },
        { date: "2024-01-03", revenue: 1580.0, orders: 12, customers: 9 },
      ],
      totalRevenue: 12450.0,
      totalOrders: 156,
      averageOrderValue: 79.81,
      conversionRate: 3.2,
      revenueByMonth: [
        { month: "Jan", revenue: 4250 },
        { month: "Feb", revenue: 3890 },
        { month: "Mar", revenue: 4310 },
      ],
      topProducts: [
        {
          productId: "wb-clemente-tee",
          name: "WB Clemente Black Tee",
          unitsSold: 45,
          revenue: 2475,
        },
        {
          productId: "wayback-hoodie",
          name: "WAYBACK Hoodie",
          unitsSold: 32,
          revenue: 2720,
        },
      ],
    };
  }

  async getProductAnalytics(): Promise<ProductAnalytics[]> {
    return [
      {
        productId: "wb-clemente-tee",
        name: "WB Clemente Black Tee",
        views: 1250,
        addToCart: 89,
        purchases: 45,
        conversionRate: 3.6,
        revenue: 2475.0,
      },
      {
        productId: "wayback-hoodie",
        name: "WAYBACK Hoodie",
        views: 980,
        addToCart: 67,
        purchases: 32,
        conversionRate: 3.3,
        revenue: 2720.0,
      },
    ];
  }

  async getCustomerAnalytics(): Promise<CustomerAnalytics> {
    return {
      totalCustomers: 89,
      newCustomers: 23,
      returningCustomers: 66,
      customerLifetimeValue: 139.89,
      churnRate: 12.5,
      topCustomers: [
        {
          id: "user-001",
          uid: "user-001",
          email: "customer@example.com",
          displayName: "John Doe",
          role: "customer",
          orderCount: 8,
          totalSpent: 685.0,
          lastOrderDate: new Date(),
          joinDate: new Date("2024-01-10"),
          createdAt: new Date("2024-01-10"),
          isActive: true,
          status: "active",
        },
      ],
    };
  }
}

export const adminService = new AdminService();
export default adminService;
