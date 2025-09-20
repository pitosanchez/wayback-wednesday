import React, { useEffect, useRef } from "react";
import g2vid1 from "../../assets/images/g2vid_1.mp4";
import gboNoBg from "../../assets/images/gbo-no-bg.webp";
import HeroNav from "../Nav/HeroNav";
import { MAIN_NAV_ITEMS, USER_NAV_ITEMS } from "../../utils/constants";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { HeroFooter } from "../Footer";

const HomeHero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isAuthenticated } = useAdminAuth();

  // Ensure video autoplays with sound and stops at 10 seconds (only once per session)
  useEffect(() => {
    let fadeInterval: number | undefined;
    let stopTimeout: number | undefined;
    let fadeTimeout: number | undefined;
    let handlerAttached = false;

    const playVideo = async () => {
      // Check if video has already been played in this session
      const hasPlayedVideo = sessionStorage.getItem("heroVideoPlayed");

      if (hasPlayedVideo) {
        console.log("Video already played in this session, skipping...");
        return;
      }

      if (videoRef.current) {
        console.log("Attempting to play video...");
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;

        // Handle video playback with fade and stop
        const handleVideoPlay = () => {
          // Mark video as played in session storage
          sessionStorage.setItem("heroVideoPlayed", "true");

          // Start fading volume at 7.0 seconds
          fadeTimeout = window.setTimeout(() => {
            if (videoRef.current) {
              const target = videoRef.current;
              fadeInterval = window.setInterval(() => {
                if (!target) return;
                const next = Math.max(0, target.volume - 0.1);
                target.volume = next;
                if (next <= 0) {
                  window.clearInterval(fadeInterval);
                }
              }, 100);
            }
          }, 7000);

          // Stop video at 10 seconds and keep last frame (image remains visible)
          stopTimeout = window.setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }, 10000);
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

    const node = videoRef.current;
    return () => {
      if (node) {
        node.onplay = null;
      }
      if (fadeTimeout) window.clearTimeout(fadeTimeout);
      if (stopTimeout) window.clearTimeout(stopTimeout);
      if (fadeInterval) window.clearInterval(fadeInterval);
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
        muted={false}
        style={
          {
            imageRendering: "crisp-edges",
            WebkitImageRendering: "optimize-contrast",
            filter: "contrast(1.1) saturate(1.1) brightness(1.05)",
          } as React.CSSProperties
        }
      >
        <source src={g2vid1} type="video/mp4" />
      </video>

      {/* Dynamic gradient overlay for brilliance */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>

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

      {/* Hero Footer with Social Links */}
      <HeroFooter />
    </section>
  );
};

export default HomeHero;
