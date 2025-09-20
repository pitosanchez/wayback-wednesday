// Product Images Configuration
// Centralized product image imports and configuration

// Import all product images
import blackTeeImage from "../assets/images/blackTee.webp?url";
import cassetteHoodieImage from "../assets/images/blk-tapedeck-hoodie.webp?url";
import waybackSnapbackImage from "../assets/images/blk-wayback-hat.webp?url";
import waybackTruckerImage from "../assets/images/hat-1.webp?url";
import spaceInvadersTeeImage from "../assets/images/space-invader-t-blk.webp?url";
import pandaToteImage from "../assets/images/tote-bag.webp?url";
import clementeTeeImage from "../assets/images/clemente-blk-t.webp?url";

// Additional product images from products folder
import cassetteHoodie2 from "../assets/images/products/cassette-hoodie.webp?url";
import pandaTote2 from "../assets/images/products/panda-tote.webp?url";
import spaceInvadersTee2 from "../assets/images/products/space-invaders-tee.webp?url";
import waybackSnapback2 from "../assets/images/products/wayback-snapback.webp?url";
import waybackTrucker2 from "../assets/images/products/wayback-trucker.webp?url";

// Product image mapping
export const productImages = {
  // Main product images
  "wb-clemente-tee": {
    main: blackTeeImage,
    alt: clementeTeeImage,
    gallery: [blackTeeImage, clementeTeeImage],
  },
  "cassette-hoodie": {
    main: cassetteHoodieImage,
    alt: cassetteHoodie2,
    gallery: [cassetteHoodieImage, cassetteHoodie2],
  },
  "wayback-snapback": {
    main: waybackSnapbackImage,
    alt: waybackSnapback2,
    gallery: [waybackSnapbackImage, waybackSnapback2],
  },
  "wayback-trucker": {
    main: waybackTruckerImage,
    alt: waybackTrucker2,
    gallery: [waybackTruckerImage, waybackTrucker2],
  },
  "space-invaders-tee": {
    main: spaceInvadersTeeImage,
    alt: spaceInvadersTee2,
    gallery: [spaceInvadersTeeImage, spaceInvadersTee2],
  },
  "panda-tote": {
    main: pandaToteImage,
    alt: pandaTote2,
    gallery: [pandaToteImage, pandaTote2],
  },
} as const;

// Helper function to get product image
export const getProductImage = (
  productId: string,
  type: "main" | "alt" | "gallery" = "main"
) => {
  const images = productImages[productId as keyof typeof productImages];

  if (!images) {
    console.warn(`No images found for product: ${productId}`);
    return type === "gallery" ? [] : "";
  }

  if (type === "gallery") {
    return images.gallery;
  }

  return images[type] || images.main;
};

// Image optimization settings
export const imageOptimizationConfig = {
  formats: ["webp", "avif"],
  sizes: {
    thumbnail: { width: 150, height: 150 },
    card: { width: 400, height: 400 },
    detail: { width: 800, height: 800 },
    full: { width: 1200, height: 1200 },
  },
  quality: {
    webp: 85,
    avif: 80,
    jpg: 90,
  },
};

// Placeholder image for missing products
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+";

export default productImages;
