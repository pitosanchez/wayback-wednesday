import { Resend } from "resend";
import { env } from "./env.js";

// Initialize Resend client (BACKEND ONLY - NEVER EXPOSE TO FRONTEND)
export const resend = new Resend(env.RESEND_API_KEY);

/**
 * Send contact form email
 * SECURITY: This runs on backend only, API key never exposed to frontend
 */
export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
  testTo?: string;
}) {
  const { name, email, message, testTo } = params;
  const to = resolveRecipient(testTo);

  return resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    replyTo: email,
    subject: `New Contact from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}

/**
 * Send booking request email
 */
export async function sendBookingEmail(params: {
  name: string;
  email: string;
  bookingType: string;
  eventDate: string;
  eventTime: string;
  notes?: string;
  testTo?: string;
}) {
  const { name, email, bookingType, eventDate, eventTime, notes, testTo } =
    params;
  const to = resolveRecipient(testTo);

  return resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    replyTo: email,
    subject: `New Booking Request: ${bookingType} - ${name}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type:</strong> ${bookingType}</p>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Time:</strong> ${eventTime}</p>
      ${
        notes
          ? `<p><strong>Notes:</strong><br>${notes.replace(/\n/g, "<br>")}</p>`
          : ""
      }
    `,
    text: `Booking Request\n\nName: ${name}\nEmail: ${email}\nType: ${bookingType}\nDate: ${eventDate}\nTime: ${eventTime}\n${
      notes ? `\nNotes:\n${notes}` : ""
    }`,
  });
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(params: {
  email: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  testTo?: string;
}) {
  const { email, orderNumber, items, total, testTo } = params;
  const to = resolveRecipient(testTo) || email;

  const itemsList = items
    .map((item) => `${item.name} x${item.quantity} - $${item.price.toFixed(2)}`)
    .join("\n");

  return resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: `Order Confirmation #${orderNumber}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <h3>Items:</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.name} x${item.quantity} - $${item.price.toFixed(
                2
              )}</li>`
          )
          .join("")}
      </ul>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      <p>We'll send you tracking information once your order ships!</p>
    `,
    text: `Order Confirmation #${orderNumber}\n\nItems:\n${itemsList}\n\nTotal: $${total.toFixed(
      2
    )}\n\nWe'll send you tracking information once your order ships!`,
  });
}

console.log("✅ Resend email service initialized");

function resolveRecipient(testTo?: string): string | undefined {
  if (!testTo) return env.CONTACT_TO;
  const allow = (env.ALLOWED_TEST_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allow.includes(testTo.trim().toLowerCase())) {
    return testTo.trim();
  }
  return env.CONTACT_TO;
}
