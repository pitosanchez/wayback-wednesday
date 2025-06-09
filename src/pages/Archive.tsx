const Archive = () => {
  const archiveItems = [
    {
      year: "2024",
      title: "Spring Collection",
      description: "A celebration of renewal and growth",
      image: "spring-2024",
    },
    {
      year: "2023",
      title: "Winter Capsule",
      description: "Exploring the depths of winter",
      image: "winter-2023",
    },
    {
      year: "2023",
      title: "Summer Series",
      description: "The heat of creative expression",
      image: "summer-2023",
    },
  ];

  return (
    <div className="page-container">
      <div className="archive-grid">
        <div className="archive-header">
          <h1>Archive</h1>
          <div className="accent-line"></div>
        </div>

        <div className="archive-content">
          {archiveItems.map((item, index) => (
            <div key={index} className="archive-item">
              <div className="archive-item-content">
                <span className="year">{item.year}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button className="view-collection">View Collection</button>
              </div>
              <div className="archive-item-image">
                <div className="image-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;
