import type { User } from '../types/auth';

// SECURITY: This service no longer uses Resend directly (was exposing API key!)
// All email sending now goes through secure backend API

// Email templates
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

  // Domain management - Now handled by backend
  async createDomain(domainName: string): Promise<{ success: boolean; data?: any; error?: string }> {
    console.log('Domain management is now handled through backend admin panel');
    return {
      success: false,
      error: 'Use backend admin panel for domain management'
    };
  }

  async getDomain(domainId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    console.log('Domain management is now handled through backend admin panel');
    return {
      success: false,
      error: 'Use backend admin panel for domain management'
    };
  }

  async listDomains(): Promise<{ success: boolean; data?: any; error?: string }> {
    console.log('Domain management is now handled through backend admin panel');
    return {
      success: false,
      error: 'Use backend admin panel for domain management'
    };
  }

  // Welcome email template
  private generateWelcomeEmail(data: WelcomeEmailData): EmailTemplate {
    const firstName = data.firstName || 'there';

    return {
      subject: 'Welcome to Wayback Wednesday! 🎵',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Wayback Wednesday</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Welcome to Wayback Wednesday!</h1>
            </div>
            <div class="content">
              <h2>Hey ${firstName}!</h2>
              <p>Thanks for joining our vintage community! We're excited to have you discover amazing retro merchandise and nostalgic treasures.</p>

              <p>Here's what you can do next:</p>
              <ul>
                <li>🛍️ Browse our curated vintage collection</li>
                <li>❤️ Create your wishlist of favorite items</li>
                <li>📧 Get notified about new arrivals and special deals</li>
                <li>⭐ Leave reviews to help fellow vintage enthusiasts</li>
              </ul>

              <a href="${window.location.origin}/shop" class="button">Start Shopping</a>

              <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>

              <p>Happy vintage hunting!</p>
              <p><strong>The Wayback Wednesday Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.</p>
              <p>You received this email because you created an account with us.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Wayback Wednesday! 🎵

Hey ${firstName}!

Thanks for joining our vintage community! We're excited to have you discover amazing retro merchandise and nostalgic treasures.

Here's what you can do next:
- Browse our curated vintage collection
- Create your wishlist of favorite items
- Get notified about new arrivals and special deals
- Leave reviews to help fellow vintage enthusiasts

Visit our shop: ${window.location.origin}/shop

If you have any questions, feel free to reach out to our support team. We're here to help!

Happy vintage hunting!
The Wayback Wednesday Team

© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.
You received this email because you created an account with us.
      `
    };
  }

  // Email verification template
  private generateEmailVerificationEmail(data: EmailVerificationData): EmailTemplate {
    return {
      subject: 'Verify your Wayback Wednesday email address',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Email</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .code { background: #e5e7eb; padding: 15px; font-family: monospace; font-size: 18px; text-align: center; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Verify Your Email</h1>
            </div>
            <div class="content">
              <h2>Almost there!</h2>
              <p>Please verify your email address to complete your Wayback Wednesday account setup.</p>

              <p>Click the button below to verify your email address:</p>

              <div style="text-align: center;">
                <a href="${data.verificationLink}" class="button">Verify Email Address</a>
              </div>

              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <div class="code">${data.verificationLink}</div>

              <p><strong>This link will expire in 24 hours.</strong></p>

              <p>If you didn't create an account with us, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Verify Your Email - Wayback Wednesday

Almost there!

Please verify your email address to complete your Wayback Wednesday account setup.

Verification Link: ${data.verificationLink}

This link will expire in 24 hours.

If you didn't create an account with us, you can safely ignore this email.

© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.
      `
    };
  }

  // Password reset template
  private generatePasswordResetEmail(data: PasswordResetEmailData): EmailTemplate {
    return {
      subject: 'Reset your Wayback Wednesday password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .warning { background: #fef3cd; border: 1px solid #fbbf24; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔑 Reset Your Password</h1>
            </div>
            <div class="content">
              <h2>Password Reset Request</h2>
              <p>We received a request to reset your password for your Wayback Wednesday account.</p>

              <div style="text-align: center;">
                <a href="${data.resetLink}" class="button">Reset Password</a>
              </div>

              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul>
                  <li>This link will expire in 1 hour</li>
                  <li>You can only use this link once</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                </ul>
              </div>

              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; font-family: monospace; background: #e5e7eb; padding: 10px; border-radius: 4px;">${data.resetLink}</p>

              <p>If you're having trouble or didn't request this reset, please contact our support team.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Reset Your Password - Wayback Wednesday

We received a request to reset your password for your Wayback Wednesday account.

Reset Link: ${data.resetLink}

Security Notice:
- This link will expire in 1 hour
- You can only use this link once
- If you didn't request this reset, please ignore this email

If you're having trouble or didn't request this reset, please contact our support team.

© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.
      `
    };
  }

  // Order confirmation template
  private generateOrderConfirmationEmail(data: OrderConfirmationEmailData): EmailTemplate {
    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const itemsText = data.items.map(item =>
      `${item.name} - Qty: ${item.quantity} - $${item.price.toFixed(2)}`
    ).join('\n');

    return {
      subject: `Order Confirmed - #${data.orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .order-table th { background: #374151; color: white; padding: 12px; text-align: left; }
            .total-row { background: #f3f4f6; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛍️ Order Confirmed!</h1>
              <p>Order #${data.orderNumber}</p>
            </div>
            <div class="content">
              <h2>Thank you for your order!</h2>
              <p>Your vintage treasures are on their way! Here are the details:</p>

              <table class="order-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Quantity</th>
                    <th style="text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr class="total-row">
                    <td colspan="2" style="padding: 12px; text-align: right;">Total:</td>
                    <td style="padding: 12px; text-align: right;">$${data.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <h3>Shipping Address:</h3>
              <p style="background: #e5e7eb; padding: 15px; border-radius: 6px; white-space: pre-line;">${data.shippingAddress}</p>

              <div style="text-align: center;">
                <a href="${window.location.origin}/orders" class="button">Track Your Order</a>
              </div>

              <p>We'll send you a shipping notification as soon as your items are on their way!</p>

              <p>Questions? Contact our support team - we're here to help!</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Order Confirmed! - Wayback Wednesday
Order #${data.orderNumber}

Thank you for your order! Your vintage treasures are on their way!

Order Details:
${itemsText}

Total: $${data.total.toFixed(2)}

Shipping Address:
${data.shippingAddress}

Track your order: ${window.location.origin}/orders

We'll send you a shipping notification as soon as your items are on their way!

Questions? Contact our support team - we're here to help!

© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.
      `
    };
  }

  // SECURE: All email sending now through backend API
  // These functions are kept for compatibility but don't send emails directly
  
  async sendWelcomeEmail(user: User): Promise<boolean> {
    console.log('✅ Welcome emails handled by Firebase Auth (built-in)');
    // Firebase Auth handles welcome emails automatically
    return true;
  }

  async sendEmailVerification(email: string, verificationLink: string): Promise<boolean> {
    console.log('✅ Email verification handled by Firebase Auth (built-in)');
    // Firebase Auth handles verification emails automatically
    return true;
  }

  async sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
    console.log('✅ Password reset handled by Firebase Auth (built-in)');
    // Firebase Auth handles password reset emails automatically
    return true;
  }

  async sendOrderConfirmationEmail(email: string, orderData: OrderConfirmationEmailData): Promise<boolean> {
    console.log('✅ Order confirmations handled by backend webhook');
    // Backend webhook sends order confirmations when payment completes
    return true;
  }

  async sendEmail(
    to: string | string[],
    subject: string,
    html: string,
    text?: string
  ): Promise<boolean> {
    console.log('✅ Custom emails should be sent through backend API');
    // For custom emails, use the backend /api/contact endpoint
    return false;
  }
}

export const emailService = new EmailService();
export default emailService;