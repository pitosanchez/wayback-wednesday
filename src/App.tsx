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
import Contact from "./pages/Contact";
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
import { UserMenu, ProtectedRoute } from "./components/Auth";
import AdminRoute from "./components/Auth/AdminRoute";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminDemo from "./pages/AdminDemo";
import ProductFeaturesDemo from "./pages/ProductFeaturesDemo";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Events from "./pages/Events";
import AdminSignInPage from "./pages/AdminSignIn";
import DemoHub from "./pages/DemoHub";
import EmailDemo from "./pages/EmailDemo";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "./utils/constants";
import HomeHero from "./components/Hero/HomeHero";
import MaintenanceGate from "./components/Maintenance/MaintenanceGate";
import { Footer } from "./components/Footer";
import HeroNav from "./components/Nav/HeroNav";

function AppContent() {
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV;
  const isHomePage = location.pathname === "/";
  // Maintenance can be toggled via env; default is disabled (site visible)
  const maintenanceEnabled =
    String(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (import.meta as any).env?.VITE_MAINTENANCE_ENABLED || "false"
    )
      .toString()
      .toLowerCase() === "true";
  const { isAuthenticated } = useAdminAuth();

  // Filter navigation items based on authentication
  const baseNavItems = [
    ...MAIN_NAV_ITEMS,
    ...(isDevelopment ? [{ name: "Demos", path: "/demos" }] : []),
  ];

  // Only add admin items if authenticated
  const navItems = isAuthenticated
    ? [...baseNavItems, ...USER_NAV_ITEMS]
    : baseNavItems;

  return (
    <MaintenanceGate enabled={maintenanceEnabled}>
      <div className={`app ${isHomePage ? "hero-mode" : ""}`}>
        {!isHomePage && (
          <Link to="/" className="logo">
            <img src={gboLogo} alt="GBO Logo" className="logo-img" />
          </Link>
        )}

        {!isHomePage && <HeroNav items={navItems} />}

        <div className="fixed top-8 right-8 z-40 flex items-center space-x-4">
          <UserMenu />
          {location.pathname === "/shop" && <CartIcon />}
        </div>

        <main className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<HomeHero />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/music" element={<Music />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/events" element={<Events />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-signin" element={<AdminSignInPage />} />

              {/* Protected Routes */}
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
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
                  <Route
                    path="/variants-demo"
                    element={<ProductVariantsDemo />}
                  />
                  <Route path="/inventory-demo" element={<InventoryDemo />} />
                  <Route path="/email-demo" element={<EmailDemo />} />
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
          </div>
          {!isHomePage && <Footer />}
        </main>

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </MaintenanceGate>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
