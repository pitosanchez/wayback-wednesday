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
}

const ProcessedImage: React.FC<ProcessedImageProps> = ({
  src,
  className,
  alt,
  whiteThreshold = 245,
  tolerance = 10,
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
