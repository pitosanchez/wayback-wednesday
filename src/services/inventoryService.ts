import type {
  InventoryItem,
  StockMovement,
  InventoryAlert,
  InventoryUpdate,
  InventoryStats,
} from "../types/inventory";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";
import { logger } from "../utils/logger";

class InventoryService {
  private inventory: Map<string, InventoryItem> = new Map();
  private stockMovements: StockMovement[] = [];
  private alerts: InventoryAlert[] = [];
  // Removed unused restockRequests property

  constructor() {
    this.loadInventoryFromStorage();
  }

  // Initialize inventory from products
  initializeInventory(products: Product[]): void {
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        const inventoryItem: InventoryItem = {
          variantId: variant.id,
          productId: product.id,
          sku: variant.sku || `${product.id}-${variant.id}`,
          currentStock: variant.stock,
          reservedStock: 0,
          availableStock: variant.stock,
          lowStockThreshold: this.calculateLowStockThreshold(variant.stock),
          lastUpdated: new Date(),
          supplier: "Wayback Wednesday Warehouse",
        };

        this.inventory.set(variant.id, inventoryItem);
        this.checkStockAlerts(inventoryItem);
      });
    });

    this.saveInventoryToStorage();
  }

  // Get inventory item by variant ID
  getInventoryItem(variantId: string): InventoryItem | undefined {
    return this.inventory.get(variantId);
  }

  // Get all inventory items
  getAllInventoryItems(): InventoryItem[] {
    return Array.from(this.inventory.values());
  }

  // Update stock levels
  updateStock(update: InventoryUpdate): boolean {
    const item = this.inventory.get(update.variantId);
    if (!item) {
      logger.error("Inventory item not found", undefined, {
        variantId: update.variantId,
      });
      return false;
    }

    const previousStock = item.currentStock;
    let newStock: number;

    if (update.type === "increase") {
      newStock = item.currentStock + update.quantity;
    } else {
      newStock = Math.max(0, item.currentStock - update.quantity);
    }

    // Update inventory item
    item.currentStock = newStock;
    item.availableStock = newStock - item.reservedStock;
    item.lastUpdated = new Date();

    // Record stock movement
    const movement: StockMovement = {
      id: `mov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      variantId: update.variantId,
      type: update.type === "increase" ? "restock" : "sale",
      quantity: update.quantity,
      previousStock,
      newStock,
      reason: update.reason,
      orderId: update.orderId,
      timestamp: new Date(),
    };

    this.stockMovements.push(movement);
    this.checkStockAlerts(item);
    this.saveInventoryToStorage();

    return true;
  }

  // Reserve stock for cart items
  reserveStock(cartItems: CartItem[]): boolean {
    const reservations: { variantId: string; quantity: number }[] = [];

    // Check if all items can be reserved
    for (const cartItem of cartItems) {
      const variantId = this.getVariantIdFromCartItem(cartItem);
      const item = this.inventory.get(variantId);

      if (!item) {
        logger.error("Inventory item not found", undefined, { variantId });
        return false;
      }

      if (item.availableStock < cartItem.quantity) {
        logger.error("Insufficient stock", undefined, {
          variantId,
          quantityNeeded: cartItem.quantity,
          quantityAvailable: item.availableStock,
        });
        return false;
      }

      reservations.push({ variantId, quantity: cartItem.quantity });
    }

    // Apply all reservations
    reservations.forEach(({ variantId, quantity }) => {
      const item = this.inventory.get(variantId)!;
      item.reservedStock += quantity;
      item.availableStock = item.currentStock - item.reservedStock;
      item.lastUpdated = new Date();

      // Record reservation movement
      const movement: StockMovement = {
        id: `mov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        variantId,
        type: "reservation",
        quantity,
        previousStock: item.currentStock,
        newStock: item.currentStock,
        reason: "Cart reservation",
        timestamp: new Date(),
      };

      this.stockMovements.push(movement);
    });

    this.saveInventoryToStorage();
    return true;
  }

  // Release reserved stock (e.g., when cart is abandoned)
  releaseReservedStock(cartItems: CartItem[]): void {
    cartItems.forEach((cartItem) => {
      const variantId = this.getVariantIdFromCartItem(cartItem);
      const item = this.inventory.get(variantId);

      if (item && item.reservedStock >= cartItem.quantity) {
        item.reservedStock -= cartItem.quantity;
        item.availableStock = item.currentStock - item.reservedStock;
        item.lastUpdated = new Date();

        // Record release movement
        const movement: StockMovement = {
          id: `mov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          variantId,
          type: "release",
          quantity: cartItem.quantity,
          previousStock: item.currentStock,
          newStock: item.currentStock,
          reason: "Cart abandonment",
          timestamp: new Date(),
        };

        this.stockMovements.push(movement);
      }
    });

    this.saveInventoryToStorage();
  }

  // Process purchase (convert reservations to sales)
  processPurchase(cartItems: CartItem[], orderId: string): boolean {
    cartItems.forEach((cartItem) => {
      const variantId = this.getVariantIdFromCartItem(cartItem);
      const item = this.inventory.get(variantId);

      if (!item) {
        logger.error("Inventory item not found during purchase", undefined, {
          variantId,
          orderId,
        });
        return false;
      }

      // Reduce current stock
      const previousStock = item.currentStock;
      item.currentStock = Math.max(0, item.currentStock - cartItem.quantity);
      item.availableStock = item.currentStock - item.reservedStock;
      item.lastUpdated = new Date();

      // Record sale movement
      const movement: StockMovement = {
        id: `mov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        variantId,
        type: "sale",
        quantity: cartItem.quantity,
        previousStock,
        newStock: item.currentStock,
        reason: "Purchase completed",
        orderId,
        timestamp: new Date(),
      };

      this.stockMovements.push(movement);
      this.checkStockAlerts(item);
    });

    this.saveInventoryToStorage();
    return true;
  }

  // Get inventory statistics
  getInventoryStats(): InventoryStats {
    const items = this.getAllInventoryItems();

    return {
      totalProducts: new Set(items.map((item) => item.productId)).size,
      totalVariants: items.length,
      totalStock: items.reduce((sum, item) => sum + item.currentStock, 0),
      totalReserved: items.reduce((sum, item) => sum + item.reservedStock, 0),
      lowStockItems: items.filter(
        (item) =>
          item.currentStock <= item.lowStockThreshold && item.currentStock > 0
      ).length,
      outOfStockItems: items.filter((item) => item.currentStock === 0).length,
      totalValue: 0, // Would need product prices to calculate
    };
  }

  // Get stock movements for a variant
  getStockMovements(variantId?: string): StockMovement[] {
    if (variantId) {
      return this.stockMovements.filter(
        (movement) => movement.variantId === variantId
      );
    }
    return [...this.stockMovements].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  // Get active alerts
  getActiveAlerts(): InventoryAlert[] {
    return this.alerts.filter((alert) => !alert.acknowledged);
  }

  // Acknowledge alert
  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
      this.saveInventoryToStorage();
    }
  }

  // Private helper methods
  private getVariantIdFromCartItem(cartItem: CartItem): string {
    // If cart item has size/color, find matching variant
    // For now, we'll use a simple approach - this could be enhanced
    return cartItem.id.includes("-")
      ? cartItem.id.split("-").slice(1).join("-")
      : cartItem.id;
  }

  private calculateLowStockThreshold(initialStock: number): number {
    // Set threshold to 20% of initial stock, minimum 2, maximum 10
    return Math.min(Math.max(Math.floor(initialStock * 0.2), 2), 10);
  }

  private checkStockAlerts(item: InventoryItem): void {
    const existingAlert = this.alerts.find(
      (alert) => alert.variantId === item.variantId && !alert.acknowledged
    );

    if (item.currentStock === 0) {
      if (!existingAlert || existingAlert.type !== "out_of_stock") {
        this.createAlert(
          item,
          "out_of_stock",
          `${item.sku} is out of stock`,
          "critical"
        );
      }
    } else if (item.currentStock <= item.lowStockThreshold) {
      if (!existingAlert || existingAlert.type !== "low_stock") {
        this.createAlert(
          item,
          "low_stock",
          `${item.sku} is running low (${item.currentStock} remaining)`,
          "medium"
        );
      }
    }
  }

  private createAlert(
    item: InventoryItem,
    type: InventoryAlert["type"],
    message: string,
    severity: InventoryAlert["severity"]
  ): void {
    const alert: InventoryAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      variantId: item.variantId,
      type,
      message,
      severity,
      acknowledged: false,
      createdAt: new Date(),
    };

    this.alerts.push(alert);
  }

  private loadInventoryFromStorage(): void {
    try {
      const stored = localStorage.getItem("wayback-inventory");
      if (stored) {
        const data = JSON.parse(stored);

        // Restore inventory map
        if (data.inventory) {
          Object.entries(data.inventory).forEach(
            ([key, value]: [string, unknown]) => {
              const inventoryValue = value as Record<string, unknown>;
              this.inventory.set(key, {
                ...inventoryValue,
                lastUpdated: new Date(inventoryValue.lastUpdated as string),
                restockDate: inventoryValue.restockDate
                  ? new Date(inventoryValue.restockDate as string)
                  : undefined,
              } as InventoryItem);
            }
          );
        }

        // Restore movements
        if (data.stockMovements) {
          this.stockMovements = data.stockMovements.map((movement: unknown) => {
            const movementData = movement as Record<string, unknown>;
            return {
              ...movementData,
              timestamp: new Date(movementData.timestamp as string),
            } as StockMovement;
          });
        }

        // Restore alerts
        if (data.alerts) {
          this.alerts = data.alerts.map((alert: unknown) => {
            const alertData = alert as Record<string, unknown>;
            return {
              ...alertData,
              createdAt: new Date(alertData.createdAt as string),
              acknowledgedAt: alertData.acknowledgedAt
                ? new Date(alertData.acknowledgedAt as string)
                : undefined,
            } as InventoryAlert;
          });
        }
      }
    } catch (error) {
      logger.error("Error loading inventory from storage", error);
    }
  }

  private saveInventoryToStorage(): void {
    try {
      const data = {
        inventory: Object.fromEntries(this.inventory),
        stockMovements: this.stockMovements.slice(-1000), // Keep last 1000 movements
        alerts: this.alerts.slice(-100), // Keep last 100 alerts
      };

      localStorage.setItem("wayback-inventory", JSON.stringify(data));
    } catch (error) {
      logger.error("Error saving inventory to storage", error);
    }
  }
}

// Export singleton instance
export const inventoryService = new InventoryService();
export default inventoryService;
