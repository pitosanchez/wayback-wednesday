import React, { useMemo } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  price: string;
  status: "upcoming" | "live" | "past";
  category: "music" | "culture" | "community" | "special";
}

interface EventCalendarProps {
  currentMonth: Date;
  events: Event[];
  isAdmin: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onQuickAddDate: (dateStr: string) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({
  currentMonth,
  events,
  isAdmin,
  onPrevMonth,
  onNextMonth,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onQuickAddDate,
}) => {
  // Get current date in EST/EDT timezone
  const getTodayEST = () => {
    const now = new Date();
    const estDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    return {
      year: estDate.getFullYear(),
      month: estDate.getMonth(),
      day: estDate.getDate(),
    };
  };

  const today = getTodayEST();

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevPadding = firstDay.getDay();
    const totalCells = Math.ceil((prevPadding + lastDay.getDate()) / 7) * 7;
    const cells: { date: Date | null }[] = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - prevPadding + 1;
      if (dayNum < 1 || dayNum > lastDay.getDate()) {
        cells.push({ date: null });
      } else {
        cells.push({ date: new Date(year, month, dayNum) });
      }
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

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getFullYear() === today.year &&
      date.getMonth() === today.month &&
      date.getDate() === today.day
    );
  };

  // Category color mapping - Soft colors with glassmorphism
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "music":
        return "bg-red-400/70 backdrop-blur-sm";
      case "culture":
        return "bg-blue-400/70 backdrop-blur-sm";
      case "community":
        return "bg-white/80 backdrop-blur-sm text-black";
      case "special":
        return "bg-red-400/70 backdrop-blur-sm";
      default:
        return "bg-red-400/70 backdrop-blur-sm";
    }
  };

  const handleEventClick = (event: Event) => {
    // Show event details in a simple alert or could be expanded to a modal
    const eventDetails = `
      ${event.title}
      
      📅 Date: ${event.date}
      🕐 Time: ${event.time}
      📍 Location: ${event.location}
      💵 Price: ${event.price}
      
      ${event.description}
    `;
    alert(eventDetails);
  };

  return (
    <div className="relative">
      {/* Calendar Container */}
      <div className="relative glass-morphism-3d rounded-2xl p-6 shadow-2xl">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse-slow"></div>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevMonth}
              className="group p-3 bg-rose-500/70 hover:bg-rose-400/70 backdrop-blur-md rounded-lg border-2 border-rose-300/30 hover:border-rose-300/60 hover:scale-110 transition-all"
            >
              <svg
                className="w-5 h-5 text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h2 className="text-4xl font-alt-gothic text-white drop-shadow-lg">
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </h2>

            <button
              onClick={onNextMonth}
              className="group p-3 bg-sky-500/70 hover:bg-sky-400/70 backdrop-blur-md rounded-lg border-2 border-sky-300/30 hover:border-sky-300/60 hover:scale-110 transition-all"
            >
              <svg
                className="w-5 h-5 text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={onAddEvent}
              className="px-6 py-3 bg-emerald-500/80 hover:bg-emerald-400/80 backdrop-blur-md text-white rounded-lg font-bold border-2 border-emerald-300/30 hover:border-emerald-300/60 hover:scale-105 transition-all shadow-xl"
            >
              ✨ Add Event
            </button>
          )}
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-3 mb-4 relative z-10">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="text-center text-white text-sm font-bold py-3 glass-badge rounded-lg border border-white/40 shadow-lg"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 relative z-10">
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
            const isTodayDate = isToday(cell.date);

            return (
              <div
                key={idx}
                className={`calendar-cell min-h-[140px] rounded-xl transition-all ${
                  cell.date
                    ? isTodayDate
                      ? "glass-card-highlight border-2 border-blue-400/60 shadow-xl shadow-blue-400/30"
                      : "glass-card border border-white/20 hover:border-purple-400/60 hover:shadow-2xl"
                    : "bg-transparent border border-white/10"
                } p-3 relative overflow-hidden group`}
              >
                {/* Date Header */}
                <div className="flex items-center justify-between mb-2 relative z-10">
                  {cell.date ? (
                    <div
                      className={`text-lg font-bold px-2 py-1 ${
                        isTodayDate ? "text-white" : "text-white"
                      }`}
                    >
                      {cell.date.getDate()}
                    </div>
                  ) : (
                    <span></span>
                  )}
                  {isAdmin && cell.date && (
                    <button
                      onClick={() => onQuickAddDate(dateStr)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-white/90 backdrop-blur-sm text-red-400 rounded-md hover:bg-red-400 hover:text-white text-xs font-bold border border-red-400/50"
                    >
                      +
                    </button>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-1.5 relative z-10">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => handleEventClick(ev)}
                      className={`text-xs rounded-lg px-2 py-1.5 cursor-pointer transition-all hover:scale-105 ${getCategoryColor(
                        ev.category
                      )} border border-white/40 shadow-md`}
                      title={`Click to view details: ${ev.time} @ ${ev.location}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-bold underline underline-offset-2">
                          {ev.title}
                        </span>
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              className="hover:scale-110 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditEvent(ev);
                              }}
                            >
                              ✎
                            </button>
                            <button
                              className="hover:scale-110 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteEvent(ev.id);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Today indicator */}
                {isTodayDate && (
                  <div className="absolute bottom-2 right-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse border-2 border-blue-400 shadow-lg shadow-blue-400/50"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* EST Timezone Indicator */}
        <div className="mt-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 glass-badge rounded-full border border-white/40 text-white text-xs font-bold shadow-2xl">
            <svg
              className="w-4 h-4 animate-spin-slow"
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
            Eastern Time Zone (NYC)
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
