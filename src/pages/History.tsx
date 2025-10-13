const History = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Z-Pattern Layout with Visual Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Z-Pattern: Top - Hero Section with Maximum Impact */}
        <header className="text-center lg:text-left mb-16 sm:mb-20 lg:mb-24">
          {/* Size & Scale - Primary headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-alt-gothic text-rich-black mb-6 sm:mb-8 leading-none">
            Wayback
            <br className="sm:hidden" /> Whensday
          </h1>

          {/* Visual Cue - Accent line with label */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-1 w-16 sm:w-24 bg-fire-red"></div>
            <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">
              The Movement
            </span>
            <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent"></div>
          </div>

          {/* Subheading with emphasis */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 max-w-3xl mx-auto lg:mx-0">
            A decade-long celebration of Hip Hop culture, community, and musical
            memory
          </p>
        </header>

        {/* Improved Timeline Design - Clean Left Alignment */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line - Desktop only */}
            <div className="absolute left-0 sm:left-14 lg:left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-red-400 to-emerald-400 hidden sm:block opacity-30"></div>

            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {/* Timeline Entry 1 - The Beginning (2008) */}
              <article className="relative">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                  {/* Date Badge - Left Side (Smaller, more proportional) */}
                  <div className="flex-shrink-0 sm:w-28 lg:w-32 flex justify-center sm:justify-start">
                    <div className="relative inline-block">
                      {/* Connection dot to timeline */}
                      <div className="absolute top-1/2 -right-3 sm:-right-6 lg:-right-8 w-3 sm:w-6 lg:w-8 h-0.5 bg-purple-400 hidden sm:block"></div>

                      <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex flex-col items-center justify-center shadow-xl border-2 border-purple-300/30 relative">
                        <span className="text-xs font-bold text-white/60 uppercase tracking-wide">
                          Est
                        </span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-white leading-none">
                          2008
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Box - Right Side */}
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-rich-black mb-4 sm:mb-6">
                      THE BEGINNING
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                      I launched Wayback Whensday in 2008 as a monthly event at
                      <span className="text-purple-600 font-semibold">
                        {" "}
                        Camaradas El Barrio
                      </span>
                      , and before long it grew into a weekly that ran strong
                      for a full decade, until 2018.
                    </p>

                    <div className="bg-white border-l-4 border-purple-500 p-4 sm:p-6 rounded-lg shadow-md">
                      <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                        The party was born out of my desire to reconnect with
                        the music that first drew me into Hip Hop—
                        <span className="text-purple-600 not-italic font-semibold">
                          a full-circle moment
                        </span>{" "}
                        after stepping back from serious DJing in the early
                        2000s.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Timeline Entry 2 - The Golden Era (2008-2018) */}
              <article className="relative">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                  {/* Date Badge - Left Side (Smaller, more proportional) */}
                  <div className="flex-shrink-0 sm:w-28 lg:w-32 flex justify-center sm:justify-start">
                    <div className="relative inline-block">
                      {/* Connection dot to timeline */}
                      <div className="absolute top-1/2 -right-3 sm:-right-6 lg:-right-8 w-3 sm:w-6 lg:w-8 h-0.5 bg-red-400 hidden sm:block"></div>

                      <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex flex-col items-center justify-center shadow-xl border-2 border-red-300/30">
                        <span className="text-sm sm:text-base font-alt-gothic text-white leading-none mb-1">
                          08-18
                        </span>
                        <span className="text-xs font-bold text-white/80 uppercase tracking-wide">
                          Decade
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Box - Right Side */}
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-rich-black mb-4 sm:mb-6">
                      THE GOLDEN ERA
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                      Wayback Whensday quickly became more than just a party—it
                      was a
                      <span className="text-fire-red font-semibold">
                        {" "}
                        celebration of music across eras and genres
                      </span>
                      , a space where nostalgia met discovery.
                    </p>

                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-rich-black flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-fire-red"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <span>Legendary Guests</span>
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {[
                          "Black Rob",
                          "DJ Enuff",
                          "Breakbeat Lou",
                          "Doo Wop",
                          "Tony Touch",
                        ].map((artist) => (
                          <div
                            key={artist}
                            className="bg-white border-2 border-gray-200 p-3 sm:p-4 rounded-lg text-center hover:border-fire-red/50 hover:shadow-md transition-all hover:scale-105"
                          >
                            <span className="text-sm sm:text-base font-semibold text-rich-black">
                              {artist}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      What started as a personal return to my roots turned into
                      a
                      <span className="text-fire-red font-semibold">
                        {" "}
                        community staple
                      </span>{" "}
                      that embodied the spirit of Hip Hop and the joy of shared
                      musical memory.
                    </p>
                  </div>
                </div>
              </article>

              {/* Timeline Entry 3 - The Reboot (2025) */}
              <article className="relative">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                  {/* Date Badge - Left Side with Animation (Smaller, more proportional) */}
                  <div className="flex-shrink-0 sm:w-28 lg:w-32 flex justify-center sm:justify-start">
                    <div className="relative inline-block">
                      {/* Connection dot to timeline */}
                      <div className="absolute top-1/2 -right-3 sm:-right-6 lg:-right-8 w-3 sm:w-6 lg:w-8 h-0.5 bg-emerald-400 hidden sm:block"></div>

                      {/* Animated glow for current */}
                      <div className="absolute inset-0 bg-emerald-400 rounded-xl blur-xl opacity-40 animate-pulse"></div>

                      <div className="relative w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex flex-col items-center justify-center shadow-xl border-2 border-emerald-300/50">
                        <span className="text-xs font-bold text-white uppercase tracking-wide">
                          Now
                        </span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-white leading-none">
                          2025
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Box - Right Side */}
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-emerald-300 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-rich-black mb-4 sm:mb-6">
                      THE REBOOT
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                      In April 2025, I rebooted Wayback Whensday as a monthly at
                      <span className="text-emerald-600 font-semibold">
                        {" "}
                        Barrio BX
                      </span>
                      , and it has already proven to be a great
                      success—welcoming new audiences while staying true to the
                      spirit that made the party legendary in the first place.
                    </p>

                    <div className="bg-white border-2 border-emerald-400 p-4 sm:p-6 rounded-xl shadow-md">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-rich-black mb-2">
                            The Legacy Continues
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            New generation, same passion. Join us for a monthly
                            celebration of Hip Hop history and culture.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Z-Pattern: Bottom Right - Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-gray-600 text-sm sm:text-base font-medium tracking-wider uppercase">
              Join the Movement
            </span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* High-Contrast CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-fire-red hover:bg-red-600 text-white text-base sm:text-lg font-bold rounded-xl hover:scale-105 transition-all shadow-xl group"
            >
              <span>View Upcoming Events</span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="/music"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 text-base sm:text-lg font-medium rounded-xl hover:scale-105 transition-all shadow-md"
            >
              <span>Explore the Music</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
