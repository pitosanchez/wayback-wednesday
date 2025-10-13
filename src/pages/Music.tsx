const Music = () => {
  const playlists = [
    {
      title: "WAYBACK Sessions",
      description: "Live recordings from our events",
      tracks: 12,
      duration: "45:30",
    },
    {
      title: "Underground Vibes",
      description: "Curated underground tracks",
      tracks: 15,
      duration: "58:45",
    },
    {
      title: "Culture Mix",
      description: "A blend of cultural influences",
      tracks: 10,
      duration: "42:15",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Z-Pattern Layout with Visual Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Z-Pattern: Top Left - Primary Heading */}
        <header className="mb-12 sm:mb-16 lg:mb-20 text-center lg:text-left">
          {/* Size & Scale - Maximum emphasis */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-alt-gothic text-rich-black mb-4 sm:mb-6 leading-tight">
            Music
          </h1>
          
          {/* Visual Cue - Accent line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-20 bg-fire-red"></div>
            <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">Sounds & Sessions</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent"></div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Experience the soundtrack of Hip Hop culture through curated mixes and live sessions.
          </p>
        </header>

        {/* Z-Pattern: Top Right - Featured Content (Hero Card) */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          {/* High Contrast Card - Primary focal point */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-8 sm:p-12 lg:p-16 rounded-2xl shadow-2xl border-2 border-gray-700">
            <div className="max-w-3xl mx-auto text-center">
              {/* Visual Indicator - Badge */}
              <div className="inline-flex items-center gap-2 bg-fire-red/90 px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="font-bold text-sm uppercase tracking-wide">Featured Mix</span>
              </div>
              
              {/* Typography Hierarchy */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic mb-3 sm:mb-4">
                WAYBACK Sessions Vol. 1
              </h2>
              
              <p className="text-white/80 text-base sm:text-lg mb-8 sm:mb-10">
                A journey through Hip Hop's golden era and beyond
              </p>
              
              {/* CTA - Size and Contrast for emphasis */}
              <button className="inline-flex items-center gap-3 bg-fire-red hover:bg-red-600 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-xl mb-8">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Now
              </button>
              
              {/* Progress bar with visual feedback */}
              <div className="max-w-md mx-auto">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-fire-red rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-white/60 mt-2">
                  <span>15:20</span>
                  <span>45:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Z-Pattern: Center - Content Grid */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          {/* Visual divider */}
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-gray-600 text-sm sm:text-base font-medium tracking-wider uppercase">Playlists</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          {/* Grid System - Alignment and proximity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {playlists.map((playlist, index) => (
              <article key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 hover:border-fire-red/30 transition-all group">
                {/* Visual element - Icon/Image area */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-fire-red/10 group-hover:bg-fire-red/20 transition-colors"></div>
                  <div className="text-6xl sm:text-7xl relative z-10 group-hover:scale-110 transition-transform">🎵</div>
                </div>
                
                {/* Content with proper spacing */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Typography hierarchy */}
                  <h3 className="text-xl sm:text-2xl font-alt-gothic text-rich-black group-hover:text-fire-red transition-colors">
                    {playlist.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{playlist.description}</p>
                  
                  {/* Proximity - Related metadata grouped */}
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 font-medium pt-3 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      {playlist.tracks} tracks
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {playlist.duration}
                    </span>
                  </div>
                  
                  {/* CTA button */}
                  <button className="w-full px-4 py-3 bg-fire-red hover:bg-red-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-md text-sm sm:text-base">
                    Play Playlist
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Z-Pattern: Bottom - Event CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 p-8 sm:p-12 lg:p-16 rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto">
            {/* Section heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-rich-black text-center mb-10 sm:mb-12">
              Upcoming Events
            </h2>
            
            {/* Event card with alignment */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                {/* Date badge - Visual indicator */}
                <div className="bg-fire-red text-white p-5 sm:p-6 rounded-2xl text-center min-w-20 sm:min-w-24 flex-shrink-0 shadow-lg">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                    JUN
                  </div>
                  <div className="text-3xl sm:text-4xl font-alt-gothic">15</div>
                </div>
                
                {/* Event details - Proximity grouping */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-alt-gothic text-rich-black mb-2 sm:mb-3">
                    WAYBACK Live Session
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    Underground Warehouse, NYC
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 font-medium flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    8:00 PM - 2:00 AM
                  </p>
                </div>
                
                {/* CTA with high contrast */}
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-fire-red border-2 border-fire-red text-fire-red hover:text-white font-bold rounded-lg transition-all hover:scale-105 shadow-md text-sm sm:text-base whitespace-nowrap">
                  Get Tickets
                </button>
              </div>
            </div>
            
            {/* Link to all events */}
            <div className="text-center mt-8 sm:mt-10">
              <a href="/events" className="inline-flex items-center gap-2 text-fire-red hover:text-red-600 font-semibold text-sm sm:text-base transition-colors group">
                <span>View All Events</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
