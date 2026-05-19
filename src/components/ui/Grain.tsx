"use client";

import { useEffect, useRef } from "react";

export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 300;
    const H = 300;
    canvas.width = W;
    canvas.height = H;

    function generateGrain() {
      if (!ctx) return;
      const imageData = ctx.createImageData(W, H);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const val = Math.random() * 255;
        imageData.data[i] = val;
        imageData.data[i + 1] = val;
        imageData.data[i + 2] = val;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    generateGrain();
    const interval = setInterval(generateGrain, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      style={{ opacity: 0.04, mixBlendMode: "multiply" }}
    />
  );
}
