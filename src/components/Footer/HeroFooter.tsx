import React from "react";

const HeroFooter: React.FC = () => {
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@gbothepro",
      url: "https://instagram.com/gbothepro",
    },
    {
      name: "Threads",
      handle: "@gbothepro",
      url: "https://threads.net/@gbothepro",
    },
    {
      name: "TikTok",
      handle: "@_gbothepro",
      url: "https://tiktok.com/@_gbothepro",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <React.Fragment key={social.name}>
                {index > 0 && (
                  <span className="text-white/20 hidden sm:inline">•</span>
                )}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                >
                  <span className="font-medium">{social.name}</span>
                  <span className="text-white/40 text-xs hidden sm:inline">
                    {social.handle}
                  </span>
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} Wayback Wednesday
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFooter;
