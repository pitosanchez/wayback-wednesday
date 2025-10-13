import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import BookingForm, {
  type BookingRequest,
} from "../components/Events/BookingForm";
import FeaturedEvent from "../components/Events/FeaturedEvent";
import EventCalendar from "../components/Events/EventCalendar";
import EventFormModal from "../components/Events/EventFormModal";
import { useEvents, type Event } from "../hooks/useEvents";
import {
  getFirstDayOfMonth,
  getPreviousMonth,
  getNextMonth,
  parseLocalDate,
} from "../utils/dateUtils";

const Events: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const { events, addEvent, updateEvent, deleteEvent, getFeaturedEvent } =
    useEvents();

  const [currentMonth, setCurrentMonth] = useState(() =>
    getFirstDayOfMonth(new Date())
  );
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

  // Make Add Event form visible by default for admins
  useEffect(() => {
    if (isAuthenticated) setShowForm(true);
  }, [isAuthenticated]);

  const handleSaveEvent = () => {
    if (!draft.title || !draft.date) return;

    if (draft.id) {
      // Update existing event
      updateEvent(draft.id, draft as Event);
    } else {
      // Add new event
      addEvent({
        title: draft.title,
        date: draft.date,
        time: draft.time || "8:00 PM",
        location: draft.location || "",
        description: draft.description || "",
        image: draft.image,
        price: draft.price || "Free",
        status: draft.status || "upcoming",
        category: draft.category || "music",
      });
    }

    // Jump calendar to selected date's month
    try {
      const eventDate = parseLocalDate(draft.date);
      setCurrentMonth(getFirstDayOfMonth(eventDate));
    } catch (err) {
      console.warn("Invalid event date; keeping current month", err);
    }

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setDraft({
      title: "",
      date: "",
      time: "8:00 PM",
      location: "",
      description: "",
      price: "Free",
      status: "upcoming",
      category: "music",
    });
  };

  const handleEditEvent = (event: Event) => {
    setDraft(event);
    setShowForm(true);
  };

  const handleQuickAddDate = (dateStr: string) => {
    setDraft({ ...draft, date: dateStr });
    setShowForm(true);
  };

  const handleBooking = (booking: BookingRequest) => {
    addEvent({
      title: `${booking.type} (Pending)`,
      date: booking.date,
      time: booking.time,
      location:
        booking.locationType === "Virtual"
          ? "Virtual"
          : booking.venueAddress || "",
      description: booking.notes || "",
      price: "TBD",
      status: "upcoming",
      category: "special",
    });
  };

  const featuredEvent = getFeaturedEvent();

  // Render Events page with Z-pattern visual hierarchy
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Z-Pattern Layout Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Z-Pattern: Top Left - Header (Primary focal point) */}
        <div className="mb-8 sm:mb-12 lg:mb-16 relative">
          {/* Mobile: Center-aligned, Desktop: Left-aligned for Z-pattern */}
          <div className="text-center lg:text-left max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-alt-gothic mb-3 sm:mb-4 text-rich-black leading-tight">
              Events & Bookings
            </h1>

            {/* Visual Cue - Accent line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-fire-red"></div>
              <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">
                Book G-Bo
              </span>
              <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent"></div>
            </div>

            <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              See what's coming up and request a booking with G‑Bo The Pro for
              your next show, private event, brand collab, or cultural
              experience.
            </p>
          </div>
        </div>

        {/* Z-Pattern: Top Right - Featured Event (Secondary focal point) */}
        {featuredEvent && (
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <FeaturedEvent
              event={featuredEvent}
              ticketUrl="https://www.ticketleap.events/tickets/gbodoublerdoc/this-is-how-it-should-be-done-g-bo-double-r-documentary-screening"
            />
          </div>
        )}

        {/* Z-Pattern: Diagonal/Center - Calendar (Main content area with visual weight) */}
        <div className="mb-12 sm:mb-16 lg:mb-24">
          {/* Visual indicator - Section divider */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
              Upcoming Events
            </span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          <EventCalendar
            currentMonth={currentMonth}
            events={events}
            isAdmin={isAuthenticated}
            onPrevMonth={() => setCurrentMonth(getPreviousMonth(currentMonth))}
            onNextMonth={() => setCurrentMonth(getNextMonth(currentMonth))}
            onAddEvent={() => setShowForm(true)}
            onEditEvent={handleEditEvent}
            onDeleteEvent={deleteEvent}
            onQuickAddDate={handleQuickAddDate}
          />
        </div>

        {/* Z-Pattern: Bottom - Call to Action (Final focal point) */}
        <div className="max-w-4xl mx-auto">
          {/* Visual indicator - Section divider */}
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
            <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
              Book G-Bo
            </span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
          </div>

          <div className="text-center lg:text-left mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic mb-3 sm:mb-4 text-white">
              Request a Booking
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Ready to bring the energy? Fill out the form below and let's make
              it happen.
            </p>
          </div>

          <BookingForm onBooked={handleBooking} />

          {/* White space for breathing room */}
          <div className="mt-8 sm:mt-10 text-white/50 text-xs sm:text-sm text-center lg:text-left leading-relaxed">
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Unavailable dates are disabled based on confirmed events.
            </span>
          </div>
        </div>

        {/* Event Form Modal */}
        {isAuthenticated && (
          <EventFormModal
            isOpen={showForm}
            draft={draft}
            onClose={resetForm}
            onSave={handleSaveEvent}
            onChange={(updates) => setDraft({ ...draft, ...updates })}
          />
        )}

        {/* Navigation - White space separation */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-600/80 hover:bg-slate-500/80 text-white text-sm sm:text-base font-medium rounded-xl hover:scale-105 transition-all shadow-2xl backdrop-blur-md group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
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
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
