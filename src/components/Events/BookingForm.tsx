import React, { useMemo, useState } from "react";
import { generateId } from "../../utils/id";
import { emailService } from "../../services/emailService";

export type BookingType =
  | "DJ Set"
  | "Live Performance"
  | "Host/MC"
  | "Panel/Workshop"
  | "Private Event"
  | "Brand/Collab";

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  type: BookingType;
  date: string; // YYYY-MM-DD
  time: string; // 24h HH:mm
  duration: number; // hours
  locationType: "In-Person" | "Virtual";
  venueAddress?: string;
  budget?: string;
  notes?: string;
  createdAt: string;
}

interface BookingFormProps {
  onBooked?: (booking: BookingRequest) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBooked }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<BookingRequest | null>(null);
  const [error, setError] = useState<string>("");

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState<Partial<BookingRequest>>({
    name: "",
    email: "",
    type: "DJ Set",
    date: todayStr,
    time: "19:00",
    duration: 2,
    locationType: "In-Person",
    budget: "TBD",
  });

  const sendBookingEmails = async (booking: BookingRequest) => {
    if (!emailService.isConfigured()) {
      console.log('📧 Email service not configured - skipping booking emails');
      return;
    }

    try {
      // Send confirmation email to customer
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Confirmation - Wayback Wednesday</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎵 Booking Request Received!</h1>
              <p>Thanks for reaching out to Wayback Wednesday</p>
            </div>
            <div class="content">
              <h2>Hi ${booking.name}!</h2>
              <p>We've received your booking request and we're excited to work with you! Here are the details we have on file:</p>

              <div class="booking-details">
                <h3 style="color: var(--denim-blue); margin-bottom: 15px;">Booking Details</h3>
                <div class="detail-row">
                  <strong>Booking ID:</strong>
                  <span>${booking.id}</span>
                </div>
                <div class="detail-row">
                  <strong>Type:</strong>
                  <span>${booking.type}</span>
                </div>
                <div class="detail-row">
                  <strong>Date & Time:</strong>
                  <span>${new Date(booking.date + 'T' + booking.time).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                  <strong>Duration:</strong>
                  <span>${booking.duration} hour(s)</span>
                </div>
                <div class="detail-row">
                  <strong>Location Type:</strong>
                  <span>${booking.locationType}</span>
                </div>
                ${booking.venueAddress ? `
                <div class="detail-row">
                  <strong>Venue:</strong>
                  <span>${booking.venueAddress}</span>
                </div>` : ''}
                ${booking.budget ? `
                <div class="detail-row">
                  <strong>Budget:</strong>
                  <span>${booking.budget}</span>
                </div>` : ''}
              </div>

              ${booking.notes ? `
              <div class="booking-details">
                <h3 style="color: var(--denim-blue); margin-bottom: 15px;">Your Message</h3>
                <p style="font-style: italic;">"${booking.notes}"</p>
              </div>` : ''}

              <p><strong>What's Next?</strong></p>
              <ul>
                <li>📞 We'll review your request within 24-48 hours</li>
                <li>📧 You'll receive a follow-up email or phone call to discuss details</li>
                <li>📋 We'll work together to finalize the arrangement</li>
                <li>🎵 Let's create something amazing together!</li>
              </ul>

              <p>If you have any immediate questions or need to make changes, feel free to reach out to us.</p>

              <p>Looking forward to working with you!</p>
              <p><strong>The Wayback Wednesday Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.</p>
              <p>This email was sent because you submitted a booking request on our website.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const customerText = `
Booking Request Received - Wayback Wednesday

Hi ${booking.name}!

We've received your booking request and we're excited to work with you! Here are the details:

Booking ID: ${booking.id}
Type: ${booking.type}
Date & Time: ${new Date(booking.date + 'T' + booking.time).toLocaleString()}
Duration: ${booking.duration} hour(s)
Location: ${booking.locationType}
${booking.venueAddress ? `Venue: ${booking.venueAddress}` : ''}
${booking.budget ? `Budget: ${booking.budget}` : ''}

${booking.notes ? `Your Message: "${booking.notes}"` : ''}

What's Next?
- We'll review your request within 24-48 hours
- You'll receive a follow-up email or phone call to discuss details
- We'll work together to finalize the arrangement

Looking forward to working with you!
The Wayback Wednesday Team

© ${new Date().getFullYear()} Wayback Wednesday. All rights reserved.
      `;

      // Send confirmation to customer
      await emailService.sendEmail(
        booking.email,
        `🎵 Booking Request Received - ${booking.type} on ${new Date(booking.date).toLocaleDateString()}`,
        customerHtml,
        customerText
      );

      // Send notification to business (using the configured from email or a business email)
      const businessEmail = 'bookings@gbothepro.com'; // You can change this to your preferred business email

      const businessHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Booking Request</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .urgent { background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Booking Request</h1>
              <p>Action Required - New Customer Inquiry</p>
            </div>
            <div class="content">
              <div class="urgent">
                <strong>⏰ Follow up required within 24-48 hours</strong>
              </div>

              <h2>Customer Information</h2>
              <div class="booking-details">
                <div class="detail-row">
                  <strong>Name:</strong>
                  <span>${booking.name}</span>
                </div>
                <div class="detail-row">
                  <strong>Email:</strong>
                  <span><a href="mailto:${booking.email}">${booking.email}</a></span>
                </div>
                ${booking.phone ? `
                <div class="detail-row">
                  <strong>Phone:</strong>
                  <span><a href="tel:${booking.phone}">${booking.phone}</a></span>
                </div>` : ''}
                ${booking.organization ? `
                <div class="detail-row">
                  <strong>Organization:</strong>
                  <span>${booking.organization}</span>
                </div>` : ''}
              </div>

              <h2>Booking Details</h2>
              <div class="booking-details">
                <div class="detail-row">
                  <strong>Booking ID:</strong>
                  <span>${booking.id}</span>
                </div>
                <div class="detail-row">
                  <strong>Type:</strong>
                  <span>${booking.type}</span>
                </div>
                <div class="detail-row">
                  <strong>Date & Time:</strong>
                  <span>${new Date(booking.date + 'T' + booking.time).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                  <strong>Duration:</strong>
                  <span>${booking.duration} hour(s)</span>
                </div>
                <div class="detail-row">
                  <strong>Location:</strong>
                  <span>${booking.locationType}</span>
                </div>
                ${booking.venueAddress ? `
                <div class="detail-row">
                  <strong>Venue Address:</strong>
                  <span>${booking.venueAddress}</span>
                </div>` : ''}
                ${booking.budget ? `
                <div class="detail-row">
                  <strong>Budget:</strong>
                  <span>${booking.budget}</span>
                </div>` : ''}
                <div class="detail-row">
                  <strong>Submitted:</strong>
                  <span>${new Date(booking.createdAt).toLocaleString()}</span>
                </div>
              </div>

              ${booking.notes ? `
              <h2>Customer Message</h2>
              <div class="booking-details">
                <p style="font-style: italic; background: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6;">"${booking.notes}"</p>
              </div>` : ''}

              <h2>Next Steps</h2>
              <ul>
                <li>📞 <strong>Contact the customer within 24-48 hours</strong></li>
                <li>📧 Reply to <a href="mailto:${booking.email}">${booking.email}</a></li>
                <li>📋 Discuss event details and requirements</li>
                <li>💰 Negotiate pricing and terms</li>
                <li>📄 Send contract/agreement if proceeding</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `;

      const businessText = `
New Booking Request - Wayback Wednesday

CUSTOMER INFORMATION:
Name: ${booking.name}
Email: ${booking.email}
${booking.phone ? `Phone: ${booking.phone}` : ''}
${booking.organization ? `Organization: ${booking.organization}` : ''}

BOOKING DETAILS:
ID: ${booking.id}
Type: ${booking.type}
Date & Time: ${new Date(booking.date + 'T' + booking.time).toLocaleString()}
Duration: ${booking.duration} hour(s)
Location: ${booking.locationType}
${booking.venueAddress ? `Venue: ${booking.venueAddress}` : ''}
${booking.budget ? `Budget: ${booking.budget}` : ''}
Submitted: ${new Date(booking.createdAt).toLocaleString()}

${booking.notes ? `CUSTOMER MESSAGE: "${booking.notes}"` : ''}

ACTION REQUIRED: Contact customer within 24-48 hours at ${booking.email}
      `;

      // Send notification to business
      await emailService.sendEmail(
        businessEmail,
        `🚨 New Booking Request: ${booking.type} - ${booking.name}`,
        businessHtml,
        businessText
      );

      console.log('✅ Booking confirmation emails sent successfully');
    } catch (error) {
      console.warn('⚠️ Failed to send booking emails:', error);
      // Don't throw error - we don't want to break the booking process if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email) {
      setError("Please enter your name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const booking: BookingRequest = {
        id: generateId(),
        name: form.name!,
        email: form.email!,
        phone: form.phone,
        organization: form.organization,
        type: form.type as BookingType,
        date: form.date || todayStr,
        time: form.time!,
        duration: Number(form.duration || 2),
        locationType: (form.locationType || "In-Person") as
          | "In-Person"
          | "Virtual",
        venueAddress: form.venueAddress,
        budget: form.budget || "TBD",
        notes: form.notes,
        createdAt: new Date().toISOString(),
      };

      const raw = localStorage.getItem("bookings") || "[]";
      const list = JSON.parse(raw) as BookingRequest[];
      list.push(booking);
      localStorage.setItem("bookings", JSON.stringify(list));

      // Send booking confirmation emails
      await sendBookingEmails(booking);

      setSuccess(booking);
      onBooked?.(booking);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-2xl font-alt-gothic mb-2">Booking Request Sent</h3>
        <p className="text-white/70 mb-4">
          Thanks {success.name}! We’ll review your request and follow up at{" "}
          {success.email}.
        </p>
        <div className="text-sm text-white/50 space-y-1">
          {success.notes ? <p>Message: {success.notes}</p> : null}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-white text-rich-black rounded font-semibold hover:bg-white/90"
          onClick={() => setSuccess(null)}
        >
          Create Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-alt-gothic">Booking Request</h3>
        <p className="text-white/60 text-sm">Name, email, phone and message.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-sm text-white/60">Name*</label>
          <input
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Email*</label>
          <input
            type="email"
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Phone*</label>
          <input
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-white/60">Message*</label>
          <textarea
            rows={4}
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Tell us about your booking."
            required
          />
        </div>
      </div>

      {error ? <p className="text-sm text-red-400 mt-3">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-3 bg-white text-rich-black rounded font-semibold hover:bg-white/90 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Request Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
