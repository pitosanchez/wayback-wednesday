export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price?: number; // Optional different pricing per variant
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  category: string;
  image: string;
  images?: string[]; // Multiple product images
  description?: string;
  hasWBDesign?: boolean;
  variants: ProductVariant[];
  tags?: string[];
  featured?: boolean;
}

export interface SelectedVariant {
  productId: string;
  size?: string;
  color?: string;
  variant?: ProductVariant;
}

export interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}
