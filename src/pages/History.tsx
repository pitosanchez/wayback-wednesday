const History = () => {
  const timelineEvents = [
    {
      year: "1970s",
      title: "The Birth of a Movement",
      description:
        "East Harlem, also known as El Barrio, became a crucible of cultural innovation. The streets of 116th Street and Lexington Avenue witnessed the birth of breakdancing, as young pioneers like the Rock Steady Crew transformed empty lots into dance floors. DJ Kool Herc's legendary block parties in the Bronx influenced the scene, while local artists like DJ Disco Wiz and the Mean Machine Crew began experimenting with new sounds.",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      additionalInfo:
        "The first hip hop parties in East Harlem were powered by massive sound systems, often built by local Puerto Rican and African American DJs who combined their knowledge of Caribbean music with the emerging hip hop sound.",
    },
    {
      year: "1980s",
      title: "The Golden Era",
      description:
        "The neighborhood saw the rise of legendary DJs and MCs who would shape the future of hip hop. Local block parties became the testing ground for new beats and rhymes, with sound systems powered by the Puerto Rican and African American communities that called East Harlem home. Artists like Tito Puente Jr. began incorporating Latin rhythms into hip hop, creating a unique fusion that would become known as 'Latin Hip Hop.'",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      additionalInfo:
        "The 1980s saw the emergence of breakdancing crews like the Rock Steady Crew and the Dynamic Rockers, who would battle on the streets of East Harlem, pushing the art form to new heights.",
    },
    {
      year: "1990s",
      title: "Cultural Renaissance",
      description:
        "East Harlem became a hub for underground hip hop, with local artists blending traditional Latin rhythms with the new sound. The neighborhood's unique cultural mix created a distinctive style that would influence hip hop worldwide. Groups like the Beatnuts and Fat Joe emerged from the neighborhood, bringing their unique sound to the mainstream while staying true to their roots.",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      additionalInfo:
        "The 90s saw the rise of independent record labels in East Harlem, giving local artists a platform to share their music without compromising their artistic vision.",
    },
    {
      year: "2000s",
      title: "Modern Evolution",
      description:
        "The digital age brought new opportunities for East Harlem artists, while maintaining the neighborhood's rich cultural heritage. The streets that once hosted impromptu battles now host festivals celebrating the area's contribution to hip hop culture. Modern artists like Cardi B and A$AP Rocky have brought global attention to the neighborhood's influence on hip hop.",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      additionalInfo:
        "Today, East Harlem continues to be a breeding ground for new talent, with community centers and music programs nurturing the next generation of hip hop artists.",
    },
  ];

  const culturalElements = [
    {
      title: "Music",
      description:
        "The fusion of Latin rhythms with hip hop beats created a unique sound that would influence generations of artists. From salsa to reggaeton, East Harlem's musical heritage continues to shape the global hip hop landscape.",
      icon: "🎵",
    },
    {
      title: "Dance",
      description:
        "Breakdancing evolved from street corners to international stages, with East Harlem's style becoming iconic. The neighborhood's dancers combined elements of salsa, mambo, and traditional African dance to create a unique form of expression.",
      icon: "💃",
    },
    {
      title: "Art",
      description:
        "Graffiti art transformed the neighborhood's walls into canvases, telling stories of struggle and triumph. Local artists like Tats Cru and Chico have gained international recognition for their contributions to the art form.",
      icon: "🎨",
    },
    {
      title: "Community",
      description:
        "The neighborhood's cultural diversity became its strength, creating a unique identity in New York's hip hop scene. Community centers and cultural organizations continue to preserve and promote East Harlem's rich heritage.",
      icon: "🤝",
    },
  ];

  return (
    <div className="page-container">
      <div className="history-grid">
        <div className="history-header">
          <h1>History</h1>
          <div className="accent-line"></div>
          <p className="history-intro">
            East Harlem, a neighborhood where the streets tell stories of
            cultural fusion and musical innovation. Here, the roots of hip hop
            run deep, intertwining with the rich tapestry of Puerto Rican,
            African American, and Caribbean cultures that have shaped this
            vibrant community. From the early days of block parties to the
            global stage, East Harlem has been at the forefront of hip hop
            culture, influencing generations of artists and shaping the sound of
            a movement.
          </p>
        </div>

        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-event">
              <div className="event-content">
                <span className="year">{event.year}</span>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <div className="additional-info">
                  <p>{event.additionalInfo}</p>
                </div>
              </div>
              <div
                className="event-image"
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <div className="image-overlay"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="history-quote">
          <blockquote>
            "East Harlem wasn't just a place where hip hop happened—it was where
            hip hop was born, nurtured, and evolved into a global movement. The
            streets of El Barrio were our stage, our studio, and our sanctuary.
            Every corner, every wall, every sound system told a story of
            resilience and creativity."
          </blockquote>
          <cite>— DJ Kool Herc, Pioneer of Hip Hop</cite>
        </div>

        <div className="cultural-impact">
          <h2>Cultural Impact</h2>
          <div className="impact-grid">
            {culturalElements.map((element, index) => (
              <div key={index} className="impact-card">
                <div className="impact-icon">{element.icon}</div>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
