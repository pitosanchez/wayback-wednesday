const Collections = () => {
  const collections = [
    {
      title: "Street Essentials",
      description: "Core pieces for everyday urban style",
      itemCount: 8,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    },
    {
      title: "Underground Classics",
      description: "Timeless pieces inspired by music culture",
      itemCount: 12,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    },
    {
      title: "Limited Edition",
      description: "Exclusive drops and collaborations",
      itemCount: 6,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1 className="text-6xl font-bold text-rich-black mb-6">
            Collections
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="grid-2 items-center gap-12">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider text-fire-red font-bold">
              Featured Collection
            </span>
            <h2 className="text-4xl font-bold text-rich-black">
              Spring 2024: Urban Renaissance
            </h2>
            <p className="text-xl text-rich-black/80 leading-relaxed">
              A celebration of street culture and artistic expression, featuring
              bold designs that bridge the gap between underground aesthetics
              and contemporary fashion.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Shop Collection</button>
              <button className="btn-secondary">View Lookbook</button>
            </div>
          </div>
          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Featured Collection"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="grid-3">
          {collections.map((collection, index) => (
            <div key={index} className="card card-hover group">
              <div className="image-container mb-6">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="image-overlay"></div>
                <div className="absolute top-4 right-4 bg-sunshine-yellow text-rich-black px-3 py-1 rounded-full text-sm font-bold">
                  {collection.itemCount} items
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-rich-black">
                  {collection.title}
                </h3>
                <p className="text-rich-black/70">{collection.description}</p>
                <button className="btn-secondary w-full">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-fire-red/10 to-sunshine-yellow/10 p-12 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-rich-black mb-6">
              Behind the Design
            </h2>
            <p className="text-xl text-rich-black/80 max-w-3xl mx-auto">
              Each collection tells a story rooted in authentic street culture
              and musical heritage. Our design process begins on the streets, in
              the clubs, and within the communities that inspire us.
            </p>
          </div>

          <div className="grid-3 text-center">
            <div className="space-y-4">
              <div className="text-5xl text-denim-blue">🎨</div>
              <h3 className="text-xl font-bold text-rich-black">
                Authentic Design
              </h3>
              <p className="text-rich-black/70">
                Inspired by real street culture and music scenes
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl text-fire-red">✋</div>
              <h3 className="text-xl font-bold text-rich-black">
                Handcrafted Quality
              </h3>
              <p className="text-rich-black/70">
                Premium materials and attention to detail
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl text-sunshine-yellow">🌍</div>
              <h3 className="text-xl font-bold text-rich-black">
                Global Impact
              </h3>
              <p className="text-rich-black/70">
                Supporting communities and sustainable practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
