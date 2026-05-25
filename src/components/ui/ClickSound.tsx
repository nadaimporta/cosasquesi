"use client";

import { useEffect } from "react";

export function ClickSound() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const audio = new Audio("/secondary-click.mp3");
    audio.volume = 0.5;
    audio.preload = "auto";

    const play = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    window.addEventListener("click", play);
    return () => window.removeEventListener("click", play);
  }, []);

  return null;
}
