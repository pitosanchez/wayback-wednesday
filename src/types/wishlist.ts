export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  variantId?: string;
  size?: string;
  color?: string;
  addedAt: Date;
  notes?: string;
  priority: "low" | "medium" | "high";
}

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
  shareCode?: string;
}

export interface WishlistWithProducts extends Wishlist {
  itemsWithProducts: (WishlistItem & {
    product: {
      id: string;
      name: string;
      basePrice: number;
      image: string;
      category: string;
      inStock: boolean;
      currentPrice: number;
    };
  })[];
}

export interface CreateWishlistData {
  name: string;
  description?: string;
  isPublic: boolean;
}

export interface AddToWishlistData {
  productId: string;
  variantId?: string;
  size?: string;
  color?: string;
  notes?: string;
  priority?: "low" | "medium" | "high";
}
