import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import g2vid1 from "../../assets/images/g2vid_1.mp4";
import gboNoBg from "../../assets/images/gbo-no-bg.webp";
import HeroNav from "../Nav/HeroNav";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "../../utils/constants";

const HomeHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { x: -40, y: 20, opacity: 0, rotate: -2 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(imageRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.0,
      });

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

  // Ensure video autoplays with sound and stops at 9 seconds
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        console.log("Attempting to play video...");
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;

        // Add event listeners for debugging
        videoRef.current.addEventListener("loadstart", () =>
          console.log("Video load started")
        );
        videoRef.current.addEventListener("loadeddata", () =>
          console.log("Video data loaded")
        );
        videoRef.current.addEventListener("canplay", () =>
          console.log("Video can play")
        );
        videoRef.current.addEventListener("play", () =>
          console.log("Video started playing")
        );
        videoRef.current.addEventListener("error", (e) =>
          console.log("Video error:", e)
        );

        // Handle video playback with fade and stop
        const handleVideoPlay = () => {
          console.log("Video started playing - setting up fade and stop");

          // Start fading volume at 7 seconds
          setTimeout(() => {
            if (videoRef.current) {
              console.log("Starting volume fade...");
              const fadeOut = setInterval(() => {
                if (videoRef.current && videoRef.current.volume > 0) {
                  videoRef.current.volume -= 0.1;
                  if (videoRef.current.volume <= 0) {
                    videoRef.current.volume = 0;
                    clearInterval(fadeOut);
                    console.log("Volume faded to 0");
                  }
                }
              }, 100);
            }
          }, 7000);

          // Stop video at 10 seconds
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              console.log("Video stopped at 10 seconds");
            }
          }, 10000);
        };

        videoRef.current.addEventListener("play", handleVideoPlay);

        try {
          await videoRef.current.play();
          console.log("Video play() succeeded");
        } catch (error) {
          console.log("Video autoplay failed:", error);
          // Try with muted first, then unmute
          videoRef.current.muted = true;
          try {
            await videoRef.current.play();
            console.log("Video playing muted, will unmute on user interaction");
            // Unmute on any user interaction
            const unmuteHandler = () => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1.0;
                console.log("Video unmuted");
              }
              document.removeEventListener("click", unmuteHandler);
              document.removeEventListener("keydown", unmuteHandler);
            };
            document.addEventListener("click", unmuteHandler);
            document.addEventListener("keydown", unmuteHandler);
          } catch (mutedError) {
            console.log("Even muted autoplay failed:", mutedError);
          }
        }
      }
    };

    // Small delay to ensure video element is ready
    setTimeout(playVideo, 100);
  }, []);

  return (
    <section
      className="hero-black relative h-screen overflow-hidden"
      ref={rootRef}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        playsInline
        preload="auto"
        loop
        muted={false}
        style={{
          imageRendering: "crisp-edges",
          WebkitImageRendering: "optimize-contrast",
          filter: "contrast(1.1) saturate(1.1) brightness(1.05)",
        }}
      >
        <source src={g2vid1} type="video/mp4" />
      </video>

      {/* Dynamic gradient overlay for brilliance */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>

      {/* Navigation - kept on the left */}
      <HeroNav items={[...MAIN_NAV_ITEMS, ...USER_NAV_ITEMS]} />

      {/* G-bo image on the left */}
      <img
        ref={imageRef}
        src={gboNoBg}
        alt="G-bo The Pro"
        className="absolute -left-[15rem] bottom-0 w-[50rem] h-[50rem] object-contain object-bottom z-10"
      />
    </section>
  );
};

export default HomeHero;
