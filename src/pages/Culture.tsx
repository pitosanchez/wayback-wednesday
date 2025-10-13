const Culture = () => {
  const articles = [
    {
      title: "The Evolution of Street Style",
      category: "Fashion",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
    {
      title: "Underground Music Scenes",
      category: "Music",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    },
    {
      title: "Art in Public Spaces",
      category: "Art",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Z-Pattern Layout with Visual Hierarchy */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Z-Pattern: Top Left - Primary Heading */}
        <header className="mb-12 sm:mb-16 lg:mb-20 text-center lg:text-left">
          {/* Size & Scale */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-alt-gothic text-rich-black mb-4 sm:mb-6 leading-tight">
            Culture
          </h1>
          
          {/* Visual Cue */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-20 bg-fire-red"></div>
            <span className="text-fire-red text-sm sm:text-base font-bold tracking-wider uppercase">Stories & Voices</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-fire-red/60 to-transparent"></div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Exploring the intersection of music, fashion, art, and community that shapes our cultural identity.
          </p>
        </header>

        {/* Z-Pattern: Top Right - Featured Article (Hero) */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* Content first on mobile, image second */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              {/* Visual Indicator - Badge */}
              <div className="inline-flex items-center gap-2 bg-fire-red/10 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-fire-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-xs sm:text-sm font-bold text-fire-red uppercase tracking-wide">Featured Article</span>
              </div>
              
              {/* Typography Hierarchy */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-rich-black leading-tight">
                The Intersection of Music and Fashion
              </h2>
              
              {/* Body text with proper line height */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Exploring how underground music scenes influence contemporary
                fashion trends and shape cultural identity in urban communities.
              </p>
              
              {/* CTA with contrast */}
              <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-fire-red border-2 border-fire-red text-fire-red hover:text-white font-bold text-sm sm:text-base rounded-lg transition-all hover:scale-105 shadow-md group">
                <span>Read Full Article</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
            
            {/* Image with visual weight */}
            <div className="relative overflow-hidden rounded-xl order-1 lg:order-2 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Music and Fashion intersection"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Z-Pattern: Center - Article Grid */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          {/* Section divider */}
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="text-gray-600 text-sm sm:text-base font-medium tracking-wider uppercase">Latest Stories</span>
            <div className="h-1 flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          {/* Grid System with Consistency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, index) => (
              <article key={index} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 hover:border-fire-red/30 transition-all group">
                {/* Image area with hover effect */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-fire-red/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                {/* Content with spacing */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-alt-gothic text-rich-black group-hover:text-fire-red transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  {/* Read time with icon */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{article.readTime}</span>
                  </div>
                  
                  <button className="w-full px-4 py-3 bg-white hover:bg-fire-red border-2 border-fire-red text-fire-red hover:text-white font-bold rounded-lg transition-all hover:scale-105 text-sm sm:text-base">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Z-Pattern: Bottom - Event CTA */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 p-8 sm:p-12 lg:p-16 rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-alt-gothic text-rich-black text-center mb-10 sm:mb-12">
              Upcoming Cultural Events
            </h2>
            
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                {/* Date badge - Visual indicator */}
                <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-5 sm:p-6 rounded-2xl text-center min-w-20 sm:min-w-24 flex-shrink-0 shadow-lg">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                    JUL
                  </div>
                  <div className="text-3xl sm:text-4xl font-alt-gothic">20</div>
                </div>
                
                {/* Event details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-alt-gothic text-rich-black mb-2 sm:mb-3">
                    Art Exhibition: Urban Expressions
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    Gallery Space, Brooklyn
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 font-medium flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Opening Reception: 6:00 PM - 9:00 PM
                  </p>
                </div>
                
                {/* High contrast CTA */}
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-fire-red hover:bg-red-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-md text-sm sm:text-base whitespace-nowrap">
                  RSVP Now
                </button>
              </div>
            </div>
            
            {/* Link to events */}
            <div className="text-center mt-8 sm:mt-10">
              <a href="/events" className="inline-flex items-center gap-2 text-fire-red hover:text-red-600 font-semibold text-sm sm:text-base transition-colors group">
                <span>View All Cultural Events</span>
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

export default Culture;
