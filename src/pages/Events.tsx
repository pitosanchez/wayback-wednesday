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

  return (
    <div className="min-h-screen bg-rich-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-alt-gothic mb-3">Events & Bookings</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            See what's coming up and request a booking with G‑Bo The Pro for
            your next show, private event, brand collab, or cultural experience.
          </p>
        </div>

        {/* Featured Documentary Screening */}
        {featuredEvent && (
          <FeaturedEvent
            event={featuredEvent}
            ticketUrl="https://www.ticketleap.events/tickets/gbodoublerdoc/this-is-how-it-should-be-done-g-bo-double-r-documentary-screening"
          />
        )}

        {/* Calendar Section */}
        <div className="mb-16">
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

        {/* Booking Request Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-alt-gothic mb-6 text-center">
            Request a Booking
          </h2>
          <BookingForm onBooked={handleBooking} />
          <div className="mt-6 text-white/50 text-xs text-center">
            Unavailable dates are disabled based on confirmed events.
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
