import React, { useMemo, useState } from "react";
import { generateId } from "../../utils/id";

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
      // SECURE: Send booking request to backend API (Resend API key stays on server)
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            organization: form.organization,
            bookingType: form.type,
            eventDate: form.date || todayStr,
            eventTime: form.time,
            duration: Number(form.duration || 2),
            locationType: form.locationType || "In-Person",
            venueAddress: form.venueAddress,
            budget: form.budget || "TBD",
            notes: form.notes,
            // Optional test recipient override
            testTo: import.meta.env.VITE_TEST_EMAIL || undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit booking");
      }

      const result = await response.json();

      if (result.ok) {
        // Create booking object for local state
        const booking: BookingRequest = {
          id: result.booking.id || generateId(),
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

        setSuccess(booking);
        onBooked?.(booking);
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 sm:p-6 max-w-full shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-alt-gothic mb-2 sm:mb-3 text-rich-black">
            Booking Request Sent!
          </h3>
          <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
            Thanks {success.name}! We'll review your request and follow up at{" "}
            <span className="text-rich-black font-medium break-all">
              {success.email}
            </span>
            .
          </p>

          {success.notes && (
            <div className="bg-white border-2 border-gray-200 p-3 mb-4 text-left rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                Your Message:
              </p>
              <p className="text-sm text-gray-700 italic">{success.notes}</p>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-300 p-3 mb-6 text-left rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              What happens next?
            </h4>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• We'll review your request within 24-48 hours</li>
              <li>• You'll receive a follow-up email or phone call</li>
              <li>• We'll discuss details and finalize arrangements</li>
            </ul>
          </div>
        </div>

        <button
          className="w-full py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-200 text-sm sm:text-base shadow-lg"
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
      className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-4 sm:p-6 max-w-full shadow-xl"
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-alt-gothic text-rich-black">
          Booking Request
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Name, email, phone and message.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Name*
          </label>
          <input
            className="w-full bg-white border-2 border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 rounded-lg"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Email*
          </label>
          <input
            type="email"
            className="w-full bg-white border-2 border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 rounded-lg"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Phone
          </label>
          <input
            type="tel"
            className="w-full bg-white border-2 border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 rounded-lg"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-700 mb-1 font-medium">
            Message*
          </label>
          <textarea
            rows={4}
            className="w-full bg-white border-2 border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 resize-none rounded-lg"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Tell us about your booking request, event details, preferred dates, etc."
            required
          />
        </div>
      </div>

      {error ? (
        <div className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full py-3 sm:py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base shadow-lg"
      >
        {submitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
