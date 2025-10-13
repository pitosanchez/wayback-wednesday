import React from "react";

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

interface FeaturedEventProps {
  event: Event;
  ticketUrl?: string;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event, ticketUrl }) => {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    return localDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    // Special Event - Enhanced Glassmorphism
    <div className="mb-12 glass-morphism-3d relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 opacity-50 animate-gradient"></div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 relative z-10">
        {/* Poster Space */}
        <div className="flex items-center justify-center">
          {event.image ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={event.image}
                alt={event.title}
                className="w-full max-w-md rounded-lg shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="w-full max-w-md aspect-[2/3] glass-card rounded-lg border-2 border-white/30 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="text-center p-8 relative z-10">
                <div className="text-6xl mb-4 animate-bounce">🎬</div>
                <p className="text-white font-alt-gothic text-xl mb-2">
                  Documentary Poster
                </p>
                <p className="text-white/70 text-sm">Image Coming Soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex flex-col justify-center">
          <div className="inline-block px-4 py-2 bg-red-400/80 backdrop-blur-md text-white border-2 border-red-300/50 rounded-lg text-sm font-bold mb-4 w-fit shadow-lg">
            ⚡ SPECIAL EVENT
          </div>
          <h2 className="text-5xl font-alt-gothic mb-4 text-white drop-shadow-2xl">
            {event.title}
          </h2>
          <p className="text-white/90 mb-6 leading-relaxed text-lg backdrop-blur-sm">
            {event.description}
          </p>
          <div className="space-y-3 mb-6">
            {/* Date */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="text-white">{formatDate(event.date)}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="text-white">{event.time}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="text-white">{event.location}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="text-white">{event.price}</span>
            </div>
          </div>

          {/* Ticket Button */}
          {ticketUrl && (
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-500/80 hover:bg-purple-400/80 backdrop-blur-md text-white font-bold rounded-xl border-2 border-purple-300/30 hover:border-purple-300/60 transition-all shadow-2xl"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
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
              <span>Get Tickets on TicketLeap</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
