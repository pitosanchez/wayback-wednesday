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

      const resend = new Resend(process.env.RESEND_API_KEY);

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
