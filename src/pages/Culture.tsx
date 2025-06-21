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
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1 className="text-6xl font-bold text-rich-black mb-6">Culture</h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="grid-2 items-center gap-12">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-denim-blue font-bold">
              Featured Article
            </span>
            <h2 className="text-4xl font-bold text-rich-black">
              The Intersection of Music and Fashion
            </h2>
            <p className="text-xl text-rich-black/80 leading-relaxed">
              Exploring how underground music scenes influence contemporary
              fashion trends and shape cultural identity in urban communities.
            </p>
            <button className="btn-secondary">Read Full Article</button>
          </div>
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Music and Fashion intersection"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="grid-3">
          {articles.map((article, index) => (
            <div key={index} className="card card-hover group">
              <div className="image-container mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="space-y-4">
                <span className="text-sm uppercase tracking-wider text-denim-blue font-bold">
                  {article.category}
                </span>
                <h3 className="text-2xl font-bold text-rich-black">
                  {article.title}
                </h3>
                <span className="text-sm text-rich-black/60">
                  {article.readTime}
                </span>
                <button className="btn-secondary">Read More</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-fire-red/10 p-12 rounded-2xl">
          <h2 className="text-4xl font-bold text-rich-black text-center mb-12 uppercase tracking-wider">
            Upcoming Cultural Events
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="card flex items-center gap-8">
              <div className="bg-sunshine-yellow text-rich-black p-6 rounded-2xl text-center min-w-24">
                <div className="text-sm font-bold uppercase tracking-wider">
                  JUL
                </div>
                <div className="text-3xl font-bold">20</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rich-black mb-2">
                  Art Exhibition: Urban Expressions
                </h3>
                <p className="text-rich-black/70 text-lg">
                  Gallery Space, Brooklyn
                </p>
                <p className="text-denim-blue font-semibold mt-2">
                  Opening Reception: 6:00 PM - 9:00 PM
                </p>
              </div>
              <button className="btn-primary">RSVP Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;
