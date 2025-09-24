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
      <div className="space-y-16">
        {/* Wayback Whensday Narrative */}
        <div className="page-header text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-rich-black mb-6">
            Wayback Whensday
          </h1>
          <div className="accent-line mx-auto"></div>
          <div className="mt-8 space-y-6 text-left text-rich-black/80 leading-relaxed">
            <p>
              I launched Wayback Whensday in 2008 as a monthly event at
              Camaradas El Barrio, and before long it grew into a weekly that
              ran strong for a full decade, until 2018. The party was born out
              of my desire to reconnect with the music that first drew me into
              Hip Hop—a full-circle moment after stepping back from serious
              DJing in the early 2000s.
            </p>
            <p>
              Wayback Whensday quickly became more than just a party—it was a
              celebration of music across eras and genres, a space where
              nostalgia met discovery. Its success drew incredible talent
              through its doors: Black Rob blessed the stage, and iconic DJs
              like DJ Enuff, Breakbeat Lou, Doo Wop, and Tony Touch all joined
              in to keep the energy alive. What started as a personal return to
              my roots turned into a community staple that embodied the spirit
              of Hip Hop and the joy of shared musical memory.
            </p>
            <p>
              In April 2025, I rebooted Wayback Whensday as a monthly at Barrio
              BX, and it has already proven to be a great success—welcoming new
              audiences while staying true to the spirit that made the party
              legendary in the first place.
            </p>
          </div>
        </div>

        {/* Historical context */}
        <div className="page-header text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-rich-black mb-6">History</h1>
          <div className="accent-line mx-auto"></div>
          <p className="text-xl text-rich-black/80 leading-relaxed mt-8">
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
            <div key={index} className="timeline-event fade-in-up">
              <div className="event-content">
                <span className="year">{event.year}</span>
                <h2 className="text-3xl font-bold text-rich-black mb-4">
                  {event.title}
                </h2>
                <p className="text-rich-black/80 leading-relaxed mb-6">
                  {event.description}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-rich-black/60 italic">
                    {event.additionalInfo}
                  </p>
                </div>
              </div>
              <div className="image-container">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="image-overlay"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-denim-blue/10 p-12 rounded-2xl text-center relative">
          <div className="absolute top-4 left-8 text-8xl text-denim-blue/20 font-serif">
            "
          </div>
          <blockquote className="text-2xl text-rich-black leading-relaxed mb-6 italic relative z-10">
            "East Harlem wasn't just a place where hip hop happened—it was where
            hip hop was born, nurtured, and evolved into a global movement. The
            streets of El Barrio were our stage, our studio, and our sanctuary.
            Every corner, every wall, every sound system told a story of
            resilience and creativity."
          </blockquote>
          <cite className="text-xl text-denim-blue font-semibold">
            — DJ Kool Herc, Pioneer of Hip Hop
          </cite>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-rich-black mb-12 uppercase tracking-wider">
            Cultural Impact
          </h2>
          <div className="grid-auto">
            {culturalElements.map((element, index) => (
              <div key={index} className="card card-hover text-center">
                <div className="text-5xl mb-6">{element.icon}</div>
                <h3 className="text-2xl font-bold text-rich-black mb-4 uppercase tracking-wide">
                  {element.title}
                </h3>
                <p className="text-rich-black/70 leading-relaxed">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
