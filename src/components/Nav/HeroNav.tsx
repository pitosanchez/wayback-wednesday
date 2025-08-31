import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface NavItem {
  name: string;
  path: string;
}

interface HeroNavProps {
  items: NavItem[];
}

const HeroNav: React.FC<HeroNavProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Toggle button (top-left) */}
      <button
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed left-6 top-6 z-50 h-12 w-12 rounded-full bg-rich-black/80 text-white flex items-center justify-center border border-white/10 hover:bg-rich-black/90 transition-colors"
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

      {/* Slide-out panel */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[78vw] sm:w-[360px] bg-rich-black text-white border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
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
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Wayback Wednesday</p>
        </div>
      </aside>
    </>
  );
};

export default HeroNav;
