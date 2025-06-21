export interface InventoryItem {
  variantId: string;
  productId: string;
  sku: string;
  currentStock: number;
  reservedStock: number; // Items in carts but not yet purchased
  availableStock: number; // currentStock - reservedStock
  lowStockThreshold: number;
  lastUpdated: Date;
  restockDate?: Date;
  supplier?: string;
}

export interface StockMovement {
  id: string;
  variantId: string;
  type: "sale" | "restock" | "adjustment" | "reservation" | "release";
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  orderId?: string;
  timestamp: Date;
  userId?: string;
}

export interface InventoryAlert {
  id: string;
  variantId: string;
  type: "low_stock" | "out_of_stock" | "restock_needed";
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  acknowledged: boolean;
  createdAt: Date;
  acknowledgedAt?: Date;
}

export interface InventoryUpdate {
  variantId: string;
  quantity: number;
  type: "increase" | "decrease";
  reason?: string;
  orderId?: string;
}

export interface InventoryStats {
  totalProducts: number;
  totalVariants: number;
  totalStock: number;
  totalReserved: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number; // Based on product prices
}

export interface RestockRequest {
  id: string;
  variantId: string;
  requestedQuantity: number;
  priority: "low" | "medium" | "high" | "urgent";
  requestedBy: string;
  requestDate: Date;
  expectedDelivery?: Date;
  status: "pending" | "ordered" | "shipped" | "received" | "cancelled";
  notes?: string;
}
