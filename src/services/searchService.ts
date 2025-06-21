import type {
  SearchFilters,
  SearchResult,
  SearchProductResult,
  SearchFacets,
  RecentSearch,
} from "../types/search";
import type { Product } from "../types/product";

class SearchService {
  private products: Product[] = [];
  private recentSearches: RecentSearch[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock products for search
    this.products = [
      {
        id: "wb-clemente-tee",
        name: "WB Clemente Black Tee",
        basePrice: 55,
        category: "Apparel",
        image: "/src/assets/images/blackTee.webp",
        description:
          "Limited edition black tee featuring the iconic WB Clemente design.",
        featured: true,
        tags: ["limited-edition", "hip-hop", "east-harlem"],
        variants: [
          {
            id: "wb-tee-s-black",
            size: "S",
            color: "Black",
            stock: 15,
            sku: "WB-TEE-S-BLK",
          },
          {
            id: "wb-tee-m-black",
            size: "M",
            color: "Black",
            stock: 20,
            sku: "WB-TEE-M-BLK",
          },
          {
            id: "wb-tee-s-white",
            size: "S",
            color: "White",
            stock: 8,
            price: 60,
            sku: "WB-TEE-S-WHT",
          },
        ],
      },
      {
        id: "wayback-hoodie",
        name: "WAYBACK Hoodie",
        basePrice: 85,
        category: "Apparel",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        description:
          "Premium heavyweight hoodie with embroidered WAYBACK logo.",
        tags: ["premium", "embroidered", "streetwear"],
        variants: [
          {
            id: "hoodie-s-black",
            size: "S",
            color: "Black",
            stock: 12,
            sku: "WB-HOOD-S-BLK",
          },
          {
            id: "hoodie-l-navy",
            size: "L",
            color: "Navy",
            stock: 7,
            sku: "WB-HOOD-L-NVY",
          },
        ],
      },
    ];
  }

  async search(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<SearchResult> {
    let results = [...this.products];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Convert to search results
    const searchResults: SearchProductResult[] = results.map((product) => ({
      id: product.id,
      name: product.name,
      basePrice: product.basePrice,
      currentPrice: product.basePrice,
      image: product.image,
      category: product.category,
      rating: 4.5,
      reviewCount: 10,
      inStock: product.variants.some((v) => v.stock > 0),
      featured: product.featured || false,
      tags: product.tags || [],
      colors: Array.from(
        new Set(product.variants.filter((v) => v.color).map((v) => v.color!))
      ),
      sizes: Array.from(
        new Set(product.variants.filter((v) => v.size).map((v) => v.size!))
      ),
      relevanceScore: 1,
    }));

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedResults = searchResults.slice(
      startIndex,
      startIndex + limit
    );

    // Generate facets
    const facets: SearchFacets = {
      categories: [],
      priceRanges: [],
      colors: [],
      sizes: [],
      tags: [],
      ratings: [],
    };

    return {
      products: paginatedResults,
      total: searchResults.length,
      hasMore: startIndex + limit < searchResults.length,
      facets,
    };
  }

  async getRecentSearches(): Promise<RecentSearch[]> {
    return this.recentSearches;
  }
}

export const searchService = new SearchService();
export default searchService;
