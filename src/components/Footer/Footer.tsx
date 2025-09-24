import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@gbothepro",
      url: "https://instagram.com/gbothepro",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
    },
    {
      name: "Instagram (Wayback Whensday)",
      handle: "@waybackwhensday",
      url: "https://www.instagram.com/waybackwhensday?igsh=MWtueHo5M215MXlwdQ%3D%3D&utm_source=qr",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
    },
    {
      name: "Threads",
      handle: "@gbothepro",
      url: "https://threads.net/@gbothepro",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.54-1.95-1.523-3.495-2.922-4.591C16.13 2.5 14.284 1.907 12.194 1.89h-.009c-3.004.021-5.278.932-6.762 2.706-1.471 1.76-2.214 4.276-2.239 7.394.026 3.118.769 5.633 2.24 7.394 1.483 1.773 3.757 2.685 6.761 2.706 2.334-.02 4.16-.622 5.428-1.79 1.05-.97 1.662-2.274 1.817-3.88l.056-.704a9.296 9.296 0 00-3.697-.769c-1.888 0-3.36.495-4.375 1.471-.996.962-1.5 2.343-1.5 4.1 0 1.76.504 3.14 1.5 4.102 1.014.976 2.487 1.471 4.375 1.471 1.367 0 2.548-.295 3.51-.876.757-.46 1.337-1.078 1.725-1.837l1.83.858c-.533 1.04-1.295 1.895-2.265 2.54-1.244.826-2.793 1.245-4.6 1.245h-.2c-2.416-.025-4.345-.67-5.733-1.918-1.38-1.24-2.08-3.025-2.08-5.306 0-2.28.7-4.065 2.08-5.306 1.388-1.248 3.317-1.893 5.733-1.918 1.607 0 3.099.32 4.43.952l.07-.863c.123-1.483.506-2.81 1.14-3.942.788-1.408 1.99-2.53 3.573-3.335l.92 1.832c-1.254.638-2.194 1.513-2.793 2.603-.476.867-.773 1.863-.884 2.96l-.048.59c-.018.314-.027.636-.027.957 0 5.031-1.888 7.612-5.61 7.674h-.074z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@_gbothepro",
      url: "https://tiktok.com/@_gbothepro",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="site-footer h-[18rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-alt-gothic text-3xl text-white">
              WAYBACK WEDNESDAY
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Celebrating the culture, music, and style that shaped generations.
              Every piece tells a story from the golden era of hip-hop.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">
              Follow G-Bo The Pro
            </h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white/60 hover:text-white transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    {social.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{social.name}</span>
                    <span className="text-xs text-white/40">
                      {social.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 text-white/40 text-xs">
            <span>© {currentYear} Wayback Wednesday</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>

          {/* Additional Links */}
          <div className="flex items-center space-x-6 text-xs">
            <Link
              to="/privacy"
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Easter Egg / Tagline */}
        <div className="pb-6 text-center">
          <p className="text-white/20 text-xs font-light tracking-wider">
            EST. 2025 • EAST HARLEM • KEEPING THE CULTURE ALIVE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
