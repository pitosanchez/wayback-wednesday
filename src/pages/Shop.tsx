const Shop = () => {
  const products = [
    {
      name: "WAYBACK Tee",
      price: "$45",
      category: "T-Shirts",
      image: "wayback-tee",
    },
    {
      name: "Urban Hoodie",
      price: "$85",
      category: "Hoodies",
      image: "urban-hoodie",
    },
    {
      name: "Street Cap",
      price: "$35",
      category: "Accessories",
      image: "street-cap",
    },
    {
      name: "Culture Bag",
      price: "$65",
      category: "Accessories",
      image: "culture-bag",
    },
  ];

  return (
    <div className="page-container">
      <div className="shop-grid">
        <div className="shop-header">
          <h1>Shop</h1>
          <div className="accent-line"></div>
        </div>

        <div className="shop-filters">
          <div className="filter-group">
            <button className="filter-button active">All</button>
            <button className="filter-button">T-Shirts</button>
            <button className="filter-button">Hoodies</button>
            <button className="filter-button">Accessories</button>
          </div>
          <div className="sort-group">
            <select className="sort-select">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <div className="image-overlay"></div>
                <button className="quick-view">Quick View</button>
              </div>
              <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <span className="price">{product.price}</span>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="shop-features">
          <div className="feature">
            <h3>Free Shipping</h3>
            <p>On orders over $100</p>
          </div>
          <div className="feature">
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
