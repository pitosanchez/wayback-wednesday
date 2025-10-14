/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "../types/auth";

// SECURITY NOTE: This service no longer handles email sending directly
// All email operations now go through the secure backend API at /api/*
// Email templates are in backend: api/src/lib/mail.ts
//
// This file maintains API compatibility with stub methods
// Parameters are intentionally unused as functionality moved to backend

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface WelcomeEmailData {
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface OrderConfirmationEmailData {
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: string;
}

export interface PasswordResetEmailData {
  resetLink: string;
  email: string;
}

export interface EmailVerificationData {
  verificationLink: string;
  email: string;
}

class EmailService {
  // Check if backend API is configured
  isConfigured(): boolean {
    return !!import.meta.env.VITE_API_BASE_URL;
  }

  // Domain management is now handled through backend admin panel
  async createDomain(
    _domainName: string
  ): Promise<{ success: boolean; data?: unknown; error?: string }> {
    return {
      success: false,
      error: "Domain management is handled through backend admin panel",
    };
  }

  async getDomain(
    _domainId: string
  ): Promise<{ success: boolean; data?: unknown; error?: string }> {
    return {
      success: false,
      error: "Domain management is handled through backend admin panel",
    };
  }

  async listDomains(): Promise<{
    success: boolean;
    data?: unknown;
    error?: string;
  }> {
    return {
      success: false,
      error: "Domain management is handled through backend admin panel",
    };
  }

  // SECURE: All email sending now through backend API
  // Firebase Auth handles these emails automatically:

  async sendWelcomeEmail(_user: User): Promise<boolean> {
    // Firebase Auth sends welcome emails automatically
    return true;
  }

  async sendEmailVerification(
    _email: string,
    _verificationLink: string
  ): Promise<boolean> {
    // Firebase Auth sends verification emails automatically
    return true;
  }

  async sendPasswordResetEmail(
    _email: string,
    _resetLink: string
  ): Promise<boolean> {
    // Firebase Auth sends password reset emails automatically
    return true;
  }

  async sendOrderConfirmationEmail(
    _email: string,
    _orderData: OrderConfirmationEmailData
  ): Promise<boolean> {
    // Backend webhook sends order confirmations when payment completes
    // See: api/src/routes/webhooks.ts
    return true;
  }

  async sendEmail(
    _to: string | string[],
    _subject: string,
    _html: string,
    _text?: string
  ): Promise<boolean> {
    // For custom emails, use the backend /api/contact endpoint
    return false;
  }
}

export const emailService = new EmailService();
export default emailService;
