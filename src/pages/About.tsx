const About = () => {
  return (
    <div className="page-container">
      <div className="about-grid">
        <div className="about-header">
          <h1>About WAYBACK</h1>
          <div className="accent-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="lead-text">
              WAYBACK is more than just a brand – it's a movement that
              celebrates the intersection of music, culture, and timeless style.
            </p>
            <p>
              Founded in 2024, WAYBACK emerged from a deep appreciation for the
              raw energy of underground music scenes and the authentic
              expression of street culture. Our mission is to create a space
              where these elements converge, giving rise to something truly
              unique.
            </p>
            <p>
              Every piece we create is a testament to our commitment to quality,
              authenticity, and the power of cultural expression. From our
              carefully curated collections to our immersive events, we're
              building a community that values creativity and genuine
              connection.
            </p>
          </div>

          <div className="about-image">
            <div className="image-container">
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>

        <div className="about-values">
          <div className="value-card">
            <h3>Authenticity</h3>
            <p>Staying true to our roots while pushing boundaries</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Building connections through shared experiences</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Constantly evolving while honoring tradition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
