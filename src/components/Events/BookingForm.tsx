import React, { useMemo, useState } from "react";

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

const BOOKING_TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const BOOKING_TYPES: BookingType[] = [
  "DJ Set",
  "Live Performance",
  "Host/MC",
  "Panel/Workshop",
  "Private Event",
  "Brand/Collab",
];

const DURATIONS = [1, 2, 3, 4];

interface BookingFormProps {
  disabledDates?: string[]; // YYYY-MM-DD
  onBooked?: (booking: BookingRequest) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  disabledDates = [],
  onBooked,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<BookingRequest | null>(null);
  const [error, setError] = useState<string>("");

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState<Partial<BookingRequest>>({
    name: "",
    email: "",
    type: "DJ Set",
    date: "",
    time: "19:00",
    duration: 2,
    locationType: "In-Person",
    budget: "TBD",
  });

  const isDisabledDate = (d?: string) =>
    !d || d < todayStr || disabledDates.includes(d);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.type || !form.date || !form.time) {
      setError("Please complete all required fields.");
      return;
    }
    if (isDisabledDate(form.date)) {
      setError("Selected date is unavailable. Please choose another date.");
      return;
    }

    setSubmitting(true);
    try {
      const booking: BookingRequest = {
        id: crypto.randomUUID(),
        name: form.name!,
        email: form.email!,
        phone: form.phone,
        organization: form.organization,
        type: form.type as BookingType,
        date: form.date!,
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
          <p>Type: {success.type}</p>
          <p>
            Date: {success.date} at {success.time} for {success.duration}h
          </p>
          <p>Format: {success.locationType}</p>
          {success.venueAddress ? <p>Venue: {success.venueAddress}</p> : null}
          {success.notes ? <p>Notes: {success.notes}</p> : null}
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
        <h3 className="text-2xl font-alt-gothic">Book G‑Bo The Pro</h3>
        <p className="text-white/60 text-sm">
          Touring, festivals, private events, brand activations, panels, and
          more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
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
          <label className="text-sm text-white/60">Organization</label>
          <input
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.organization || ""}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Phone</label>
          <input
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Booking Type*</label>
          <select
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as BookingType })
            }
          >
            {BOOKING_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-white/60">Budget</label>
          <select
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          >
            {["TBD", "$2k-$5k", "$5k-$10k", "$10k-$20k", "$20k+"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-white/60">Preferred Date*</label>
          <input
            type="date"
            min={todayStr}
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2 disabled:opacity-50"
            value={form.date || ""}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          {isDisabledDate(form.date) ? (
            <p className="text-xs text-red-400 mt-1">
              Selected date unavailable.
            </p>
          ) : null}
        </div>

        <div>
          <label className="text-sm text-white/60">Start Time*</label>
          <select
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          >
            {BOOKING_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-white/60">Duration (hours)</label>
          <select
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
          >
            {DURATIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-white/60">Format</label>
          <div className="mt-1 flex gap-3">
            {(["In-Person", "Virtual"] as const).map((opt) => (
              <label
                key={opt}
                className="inline-flex items-center gap-2 text-sm text-white/80"
              >
                <input
                  type="radio"
                  checked={form.locationType === opt}
                  onChange={() => setForm({ ...form, locationType: opt })}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {form.locationType === "In-Person" && (
          <div className="sm:col-span-2">
            <label className="text-sm text-white/60">Venue Address</label>
            <input
              className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
              value={form.venueAddress || ""}
              onChange={(e) =>
                setForm({ ...form, venueAddress: e.target.value })
              }
            />
          </div>
        )}

        <div className="sm:col-span-2">
          <label className="text-sm text-white/60">Additional Notes</label>
          <textarea
            rows={4}
            className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Audience size, set length, tech needs, vibe, etc."
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

      <p className="text-xs text-white/40 mt-3">
        By submitting, you agree to be contacted about this inquiry. This
        request does not confirm a booking.
      </p>
    </form>
  );
};

export default BookingForm;
