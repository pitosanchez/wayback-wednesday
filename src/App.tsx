import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import About from "./pages/About";
import History from "./pages/History";
import Music from "./pages/Music";
import Culture from "./pages/Culture";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import AuthDemo from "./pages/AuthDemo";
import gboLogo from "./assets/images/svgbo.svg";
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
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import DemoHub from "./pages/DemoHub";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "./utils/constants";
import HomeHero from "./components/Hero/HomeHero";

function AppContent() {
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV;
  const isHomePage = location.pathname === "/";
  const navItems = [
    ...MAIN_NAV_ITEMS,
    ...(isDevelopment ? [{ name: "Demos", path: "/demos" }] : []),
    ...USER_NAV_ITEMS,
  ];

  return (
    <div className={`app ${isHomePage ? "hero-mode" : ""}`}>
      {!isHomePage && (
        <Link to="/" className="logo">
          <img src={gboLogo} alt="GBO Logo" className="logo-img" />
        </Link>
      )}

      {!isHomePage && (
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
      )}

      <div className="fixed top-8 right-8 z-40 flex items-center space-x-4">
        <UserMenu />
        <CartIcon />
      </div>

      <main>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomeHero />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/music" element={<Music />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
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

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <AdminRoute>
                <AnalyticsDashboard />
              </AdminRoute>
            }
          />

          {/* Demo Routes - Only in Development */}
          {isDevelopment && (
            <>
              <Route path="/demos" element={<DemoHub />} />
              <Route path="/auth-demo" element={<AuthDemo />} />
              <Route path="/cart-demo" element={<CartDemo />} />
              <Route path="/stripe-demo" element={<StripeDemo />} />
              <Route path="/variants-demo" element={<ProductVariantsDemo />} />
              <Route path="/inventory-demo" element={<InventoryDemo />} />
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
            </>
          )}
        </Routes>
      </main>

      <footer></footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
