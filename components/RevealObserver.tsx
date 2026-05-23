"use client";
import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => io.observe(el));

    setTimeout(() => {
      document.querySelectorAll("#hero .reveal-stagger").forEach((el) => el.classList.add("in"));
    }, 1800);

    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const t = e.target as HTMLElement;
          if (e.isIntersecting && !t.dataset.done) {
            t.dataset.done = "1";
            const target = parseInt(t.dataset.count || "0");
            const hasPct = t.innerHTML.includes("%");
            const start = performance.now();
            const duration = 2400;
            const step = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              const val = Math.floor(target * ease);
              t.innerHTML = val + (hasPct ? '<span class="text-3xl">%</span>' : "");
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterIO.observe(c));

    return () => {
      io.disconnect();
      counterIO.disconnect();
    };
  }, []);

  return null;
}
