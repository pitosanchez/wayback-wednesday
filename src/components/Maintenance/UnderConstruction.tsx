import React from "react";

const UnderConstruction: React.FC = () => {
  return (
    <section className="w-screen h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="font-alt-gothic text-5xl sm:text-6xl mb-4">
          Site Under Construction
        </h1>
        <p className="text-white/80 mb-8">
          We&apos;re crafting something special. Please check back soon.
        </p>
        <a
          href="mailto:info@wayback.com"
          className="inline-block px-6 py-3 bg-fire-red text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default UnderConstruction;
