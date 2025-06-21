// Import black tee image
import blackTeeImage from "../assets/images/blackTee.webp?url";
import ProductCard from "../components/Product/ProductCard";
import type { Product } from "../types/product";
import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const products: Product[] = [
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
      id: "wayback-hoodie",
      name: "WAYBACK Hoodie",
      basePrice: 85,
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      description:
        "Premium heavyweight hoodie with embroidered WAYBACK logo. Perfect for those East Harlem nights.",
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
          id: "hoodie-m-black",
          size: "M",
          color: "Black",
          stock: 15,
          sku: "WB-HOOD-M-BLK",
        },
        {
          id: "hoodie-l-black",
          size: "L",
          color: "Black",
          stock: 10,
          sku: "WB-HOOD-L-BLK",
        },
        {
          id: "hoodie-xl-black",
          size: "XL",
          color: "Black",
          stock: 8,
          sku: "WB-HOOD-XL-BLK",
        },
        {
          id: "hoodie-s-navy",
          size: "S",
          color: "Navy",
          stock: 6,
          sku: "WB-HOOD-S-NVY",
        },
        {
          id: "hoodie-m-navy",
          size: "M",
          color: "Navy",
          stock: 9,
          sku: "WB-HOOD-M-NVY",
        },
        {
          id: "hoodie-l-navy",
          size: "L",
          color: "Navy",
          stock: 7,
          sku: "WB-HOOD-L-NVY",
        },
        {
          id: "hoodie-xl-navy",
          size: "XL",
          color: "Navy",
          stock: 4,
          sku: "WB-HOOD-XL-NVY",
        },
        {
          id: "hoodie-s-gray",
          size: "S",
          color: "Gray",
          stock: 8,
          sku: "WB-HOOD-S-GRY",
        },
        {
          id: "hoodie-m-gray",
          size: "M",
          color: "Gray",
          stock: 12,
          sku: "WB-HOOD-M-GRY",
        },
        {
          id: "hoodie-l-gray",
          size: "L",
          color: "Gray",
          stock: 10,
          sku: "WB-HOOD-L-GRY",
        },
        {
          id: "hoodie-xl-gray",
          size: "XL",
          color: "Gray",
          stock: 6,
          sku: "WB-HOOD-XL-GRY",
        },
      ],
    },
    {
      id: "vintage-tee",
      name: "Vintage Tee",
      basePrice: 45,
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      description:
        "Soft vintage-style tee with a worn-in feel. Classic fit with subtle WAYBACK branding.",
      tags: ["vintage", "classic", "comfortable"],
      variants: [
        {
          id: "vintage-s-gray",
          size: "S",
          color: "Gray",
          stock: 20,
          sku: "WB-VTG-S-GRY",
        },
        {
          id: "vintage-m-gray",
          size: "M",
          color: "Gray",
          stock: 25,
          sku: "WB-VTG-M-GRY",
        },
        {
          id: "vintage-l-gray",
          size: "L",
          color: "Gray",
          stock: 22,
          sku: "WB-VTG-L-GRY",
        },
        {
          id: "vintage-xl-gray",
          size: "XL",
          color: "Gray",
          stock: 18,
          sku: "WB-VTG-XL-GRY",
        },
        {
          id: "vintage-s-white",
          size: "S",
          color: "White",
          stock: 15,
          sku: "WB-VTG-S-WHT",
        },
        {
          id: "vintage-m-white",
          size: "M",
          color: "White",
          stock: 18,
          sku: "WB-VTG-M-WHT",
        },
        {
          id: "vintage-l-white",
          size: "L",
          color: "White",
          stock: 16,
          sku: "WB-VTG-L-WHT",
        },
        {
          id: "vintage-xl-white",
          size: "XL",
          color: "White",
          stock: 12,
          sku: "WB-VTG-XL-WHT",
        },
      ],
    },
    {
      id: "logo-cap",
      name: "Logo Cap",
      basePrice: 35,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      description:
        "Adjustable snapback cap with embroidered WAYBACK logo. One size fits most.",
      tags: ["adjustable", "snapback", "logo"],
      variants: [
        { id: "cap-os-black", color: "Black", stock: 30, sku: "WB-CAP-OS-BLK" },
        { id: "cap-os-navy", color: "Navy", stock: 25, sku: "WB-CAP-OS-NVY" },
        { id: "cap-os-white", color: "White", stock: 20, sku: "WB-CAP-OS-WHT" },
        { id: "cap-os-red", color: "Red", stock: 15, sku: "WB-CAP-OS-RED" },
        { id: "cap-os-gray", color: "Gray", stock: 18, sku: "WB-CAP-OS-GRY" },
      ],
    },
    {
      id: "vinyl-collection",
      name: "Vinyl Collection",
      basePrice: 120,
      category: "Music",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      description:
        "Curated collection of classic East Harlem hip-hop vinyl records. Limited edition box set.",
      featured: true,
      tags: ["vinyl", "collection", "limited", "hip-hop"],
      variants: [
        { id: "vinyl-standard", stock: 50, sku: "WB-VINYL-STD" },
        { id: "vinyl-deluxe", price: 180, stock: 15, sku: "WB-VINYL-DLX" },
      ],
    },
  ];

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  // Initialize inventory system with products
  useEffect(() => {
    inventoryService.initializeInventory(products);
  }, []);

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
