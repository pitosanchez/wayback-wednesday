import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./index.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {
  const smoother = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    // Initial hero text animation
    gsap.fromTo(
      ".hero-text",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
      }
    );

    // Content section animation
    gsap.fromTo(
      ".content",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".content",
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
      }
    );

    // Parallax effect for hero section
    gsap.to(".hero", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="hero" ref={heroRef}>
          <h1 className="hero-text">Wayback</h1>
        </div>
        <div className="content" ref={contentRef}>
          <h2>Welcome to Wayback Wednesday</h2>
          <p>Your content goes here...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
