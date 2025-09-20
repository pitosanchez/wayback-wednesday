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
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1
            className="text-6xl font-bold mb-6"
            style={{ color: "var(--rich-black)" }}
          >
            Shop
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-button ${
                  activeFilter === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg"
            style={{ color: "var(--rich-black)" }}
          >
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="grid-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div
          style={{ background: "rgba(61, 90, 254, 0.1)" }}
          className="p-12 rounded-2xl text-center"
        >
          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: "var(--rich-black)" }}
          >
            Join the WAYBACK Community
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "rgba(10, 10, 10, 0.8)" }}
          >
            Get exclusive access to new drops, behind-the-scenes content, and
            special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              style={{ color: "var(--rich-black)" }}
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
