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
      <div className="music-grid">
        <div className="music-header">
          <h1>Music</h1>
          <div className="accent-line"></div>
        </div>

        <div className="featured-player">
          <div className="player-content">
            <h2>Featured Mix</h2>
            <p>WAYBACK Sessions Vol. 1</p>
            <div className="player-controls">
              <button className="play-button">Play</button>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="playlists-grid">
          {playlists.map((playlist, index) => (
            <div key={index} className="playlist-card">
              <div className="playlist-content">
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
                <div className="playlist-meta">
                  <span>{playlist.tracks} tracks</span>
                  <span>{playlist.duration}</span>
                </div>
                <button className="play-button">Play</button>
              </div>
            </div>
          ))}
        </div>

        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            <div className="event-card">
              <div className="event-date">
                <span className="month">JUN</span>
                <span className="day">15</span>
              </div>
              <div className="event-details">
                <h3>WAYBACK Live Session</h3>
                <p>Underground Warehouse, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
