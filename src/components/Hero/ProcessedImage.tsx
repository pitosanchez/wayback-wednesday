import React, { useEffect, useMemo, useRef, useState } from "react";

interface ProcessedImageProps {
  src: string;
  className?: string;
  alt?: string;
  /**
   * 0-255 threshold; pixels brighter than this across RGB will be made transparent
   */
  whiteThreshold?: number;
  /**
   * Tolerance for near-white variance
   */
  tolerance?: number;
  /**
   * Apply edge dehalo for semi-transparent pixels matted against white
   */
  dehalo?: boolean;
  /**
   * Number of edge erosion passes to shrink the alpha fringe (0-3)
   */
  erodePasses?: number;
}

const ProcessedImage: React.FC<ProcessedImageProps> = ({
  src,
  className,
  alt,
  whiteThreshold = 245,
  tolerance = 10,
  dehalo = true,
  erodePasses = 1,
}) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  const img = useMemo(() => new Image(), [src]);

  useEffect(() => {
    if (isProcessingRef.current) return; // avoid double runs in StrictMode
    isProcessingRef.current = true;

    const handleLoad = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple chroma key style: make near-white pixels transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const isNearWhite =
            r >= whiteThreshold - tolerance &&
            g >= whiteThreshold - tolerance &&
            b >= whiteThreshold - tolerance;

          if (isNearWhite) {
            data[i + 3] = 0; // alpha
          }
        }

        // Optional dehalo: un-matte semi-transparent pixels from white background
        if (dehalo) {
          for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3] / 255;
            if (a > 0 && a < 0.98) {
              // Unmatte from white: c = (c_m - (1 - a)*1) / a
              // Work in 0..1 then scale
              const r = data[i] / 255;
              const g = data[i + 1] / 255;
              const b = data[i + 2] / 255;
              const rU = Math.min(1, Math.max(0, (r - (1 - a)) / a));
              const gU = Math.min(1, Math.max(0, (g - (1 - a)) / a));
              const bU = Math.min(1, Math.max(0, (b - (1 - a)) / a));
              data[i] = Math.round(rU * 255);
              data[i + 1] = Math.round(gU * 255);
              data[i + 2] = Math.round(bU * 255);
            }
          }
        }

        // Morphological erosion on alpha to shrink 1-2px edge fringe
        const erodeOnce = () => {
          const copy = new Uint8ClampedArray(data);
          const w = canvas.width;
          const h = canvas.height;
          const alphaThresh = 10; // treat near 0 alpha as transparent
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              const idx = (y * w + x) * 4 + 3; // alpha index
              const a = copy[idx];
              if (a === 0) continue;
              let opaqueNeighbors = 0;
              // 8-neighborhood
              for (let oy = -1; oy <= 1; oy++) {
                for (let ox = -1; ox <= 1; ox++) {
                  if (ox === 0 && oy === 0) continue;
                  const nIdx = ((y + oy) * w + (x + ox)) * 4 + 3;
                  if (copy[nIdx] > alphaThresh) opaqueNeighbors++;
                }
              }
              if (opaqueNeighbors < 5) {
                // on edge: shrink alpha
                data[idx] = Math.max(0, a - 50);
              }
            }
          }
        };

        for (let p = 0; p < Math.max(0, Math.min(3, erodePasses)); p++) {
          erodeOnce();
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        setProcessedSrc(url);
      } catch (e) {
        // Fallback: keep original image if processing fails
        setProcessedSrc(src);
      }
    };

    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = handleLoad;
    img.onerror = () => setProcessedSrc(src);

    return () => {
      img.onload = null;
      img.onerror = null;
      isProcessingRef.current = false;
    };
  }, [img, src, whiteThreshold, tolerance]);

  if (!processedSrc) {
    return <img src={src} alt={alt} className={className} />;
  }
  return <img src={processedSrc} alt={alt} className={className} />;
};

export default ProcessedImage;
