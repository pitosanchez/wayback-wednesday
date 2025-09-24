import React from "react";

const HeroSocialBar: React.FC = () => {
  const links = [
    {
      name: "Instagram",
      handle: "@gbothepro",
      url: "https://instagram.com/gbothepro",
    },
    {
      name: "Instagram (Wayback Whensday)",
      handle: "@waybackwhensday",
      url: "https://www.instagram.com/waybackwhensday?igsh=MWtueHo5M215MXlwdQ%3D%3D&utm_source=qr",
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
          <div className="flex items-center space-x-6">
            {links.map((link, idx) => (
              <React.Fragment key={link.name}>
                {idx > 0 && (
                  <span className="text-white/20 hidden sm:inline">•</span>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                >
                  <span className="font-medium">{link.name}</span>
                  <span className="text-white/40 text-xs hidden sm:inline">
                    {link.handle}
                  </span>
                </a>
              </React.Fragment>
            ))}
          </div>

          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} Wayback Wednesday
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSocialBar;
