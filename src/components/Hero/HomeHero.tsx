import React, { useEffect, useRef } from "react";
import g2vid1 from "../../assets/images/g2vid_1.mp4";
import gboNoBg from "../../assets/images/gbo-no-bg.webp";
import HeroNav from "../Nav/HeroNav";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "../../utils/constants";
import { useAdminAuth } from "../../context/AdminAuthContext";
import HeroSocialBar from "./HeroSocialBar";

const HomeHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isAuthenticated } = useAdminAuth();

  // Ensure video autoplays muted and hard-stops at 10 seconds (only once per session)
  useEffect(() => {
    let timeUpdateHandler:
      | ((this: HTMLVideoElement, ev: Event) => void)
      | null = null;
    let handlerAttached = false;

    const playVideo = async () => {
      if (videoRef.current) {
        console.log("Attempting to play video (muted)...");
        videoRef.current.muted = true; // keep permanently muted
        videoRef.current.volume = 0;

        // Handle video playback and hard stop at 10s
        const handleVideoPlay = () => {
          const target = videoRef.current!;
          const MAX_TIME = 10; // seconds
          // Ensure we start at 0
          if (target.currentTime > MAX_TIME) target.currentTime = 0;

          timeUpdateHandler = () => {
            if (target.currentTime >= MAX_TIME) {
              target.currentTime = MAX_TIME;
              target.pause();
              if (timeUpdateHandler) {
                target.removeEventListener("timeupdate", timeUpdateHandler);
              }
            }
          };
          target.addEventListener("timeupdate", timeUpdateHandler);
        };

        // Prevent duplicate handlers across HMR or re-renders
        if (!handlerAttached) {
          videoRef.current.onplay = handleVideoPlay;
          handlerAttached = true;
        }

        try {
          await videoRef.current.play();
          console.log("Video play() succeeded");
        } catch (error) {
          console.log("Video autoplay failed:", error);
          // Try again muted (no unmute behavior)
          videoRef.current.muted = true;
          videoRef.current.volume = 0;
          try {
            await videoRef.current.play();
            console.log("Video playing muted");
          } catch (mutedError) {
            console.log("Muted autoplay failed:", mutedError);
          }
        }
      }
    };

    // Small delay to ensure video element is ready
    setTimeout(playVideo, 100);

    const node = videoRef.current;
    return () => {
      if (node) {
        node.onplay = null;
        if (timeUpdateHandler) {
          node.removeEventListener("timeupdate", timeUpdateHandler);
        }
      }
    };
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
        muted={true}
        style={
          {
            imageRendering: "crisp-edges",
            WebkitImageRendering: "optimize-contrast",
          } as React.CSSProperties
        }
      >
        <source src={g2vid1} type="video/mp4" />
      </video>

      {/* Navigation - kept on the left */}
      <HeroNav
        items={[...MAIN_NAV_ITEMS, ...(isAuthenticated ? USER_NAV_ITEMS : [])]}
      />

      {/* G-bo image on the left */}
      <img
        ref={imageRef}
        src={gboNoBg}
        alt="G-bo The Pro"
        className="absolute -left-[15rem] bottom-0 w-[50rem] h-[50rem] object-contain object-bottom z-10"
      />

      {/* Hero Social Links Bar */}
      <HeroSocialBar />
    </section>
  );
};

export default HomeHero;
