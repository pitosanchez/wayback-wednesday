import React, { useMemo, useState } from "react";
import { generateId } from "../../utils/id";
import { Resend } from "resend";

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

      const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

      console.log("getting resend api key", import.meta.env.VITE_RESEND_API_KEY);

      const { data, error } = await resend.emails.send({
        from: `${form.name} <${form.email}>`,
        to: ["robsanchez124@gmail.com"],
        subject: "New Booking Request",
        html: "<p>it works!</p>",
        replyTo: form.email,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });

      const raw = localStorage.getItem("bookings") || "[]";
      const list = JSON.parse(raw) as BookingRequest[];
      list.push(booking);
      localStorage.setItem("bookings", JSON.stringify(list));

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
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 max-w-full">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-alt-gothic mb-2 sm:mb-3">Booking Request Sent!</h3>
          <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed">
            Thanks {success.name}! We'll review your request and follow up at{" "}
            <span className="text-white font-medium break-all">{success.email}</span>.
          </p>

          {success.notes && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4 text-left">
              <p className="text-xs sm:text-sm text-white/60 mb-1 font-medium">Your Message:</p>
              <p className="text-sm text-white/80 italic">{success.notes}</p>
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6 text-left">
            <h4 className="text-sm font-semibold text-blue-300 mb-2">What happens next?</h4>
            <ul className="text-xs sm:text-sm text-white/70 space-y-1">
              <li>• We'll review your request within 24-48 hours</li>
              <li>• You'll receive a follow-up email or phone call</li>
              <li>• We'll discuss details and finalize arrangements</li>
            </ul>
          </div>
        </div>

        <button
          className="w-full py-3 bg-white text-rich-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 text-sm sm:text-base"
          onClick={() => setSuccess(null)}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 max-w-full"
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-alt-gothic">Booking Request</h3>
        <p className="text-white/60 text-xs sm:text-sm mt-1">Name, email, phone and message.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/60 mb-1 font-medium">Name*</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1 font-medium">Email*</label>
          <input
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1 font-medium">Phone</label>
          <input
            type="tel"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/60 mb-1 font-medium">Message*</label>
          <textarea
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 resize-none"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Tell us about your booking request, event details, preferred dates, etc."
            required
          />
        </div>
      </div>

      {error ? (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-3 sm:py-3.5 bg-white text-rich-black rounded-lg font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
      >
        {submitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </div>
        ) : (
          "Request Booking"
        )}
      </button>
    </form>
  );
};

export default BookingForm;
