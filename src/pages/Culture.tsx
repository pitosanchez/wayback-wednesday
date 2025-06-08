import React from "react";

const Culture = () => {
  const articles = [
    {
      title: "The Evolution of Street Style",
      category: "Fashion",
      readTime: "5 min read",
      image: "street-style",
    },
    {
      title: "Underground Music Scenes",
      category: "Music",
      readTime: "8 min read",
      image: "music-scene",
    },
    {
      title: "Art in Public Spaces",
      category: "Art",
      readTime: "6 min read",
      image: "public-art",
    },
  ];

  return (
    <div className="page-container">
      <div className="culture-grid">
        <div className="culture-header">
          <h1>Culture</h1>
          <div className="accent-line"></div>
        </div>

        <div className="featured-article">
          <div className="article-content">
            <span className="category">Featured</span>
            <h2>The Intersection of Music and Fashion</h2>
            <p>
              Exploring how underground music scenes influence contemporary
              fashion trends
            </p>
            <button className="read-more">Read More</button>
          </div>
          <div className="article-image">
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-image">
                <div className="image-overlay"></div>
              </div>
              <div className="article-content">
                <span className="category">{article.category}</span>
                <h3>{article.title}</h3>
                <span className="read-time">{article.readTime}</span>
                <button className="read-more">Read More</button>
              </div>
            </div>
          ))}
        </div>

        <div className="culture-events">
          <h2>Upcoming Cultural Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">
                <span className="month">JUL</span>
                <span className="day">20</span>
              </div>
              <div className="event-details">
                <h3>Art Exhibition: Urban Expressions</h3>
                <p>Gallery Space, Brooklyn</p>
                <button className="rsvp-button">RSVP</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;
