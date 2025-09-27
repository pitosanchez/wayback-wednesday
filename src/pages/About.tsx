import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import gboImage from "../assets/images/gbo.webp";

const About = () => {
  return (
    <div className="page-container">
      <div className="space-y-16">
        <div className="page-header text-center">
          <h1
            className="text-6xl font-bold mb-6 font-rama-gothic"
            style={{ color: "var(--rich-black)" }}
          >
            ABOUT GBO
          </h1>
          <div className="accent-line mx-auto"></div>
        </div>

        <div className="grid-2 items-center">
          <div className="space-y-6">
            <p className="lead-text">Impact.</p>

            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--rich-black)" }}
            >
              ABOUT GBO THE PRO
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              G-Bo The Pro first made his mark in the early 90s alongside his
              partner DJ Rei Double R, creating the most must-have mixtapes in
              New York City. Their tapes weren’t just music—they were
              soundtracks to a movement, blending genres with precision, energy,
              and style that set them apart from their contemporaries. Using a
              multitrack recorder rather than the standard two-turntable setup,
              G-Bo & Double R brought an innovative, polished sound to the
              mixtape game that cemented their place in hip-hop history.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(10, 10, 10, 0.8)" }}
            >
              Over the decades, G-Bo’s influence has stretched far beyond the
              streets where those tapes first circulated. Recognized in the
              documentary <em>Mixtape</em> and the Rizzoli book
              <em> Do Remember</em>, his work has become part of the cultural
              archive of hip-hop. Today, G-Bo The Pro continues to honor that
              legacy while bringing the same passion, creativity, and
              versatility to live DJ sets, special events, and new projects that
              keep the spirit of those early days alive for both original fans
              and new generations.
            </p>
          </div>

          <AnimatedPortrait />
        </div>

        <div className="grid-3">
          <div className="card card-hover text-center">
            <div className="text-4xl mb-4" style={{ color: "var(--fire-red)" }}>
              🎵
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Authenticity
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Staying true to our roots while pushing boundaries
            </p>
          </div>
          <div className="card card-hover text-center">
            <div
              className="text-4xl mb-4"
              style={{ color: "var(--denim-blue)" }}
            >
              🤝
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Community
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Building connections through shared experiences
            </p>
          </div>
          <div className="card card-hover text-center">
            <div
              className="text-4xl mb-4"
              style={{ color: "var(--sunshine-yellow)" }}
            >
              💡
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--rich-black)" }}
            >
              Innovation
            </h3>
            <p style={{ color: "rgba(10, 10, 10, 0.7)" }}>
              Constantly evolving while honoring tradition
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// Animated circular portrait with thick red ring and GSAP flair
const AnimatedPortrait: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ringRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
    tl.to(ringRef.current, { rotate: 360, duration: 20 })
      .to(glowRef.current, { opacity: 0.5, duration: 2 }, 0)
      .to(glowRef.current, { opacity: 0.15, duration: 2 }, 2);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={glowRef}
        className="absolute -inset-10 rounded-full bg-gradient-to-tr from-red-600/30 via-white/10 to-transparent blur-3xl -z-10"
      />
      <div
        ref={ringRef}
        className="relative rounded-full overflow-hidden shadow-2xl"
        style={{ width: "24rem", height: "24rem", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}
      >
        {/* Thick ring using pseudo ring element */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 0 14px var(--fire-red), inset 0 0 0 2px rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />
        <img src={gboImage} alt="G-Bo The Pro" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
