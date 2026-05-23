"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const tgt = document.querySelector(href);
      if (tgt) {
        e.preventDefault();
        lenis.scrollTo(tgt as HTMLElement, { offset: -80, duration: 1.4 });
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onClick));

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      anchors.forEach((a) => a.removeEventListener("click", onClick));
    };
  }, []);

  return null;
}
