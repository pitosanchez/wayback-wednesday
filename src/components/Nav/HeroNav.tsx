import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminSignIn from "../Auth/AdminSignIn";

export interface NavItem {
  name: string;
  path: string;
}

interface HeroNavProps {
  items: NavItem[];
}

const HeroNav: React.FC<HeroNavProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [showAdminSignIn, setShowAdminSignIn] = useState(false);
  const { isAuthenticated, signOut } = useAdminAuth();

  // Filter items based on authentication status
  const filteredItems = items.filter((item) => {
    const isAdminItem =
      item.name === "Dashboard" ||
      item.name === "Analytics" ||
      item.name === "Admin Sign In";

    // Only show admin items to authenticated users
    if (isAdminItem && !isAuthenticated) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Toggle button (top-right) - Positioned next to cart */}
      <button
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed right-24 sm:right-28 top-6 z-50 h-12 w-12 rounded-xl bg-rich-black/80 text-white flex items-center justify-center border-2 border-white/30 hover:bg-rich-black/90 hover:border-white/50 transition-all backdrop-blur-md"
      >
        <span className="sr-only">Open menu</span>
        <div className="space-y-1.5">
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </div>
      </button>

      {/* Overlay */}
      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Slide-out panel (from right) */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[78vw] sm:w-[360px] bg-rich-black text-white border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="font-alt-gothic text-3xl">Menu</span>
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-6 mt-[10rem]">
            {filteredItems.map((item) => {
              const isAdminItem =
                item.name === "Dashboard" ||
                item.name === "Analytics" ||
                item.name === "Admin Sign In";

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-white/20 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium text-white/80 text-lg"
                  >
                    {item.name}
                    {isAdminItem && (
                      <span className="ml-2 text-xs text-green-400">
                        ● Admin
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {isAuthenticated && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 mb-3 px-4">Admin Controls</p>
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                  window.location.href = "/";
                }}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 font-medium text-white/60 text-sm"
              >
                Sign Out
              </button>
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to="/admin-signin"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 font-medium text-white/40 text-sm text-center"
              >
                Admin Access →
              </Link>
            </div>
          )}
        </nav>

        <div className="mt-auto p-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Wayback Wednesday</p>
        </div>
      </aside>

      {/* Admin Sign In Modal */}
      {showAdminSignIn && (
        <AdminSignIn onClose={() => setShowAdminSignIn(false)} />
      )}
    </>
  );
};

export default HeroNav;
