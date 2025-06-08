import React from "react";

const Collections = () => {
  const collections = [
    {
      name: "Spring 2024",
      description: "A celebration of renewal and growth",
      items: 12,
      image: "spring-2024",
    },
    {
      name: "Urban Essentials",
      description: "Core pieces for the modern urban lifestyle",
      items: 8,
      image: "urban-essentials",
    },
    {
      name: "Limited Edition",
      description: "Exclusive drops and collaborations",
      items: 5,
      image: "limited-edition",
    },
  ];

  return (
    <div className="page-container">
      <div className="collections-grid">
        <div className="collections-header">
          <h1>Collections</h1>
          <div className="accent-line"></div>
        </div>

        <div className="featured-collection">
          <div className="collection-content">
            <h2>Spring 2024</h2>
            <p>
              A celebration of renewal and growth, featuring bold colors and
              innovative designs
            </p>
            <button className="view-collection">View Collection</button>
          </div>
          <div className="collection-image">
            <div className="image-overlay"></div>
          </div>
        </div>

        <div className="collections-grid">
          {collections.map((collection, index) => (
            <div key={index} className="collection-card">
              <div className="collection-image">
                <div className="image-overlay"></div>
              </div>
              <div className="collection-content">
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <span className="items-count">{collection.items} items</span>
                <button className="view-collection">View Collection</button>
              </div>
            </div>
          ))}
        </div>

        <div className="collection-features">
          <div className="feature">
            <h3>Exclusive Drops</h3>
            <p>Limited edition pieces released monthly</p>
          </div>
          <div className="feature">
            <h3>Collaborations</h3>
            <p>Special projects with artists and brands</p>
          </div>
          <div className="feature">
            <h3>Archive</h3>
            <p>Access to past collections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
