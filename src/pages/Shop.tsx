import blackTeeImage from "../assets/images/blackTee.webp?url";
// Use uploaded final assets
import cassetteHoodieImage from "../assets/images/blk-tapedeck-hoodie.webp?url";
import waybackSnapbackImage from "../assets/images/blk-wayback-hat.webp?url";
import waybackTruckerImage from "../assets/images/hat-1.webp?url";
import spaceInvadersTeeImage from "../assets/images/space-invader-t-blk.webp?url";
import pandaToteImage from "../assets/images/tote-bag.webp?url";
import ProductCard from "../components/Product/ProductCard";
import type { Product } from "../types/product";
import { useState, useEffect, useMemo } from "react";
import inventoryService from "../services/inventoryService";

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const products: Product[] = useMemo(
    () => [
      {
        id: "wb-clemente-tee",
        name: "WB Clemente Black Tee",
        basePrice: 55,
        category: "Apparel",
        image: blackTeeImage,
        hasWBDesign: true,
        description:
          "Limited edition black tee featuring the iconic WB Clemente design. Premium cotton blend for ultimate comfort.",
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
            id: "wb-tee-l-black",
            size: "L",
            color: "Black",
            stock: 18,
            sku: "WB-TEE-L-BLK",
          },
          {
            id: "wb-tee-xl-black",
            size: "XL",
            color: "Black",
            stock: 12,
            sku: "WB-TEE-XL-BLK",
          },
          {
            id: "wb-tee-s-white",
            size: "S",
            color: "White",
            stock: 8,
            price: 60,
            sku: "WB-TEE-S-WHT",
          },
          {
            id: "wb-tee-m-white",
            size: "M",
            color: "White",
            stock: 10,
            price: 60,
            sku: "WB-TEE-M-WHT",
          },
          {
            id: "wb-tee-l-white",
            size: "L",
            color: "White",
            stock: 0,
            price: 60,
            sku: "WB-TEE-L-WHT",
          },
          {
            id: "wb-tee-xl-white",
            size: "XL",
            color: "White",
            stock: 5,
            price: 60,
            sku: "WB-TEE-XL-WHT",
          },
        ],
      },
      {
        id: "cassette-hoodie",
        name: "Vintage Cassette Hoodie",
        basePrice: 75,
        category: "Apparel",
        image: cassetteHoodieImage,
        description:
          "Premium black hoodie featuring a vintage Sony cassette tape design. Perfect for music lovers and nostalgia enthusiasts.",
        featured: true,
        tags: ["vintage", "cassette", "music", "retro"],
        variants: [
          {
            id: "cassette-hoodie-s-black",
            size: "S",
            color: "Black",
            stock: 8,
            sku: "WB-CASS-S-BLK",
          },
          {
            id: "cassette-hoodie-m-black",
            size: "M",
            color: "Black",
            stock: 12,
            sku: "WB-CASS-M-BLK",
          },
          {
            id: "cassette-hoodie-l-black",
            size: "L",
            color: "Black",
            stock: 10,
            sku: "WB-CASS-L-BLK",
          },
          {
            id: "cassette-hoodie-xl-black",
            size: "XL",
            color: "Black",
            stock: 6,
            sku: "WB-CASS-XL-BLK",
          },
        ],
      },
      {
        id: "space-invaders-tee",
        name: "G-BO Space Invaders Tee",
        basePrice: 55,
        category: "Apparel",
        image: spaceInvadersTeeImage,
        description:
          "G-BO THE PRO spins classics every Wayback Whensday! Retro Space Invaders design tee from Camaradas El Barrio 2241 1st Ave NYC.",
        featured: true,
        tags: ["retro", "gaming", "space-invaders", "gbo"],
        variants: [
          {
            id: "space-invaders-s-charcoal",
            size: "S",
            color: "Charcoal",
            stock: 15,
            sku: "WB-SI-S-CHR",
          },
          {
            id: "space-invaders-m-charcoal",
            size: "M",
            color: "Charcoal",
            stock: 20,
            sku: "WB-SI-M-CHR",
          },
          {
            id: "space-invaders-l-charcoal",
            size: "L",
            color: "Charcoal",
            stock: 18,
            sku: "WB-SI-L-CHR",
          },
          {
            id: "space-invaders-xl-charcoal",
            size: "XL",
            color: "Charcoal",
            stock: 12,
            sku: "WB-SI-XL-CHR",
          },
          {
            id: "space-invaders-xxl-charcoal",
            size: "XXL",
            color: "Charcoal",
            stock: 8,
            sku: "WB-SI-XXL-CHR",
          },
        ],
      },
      {
        id: "wayback-snapback",
        name: "G-BO's Wayback Whensday Snapback",
        basePrice: 45,
        category: "Accessories",
        image: waybackSnapbackImage,
        description:
          "Premium snapback cap featuring G-BO THE PRO'S WAYBACK WHENSDAY embroidered design. Adjustable fit with flat brim.",
        featured: true,
        tags: ["snapback", "embroidered", "gbo", "wayback"],
        variants: [
          {
            id: "snapback-os-black",
            color: "Black",
            stock: 25,
            sku: "WB-SNAP-OS-BLK",
          },
        ],
      },
      {
        id: "wayback-trucker",
        name: "G-BO's Wayback Whensday Trucker",
        basePrice: 40,
        category: "Accessories",
        image: waybackTruckerImage,
        description:
          "Classic trucker cap with mesh back featuring G-BO THE PRO'S WAYBACK WHENSDAY embroidered front panel.",
        tags: ["trucker", "mesh", "embroidered", "gbo"],
        variants: [
          {
            id: "trucker-os-white",
            color: "White/Black",
            stock: 20,
            sku: "WB-TRUCK-OS-WB",
          },
        ],
      },
      {
        id: "panda-tote",
        name: "Priority Mail Panda Tote",
        basePrice: 30,
        category: "Accessories",
        image: pandaToteImage,
        description:
          "Unique canvas tote bag with artistic panda design inspired by vintage priority mail aesthetics. Perfect for records and everyday use.",
        tags: ["tote", "canvas", "panda", "vintage"],
        variants: [
          {
            id: "tote-os-natural",
            color: "Natural",
            stock: 35,
            sku: "WB-TOTE-OS-NAT",
          },
        ],
      },
    ],
    []
  );

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  // Initialize inventory system with products
  useEffect(() => {
    inventoryService.initializeInventory(products);
  }, [products]);

  const categories = ["All", "Apparel", "Accessories", "Music"];

  return (
    <div className="min-h-screen bg-white">
      {/* Z-Pattern Layout with Visual Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Z-Pattern: Top Left - Primary Heading */}
        <header className="mb-12 sm:mb-16 lg:mb-20 text-center sm:text-left">
          {/* Size Hierarchy - Largest element */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-alt-gothic text-rich-black mb-3 sm:mb-4 leading-tight">
            Shop
          </h1>

          {/* Visual Cue - Accent line */}
          <div className="flex items-center gap-4">
            <div className="h-1 w-20 bg-fire-red"></div>
            <span className="text-fire-red text-sm font-bold tracking-wider uppercase">
              Official Merch
            </span>
            <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent hidden sm:block"></div>
          </div>

          {/* Subheading with proper white space */}
          <p className="text-lg sm:text-xl text-gray-700 mt-6 sm:mt-8 max-w-3xl mx-auto sm:mx-0">
            Represent the culture. Limited edition apparel and accessories
            celebrating Hip Hop heritage.
          </p>
        </header>

        {/* Filter Controls - Aligned and Spaced */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Proximity - Filter buttons grouped */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all hover:scale-105 ${
                    activeFilter === category
                      ? "bg-fire-red text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort control with clear label */}
          <div className="w-full lg:w-auto">
            <label className="block text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
              Sort Products
            </label>
            <select className="w-full lg:w-auto bg-white border-2 border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-gray-900 font-medium hover:border-gray-400 focus:border-fire-red focus:ring-2 focus:ring-fire-red/20 transition-all text-sm sm:text-base">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid - Main Content Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Z-Pattern: Bottom - Newsletter CTA with High Contrast */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 p-8 sm:p-12 lg:p-16 rounded-2xl text-center shadow-xl">
          <div className="max-w-3xl mx-auto">
            {/* Visual Indicator */}
            <div className="inline-flex items-center gap-2 bg-fire-red/10 px-4 py-2 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-fire-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-fire-red font-bold text-sm uppercase tracking-wide">
                VIP Access
              </span>
            </div>

            {/* Typography Hierarchy */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-rich-black mb-4 sm:mb-6">
              Join the WAYBACK Community
            </h2>

            {/* White Space - Readable line length */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
              Get exclusive access to new drops, behind-the-scenes content, and
              special events.
            </p>

            {/* CTA Form - Grouped with proximity */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-fire-red focus:ring-2 focus:ring-fire-red/20 transition-all text-sm sm:text-base"
              />
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-fire-red hover:bg-red-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
