import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import History from "./pages/History";
import Music from "./pages/Music";
import Culture from "./pages/Culture";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";

function App() {
  const navItems = [
    { name: "About", path: "/about" },
    { name: "History", path: "/history" },
    { name: "Music", path: "/music" },
    { name: "Culture", path: "/culture" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
  ];

  return (
    <Router>
      <div className="app">
        <Link to="/" className="logo">
          <div className="logo-text">WAYBACK</div>
        </Link>

        <nav className="navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <Link to={item.path} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <section className="hero">
                  <h1 className="hero-text">
                    <span className="letter">W</span>
                    <span className="letter">A</span>
                    <span className="letter">Y</span>
                    <span className="letter">B</span>
                    <span className="letter">A</span>
                    <span className="letter">C</span>
                    <span className="letter">K</span>
                  </h1>
                </section>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/music" element={<Music />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 WAYBACK. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
