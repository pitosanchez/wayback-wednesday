const About = () => {
  return (
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1
            className="text-6xl font-bold mb-6"
            style={{ color: "var(--rich-black)" }}
          >
            About WAYBACK
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="grid-2 items-center">
          <div className="space-y-6">
            <p className="lead-text">
              WAYBACK is more than just a brand – it's a movement that
              celebrates the intersection of music, culture, and timeless style.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              Founded in 2024, WAYBACK emerged from a deep appreciation for the
              raw energy of underground music scenes and the authentic
              expression of street culture. Our mission is to create a space
              where these elements converge, giving rise to something truly
              unique.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              Every piece we create is a testament to our commitment to quality,
              authenticity, and the power of cultural expression. From our
              carefully curated collections to our immersive events, we're
              building a community that values creativity and genuine
              connection.
            </p>
          </div>

          <div className="image-container">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=faces"
              alt="Music and culture"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="grid-3">
          <div className="card card-hover text-center">
            <div className="text-4xl mb-4" style={{ color: "var(--fire-red)" }}>
              🎵
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Authenticity
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Staying true to our roots while pushing boundaries
            </p>
          </div>
          <div className="card card-hover text-center">
            <div
              className="text-4xl mb-4"
              style={{ color: "var(--denim-blue)" }}
            >
              🤝
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Community
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Building connections through shared experiences
            </p>
          </div>
          <div className="card card-hover text-center">
            <div
              className="text-4xl mb-4"
              style={{ color: "var(--sunshine-yellow)" }}
            >
              💡
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Innovation
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Constantly evolving while honoring tradition
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
