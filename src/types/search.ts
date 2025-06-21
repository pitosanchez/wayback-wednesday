export interface SearchFilters {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  inStock?: boolean;
  featured?: boolean;
  rating?: number; // minimum rating
  sortBy:
    | "relevance"
    | "price-low"
    | "price-high"
    | "newest"
    | "rating"
    | "popular";
}

export interface SearchResult {
  products: SearchProductResult[];
  total: number;
  hasMore: boolean;
  facets: SearchFacets;
  suggestions?: string[];
}

export interface SearchProductResult {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  colors: string[];
  sizes: string[];
  relevanceScore: number;
}

export interface SearchFacets {
  categories: FacetOption[];
  priceRanges: PriceRange[];
  colors: FacetOption[];
  sizes: FacetOption[];
  tags: FacetOption[];
  ratings: FacetOption[];
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
  selected: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  label: string;
  count: number;
  selected: boolean;
}

export interface SearchSuggestion {
  query: string;
  type: "product" | "category" | "brand" | "color";
  count: number;
}

export interface RecentSearch {
  query: string;
  timestamp: Date;
  resultCount: number;
}
