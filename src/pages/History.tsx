const History = () => {
  return (
    <div className="min-h-screen bg-rich-black text-white">
      {/* Z-Pattern Layout with Visual Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        
        {/* Z-Pattern: Top - Hero Section with Maximum Impact */}
        <header className="text-center lg:text-left mb-16 sm:mb-20 lg:mb-24">
          {/* Size & Scale - Primary headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-alt-gothic text-white mb-6 sm:mb-8 leading-none">
            Wayback<br className="sm:hidden" /> Whensday
          </h1>
          
          {/* Visual Cue - Accent line with label */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-1 w-16 sm:w-24 bg-red-400"></div>
            <span className="text-red-400 text-sm sm:text-base font-bold tracking-wider uppercase">The Movement</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-red-400/60 to-transparent"></div>
          </div>
          
          {/* Subheading with emphasis */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto lg:mx-0">
            A decade-long celebration of Hip Hop culture, community, and musical memory
          </p>
        </header>

        {/* Z-Pattern: Center - Timeline Narrative */}
        <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          
          {/* Timeline Entry 1 - The Beginning (2008) */}
          <article className="relative">
            {/* Timeline connector line */}
            <div className="absolute left-4 sm:left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-transparent hidden sm:block"></div>
            
            <div className="glass-morphism-3d p-6 sm:p-8 lg:p-10 rounded-2xl ml-0 sm:ml-16 lg:ml-20">
              {/* Visual Indicator - Date Badge */}
              <div className="absolute -left-2 sm:left-0 top-6 sm:top-8">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-2xl border-2 border-purple-300/30">
                  <span className="text-xs sm:text-sm font-bold text-white/60">EST</span>
                  <span className="text-lg sm:text-2xl font-alt-gothic text-white">2008</span>
                </div>
              </div>
              
              <div className="ml-20 sm:ml-8">
                {/* Typography Hierarchy */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-white mb-4 sm:mb-6">
                  THE BEGINNING
                </h2>
                
                {/* Proximity & Whitespace */}
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                  I launched Wayback Whensday in 2008 as a monthly event at
                  <span className="text-purple-400 font-semibold"> Camaradas El Barrio</span>, and before long it grew into a weekly that
                  ran strong for a full decade, until 2018.
                </p>
                
                {/* Visual Callout */}
                <div className="glass-card bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-l-4 border-purple-400 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base text-white/80 italic leading-relaxed">
                    The party was born out of my desire to reconnect with the music that first drew me into
                    Hip Hop—<span className="text-purple-300 not-italic font-semibold">a full-circle moment</span> after stepping back from serious
                    DJing in the early 2000s.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Timeline Entry 2 - The Golden Era (2008-2018) */}
          <article className="relative">
            <div className="absolute left-4 sm:left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-red-400 to-transparent hidden sm:block"></div>
            
            <div className="glass-morphism-3d p-6 sm:p-8 lg:p-10 rounded-2xl ml-0 sm:ml-16 lg:ml-20">
              {/* Visual Indicator - Date Range Badge */}
              <div className="absolute -left-2 sm:left-0 top-6 sm:top-8">
                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-2xl border-2 border-red-300/30">
                  <span className="text-xs sm:text-sm font-bold text-white">08-18</span>
                  <span className="text-xs font-bold text-white/80">DECADE</span>
                </div>
              </div>
              
              <div className="ml-20 sm:ml-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-white mb-4 sm:mb-6">
                  THE GOLDEN ERA
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
                  Wayback Whensday quickly became more than just a party—it was a
                  <span className="text-red-400 font-semibold"> celebration of music across eras and genres</span>, a space where
                  nostalgia met discovery.
                </p>
                
                {/* Grid of Featured Artists - Visual Organization */}
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white/90 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Legendary Guests</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {["Black Rob", "DJ Enuff", "Breakbeat Lou", "Doo Wop", "Tony Touch"].map((artist) => (
                      <div key={artist} className="glass-card p-3 sm:p-4 rounded-lg text-center border border-white/20 hover:border-red-400/50 transition-all hover:scale-105">
                        <span className="text-sm sm:text-base font-semibold text-white">{artist}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  What started as a personal return to my roots turned into a
                  <span className="text-red-400 font-semibold"> community staple</span> that embodied the spirit
                  of Hip Hop and the joy of shared musical memory.
                </p>
              </div>
            </div>
          </article>

          {/* Timeline Entry 3 - The Reboot (2025) */}
          <article className="relative">
            <div className="glass-morphism-3d p-6 sm:p-8 lg:p-10 rounded-2xl ml-0 sm:ml-16 lg:ml-20 border-2 border-emerald-400/30">
              {/* Visual Indicator - Current Badge with Animation */}
              <div className="absolute -left-2 sm:left-0 top-6 sm:top-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-xl sm:rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center shadow-2xl border-2 border-emerald-300/30">
                    <span className="text-xs sm:text-sm font-bold text-white">NOW</span>
                    <span className="text-lg sm:text-2xl font-alt-gothic text-white">2025</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-20 sm:ml-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-white mb-4 sm:mb-6">
                  THE REBOOT
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-6">
                  In April 2025, I rebooted Wayback Whensday as a monthly at
                  <span className="text-emerald-400 font-semibold"> Barrio BX</span>, and it has already proven to be a great success—welcoming new
                  audiences while staying true to the spirit that made the party
                  legendary in the first place.
                </p>
                
                {/* Call-out with high contrast */}
                <div className="glass-card bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-2 border-emerald-400/40 p-4 sm:p-6 rounded-xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">The Legacy Continues</h3>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        New generation, same passion. Join us for a monthly celebration of Hip Hop history and culture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

        </div>

        {/* Z-Pattern: Bottom Right - Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="text-white/60 text-sm sm:text-base font-medium tracking-wider uppercase">Join the Movement</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* High-Contrast CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/events" 
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-400 hover:to-purple-400 text-white text-base sm:text-lg font-bold rounded-xl hover:scale-105 transition-all shadow-2xl group"
            >
              <span>View Upcoming Events</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a 
              href="/music" 
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-base sm:text-lg font-medium rounded-xl border-2 border-white/20 hover:border-white/40 hover:scale-105 transition-all shadow-xl"
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
