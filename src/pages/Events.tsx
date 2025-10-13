import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import BookingForm, {
  type BookingRequest,
} from "../components/Events/BookingForm";
import { generateId } from "../utils/id";
import docPoster from "../assets/images/thisshouldbedone.webp";

interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  image?: string;
  price: string;
  status: "upcoming" | "live" | "past";
  category: "music" | "culture" | "community" | "special";
}

const Events: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Partial<Event>>({
    title: "",
    date: "",
    time: "8:00 PM",
    location: "",
    description: "",
    price: "Free",
    status: "upcoming",
    category: "music",
  });

  // Load/save from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("events");
    let loadedEvents: Event[] = [];
    if (raw) {
      try {
        loadedEvents = JSON.parse(raw) as Event[];
      } catch (err) {
        console.warn("Failed to parse events from localStorage", err);
        localStorage.removeItem("events");
      }
    }

    // Ensure G-Bo Documentary Screening exists
    const hasDocScreening = loadedEvents.some(
      (e) => e.id === "gbo-documentary-screening"
    );
    if (!hasDocScreening) {
      const docScreening: Event = {
        id: "gbo-documentary-screening",
        title: "This Is How It Should Be Done",
        date: "2025-11-11", // Tuesday, November 11, 2025
        time: "7:00 PM",
        location: "TBA",
        description:
          "G-Bo Double R Documentary Screening - An intimate look at the journey and impact of G-Bo The Pro. Join us for this special screening event.",
        image: docPoster,
        price: "See TicketLeap",
        status: "upcoming",
        category: "special",
      };
      loadedEvents = [docScreening, ...loadedEvents];
      localStorage.setItem("events", JSON.stringify(loadedEvents));
    }

    setEvents(loadedEvents);
  }, []);
  // Make Add Event active by default for admins
  useEffect(() => {
    if (isAuthenticated) setShowForm(true);
  }, [isAuthenticated]);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevPadding = firstDay.getDay(); // 0-6, Sun-Sat
    const totalCells = Math.ceil((prevPadding + lastDay.getDate()) / 7) * 7;
    const cells: { date: Date | null }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - prevPadding + 1;
      if (dayNum < 1 || dayNum > lastDay.getDate()) cells.push({ date: null });
      else cells.push({ date: new Date(year, month, dayNum) });
    }
    return cells;
  }, [currentMonth]);

  const eventsByDay = useMemo(() => {
    const map: Record<string, Event[]> = {};
    for (const e of events) {
      map[e.date] ||= [];
      map[e.date].push(e);
    }
    return map;
  }, [events]);

  // Note: disabledDates no longer passed to BookingForm after simplification.

  const addOrUpdateEvent = (e?: Event) => {
    if (!draft.title || !draft.date) return;
    if (e) {
      setEvents((prev) =>
        prev.map((it) =>
          it.id === e.id ? { ...(e as Event), ...(draft as Event) } : it
        )
      );
    } else {
      const newEvent: Event = {
        id: generateId(),
        title: draft.title!,
        date: draft.date!,
        time: draft.time || "8:00 PM",
        location: draft.location || "",
        description: draft.description || "",
        image: draft.image,
        price: draft.price || "Free",
        status: (draft.status as Event["status"]) || "upcoming",
        category: (draft.category as Event["category"]) || "music",
      };
      setEvents((prev) => [...prev, newEvent]);
    }
    // Jump calendar to selected date's month so the new/updated event is visible
    try {
      const d = new Date(draft.date!);
      setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    } catch (err) {
      console.warn("Invalid event date; keeping current month", err);
    }
    setShowForm(false);
    setDraft({
      title: "",
      date: "",
      time: "8:00 PM",
      price: "Free",
      status: "upcoming",
      category: "music",
    });
  };
  const deleteEvent = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  // Legacy list filters removed with calendar view

  // Get featured documentary event
  const featuredEvent = events.find(
    (e) => e.id === "gbo-documentary-screening"
  );

  return (
    <div className="min-h-screen bg-rich-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-alt-gothic mb-3">Events & Bookings</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            See what's coming up and request a booking with G‑Bo The Pro for
            your next show, private event, brand collab, or cultural experience.
          </p>
        </div>

        {/* Featured Documentary Screening */}
        {featuredEvent && (
          <div className="mb-12 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Poster Space */}
              <div className="flex items-center justify-center">
                {featuredEvent.image ? (
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full max-w-md rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-md aspect-[2/3] bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-lg border-2 border-dashed border-amber-500/50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-amber-200/80 font-alt-gothic text-xl mb-2">
                        Documentary Poster
                      </p>
                      <p className="text-white/50 text-sm">Image Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold mb-4 w-fit">
                  SPECIAL EVENT
                </div>
                <h2 className="text-4xl font-alt-gothic mb-4 text-amber-100">
                  {featuredEvent.title}
                </h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {featuredEvent.description}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-white/90">
                      {new Date(featuredEvent.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white/90">{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-white/90">
                      {featuredEvent.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    <span className="text-white/90">{featuredEvent.price}</span>
                  </div>
                </div>
                <a
                  href="https://www.ticketleap.events/tickets/gbodoublerdoc/this-is-how-it-should-be-done-g-bo-double-r-documentary-screening"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  Get Tickets on TicketLeap
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Calendar */}
          <div>
            {/* Calendar controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    )
                  }
                  className="px-3 py-2 bg-white/10 rounded hover:bg-white/20"
                >
                  ◀
                </button>
                <h2 className="text-2xl font-alt-gothic">
                  {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                  {currentMonth.getFullYear()}
                </h2>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1
                      )
                    )
                  }
                  className="px-3 py-2 bg-white/10 rounded hover:bg-white/20"
                >
                  ▶
                </button>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-white text-rich-black rounded font-semibold hover:bg-white/90"
                >
                  + Add Event
                </button>
              )}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-white/60 text-sm py-2">
                  {d}
                </div>
              ))}
              {daysInMonth.map((cell, idx) => {
                const dateStr = cell.date
                  ? `${cell.date.getFullYear()}-${String(
                      cell.date.getMonth() + 1
                    ).padStart(2, "0")}-${String(cell.date.getDate()).padStart(
                      2,
                      "0"
                    )}`
                  : "";
                const dayEvents = dateStr ? eventsByDay[dateStr] || [] : [];
                return (
                  <div
                    key={idx}
                    className={`min-h-[120px] rounded-lg border border-white/10 p-2 ${
                      cell.date ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/60">
                        {cell.date ? cell.date.getDate() : ""}
                      </span>
                      {isAuthenticated && cell.date && (
                        <button
                          onClick={() => {
                            setDraft({ ...draft, date: dateStr });
                            setShowForm(true);
                          }}
                          className="text-xs px-2 py-0.5 bg-white/10 rounded hover:bg-white/20"
                        >
                          +
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className="text-xs bg-white/10 rounded px-2 py-1 hover:bg-white/20 cursor-pointer"
                          title={`${ev.time} @ ${ev.location}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate">{ev.title}</span>
                            {isAuthenticated && (
                              <div className="flex items-center gap-1">
                                <button
                                  className="text-white/60 hover:text-white"
                                  onClick={() => {
                                    setDraft(ev);
                                    setShowForm(true);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() => deleteEvent(ev.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="sticky top-8">
            {/* Removed external screening CTA */}

            <BookingForm
              onBooked={(b: BookingRequest) => {
                setEvents((prev) => [
                  ...prev,
                  {
                    id: `booking-${b.id}`,
                    title: `${b.type} (Pending)`,
                    date: b.date,
                    time: b.time,
                    location:
                      b.locationType === "Virtual"
                        ? "Virtual"
                        : b.venueAddress || "",
                    description: b.notes || "",
                    price: "TBD",
                    status: "upcoming",
                    category: "special",
                  },
                ]);
              }}
            />
            <div className="mt-6 text-white/50 text-xs">
              Unavailable dates are disabled based on confirmed events.
            </div>
          </div>
        </div>

        {/* Admin modal */}
        {isAuthenticated && showForm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-rich-black border border-white/10 rounded-lg p-6 w-full max-w-lg text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-alt-gothic">
                  {(draft as Event).id ? "Edit Event" : "Add Event"}
                </h3>
                <button
                  className="text-white/60 hover:text-white"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60">Title</label>
                  <input
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.title || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.date || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Time</label>
                  <input
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.time || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, time: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Location</label>
                  <input
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.location || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, location: e.target.value })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-white/60">Description</label>
                  <textarea
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    rows={3}
                    value={draft.description || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Price</label>
                  <input
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.price || ""}
                    onChange={(e) =>
                      setDraft({ ...draft, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Category</label>
                  <select
                    className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-2"
                    value={draft.category}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        category: e.target.value as Event["category"],
                      })
                    }
                  >
                    <option value="music">Music</option>
                    <option value="culture">Culture</option>
                    <option value="community">Community</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-white text-rich-black rounded font-semibold hover:bg-white/90"
                  onClick={() =>
                    addOrUpdateEvent(
                      (draft as Event).id ? (draft as Event) : undefined
                    )
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
