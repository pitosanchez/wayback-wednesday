import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import History from "./pages/History";
import Music from "./pages/Music";
import Culture from "./pages/Culture";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import AuthDemo from "./pages/AuthDemo";
import waybackLogo from "./assets/images/wayback.png";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import CartIcon from "./components/Cart/CartIcon";
import CartDrawer from "./components/Cart/CartDrawer";
import CartDemo from "./components/Cart/CartDemo";
import StripeDemo from "./components/Stripe/StripeDemo";
import ProductVariantsDemo from "./pages/ProductVariantsDemo";
import InventoryDemo from "./pages/InventoryDemo";
import { UserMenu, ProtectedRoute, AdminRoute } from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminDemo from "./pages/AdminDemo";
import ProductFeaturesDemo from "./pages/ProductFeaturesDemo";

function App() {
  const navItems = [
    { name: "About", path: "/about" },
    { name: "History", path: "/history" },
    { name: "Music", path: "/music" },
    { name: "Culture", path: "/culture" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Cart Demo", path: "/cart-demo" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Stripe Demo", path: "/stripe-demo" },
    { name: "Variants Demo", path: "/variants-demo" },
    { name: "Inventory Demo", path: "/inventory-demo" },
    { name: "Auth Demo", path: "/auth-demo" },
    { name: "Admin Demo", path: "/admin-demo" },
    { name: "Product Features", path: "/product-features-demo" },
  ];

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Link to="/" className="logo">
              <img
                src={waybackLogo}
                alt="The Wayback Logo"
                className="logo-img"
              />
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

            {/* Cart Icon and User Menu */}
            <div className="fixed top-8 right-8 z-40 flex items-center space-x-4">
              <UserMenu />
              <CartIcon />
            </div>

            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <section className="hero">
                      <h1 className="hero-text">WAYBACK</h1>
                    </section>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/history" element={<History />} />
                <Route path="/music" element={<Music />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collections" element={<Collections />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/auth-demo" element={<AuthDemo />} />
                <Route path="/cart-demo" element={<CartDemo />} />
                <Route path="/stripe-demo" element={<StripeDemo />} />
                <Route
                  path="/variants-demo"
                  element={<ProductVariantsDemo />}
                />
                <Route path="/inventory-demo" element={<InventoryDemo />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin-demo"
                  element={
                    <AdminRoute>
                      <AdminDemo />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/product-features-demo"
                  element={<ProductFeaturesDemo />}
                />
              </Routes>
            </main>

            <footer></footer>

            {/* Cart Drawer */}
            <CartDrawer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
