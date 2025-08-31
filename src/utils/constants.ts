// Application-wide constants

// Navigation items
export const MAIN_NAV_ITEMS = [
  { name: "About", path: "/about" },
  { name: "History", path: "/history" },
  { name: "Music", path: "/music" },
  { name: "Culture", path: "/culture" },
  { name: "Shop", path: "/shop" },
  { name: "Wayback Wednesday", path: "/history" },
  { name: "Collections", path: "/collections" },
] as const;

export const USER_NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analytics", path: "/analytics" },
] as const;

// Color mappings for consistent theming
export const STATUS_COLORS = {
  pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
  processing: "text-blue-600 bg-blue-50 border-blue-200",
  shipped: "text-purple-600 bg-purple-50 border-purple-200",
  delivered: "text-green-600 bg-green-50 border-green-200",
  cancelled: "text-red-600 bg-red-50 border-red-200",
  default: "text-gray-600 bg-gray-50 border-gray-200",
} as const;

// Demo categories for organization
export const DEMO_CATEGORIES = {
  core: {
    label: "Core Features",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  ecommerce: {
    label: "E-Commerce",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  admin: {
    label: "Administration",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
} as const;

// Common test credentials for demo environment
export const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@wayback.com",
    password: "demo123",
  },
  user: {
    email: "user@wayback.com",
    password: "demo123",
  },
  stripe: {
    cardNumber: "4242 4242 4242 4242",
    info: "Any 3-digit CVV, Future expiry date",
  },
} as const;
