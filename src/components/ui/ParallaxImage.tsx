"use client";

import { useEffect, useRef } from "react";

interface ParallaxImageProps {
  children: React.ReactNode;
}

export function ParallaxImage({ children }: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.closest("[data-parallax-card]")?.getBoundingClientRect();
      if (!rect) return;
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${centerY * 0.06}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 will-change-transform">
      {children}
    </div>
  );
}
