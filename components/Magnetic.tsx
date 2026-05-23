"use client";
import { useEffect } from "react";

export default function Magnetic() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".btn-primary, .btn-ghost, .float-cta"));
    const handlers: Array<() => void> = [];
    els.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      };
      const onLeave = () => (btn.style.transform = "translate(0,0)");
      btn.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      handlers.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => handlers.forEach((fn) => fn());
  }, []);
  return null;
}
