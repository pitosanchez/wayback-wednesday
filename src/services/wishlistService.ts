import type {
  Wishlist,
  WishlistItem,
  WishlistWithProducts,
  CreateWishlistData,
  AddToWishlistData,
} from "../types/wishlist";

class WishlistService {
  private wishlists: Wishlist[] = [];
  private wishlistItems: WishlistItem[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock wishlist for demo
    const defaultWishlist: Wishlist = {
      id: "wishlist-001",
      userId: "user-001",
      name: "My Favorites",
      description: "Items I want to buy",
      isPublic: false,
      items: [],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
    };

    this.wishlists = [defaultWishlist];

    // Mock wishlist items
    this.wishlistItems = [
      {
        id: "item-001",
        userId: "user-001",
        productId: "wayback-hoodie",
        size: "L",
        color: "Navy",
        addedAt: new Date("2024-01-10"),
        priority: "high",
        notes: "For winter season",
      },
      {
        id: "item-002",
        userId: "user-001",
        productId: "logo-cap",
        color: "Red",
        addedAt: new Date("2024-01-12"),
        priority: "medium",
      },
    ];

    // Add items to wishlist
    defaultWishlist.items = this.wishlistItems.filter(
      (item) => item.userId === "user-001"
    );
  }

  async getUserWishlists(userId: string): Promise<Wishlist[]> {
    return this.wishlists.filter((w) => w.userId === userId);
  }

  async getWishlistWithProducts(
    wishlistId: string
  ): Promise<WishlistWithProducts | null> {
    const wishlist = this.wishlists.find((w) => w.id === wishlistId);
    if (!wishlist) return null;

    // Mock product data for wishlist items
    const mockProducts = {
      "wb-clemente-tee": {
        id: "wb-clemente-tee",
        name: "WB Clemente Black Tee",
        basePrice: 55,
        image: "/src/assets/images/blackTee.webp",
        category: "Apparel",
        inStock: true,
        currentPrice: 55,
      },
      "wayback-hoodie": {
        id: "wayback-hoodie",
        name: "WAYBACK Hoodie",
        basePrice: 85,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        category: "Apparel",
        inStock: true,
        currentPrice: 85,
      },
      "logo-cap": {
        id: "logo-cap",
        name: "Logo Cap",
        basePrice: 35,
        image:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
        category: "Accessories",
        inStock: true,
        currentPrice: 35,
      },
    };

    const itemsWithProducts = wishlist.items.map((item) => ({
      ...item,
      product: mockProducts[item.productId as keyof typeof mockProducts] || {
        id: item.productId,
        name: "Unknown Product",
        basePrice: 0,
        image: "",
        category: "Unknown",
        inStock: false,
        currentPrice: 0,
      },
    }));

    return {
      ...wishlist,
      itemsWithProducts,
    };
  }

  async createWishlist(
    userId: string,
    data: CreateWishlistData
  ): Promise<Wishlist> {
    const newWishlist: Wishlist = {
      id: `wishlist-${Date.now()}`,
      userId,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      shareCode: data.isPublic ? this.generateShareCode() : undefined,
    };

    this.wishlists.push(newWishlist);
    return newWishlist;
  }

  async addToWishlist(
    userId: string,
    data: AddToWishlistData
  ): Promise<WishlistItem> {
    // Get or create default wishlist
    let userWishlist = this.wishlists.find(
      (w) => w.userId === userId && w.name === "My Favorites"
    );
    if (!userWishlist) {
      userWishlist = await this.createWishlist(userId, {
        name: "My Favorites",
        description: "My favorite items",
        isPublic: false,
      });
    }

    // Check if item already exists
    const existingItem = this.wishlistItems.find(
      (item) =>
        item.userId === userId &&
        item.productId === data.productId &&
        item.size === data.size &&
        item.color === data.color
    );

    if (existingItem) {
      throw new Error("Item already in wishlist");
    }

    const newItem: WishlistItem = {
      id: `item-${Date.now()}`,
      userId,
      productId: data.productId,
      variantId: data.variantId,
      size: data.size,
      color: data.color,
      addedAt: new Date(),
      notes: data.notes,
      priority: data.priority || "medium",
    };

    this.wishlistItems.push(newItem);
    userWishlist.items.push(newItem);
    userWishlist.updatedAt = new Date();

    return newItem;
  }

  async removeFromWishlist(userId: string, itemId: string): Promise<void> {
    // Remove from items array
    const itemIndex = this.wishlistItems.findIndex(
      (item) => item.id === itemId && item.userId === userId
    );
    if (itemIndex >= 0) {
      this.wishlistItems.splice(itemIndex, 1);
    }

    // Remove from wishlist
    const wishlist = this.wishlists.find((w) => w.userId === userId);
    if (wishlist) {
      const wishlistItemIndex = wishlist.items.findIndex(
        (item) => item.id === itemId
      );
      if (wishlistItemIndex >= 0) {
        wishlist.items.splice(wishlistItemIndex, 1);
        wishlist.updatedAt = new Date();
      }
    }
  }

  async isInWishlist(
    userId: string,
    productId: string,
    size?: string,
    color?: string
  ): Promise<boolean> {
    return this.wishlistItems.some(
      (item) =>
        item.userId === userId &&
        item.productId === productId &&
        (!size || item.size === size) &&
        (!color || item.color === color)
    );
  }

  async updateWishlistItem(
    userId: string,
    itemId: string,
    updates: Partial<WishlistItem>
  ): Promise<WishlistItem | null> {
    const item = this.wishlistItems.find(
      (item) => item.id === itemId && item.userId === userId
    );
    if (!item) return null;

    Object.assign(item, updates);

    // Update in wishlist as well
    const wishlist = this.wishlists.find((w) => w.userId === userId);
    if (wishlist) {
      const wishlistItem = wishlist.items.find((i) => i.id === itemId);
      if (wishlistItem) {
        Object.assign(wishlistItem, updates);
      }
      wishlist.updatedAt = new Date();
    }

    return item;
  }

  async getWishlistCount(userId: string): Promise<number> {
    return this.wishlistItems.filter((item) => item.userId === userId).length;
  }

  private generateShareCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Get wishlist by share code (for public wishlists)
  async getPublicWishlist(
    shareCode: string
  ): Promise<WishlistWithProducts | null> {
    const wishlist = this.wishlists.find(
      (w) => w.shareCode === shareCode && w.isPublic
    );
    if (!wishlist) return null;

    return this.getWishlistWithProducts(wishlist.id);
  }
}

export const wishlistService = new WishlistService();
export default wishlistService;
