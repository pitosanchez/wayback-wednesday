import { useState, useEffect } from "react";
import { generateId } from "../utils/id";
import docPoster from "../assets/images/thisshouldbedone.webp";

export interface Event {
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

const FEATURED_EVENT_ID = "gbo-documentary-screening";
const FEATURED_EVENT: Event = {
  id: FEATURED_EVENT_ID,
  title: "This Is How It Should Be Done",
  date: "2025-11-11", // Tuesday, November 11, 2025
  time: "7:00 PM",
  location: "El Barrio Art Space PS 109",
  description:
    "G-Bo Double R Documentary Screening - An intimate look at the journey and impact of G-Bo The Pro. Join us for this special screening event.",
  image: docPoster,
  price: "See TicketLeap",
  status: "upcoming",
  category: "special",
};

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from localStorage and ensure featured event exists
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

    // Ensure featured event exists and is up to date
    const docScreeningIndex = loadedEvents.findIndex(
      (e) => e.id === FEATURED_EVENT_ID
    );

    if (docScreeningIndex >= 0) {
      loadedEvents[docScreeningIndex] = FEATURED_EVENT;
    } else {
      loadedEvents = [FEATURED_EVENT, ...loadedEvents];
    }

    localStorage.setItem("events", JSON.stringify(loadedEvents));
    setEvents(loadedEvents);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...event,
      id: generateId(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getFeaturedEvent = () => {
    return events.find((e) => e.id === FEATURED_EVENT_ID);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getFeaturedEvent,
  };
};
