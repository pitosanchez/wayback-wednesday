const About = () => {
  return (
    <div className="min-h-screen bg-rich-black text-white">
      {/* Z-Pattern Layout - Visual Hierarchy Applied */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        
        {/* Z-Pattern: Top Left - Primary Focal Point */}
        <header className="mb-12 sm:mb-16 lg:mb-20">
          {/* Size & Scale - Largest element for primary emphasis */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-alt-gothic text-white mb-4 sm:mb-6 leading-tight text-center lg:text-left">
            ABOUT G-BO
          </h1>
          
          {/* Visual Cue - Accent line for emphasis */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-red-400/60 to-transparent lg:via-red-400/60 lg:to-red-400"></div>
            <span className="text-red-400/80 text-sm sm:text-base font-bold tracking-wider uppercase whitespace-nowrap">The Legacy</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-red-400/60 via-transparent to-transparent lg:hidden"></div>
          </div>
          
          {/* Whitespace & Contrast - Lead statement with emphasis */}
          <p className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-red-400 mb-6 sm:mb-8 text-center lg:text-left">
            Impact.
          </p>
        </header>

        {/* Z-Pattern: Diagonal/Center - Main Content Area */}
        <div className="max-w-5xl mx-auto lg:mx-0 space-y-8 sm:space-y-12 lg:space-y-16">
          
          {/* Content Block 1 - Proximity & Grouping */}
          <article className="glass-morphism-3d p-6 sm:p-8 lg:p-10 rounded-2xl">
            {/* Typography Hierarchy - Secondary heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-white mb-6 sm:mb-8 leading-tight">
              ABOUT G-BO THE PRO
            </h2>
            
            {/* Whitespace - Line spacing for readability */}
            <div className="space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                G-BO The Pro first made his mark in the early 90s alongside his
                partner DJ Rei Double R, creating the most must-have mixtapes in
                New York City. Their tapes weren't just music—they were
                <span className="text-red-400 font-semibold"> soundtracks to a movement</span>, blending genres with precision, energy,
                and style that set them apart from their contemporaries.
              </p>
              
              {/* Visual Indicator - Callout box for key information */}
              <div className="glass-card bg-gradient-to-br from-red-500/10 to-purple-500/10 border-2 border-red-400/30 p-4 sm:p-6 rounded-xl">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon as visual cue */}
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">Innovation in Sound</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                      Using a multitrack recorder rather than the standard two-turntable setup,
                      G-BO & Double R brought an innovative, polished sound to the
                      mixtape game that cemented their place in hip-hop history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Content Block 2 - Repetition & Consistency */}
          <article className="glass-morphism-3d p-6 sm:p-8 lg:p-10 rounded-2xl">
            {/* Secondary heading with consistent style */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-alt-gothic text-white mb-6 sm:mb-8 leading-tight">
              THE INFLUENCE
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                Over the decades, G-BO's influence has stretched far beyond the
                streets where those tapes first circulated. Recognized in the
                documentary <em className="text-purple-400">Mixtape</em> and the Rizzoli book
                <em className="text-purple-400"> Do Remember</em>, his work has become part of the cultural
                archive of hip-hop.
              </p>
              
              {/* Grid for visual organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1 - Consistency in design pattern */}
                <div className="glass-card p-4 sm:p-5 rounded-lg border border-white/20 hover:border-purple-400/50 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Documentary</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70">Featured in "Mixtape"</p>
                </div>
                
                {/* Card 2 - Repetition of pattern */}
                <div className="glass-card p-4 sm:p-5 rounded-lg border border-white/20 hover:border-purple-400/50 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Published</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70">Rizzoli's "Do Remember"</p>
                </div>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                Today, G-BO The Pro continues to honor that
                legacy while bringing the same passion, creativity, and
                versatility to <span className="text-red-400 font-semibold">live DJ sets, special events, and new projects</span> that
                keep the spirit of those early days alive for both original fans
                and new generations.
              </p>
            </div>
          </article>

        </div>

        {/* Z-Pattern: Bottom Right - Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center lg:text-right">
          {/* Visual divider for separation */}
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* CTA with high contrast and size */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
            <a 
              href="/events" 
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-500/80 hover:bg-red-400/80 backdrop-blur-md text-white text-sm sm:text-base font-bold rounded-xl border-2 border-red-300/30 hover:border-red-300/60 hover:scale-105 transition-all shadow-2xl group"
            >
              <span>Book G-Bo</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a 
              href="/music" 
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm sm:text-base font-medium rounded-xl border-2 border-white/20 hover:border-white/40 hover:scale-105 transition-all shadow-xl"
            >
              <span>Explore Music</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
