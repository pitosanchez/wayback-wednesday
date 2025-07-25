// Common types used across the application

// Date and time related types
export type ISODateString = string;
export type UnixTimestamp = number;

// Common status types
export type Status = "active" | "inactive" | "pending" | "archived";

// Common ID types
export type ID = string;
export type UUID = string;

// User-related base types
export interface BaseUser {
  id: ID;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Item with metadata
export interface WithMetadata<T> {
  data: T;
  metadata: {
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: ID;
    updatedBy?: ID;
  };
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// Address type used in multiple places
export interface Address {
  name?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Image type
export interface Image {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Price and money types
export type Price = number;
export type Currency = "USD" | "EUR" | "GBP";

export interface Money {
  amount: Price;
  currency: Currency;
}

// Common filter types
export type DateRange = {
  start: Date;
  end: Date;
};

export type SortOrder = "asc" | "desc";

// Common entity states
export type EntityStatus = "draft" | "published" | "archived" | "deleted";

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
