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
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1
            className="text-6xl font-bold mb-6"
            style={{ color: "var(--rich-black)" }}
          >
            Music
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div
          className="card text-white"
          style={{
            background:
              "linear-gradient(to bottom right, var(--denim-blue), rgba(61, 90, 254, 0.8))",
          }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Featured Mix</h2>
            <p
              className="text-2xl mb-8"
              style={{ color: "var(--sunshine-yellow)" }}
            >
              WAYBACK Sessions Vol. 1
            </p>
            <div className="player-controls">
              <button className="bg-fire-red hover:bg-red-600 text-warm-white px-8 py-4 rounded-full font-bold text-lg transition-colors duration-300 mb-6">
                ▶ Play
              </button>
              <div className="progress-bar">
                <div className="progress bg-sunshine-yellow"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-3">
          {playlists.map((playlist, index) => (
            <div key={index} className="card card-hover">
              <div className="space-y-4">
                <div className="w-full h-48 bg-gradient-to-br from-denim-blue to-sunshine-yellow rounded-lg flex items-center justify-center">
                  <div className="text-6xl text-warm-white">🎵</div>
                </div>
                <h3 className="text-2xl font-bold text-rich-black">
                  {playlist.title}
                </h3>
                <p className="text-rich-black/70">{playlist.description}</p>
                <div className="flex justify-between text-sm text-denim-blue font-semibold">
                  <span>{playlist.tracks} tracks</span>
                  <span>{playlist.duration}</span>
                </div>
                <button className="btn-primary w-full">Play Playlist</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-sunshine-yellow/20 p-12 rounded-2xl">
          <h2 className="text-4xl font-bold text-rich-black text-center mb-12 uppercase tracking-wider">
            Upcoming Events
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="card flex items-center gap-8">
              <div className="bg-fire-red text-warm-white p-6 rounded-2xl text-center min-w-24">
                <div className="text-sm font-bold uppercase tracking-wider">
                  JUN
                </div>
                <div className="text-3xl font-bold">15</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rich-black mb-2">
                  WAYBACK Live Session
                </h3>
                <p className="text-rich-black/70 text-lg">
                  Underground Warehouse, NYC
                </p>
                <p className="text-denim-blue font-semibold mt-2">
                  8:00 PM - 2:00 AM
                </p>
              </div>
              <button className="btn-secondary">Get Tickets</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
