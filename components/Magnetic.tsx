"use client";
import { useEffect } from "react";

export default function Magnetic() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic], .float-cta"));
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      let rafId = 0;
      let tx = 0, ty = 0, cx = 0, cy = 0;
      const strength = el.classList.contains("float-cta") ? 0.3 : 0.22;

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * strength;
        ty = (e.clientY - r.top - r.height / 2) * strength;
        if (!rafId) loop();
      };
      const loop = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          rafId = requestAnimationFrame(loop);
        } else {
          rafId = 0;
        }
      };
      const onLeave = () => {
        tx = 0; ty = 0;
        if (!rafId) loop();
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(rafId);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
