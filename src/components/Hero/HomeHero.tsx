import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import gboNoBg from "../../assets/images/gbo-no-bg.png";
import HeroNav from "../Nav/HeroNav";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "../../utils/constants";

const HomeHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { x: -40, y: 20, opacity: 0, rotate: -2 });
      gsap.set(".hero-title-line", { x: 40, opacity: 0, skewX: -6 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(imageRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.0,
      }).to(
        ".hero-title-line",
        { x: 0, opacity: 1, skewX: 0, stagger: 0.12, duration: 0.8 },
        "<+0.2"
      );

      // subtle float loop for image
      gsap.to(imageRef.current, {
        y: "-=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-black" ref={rootRef as any}>
      <HeroNav items={[...MAIN_NAV_ITEMS, ...USER_NAV_ITEMS]} />
      {/* Title behind and to the right */}
      <div className="hero-title-right font-alt-gothic">
        <h1 className="hero-title hero-title-line">G-bo</h1>
        <h1 className="hero-title hero-title-line">The Pro</h1>
      </div>

      {/* Foreground image on the left */}
      <img
        ref={imageRef}
        src={gboNoBg}
        alt="G-bo The Pro"
        className="hero-image"
      />
    </section>
  );
};

export default HomeHero;
